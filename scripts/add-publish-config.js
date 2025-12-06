/**
 * Add publishConfig to all package.json files
 *
 * This script adds the publishConfig section to all packages that don't have it yet.
 * This ensures all scoped packages will be published as public.
 */

const fs = require('fs');
const path = require('path');

const packages = ['icons', 'tokens', 'builder', 'model', 'components', 'elements', 'styles', 'feeds', 'utilities'];
const rootDir = path.resolve(__dirname, '../packages/');

let updatedCount = 0;
let skippedCount = 0;

console.log('Adding publishConfig to package.json files...\n');

packages.forEach((packageName) => {
  const packageDir = path.join(rootDir, packageName);
  const packageJsonPath = path.join(packageDir, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    console.warn(`⚠️  No package.json found for ${packageName}`);
    return;
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Check if publishConfig already exists
    if (packageJson.publishConfig) {
      console.log(`⏭️  ${packageName}: publishConfig already exists, skipping`);
      skippedCount++;
      return;
    }

    // Add publishConfig after the "files" field
    const newPackageJson = {};
    for (const [key, value] of Object.entries(packageJson)) {
      newPackageJson[key] = value;

      // Insert publishConfig after "files"
      if (key === 'files') {
        newPackageJson.publishConfig = {
          access: 'public',
          registry: 'https://registry.npmjs.org/'
        };
      }
    }

    // Write back to file with pretty formatting
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(newPackageJson, null, 2) + '\n',
      'utf8'
    );

    console.log(`✓ ${packageName}: publishConfig added`);
    updatedCount++;
  } catch (error) {
    console.error(`❌ Error processing ${packageName}:`, error.message);
  }
});

console.log(`\n✨ Complete! Updated ${updatedCount} packages, skipped ${skippedCount} packages.\n`);
