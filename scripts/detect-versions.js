#!/usr/bin/env node

/**
 * Version Detection Script for UMD Design System
 *
 * Compares package.json versions against NPM registry to determine which packages need releasing.
 * Handles edge cases like unpublished packages, pre-releases, and network failures.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Lightweight semver helpers (avoids npx/require dependency issues in pnpm CI)
const SEMVER_RE = /^(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z0-9.]+))?(?:\+[a-zA-Z0-9.]+)?$/;

function parseSemver(version) {
  const match = version.match(SEMVER_RE);
  if (!match) return null;
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4] || null,
  };
}

function compareSemver(a, b) {
  const pa = parseSemver(a);
  const pb = parseSemver(b);
  if (!pa || !pb) return 0;

  if (pa.major !== pb.major) return pa.major - pb.major;
  if (pa.minor !== pb.minor) return pa.minor - pb.minor;
  if (pa.patch !== pb.patch) return pa.patch - pb.patch;

  // No prerelease > prerelease (1.0.0 > 1.0.0-beta.0)
  if (!pa.prerelease && pb.prerelease) return 1;
  if (pa.prerelease && !pb.prerelease) return -1;
  if (pa.prerelease && pb.prerelease) {
    return pa.prerelease < pb.prerelease ? -1 : pa.prerelease > pb.prerelease ? 1 : 0;
  }
  return 0;
}

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

// Package dependency tiers for ordered releases
const PACKAGE_TIERS = {
  foundation: ['icons', 'tokens', 'utilities', 'builder', 'model'],
  core: ['styles', 'elements', 'feeds'],
  primary: ['components']
};

// All packages in order
const ALL_PACKAGES = [
  ...PACKAGE_TIERS.foundation,
  ...PACKAGE_TIERS.core,
  ...PACKAGE_TIERS.primary
];

/**
 * Sleep for specified milliseconds
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Execute command with retry logic
 */
async function execWithRetry(command, retries = MAX_RETRIES) {
  for (let i = 0; i < retries; i++) {
    try {
      return execSync(command, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`Command failed, retrying (${i + 1}/${retries})...`);
      await sleep(RETRY_DELAY_MS * Math.pow(2, i)); // Exponential backoff
    }
  }
}

/**
 * Get NPM version for a package
 */
async function getNpmVersion(packageName) {
  try {
    const version = await execWithRetry(
      `npm view ${packageName} version 2>/dev/null || echo "0.0.0"`
    );
    return version.trim() || '0.0.0';
  } catch (error) {
    console.log(`Package ${packageName} not found on NPM, treating as unpublished`);
    return '0.0.0';
  }
}

/**
 * Get local package.json version
 */
