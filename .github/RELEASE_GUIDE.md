# UMD Design System - Release Management Guide

**Internal Documentation for Release Automation**

This guide covers the complete release process for the UMD Design System monorepo, including setup, standard workflows, and advanced features.

---

## Table of Contents

- [Directory Structure](#directory-structure)
- [Package Dependency Tiers](#package-dependency-tiers)
- [Automated Release System](#automated-release-system)
- [Quick Start](#quick-start)
- [Initial Setup](#initial-setup)
- [Release Workflows](#release-workflows)
  - [Standard Release](#standard-release)
  - [Pre-release](#pre-release)
  - [Package-Specific Release](#package-specific-release)
  - [Automated Release (Push-Based)](#automated-release-push-based)
- [Version Bump Types](#version-bump-types)
- [Conventional Commits](#conventional-commits)
- [Notifications](#notifications)
- [Testing & Validation](#testing--validation)
- [Troubleshooting](#troubleshooting)
- [Advanced Topics](#advanced-topics)
- [Monitoring](#monitoring)
- [Best Practices](#best-practices)

---

## Directory Structure

This section provides an overview of the `.github` directory structure and related automation files.

### .github/ Directory

```
.github/
├── workflows/                            # GitHub Actions workflows
│   ├── auto-release.yml                  # Automated package release
│   ├── release-package.yml               # Single package release (manual/automated)
│   ├── release-notification.yml          # Slack notifications
│   ├── release.yml                       # Manual bulk release
│   └── docs.yml                          # Documentation generation
│
├── RELEASE_GUIDE.md                      # This file - comprehensive release documentation
├── RELEASE_TEMPLATE.md                   # GitHub release template
└── VALIDATION_REPORT.md                  # NPM setup validation
```

### Related Scripts

Automation scripts are located in `/scripts` directory at the repository root:

- **`detect-versions.js`** - Version detection (compares package.json vs NPM)
- **`trigger-releases.sh`** - Release orchestration via GitHub CLI
- **`bump-version.sh`** - Version bump helper

See `/scripts/README.md` for detailed script documentation.

### Workflow Overview

#### `auto-release.yml` - Main Automated Release Workflow
**Trigger**: Push to `npm-release` branch
**Purpose**: Automatically detects and publishes packages with version changes

**Key Features**:
- Automatic version detection
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

#### `release-package.yml` - Single Package Release
**Trigger**: Manual (workflow_dispatch) OR workflow_call (automated)
**Purpose**: Release a single package

**Features**:
- Manual or automated triggering
- Auto-detects pre-release versions
- Outputs for automation integration
- Dependency-aware builds

#### `release-notification.yml` - Slack Notifications
**Trigger**: workflow_call (from other workflows)
**Purpose**: Send Slack notifications for releases

Works with both manual and automated workflows.

#### `release.yml` - Bulk Package Release
**Trigger**: Manual (workflow_dispatch)
**Purpose**: Release all packages with changes using Lerna

Retained for emergency bulk releases.

---

## Package Dependency Tiers

The automated release system respects package dependencies by releasing in tiers:

### Foundation Tier (no dependencies)
- `icons` - SVG assets
- `tokens` - Design tokens
- `utilities` - Utility functions
- `builder` - Element builder utilities
- `model` - Web component model utilities

**Release Strategy**: Parallel (all at once)

### Core Tier (depends on foundation)
- `styles` - JSS objects and CSS utilities (→ tokens)
- `elements` - UI element builders (→ all foundation)
- `feeds` - Dynamic content feeds (→ all foundation)

**Release Strategy**: Parallel (all at once, after foundation tier completes)

### Primary Tier (depends on all)
- `components` - Web Components (→ all packages)

**Release Strategy**: Sequential (after core tier completes)

**Why Tiers?**
- Ensures dependencies are published before dependents
- Enables parallel releases for speed
- Prevents NPM resolution errors
- Maintains package integrity

---

## Automated Release System

The UMD Design System includes an **automated release workflow** that detects version changes and publishes packages automatically when code is pushed to the `npm-release` branch.

### How It Works

```
Push to release branch
         ↓
Version Detection (scripts/detect-versions.js)
  • Compares package.json versions with NPM registry
  • Identifies which packages need releasing
         ↓
Tiered Release Process
  • Foundation Tier (parallel): icons, tokens, utilities, builder, model
  • Core Tier (parallel): styles, elements, feeds
  • Primary Tier (sequential): components
         ↓
Slack Notification
```

### Key Features

- **Automatic Detection**: No manual workflow triggering - just bump versions and push
- **Dependency-Aware**: Releases packages in the correct order based on dependencies
- **Parallel Releases**: Packages within each tier release simultaneously for speed
- **Safety Built-In**:
  - Version downgrade protection
  - Tag existence checking
  - Pre-release support (alpha, beta, rc)
  - Network retry logic
- **Helper Scripts**: Use `scripts/bump-version.sh` to easily bump package versions

### Quick Start (Automated)

```bash
# 1. Switch to npm-release branch
git checkout npm-release
git pull origin npm-release

# 2. Bump version(s) using helper script
./scripts/bump-version.sh patch components

# Or manually edit package.json
# vim packages/components/package.json

# 3. Commit and push (triggers automated release)
git add packages/components/package.json
git commit -m "chore: release components v1.16.1"
git push origin npm-release

# 4. Monitor Slack for success notification
```

### Helper Scripts

**Version Bumping (`scripts/bump-version.sh`)**:
```bash
# Single package
./scripts/bump-version.sh patch components

# Multiple packages
./scripts/bump-version.sh minor components elements feeds

# All packages
./scripts/bump-version.sh patch all

# Pre-release
./scripts/bump-version.sh prerelease --preid=beta components

# Dry-run (see what would happen)
./scripts/bump-version.sh patch components --dry-run
```

**Version Detection (`scripts/detect-versions.js`)**:
```bash
# Check which packages need releasing
node scripts/detect-versions.js
```

### When to Use Automated vs Manual

**Use Automated Release** (Push to `npm-release` branch):
- Regular release cycles
- Multiple packages with version bumps
- Coordinated releases across tiers
- Pre-releases with proper versioning

**Use Manual Workflow** (GitHub Actions UI):
- Emergency hotfixes
- Testing the release process
- When you need explicit control over version bumps
- First-time releases or testing

### Branch Setup

The `npm-release` branch must exist for automated releases:

```bash
# Create npm-release branch (one-time setup)
git checkout -b npm-release
git push origin npm-release
```

**Note:** This branch is separate from the `/release/*` branches used for version-specific releases.

**Recommended Branch Protection**:
- Require pull request reviews
- Require status checks to pass
- Restrict direct pushes to senior developers

---

## Quick Start

**Prerequisites:** NPM token configured in GitHub Secrets (see [Initial Setup](#initial-setup))

### Release All Changed Packages

1. Go to **Actions** tab → **"Release Packages"**
2. Click **"Run workflow"**
3. Select:
   - **Version Bump**: `patch` (or `minor`/`major`)
   - **Dry Run**: `true` (for first test)
4. Click **"Run workflow"**
5. Review results
6. Run again with **Dry Run** = `false` to publish

### Release One Package (Hotfix)

1. Go to **Actions** tab → **"Release Specific Package"**
2. Select the package and version bump
3. Test with dry-run first
4. Run for real to publish

---

## Initial Setup

### Required: NPM Token

The release workflow needs an NPM authentication token to publish packages.

#### 1. Generate NPM Token

1. Log in to [npmjs.com](https://www.npmjs.com)
2. Navigate to **Profile** → **Access Tokens**
3. Click **"Generate New Token"**
4. Select **"Granular Access Token"** (recommended)

#### 2. Configure Token Permissions

**Token Settings:**
- **Token Name**: `UMD Design System GitHub Actions`
- **Expiration**: 1 year
- **Packages and scopes**:
  - Select: `@universityofmaryland/*`
  - Permissions: **Read and write**
- **Organizations**: `@universityofmaryland`

⚠️ **Set calendar reminder** to rotate token before expiration

#### 3. Add to GitHub Secrets

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Name: `NPM_TOKEN`
4. Value: Paste the NPM token
5. Click **"Add secret"**

#### 4. Verify Token

Test token has correct permissions:

```bash
# Create temporary .npmrc (don't commit!)
echo "//registry.npmjs.org/:_authToken=YOUR_TOKEN" > .npmrc

# Test authentication
npm whoami

# Test viewing published packages
npm view @universityofmaryland/web-components-library version

# Test publish permissions (from package directory)
cd packages/components && npm publish --dry-run

# Or test with Lerna from root
npx lerna publish from-package --dry-run

# Remove test file
rm .npmrc
```

**Note:** `npm access ls-packages` only works if you're an organization member on npmjs.com. As a package collaborator, you can publish but won't have org-level access.

### Required: GitHub Personal Access Token (PAT)

The automated release workflow needs a Personal Access Token to trigger workflow dispatches.

#### 1. Generate Personal Access Token

1. Go to GitHub **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Click **"Generate new token (classic)"**
3. **Note**: `UMD Design System Automated Releases`
4. **Expiration**: 90 days (or as per your org policy)
5. **Select scopes**:
   - ✅ `repo` - Full control of private repositories
   - ✅ `workflow` - Update GitHub Action workflows
6. Click **"Generate token"** and copy it immediately

⚠️ **Important**: The `workflow` scope is required to trigger workflow dispatch events

#### 2. Add to GitHub Secrets

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Name: `PAT_TOKEN`
4. Value: Paste the personal access token
5. Click **"Add secret"**

⚠️ **Set calendar reminder** to rotate token before expiration

### Optional: Branch Protection

If your main branch has protection rules:

**Settings → Branches → Branch protection rules:**
1. Select `main` branch rule
2. Under **"Allow force pushes"**:
   - Enable toggle
   - Add: `github-actions[bot]`
3. OR: Configure deploy key (see Security Best Practices)

### Optional: Notifications

Configure Slack and/or Discord for release notifications.

#### Slack Setup

1. Go to Slack workspace → **Apps** → **Incoming Webhooks**
2. Click **"Add to Slack"**
3. Select channel (e.g., `#releases`)
4. Copy Webhook URL
5. Add to GitHub Secrets:
   - Name: `SLACK_WEBHOOK_URL`
   - Value: Webhook URL

#### Discord Setup

1. Go to Discord server → Select text channel
2. **Edit Channel** → **Integrations** → **Webhooks**
3. Click **"New Webhook"**
4. Name it (e.g., "GitHub Releases")
5. Copy Webhook URL
6. Add to GitHub Secrets:
   - Name: `DISCORD_WEBHOOK_URL`
   - Value: Webhook URL

---

## Release Workflows

### Standard Release

Release all packages that have changed since the last release.

**Workflow:** "Release Packages"

**When to Use:**
- Regular release schedule
- Multiple packages changed
- Coordinated releases

**Steps:**
1. Ensure all changes are committed and pushed
2. Go to **Actions** → **"Release Packages"**
3. Click **"Run workflow"**
4. Configure:
   - **Version Bump**: Select type (patch/minor/major)
   - **Dry Run**: `true` (first time)
5. Review workflow output
6. Run again with **Dry Run** = `false`

**The workflow will:**
- ✅ Run all tests
- ✅ Build all packages in dependency order
- ✅ Update version badges
- ✅ Create git tags
- ✅ Generate changelogs
- ✅ Publish to NPM
- ✅ Create GitHub releases
- ✅ Send notifications (if configured)

### Pre-release

Create alpha, beta, or rc releases for testing.

**When to Use:**
- Testing new features
- Beta program
- Release candidates

**Steps:**
1. Go to **Actions** → **"Release Packages"**
2. Configure:
   - **Version Bump**: `preminor` (or `prepatch`/`premajor`)
   - **Pre-release ID**: `beta` (or `alpha`/`rc`)
   - **Dry Run**: Test first
3. Run workflow

**NPM Dist Tags:**
- `latest` - Stable releases (default)
- `beta` - Beta pre-releases
- `alpha` - Alpha pre-releases
- `rc` - Release candidates

**Installation:**
```bash
# Install beta
npm install @universityofmaryland/web-components-library@beta

# Install specific version
npm install @universityofmaryland/web-components-library@1.16.0-beta.1
```

### Package-Specific Release

Release a single package without affecting others.

**Workflow:** "Release Specific Package"

**When to Use:**
- Critical hotfix needed
- Independent package update
- Testing release process
- One package has significant changes

**Steps:**
1. Go to **Actions** → **"Release Specific Package"**
2. Configure:
   - **Package**: Select package name
   - **Version Bump**: Select type
   - **Dry Run**: Test first
3. Run workflow

**Automatic Dependency Handling:**

The workflow automatically builds dependencies in correct order:

```
Package Selected → Dependencies Built

icons          → (none)
tokens         → (none)
utilities      → tokens
builder        → tokens
model          → tokens
styles         → tokens
elements       → tokens, utilities, builder, styles, icons
feeds          → tokens, utilities, builder, styles, icons, elements
components     → ALL (tokens, utilities, builder, model, styles, icons, elements, feeds)
```

### Automated Release (Push-Based)

Automatically release packages by pushing version changes to the `npm-release` branch.

**Workflow:** "Automated Package Release"

**When to Use:**
- Regular release schedule
- Multiple coordinated package releases
- Pre-releases with proper version tags
- When you want CI/CD automation

**How It Works:**

1. **Version Detection**: Compares package.json versions against NPM registry
2. **Tiered Releases**: Releases packages in dependency order
   - Foundation tier (parallel): `icons`, `tokens`, `utilities`, `builder`, `model`
   - Core tier (parallel): `styles`, `elements`, `feeds`
   - Primary tier: `components`
3. **Notifications**: Slack alert with results

**Steps:**

```bash
# 1. Switch to npm-release branch
git checkout npm-release
git pull origin npm-release

# 2. Bump version(s)
./scripts/bump-version.sh patch components elements

# 3. Review changes
git diff packages/*/package.json

# 4. Commit and push (triggers automation)
git add packages/*/package.json
git commit -m "chore: release components v1.16.1 and elements v1.5.5"
git push origin npm-release

# 5. Monitor workflow in GitHub Actions
# 6. Verify Slack notification
```

**Features:**
- ✅ Automatic version detection
- ✅ Dependency-aware ordering
- ✅ Version downgrade protection
- ✅ Pre-release support (alpha, beta, rc)
- ✅ Parallel releases within tiers
- ✅ Slack notifications

**Safety Mechanisms:**
- Only one automated release runs at a time (concurrency control)
- Versions are validated before release
- Git tags are checked for existence
- Network failures trigger automatic retries

---

## Version Bump Types

### Standard Releases

| Type | Use Case | Example |
|------|----------|---------|
| **patch** | Bug fixes, minor updates | 1.0.0 → 1.0.1 |
| **minor** | New features, backwards compatible | 1.0.0 → 1.1.0 |
| **major** | Breaking changes | 1.0.0 → 2.0.0 |

### Pre-releases

| Type | Use Case | Example |
|------|----------|---------|
| **prepatch** | Pre-release patch | 1.0.0 → 1.0.1-beta.0 |
| **preminor** | Pre-release minor | 1.0.0 → 1.1.0-beta.0 |
| **premajor** | Pre-release major | 1.0.0 → 2.0.0-beta.0 |
| **prerelease** | Increment pre-release | 1.0.1-beta.0 → 1.0.1-beta.1 |

---

## Conventional Commits

The workflow uses **conventional commits** for:
- Automatic version bump determination
- Changelog generation
- Release notes

### Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat:` - New feature (triggers MINOR bump)
- `fix:` - Bug fix (triggers PATCH bump)
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Test changes
- `chore:` - Build/tooling changes

### Breaking Changes

Add `BREAKING CHANGE:` in footer or `!` after type to trigger MAJOR bump:

```bash
# Breaking change (major bump)
git commit -m "feat(styles)!: redesign color token structure

BREAKING CHANGE: Color token names changed from color.red to color.brand.primary"
```

### Examples

```bash
# Feature (minor bump)
git commit -m "feat(components): add dark mode support"

# Bug fix (patch bump)
git commit -m "fix(elements): correct button padding on mobile"

# Scoped to specific package
git commit -m "feat(feeds): add events feed pagination"
```

---

## Notifications

Automated notifications sent to Slack and/or Discord for release events.

### Notification Types

**1. Release Started** 🚀
- Triggered when workflow begins
- Shows who triggered it
- Links to workflow run

**2. Release Success** ✅
- Lists all packages published
- Links to NPM and GitHub releases
- Shows workflow details

**3. Release Failure** ❌
- Error message and details
- Link to workflow logs
- Enables quick debugging

### When Notifications Are Sent

✅ **Sent for:**
- All successful releases
- All failed releases
- Release start (if configured)

❌ **Skipped for:**
- Dry-run releases
- When webhook not configured

### Message Format

**Slack:**
```
✅ UMD Design System Release Success

Version Bump: minor
Packages Published:
- @universityofmaryland/web-components-library
- @universityofmaryland/web-elements-library

View on NPM | View Releases
```

**Discord:**
- Rich embeds with color coding
- Clickable links
- Error details for failures

---

## Testing & Validation

### Local Testing

Test version bumping and badge updates locally:

```bash
# See which packages changed
npm run version:check

# Dry-run version bump (no git tags, no push)
npm run version:dry-run

# Test badge update
npm run update-badges -- --dry-run
```

### Workflow Testing with Act

[Act](https://github.com/nektos/act) allows local GitHub Actions testing:

#### Installation

```bash
# macOS
brew install act

# Linux/WSL
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

#### Running Locally

```bash
# Test workflow (dry-run mode)
act workflow_dispatch \
  --input version_bump=patch \
  --input dry_run=true \
  --secret NPM_TOKEN=test_token

# View workflow graph
act workflow_dispatch --graph
```

**⚠️ Act Limitations:**
- May not perfectly match GitHub environment
- Some actions behave differently
- Use for smoke testing, not full validation

### Workflow Dry Run

Use GitHub Actions dry-run mode:

1. Run workflow with **Dry Run** = `true`
2. Review output
3. Verify packages selected
4. Confirm no changes pushed
5. Run with **Dry Run** = `false` to publish

---

## Troubleshooting

### "No changed packages to publish"

**Cause:** No commits since last release that affect packages

**Solution:**
- Make changes and commit
- Or verify commits follow conventional format
- Check ignore patterns aren't excluding changes

### "Authentication failed"

**Cause:** NPM token expired or invalid

**Solution:**
1. Generate new NPM token
2. Update `NPM_TOKEN` secret in GitHub
3. Re-run workflow

### "HTTP 403: Resource not accessible by personal access token"

**Cause:** `PAT_TOKEN` missing `workflow` scope (automated releases only)

**Solution:**
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Edit or regenerate token with both scopes:
   - ✅ `repo` - Full control of private repositories
   - ✅ `workflow` - Update GitHub Action workflows
3. Update `PAT_TOKEN` secret in repository settings
4. Re-trigger release by pushing again to `npm-release` branch

**Why this happens:** The automated release workflow uses GitHub CLI to trigger `release-package.yml` workflows. This requires the `workflow` scope in addition to `repo`.

### "Build failed"

**Cause:** Tests or builds failing

**Solution:**
1. Review workflow logs
2. Fix issues locally:
   ```bash
   npm run test:all
   npm run build
   ```
3. Commit fixes and push
4. Re-run workflow

### "Version conflict"

**Cause:** Version tag already exists

**Solution:**
1. Check if release already published
2. If duplicate tag:
   ```bash
   git tag -d package-name@version
   git push origin :refs/tags/package-name@version
   ```
3. Re-run workflow

### Notifications not received

**Cause:** Webhook configuration issue

**Solution:**
1. Verify webhook URL in GitHub Secrets
2. Check webhook active in Slack/Discord
3. Test webhook manually:
   ```bash
   curl -X POST -H 'Content-Type: application/json' \
     -d '{"text":"Test"}' YOUR_WEBHOOK_URL
   ```
4. Review workflow logs for errors

### Package-specific release dependency errors

**Cause:** Dependencies not built in correct order

**Solution:**
1. Check dependency tree
2. Verify all dependencies published
3. Run local build first:
   ```bash
   npx lerna run build --scope=@universityofmaryland/web-PACKAGE-library
   ```

---

## Advanced Topics

### Rollback Strategy

NPM publishes are permanent after 24 hours.

#### Immediate Rollback (< 24 hours)

```bash
npm unpublish @universityofmaryland/web-components-library@1.16.0
```

#### Long-term Rollback

```bash
# Deprecate bad version
npm deprecate @universityofmaryland/web-components-library@1.16.0 \
  "This version has issues. Please use 1.16.1"

# Publish patch fix
# Run release workflow with 'patch'
```

#### Emergency Hotfix

1. Create hotfix branch
2. Make fix and commit
3. Run package-specific release workflow
4. Merge hotfix to main

### Release Template

Use `.github/RELEASE_TEMPLATE.md` for consistent release notes.

**When creating GitHub releases:**
1. Copy template content
2. Fill in sections:
   - Summary
   - Breaking Changes (if any)
   - New Features
   - Bug Fixes
   - Package Versions
3. Delete unused sections
4. Publish release

### Independent Versioning

Each package has its own version:

```
icons@1.0.1
tokens@1.0.0
utilities@1.0.2
...
components@1.16.0-beta.1
```

**Lerna determines** which packages changed based on git commits.

**Only changed packages** are versioned and published.

### Build Order

Packages build in dependency (topological) order:

1. **icons, tokens** (no dependencies)
2. **utilities, builder, model** (depend on tokens)
3. **styles** (depends on tokens)
4. **elements** (depends on tokens, utilities, builder, styles, icons)
5. **feeds** (depends on elements + dependencies)
6. **components** (depends on all)

### Security Best Practices

**NPM Token:**
- ✅ Use Granular Access Tokens (not Classic)
- ✅ Scope to specific organization
- ✅ Set expiration (1 year recommended)
- ✅ Use minimum permissions (Read + Write only)
- ❌ Never commit tokens
- ❌ Never use admin permissions

**Token Rotation:**
1. Generate new token before expiration
2. Update GitHub Secret
3. Test with dry-run
4. Revoke old token

**GitHub Secrets:**
- Encrypted at rest
- Masked in logs
- Only accessible during workflow runs
- Not exposed in fork PRs

---

## Workflow Reference

### Release Packages Workflow

**File:** `.github/workflows/release.yml`

**Trigger:** Manual (`workflow_dispatch`)

**Inputs:**
- `version_bump`: patch/minor/major/pre*
- `preid`: alpha/beta/rc (for pre-releases)
- `dry_run`: true/false

**Jobs:**
1. `release`: Main release process
2. `notify`: Send notifications

**Steps:**
1. Checkout code
2. Configure git
3. Setup Node.js
4. Install dependencies
5. Generate mocks
6. Run tests
7. Build packages (dependency order)
8. Update badges
9. Version packages
10. Publish to NPM
11. Push changes
12. Create summary

### Release Specific Package Workflow

**File:** `.github/workflows/release-package.yml`

**Trigger:** Manual

**Inputs:**
- `package`: Package selection (dropdown)
- `version_bump`: Version type
- `preid`: Pre-release ID
- `dry_run`: Test mode

**Dependency Intelligence:**
- Automatically builds required dependencies
- Respects topological order
- Optimized for each package

### Release Notifications Workflow

**File:** `.github/workflows/release-notification.yml`

**Type:** Reusable workflow

**Inputs:**
- `status`: started/success/failure
- `version_bump`: Version type
- `packages_changed`: Package list
- `error_message`: Error details

**Secrets:**
- `SLACK_WEBHOOK_URL` (optional)
- `DISCORD_WEBHOOK_URL` (optional)

---

## Monitoring

Track releases and verify successful deployments across multiple platforms.

### GitHub Actions

View workflow runs and status:
```
https://github.com/umd-digital/design-system/actions
```

**What to Monitor**:
- ✅ Workflow completion status
- ⏱️ Build and test duration
- 📦 Packages published
- 🏷️ Git tags created
- 📝 Release notes generated

### Slack Notifications

All releases send notifications to your configured Slack channel with:
- ✅ Success notifications with package details
- ❌ Failure notifications with error messages
- 🔗 Links to NPM, releases, and workflow logs

**Notification Content**:
- Package names and versions
- NPM package links
- GitHub release links
- Workflow run links
- Error details (on failure)

### NPM Packages

Verify published packages:
```
https://www.npmjs.com/org/universityofmaryland
```

**What to Verify**:
- Package version matches expected
- Published timestamp is recent
- README displays correctly
- Package size is reasonable
- Dependencies are correct

### GitHub Releases

Check release notes and tags:
```
https://github.com/umd-digital/design-system/releases
```

**What to Check**:
- Release created with correct tag
- Release notes are accurate
- Assets are attached (if applicable)
- Release marked as pre-release (if applicable)

---

## Best Practices

Follow these best practices to ensure smooth and reliable releases.

### 1. Always Test First
Use the dry-run mode or test workflow before publishing:
```bash
# Test automated release locally
node scripts/detect-versions.js

# Or use GitHub Actions dry-run
# Set "Dry Run" = true in workflow UI
```

### 2. Batch Related Changes
Release multiple related packages together:
```bash
# Good: Related changes together
./scripts/bump-version.sh patch elements feeds components

# Avoid: Frequent small releases
./scripts/bump-version.sh patch elements
# ... later ...
./scripts/bump-version.sh patch feeds
```

### 3. Use Conventional Commits
Helps with automatic changelog generation:
```bash
# Good: Clear, conventional format
git commit -m "feat(elements): add new text lockup variant"
git commit -m "fix(components): resolve button focus state issue"

# Avoid: Vague messages
git commit -m "updates"
git commit -m "fix stuff"
```

### 4. Monitor Notifications
Watch Slack after pushing to release branch:
- Verify success notification received
- Check NPM links work
- Confirm correct versions published
- Review any warnings or errors

### 5. Keep Release Branch Updated
Regularly merge from main to avoid conflicts:
```bash
git checkout npm-release
git pull origin npm-release
git merge origin/main
git push origin npm-release
```

### 6. Document Breaking Changes
Use `BREAKING CHANGE:` in commits for major version bumps:
```bash
git commit -m "feat(tokens)!: redesign color token structure

BREAKING CHANGE: Color token names changed from color.red to color.brand.primary"
```

### 7. Test Pre-releases First
For major changes, publish pre-releases:
```bash
# Beta release for testing
./scripts/bump-version.sh prerelease --preid=beta components

# Then stable release
./scripts/bump-version.sh patch components
```

### 8. Verify Dependencies
Before releasing, ensure dependencies are up-to-date:
```bash
# Check for outdated dependencies
npm outdated

# Update if needed
npm update
```

### 9. Review Workflow Logs
Check logs even for successful releases:
- Look for warnings
- Verify all tests passed
- Check build output
- Confirm correct packages published

### 10. Coordinate with Team
Communicate releases to team:
- Post in team channel before major releases
- Document breaking changes
- Update migration guides
- Schedule releases during low-traffic times

---

## Support

**Issues:**
- Workflow problems: Label `workflow`
- Notification issues: Label `notifications`
- Documentation: Label `docs`

**Resources:**
- Validation Report: `.github/VALIDATION_REPORT.md`
- Release Template: `.github/RELEASE_TEMPLATE.md`
- Scripts Documentation: `/scripts/README.md`
- NPM Organization: https://www.npmjs.com/org/universityofmaryland
- GitHub Releases: https://github.com/umd-digital/design-system/releases
- GitHub Actions: https://github.com/umd-digital/design-system/actions

**Need Help?**
- Post in design system Slack channel
- Open GitHub issue with `[automated-release]` tag
- Contact Design System maintainers

---

**Document Version:** 2.1.0
**Last Updated:** 2025-12-10
**Covers:** Phases 1-4 of Release Automation + Directory Structure
