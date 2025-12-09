#!/usr/bin/env node

/**
 * Version Bump Wrapper Script
 *
 * User-friendly wrapper around bump-version.sh
 *
 * Usage:
 *   yarn package:version                    # patch components (default)
 *   yarn package:version elements           # patch elements
 *   yarn package:version elements --minor   # minor elements
 *   yarn package:version elements --major   # major elements
 *   yarn package:version --minor            # minor components
 *   yarn package:version --prerelease       # prerelease components
 *   yarn package:version elements --prerelease --preid=beta
 */

const { execSync } = require('child_process');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);

// Default values
let packageName = 'components';
let bumpType = 'patch';
let preid = '';
let dryRun = false;

// Valid packages
const validPackages = ['icons', 'tokens', 'utilities', 'builder', 'model', 'styles', 'elements', 'feeds', 'components', 'all'];

// Valid bump types
const validBumpTypes = ['patch', 'minor', 'major', 'prerelease', 'prepatch', 'preminor', 'premajor'];

// Check for help flag first
if (args.includes('--help') || args.includes('-h')) {
  showHelp();
  process.exit(0);
}

// Parse arguments
for (let i = 0; i < args.length; i++) {
  const arg = args[i];

  if (arg.startsWith('--')) {
    // Flag argument
    if (arg === '--minor') {
      bumpType = 'minor';
    } else if (arg === '--major') {
      bumpType = 'major';
    } else if (arg === '--prerelease') {
      bumpType = 'prerelease';
    } else if (arg === '--prepatch') {
      bumpType = 'prepatch';
    } else if (arg === '--preminor') {
      bumpType = 'preminor';
    } else if (arg === '--premajor') {
      bumpType = 'premajor';
    } else if (arg.startsWith('--preid=')) {
      preid = arg.split('=')[1];
    } else if (arg === '--dry-run') {
      dryRun = true;
    } else {
      console.error(`Unknown flag: ${arg}`);
      showHelp();
      process.exit(1);
    }
  } else if (validPackages.includes(arg)) {
    // Package name
    packageName = arg;
  } else {
    console.error(`Unknown package: ${arg}`);
    console.error(`Valid packages: ${validPackages.join(', ')}`);
    process.exit(1);
  }
}

// Build command
const scriptPath = path.join(__dirname, 'bump-version.sh');
let command = `${scriptPath} ${bumpType} ${packageName}`;

if (preid) {
  command += ` --preid=${preid}`;
}

if (dryRun) {
  command += ' --dry-run';
}

// Show what we're doing
console.log('');
console.log('📦 Version Bump');
console.log('─────────────────────────────────────');
console.log(`Package:    ${packageName}`);
console.log(`Bump Type:  ${bumpType}`);
if (preid) {
  console.log(`Pre-ID:     ${preid}`);
}
if (dryRun) {
  console.log(`Mode:       DRY RUN`);
}
console.log('─────────────────────────────────────');
console.log('');

// Execute the command
try {
  execSync(command, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
} catch (error) {
  process.exit(error.status || 1);
}

function showHelp() {
  console.log('');
  console.log('Version Bump Wrapper');
  console.log('');
  console.log('Usage:');
  console.log('  yarn package:version [package] [options]');
  console.log('');
  console.log('Examples:');
  console.log('  yarn package:version                    # patch components (default)');
  console.log('  yarn package:version elements           # patch elements');
  console.log('  yarn package:version elements --minor   # minor elements');
  console.log('  yarn package:version elements --major   # major elements');
  console.log('  yarn package:version --minor            # minor components');
  console.log('  yarn package:version --prerelease       # prerelease components');
  console.log('  yarn package:version elements --prerelease --preid=beta');
  console.log('');
  console.log('Packages:');
  console.log(`  ${validPackages.join(', ')}`);
  console.log('');
  console.log('Options:');
  console.log('  --patch        Patch version bump (default)');
  console.log('  --minor        Minor version bump');
  console.log('  --major        Major version bump');
  console.log('  --prerelease   Pre-release version bump');
  console.log('  --prepatch     Pre-release patch bump');
  console.log('  --preminor     Pre-release minor bump');
  console.log('  --premajor     Pre-release major bump');
  console.log('  --preid=<id>   Pre-release identifier (alpha, beta, rc)');
  console.log('  --dry-run      Show what would happen without making changes');
  console.log('');
}
