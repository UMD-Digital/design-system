# UMD Design System - Release Management Guide

**Internal Documentation for Release Automation**

This guide covers the complete release process for the UMD Design System monorepo, including setup, standard workflows, and advanced features.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Initial Setup](#initial-setup)
- [Release Workflows](#release-workflows)
  - [Standard Release](#standard-release)
  - [Pre-release](#pre-release)
  - [Package-Specific Release](#package-specific-release)
- [Version Bump Types](#version-bump-types)
- [Conventional Commits](#conventional-commits)
- [Notifications](#notifications)
- [Testing & Validation](#testing--validation)
- [Troubleshooting](#troubleshooting)
- [Advanced Topics](#advanced-topics)

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

## Support

**Issues:**
- Workflow problems: Label `workflow`
- Notification issues: Label `notifications`
- Documentation: Label `docs`

**Resources:**
- Validation Report: `.github/VALIDATION_REPORT.md`
- Release Template: `.github/RELEASE_TEMPLATE.md`
- NPM Organization: https://www.npmjs.com/org/universityofmaryland
- GitHub Releases: https://github.com/umd-digital/design-system/releases

---

**Document Version:** 2.0.0
**Last Updated:** 2025-12-06
**Covers:** Phases 1-4 of Release Automation
