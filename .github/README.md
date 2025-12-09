# .github Directory Structure

This directory contains GitHub-specific configurations, workflows, and documentation for the UMD Design System.

## Directory Structure

```
.github/
├── workflows/                            # GitHub Actions workflows
│   ├── auto-release.yml                  # 🆕 Automated package release
│   ├── release-package.yml               # ✏️  Modified for automation support
│   ├── release-notification.yml          # Slack notifications
│   ├── release.yml                       # Manual bulk release
│   └── docs.yml                          # Documentation generation
│
├── RELEASE_GUIDE.md                      # ✏️  Release documentation (updated)
├── RELEASE_TEMPLATE.md                   # GitHub release template
└── VALIDATION_REPORT.md                  # NPM setup validation
```

**Note:** Automation scripts moved to `/scripts` directory at repo root.

Legend:
- 🆕 Newly created
- ✏️  Modified from existing

## Workflows

### Automated Release System

#### `auto-release.yml` - Main Automated Release Workflow
**Trigger**: Push to `npm-release` branch
**Purpose**: Automatically detects and publishes packages with version changes

**Key Features**:
- Automatic version detection (using `/scripts/detect-versions.js`)
- Dependency-aware tiered releases (foundation → core → primary)
- Parallel releases within each tier
- Slack notifications
- Concurrency control

**Flow**:
1. Detect version changes (compare package.json with NPM)
2. Release foundation tier packages (parallel)
3. Release core tier packages (parallel)
4. Release primary tier packages (sequential)
5. Send Slack notification with results

**See**: [RELEASE_GUIDE.md](./RELEASE_GUIDE.md#automated-release-system) for detailed usage

#### `release-package.yml` - Single Package Release
**Trigger**: Manual (workflow_dispatch) OR workflow_call (automated)
**Purpose**: Release a single package

**Modifications for Automation**:
- Added `workflow_call` trigger
- Added `auto_detect_version` input (skips version bumping)
- Added output values for automation
- Auto-detects pre-release versions

#### `release-notification.yml` - Slack Notifications
**Trigger**: workflow_call (from other workflows)
**Purpose**: Send Slack notifications for releases

**Unchanged**: Works with both manual and automated workflows

#### `release.yml` - Bulk Package Release
**Trigger**: Manual (workflow_dispatch)
**Purpose**: Release all packages with changes using Lerna

**Status**: Retained for emergency bulk releases

## Automation Scripts

Automation scripts are located in `/scripts` directory at the repository root.

**Key Scripts**:
- `detect-versions.js` - Version detection (compares package.json vs NPM)
- `trigger-releases.sh` - Release orchestration via GitHub CLI
- `bump-version.sh` - Version bump helper

**See**: `/scripts/README.md` for detailed script documentation

## Documentation

### `RELEASE_GUIDE.md`
Comprehensive release management guide covering both manual and automated workflows.

**Sections**:
- Automated release system overview
- Quick start guide
- Initial setup (NPM tokens, secrets)
- Release workflows (manual and automated)
- Version bump types
- Conventional commits
- Notifications
- Testing & validation
- Troubleshooting
- Advanced topics

**Audience**: All team members involved in releases

## Package Dependency Tiers

The automated release system respects package dependencies by releasing in tiers:

### Foundation Tier (no dependencies)
- `icons` - SVG assets
- `tokens` - Design tokens
- `utilities` - Utility functions
- `builder` - Element builder utilities
- `model` - Web component model utilities

### Core Tier (depends on foundation)
- `styles` - JSS objects and CSS utilities (→ tokens)
- `elements` - UI element builders (→ all foundation)
- `feeds` - Dynamic content feeds (→ all foundation)

### Primary Tier (depends on all)
- `components` - Web Components (→ all packages)

## Quick Start

### For Developers: Releasing Packages

```bash
# 1. Switch to release branch
git checkout release
git pull origin release

# 2. Bump version(s)
./.github/scripts/bump-version.sh patch components

# 3. Commit and push (triggers automated release)
git add packages/*/package.json
git commit -m "chore: release components v1.16.1"
git push origin release

# 4. Monitor Slack for notification
```

### For Admins: Testing the System

```bash
# 1. Run dry-run test workflow
# Go to: GitHub Actions > "Test Automated Release (Dry Run)" > Run workflow

# 2. Or test locally
node .github/scripts/detect-versions.js
```

### For Emergencies: Rolling Back

```bash
# Unpublish within 24 hours
./.github/scripts/rollback-release.sh components 1.16.0

# Deprecate after 24 hours
./.github/scripts/rollback-release.sh components 1.16.0 \
  --deprecate \
  --reason="Critical bug, use v1.16.1"
```

## Required Secrets

The automated release system requires these GitHub secrets:

- `PAT_TOKEN`: Personal access token with `repo` and `workflow` scopes
- `NPM_TOKEN`: NPM automation token with publish permissions
- `SLACK_WEBHOOK_URL`: Slack webhook for notifications

### Setting up PAT_TOKEN

The PAT must have these scopes to trigger workflow dispatches:
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token or edit existing token
3. Select scopes:
   - ✅ `repo` - Full control of private repositories
   - ✅ `workflow` - Update GitHub Action workflows
4. Copy the token and add it to repository secrets as `PAT_TOKEN`

## Branch Configuration

### Release Branch
The `release` branch is used for automated releases:

```bash
# Create release branch (first-time setup)
git checkout -b release
git push origin release
```

**Branch Protection** (recommended):
- Require pull request reviews
- Require status checks to pass
- Restrict who can push directly

## Monitoring

### GitHub Actions
View workflow runs:
```
https://github.com/umd-digital/design-system/actions
```

### Slack Notifications
All releases send notifications to your configured Slack channel with:
- ✅ Success notifications with package details
- ❌ Failure notifications with error messages
- 🔗 Links to NPM, releases, and workflow logs

### NPM Packages
Verify published packages:
```
https://www.npmjs.com/org/universityofmaryland
```

## Troubleshooting

### "HTTP 403: Resource not accessible by personal access token"
**Cause**: PAT_TOKEN doesn't have `workflow` scope
**Solution**: Regenerate PAT with both `repo` and `workflow` scopes (see "Required Secrets" section above)

### "No packages need releasing"
**Cause**: No version changes detected
**Solution**: Bump version in package.json

### "Tag already exists"
**Cause**: Previous release created tag but failed
**Solution**: Delete tag or bump to next version

### Workflow fails
**Cause**: Various (build error, test failure, network issue)
**Solution**: Check workflow logs, fix issue, re-trigger by pushing again

## Best Practices

1. **Always test first**: Use `auto-release-test.yml` before releasing
2. **Batch related changes**: Release multiple related packages together
3. **Use conventional commits**: Helps with release notes
4. **Monitor notifications**: Watch Slack after pushing to release
5. **Keep release branch updated**: Regularly merge from main

## Support

- **Documentation**: [AUTOMATED_RELEASE_GUIDE.md](./docs/AUTOMATED_RELEASE_GUIDE.md)
- **Issues**: Open GitHub issue with `[automated-release]` tag
- **Slack**: Post in design system channel
- **Team**: Contact Design System maintainers

---

**Last Updated**: December 2024
**Automation Version**: 1.0.0
