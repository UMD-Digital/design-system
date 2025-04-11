/**
 * Update README badges script
 *
 * This script automatically updates the version badges in README.md files
 * based on the versions defined in each package's package.json, updates
 * the versions in the root README.md file, and updates the root package.json
 * version to match the latest package version.
 */

const fs = require('fs');
const path = require('path');

const packages = ['components', 'elements', 'styles', 'feeds'];
const rootDir = path.resolve(__dirname, '../packages/');
const projectRoot = path.resolve(__dirname, '../');

// Store package versions
let latestVersion = '0.0.1';
const packageVersions = {};

// First pass: collect all package versions
packages.forEach((packageName) => {
  const packageDir = path.join(rootDir, packageName);
  const packageJsonPath = path.join(packageDir, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    console.warn(`No package.json found for ${packageName}`);
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const version = packageJson.version;
  if (!version) {
    console.warn(`No version found in package.json for ${packageName}`);
    return;
  }

  // Store the version
  packageVersions[packageName] = version;

  // Track the latest version to use for root package.json
  if (version > latestVersion) {
    latestVersion = version;
  }
});

// Second pass: update individual package README badges
packages.forEach((packageName) => {
  const version = packageVersions[packageName];
  if (!version) return;

  const packageDir = path.join(rootDir, packageName);
  const readmePath = path.join(packageDir, 'README.md');

  if (!fs.existsSync(readmePath)) {
    console.warn(`No README.md found for ${packageName}`);
    return;
  }

  let readme = fs.readFileSync(readmePath, 'utf8');

  const capitalizedName =
    packageName.charAt(0).toUpperCase() + packageName.slice(1);
  const badgeRegex = new RegExp(
    `\\[\\!\\[${capitalizedName} Version\\]\\(https://img\\.shields\\.io/badge/${capitalizedName}-v[0-9.]+(-[a-zA-Z0-9]+)?-blue\\)\\]`,
    'i',
  );
  const newBadge = `[![${capitalizedName} Version](https://img.shields.io/badge/${capitalizedName}-v${version}-blue)]`;

  if (badgeRegex.test(readme)) {
    readme = readme.replace(badgeRegex, newBadge);
    fs.writeFileSync(readmePath, readme);
    console.log(`Updated ${packageName} README badge to version ${version}`);
  } else {
    console.warn(`Could not find version badge in ${packageName} README.md`);
  }
});

// Update root README.md with all package versions
const rootReadmePath = path.join(projectRoot, 'README.md');
if (fs.existsSync(rootReadmePath)) {
  let rootReadme = fs.readFileSync(rootReadmePath, 'utf8');

  packages.forEach((packageName) => {
    const version = packageVersions[packageName];
    if (!version) return;

    const capitalizedName =
      packageName.charAt(0).toUpperCase() + packageName.slice(1);
    const badgeRegex = new RegExp(
      `\\[\\!\\[${capitalizedName} Version\\]\\(https://img\\.shields\\.io/badge/${capitalizedName}-v[0-9.]+(-[a-zA-Z0-9]+)?-blue\\)\\]`,
      'i',
    );
    const newBadge = `[![${capitalizedName} Version](https://img.shields.io/badge/${capitalizedName}-v${version}-blue)]`;

    if (badgeRegex.test(rootReadme)) {
      rootReadme = rootReadme.replace(badgeRegex, newBadge);
      console.log(
        `Updated root README badge for ${packageName} to version ${version}`,
      );
    } else {
      console.warn(
        `Could not find ${packageName} version badge in root README.md`,
      );
    }
  });

  fs.writeFileSync(rootReadmePath, rootReadme);
} else {
  console.warn('Root README.md not found');
}
