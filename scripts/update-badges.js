/**
 * Update README badges script
 *
 * This script automatically updates the version badges in README.md files
 * based on the versions defined in each package's package.json, updates
 * the versions in the root README.md file, and updates the root package.json
 * version to match the latest package version.
 *
 * Usage:
 *   node scripts/update-badges.js              # Update all badges
 *   node scripts/update-badges.js --dry-run    # Preview changes without writing
 *   node scripts/update-badges.js --package=components  # Update specific package
 */

const fs = require('fs');
const path = require('path');

// Parse command-line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const specificPackage = args
  .find(arg => arg.startsWith('--package='))
  ?.split('=')[1];

const packages = ['icons', 'tokens', 'builder', 'model', 'components', 'elements', 'styles', 'feeds', 'utilities'];
const rootDir = path.resolve(__dirname, '../packages/');
const projectRoot = path.resolve(__dirname, '../');

// Store package versions
let latestVersion = '0.0.1';
const packageVersions = {};
let hasErrors = false;

console.log('🔍 Scanning package versions...\n');

// First pass: collect all package versions
packages.forEach((packageName) => {
  // Skip if specific package requested and this isn't it
  if (specificPackage && packageName !== specificPackage) {
    return;
  }

  const packageDir = path.join(rootDir, packageName);
  const packageJsonPath = path.join(packageDir, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    console.warn(`⚠️  No package.json found for ${packageName}`);
    hasErrors = true;
    return;
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const version = packageJson.version;

    if (!version) {
      console.warn(`⚠️  No version found in package.json for ${packageName}`);
      hasErrors = true;
      return;
    }

    // Store the version
    packageVersions[packageName] = version;
    console.log(`   ${packageName}: v${version}`);

    // Track the latest version to use for root package.json
    if (version > latestVersion) {
      latestVersion = version;
    }
  } catch (error) {
    console.error(`❌ Error reading package.json for ${packageName}:`, error.message);
    hasErrors = true;
  }
});

console.log('\n📝 Updating README badges...\n');

// Second pass: update individual package README badges
packages.forEach((packageName) => {
  // Skip if specific package requested and this isn't it
  if (specificPackage && packageName !== specificPackage) {
    return;
  }

  const version = packageVersions[packageName];
  if (!version) return;

  const packageDir = path.join(rootDir, packageName);
  const readmePath = path.join(packageDir, 'README.md');

  if (!fs.existsSync(readmePath)) {
    console.warn(`⚠️  No README.md found for ${packageName}`);
    return;
  }

  try {
    let readme = fs.readFileSync(readmePath, 'utf8');

    const capitalizedName =
      packageName.charAt(0).toUpperCase() + packageName.slice(1);
    const badgeRegex = new RegExp(
      `\\[\\!\\[${capitalizedName} Version\\]\\(https://img\\.shields\\.io/badge/${capitalizedName}-v[0-9.]+(-[a-zA-Z0-9.]+)?-blue\\)\\]`,
      'i',
    );
    const newBadge = `[![${capitalizedName} Version](https://img.shields.io/badge/${capitalizedName}-v${version}-blue)]`;

    if (badgeRegex.test(readme)) {
      if (!isDryRun) {
        readme = readme.replace(badgeRegex, newBadge);
        fs.writeFileSync(readmePath, readme);
      }
      console.log(`   ✓ ${packageName} README badge → v${version}${isDryRun ? ' (dry-run)' : ''}`);
    } else {
      console.warn(`   ⚠️  Could not find version badge in ${packageName} README.md`);
    }
  } catch (error) {
    console.error(`   ❌ Error updating ${packageName} README:`, error.message);
    hasErrors = true;
  }
});

console.log('\n📝 Updating root README...\n');

// Update root README.md with all package versions
const rootReadmePath = path.join(projectRoot, 'README.md');
if (fs.existsSync(rootReadmePath)) {
  try {
    let rootReadme = fs.readFileSync(rootReadmePath, 'utf8');

    packages.forEach((packageName) => {
      // Skip if specific package requested and this isn't it
      if (specificPackage && packageName !== specificPackage) {
        return;
      }

      const version = packageVersions[packageName];
      if (!version) return;

      const capitalizedName =
        packageName.charAt(0).toUpperCase() + packageName.slice(1);
      const badgeRegex = new RegExp(
        `\\[\\!\\[${capitalizedName} Version\\]\\(https://img\\.shields\\.io/badge/${capitalizedName}-v[0-9.]+(-[a-zA-Z0-9.]+)?-blue\\)\\]`,
        'i',
      );
      const newBadge = `[![${capitalizedName} Version](https://img.shields.io/badge/${capitalizedName}-v${version}-blue)]`;

      if (badgeRegex.test(rootReadme)) {
        if (!isDryRun) {
          rootReadme = rootReadme.replace(badgeRegex, newBadge);
        }
        console.log(`   ✓ Root README badge for ${packageName} → v${version}${isDryRun ? ' (dry-run)' : ''}`);
      } else {
        console.warn(`   ⚠️  Could not find ${packageName} version badge in root README.md`);
      }
    });

    if (!isDryRun) {
      fs.writeFileSync(rootReadmePath, rootReadme);
    }
  } catch (error) {
    console.error('   ❌ Error updating root README:', error.message);
    hasErrors = true;
  }
} else {
  console.warn('   ⚠️  Root README.md not found');
}

console.log('\n✨ Badge update complete!\n');

// Exit with error code if there were any errors
if (hasErrors) {
  console.error('⚠️  Completed with errors. See warnings above.\n');
  process.exit(1);
} else {
  console.log('✅ All badges updated successfully!\n');
  process.exit(0);
}