function getLocalVersion(packagePath) {
  try {
    const packageJsonPath = path.join(packagePath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    return packageJson.version;
  } catch (error) {
    throw new Error(`Failed to read package.json at ${packagePath}: ${error.message}`);
  }
}

/**
 * Compare versions using semver
 * Returns true if localVersion > npmVersion
 */
function needsRelease(localVersion, npmVersion) {
  return compareSemver(localVersion, npmVersion) > 0;
}

/**
 * Check if version is a pre-release
 */
function isPrerelease(version) {
  const parsed = parseSemver(version);
  return parsed !== null && parsed.prerelease !== null;
}

/**
 * Extract pre-release identifier (alpha, beta, rc)
 */
function getPrereleaseId(version) {
  const match = version.match(/-([a-z]+)\./i);
  return match ? match[1] : 'beta';
}

/**
 * Validate version format
 */
function isValidSemver(version) {
  return parseSemver(version) !== null;
}

/**
 * Check for version downgrade (security risk)
 */
function isDowngrade(localVersion, npmVersion) {
  if (npmVersion === '0.0.0') return false;
  return compareSemver(localVersion, npmVersion) < 0;
}

/**
 * Main function to detect version changes
 */
async function detectVersions() {
  console.log('🔍 Detecting package versions...\n');

  const packagesDir = path.join(process.cwd(), 'packages');
  const results = [];
  const errors = [];

  for (const packageName of ALL_PACKAGES) {
    const packagePath = path.join(packagesDir, packageName);

    // Map package name (special case: "tokens" → "token")
    const actualPackageName = packageName === 'tokens' ? 'token' : packageName;
    const fullPackageName = `@universityofmaryland/web-${actualPackageName}-library`;

    try {
      // Get versions
      const localVersion = getLocalVersion(packagePath);
      const npmVersion = await getNpmVersion(fullPackageName);

      // Validate local version
      if (!isValidSemver(localVersion)) {
        errors.push({
          package: packageName,
          error: `Invalid semver format: ${localVersion}`
        });
        continue;
      }

      // Check for downgrade
      if (isDowngrade(localVersion, npmVersion)) {
        errors.push({
          package: packageName,
          error: `Version downgrade detected! Local: ${localVersion}, NPM: ${npmVersion}`,
          severity: 'critical'
        });
        continue;
      }

      // Determine if release is needed
      const releaseNeeded = needsRelease(localVersion, npmVersion);
      const isPrerel = isPrerelease(localVersion);
      const preid = isPrerel ? getPrereleaseId(localVersion) : null;

      const result = {
        package: packageName,
        fullName: fullPackageName,
        localVersion,
        npmVersion,
        needsRelease: releaseNeeded,
        isPrerelease: isPrerel,
        preid: preid,
        isNewPackage: npmVersion === '0.0.0'
      };

      results.push(result);

      // Log result
      const status = releaseNeeded ? '✅ NEEDS RELEASE' : '⏭️  SKIP';
      const versionInfo = releaseNeeded
        ? `${npmVersion} → ${localVersion}${isPrerel ? ` (${preid})` : ''}`
        : `${localVersion}`;

      console.log(`${status} ${packageName.padEnd(12)} ${versionInfo}`);

    } catch (error) {
      errors.push({
        package: packageName,
        error: error.message
      });
      console.error(`❌ ERROR ${packageName.padEnd(12)} ${error.message}`);
    }
  }

  // Output results as JSON for GitHub Actions
  console.log('\n📊 Summary:');

  const packagesToRelease = results.filter(r => r.needsRelease);
  const packagesByTier = {
    foundation: packagesToRelease.filter(r => PACKAGE_TIERS.foundation.includes(r.package)),
    core: packagesToRelease.filter(r => PACKAGE_TIERS.core.includes(r.package)),
    primary: packagesToRelease.filter(r => PACKAGE_TIERS.primary.includes(r.package))
  };

  console.log(`  Total packages: ${results.length}`);
  console.log(`  Need release: ${packagesToRelease.length}`);
  console.log(`    - Foundation: ${packagesByTier.foundation.length}`);
  console.log(`    - Core: ${packagesByTier.core.length}`);
  console.log(`    - Primary: ${packagesByTier.primary.length}`);

  if (errors.length > 0) {
    console.log(`  Errors: ${errors.length}`);
    errors.forEach(err => {
      const severity = err.severity === 'critical' ? '🚨 CRITICAL' : '⚠️  WARNING';
      console.log(`    ${severity} ${err.package}: ${err.error}`);
    });
  }

  // Check for critical errors
  const criticalErrors = errors.filter(e => e.severity === 'critical');
  if (criticalErrors.length > 0) {
    console.error('\n🚨 Critical errors detected. Aborting release.');
    process.exit(1);
  }

  // Output for GitHub Actions
  console.log('\n📤 GitHub Actions Output:');

  // Output individual package lists for each tier
  const foundationPackages = packagesByTier.foundation.map(r => r.package).join(',');
  const corePackages = packagesByTier.core.map(r => r.package).join(',');
  const primaryPackages = packagesByTier.primary.map(r => r.package).join(',');
  const allPackages = packagesToRelease.map(r => r.package).join(',');

  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `foundation-packages=${foundationPackages}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `core-packages=${corePackages}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `primary-packages=${primaryPackages}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `all-packages=${allPackages}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `has-releases=${packagesToRelease.length > 0}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `release-count=${packagesToRelease.length}\n`);

    // Store full results as JSON
    const resultsJson = JSON.stringify(packagesToRelease);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `results=${resultsJson}\n`);
  }

  console.log(`  foundation-packages=${foundationPackages || 'none'}`);
  console.log(`  core-packages=${corePackages || 'none'}`);
  console.log(`  primary-packages=${primaryPackages || 'none'}`);
  console.log(`  all-packages=${allPackages || 'none'}`);
  console.log(`  has-releases=${packagesToRelease.length > 0}`);
  console.log(`  release-count=${packagesToRelease.length}`);

  // Exit with appropriate code
  if (errors.length > 0 && packagesToRelease.length === 0) {
    console.error('\n❌ Errors detected and no packages to release.');
    process.exit(1);
  }

  console.log('\n✅ Version detection completed successfully!');
  process.exit(0);
}

// Run the script
detectVersions().catch(error => {
  console.error('\n💥 Fatal error during version detection:');
  console.error(error);
  process.exit(1);
});
