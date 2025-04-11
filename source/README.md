# UMD Design System Scripts

This directory contains utility scripts for the UMD Design System.

## update-badges.js

This script automatically updates the version badges in each package's README.md file to match the version in its package.json.

### How It Works

1. Reads each package's `package.json` to extract the current version number
2. Updates the corresponding badge in the package's README.md file
3. The script is automatically run as part of the following processes:
   - When running `yarn build` or `npm run build` for any package (via prebuild hook)
   - When running `npm version` or `yarn version` for the entire project (via preversion hook)
   - Manually via `yarn update-badges` or `npm run update-badges`

### Integration

The script is integrated into the build process in two ways:

1. **Root package.json**: 
   - `"update-badges": "node packages/scripts/update-badges.js"` - Manual execution
   - `"preversion": "yarn run update-badges"` - Automatic execution before version changes

2. **Individual package.json files**:
   - `"prebuild": "node ../scripts/update-badges.js"` - Automatic execution before builds

### Badge Format

The script looks for badges in the following format:
```markdown
[![PackageName Version](https://img.shields.io/badge/PackageName-vX.Y.Z-blue)](link)
```

And updates them to:
```markdown
[![PackageName Version](https://img.shields.io/badge/PackageName-v{current-version}-blue)](link)
```

### Manual Usage

To manually run the script:

```bash
# From the root directory
yarn update-badges
# or
npm run update-badges
```