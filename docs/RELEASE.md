# Release Process

This document describes the automated release process for the UMD Design System monorepo.

## Overview

The design system uses **Lerna** with **independent versioning**, meaning each package maintains its own semantic version. Releases are automated through GitHub Actions with manual trigger control.

## Quick Start

1. Navigate to **Actions** tab in GitHub
2. Select **"Release Packages"** workflow
3. Click **"Run workflow"**
4. Choose version bump type and options
5. Click **"Run workflow"** button

The workflow will:
- ✅ Run all tests
- ✅ Build all packages in dependency order
- ✅ Update version badges
- ✅ Create git tags and GitHub releases
- ✅ Publish to NPM
- ✅ Push changes to repository

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

**Pre-release Identifiers:**
- `alpha` - Early testing, unstable
- `beta` - Feature complete, testing
- `rc` - Release candidate, final testing

## Workflow Options

### Version Bump (Required)
Select the type of version increment (see table above).

### Pre-release ID (Optional)
Only used for pre-release version types. Default: `beta`

**Examples:**
- `preminor` + `alpha` → `1.1.0-alpha.0`
- `prepatch` + `rc` → `1.0.1-rc.0`

### Dry Run (Optional)
When enabled:
- ✅ Runs tests and builds
- ✅ Shows what would be published
- ❌ Does NOT publish to NPM
- ❌ Does NOT create git tags
- ❌ Does NOT push changes

**Use for:** Testing the release process without publishing.

## Package Build Order

Packages are built in topological (dependency) order to ensure dependencies are built before dependents:

1. **icons** - No dependencies
2. **tokens** - No dependencies
3. **utilities** - Depends on tokens
4. **builder** - Depends on tokens
5. **model** - Depends on tokens (peer)
6. **styles** - Depends on tokens
7. **elements** - Depends on tokens, builder, utilities, styles (peer), icons (peer)
8. **feeds** - Depends on tokens, elements, utilities
9. **components** - Depends on all packages above

## Independent Versioning

Each package has its own version number:

```
icons@1.0.1
tokens@1.0.0
utilities@1.0.2
builder@1.0.0
model@1.0.0
styles@1.7.2
elements@1.5.4
feeds@1.2.4
components@1.16.0-beta.1
```

**Lerna determines which packages changed** based on git commits since last release. Only changed packages will be versioned and published.

## Conventional Commits

The workflow uses **conventional commits** to:
- Automatically determine version bumps
- Generate changelogs
- Create meaningful release notes

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
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Test additions or fixes
- `chore:` - Build/tooling changes

**Breaking Changes:** Add `BREAKING CHANGE:` in footer or `!` after type to trigger MAJOR bump.

### Examples

```bash
# Feature (minor bump)
git commit -m "feat(components): add dark mode support"

# Bug fix (patch bump)
git commit -m "fix(elements): correct button padding on mobile"

# Breaking change (major bump)
git commit -m "feat(styles)!: redesign color token structure

BREAKING CHANGE: Color token names have changed from color.red to color.brand.primary"

# Scoped to specific package
git commit -m "feat(feeds): add events feed pagination"
```

## NPM Dist Tags

Published packages are tagged based on release type:

| Release Type | NPM Tag | Install Command |
|--------------|---------|-----------------|
| Standard (patch/minor/major) | `latest` | `npm install @universityofmaryland/web-components-library` |
| Pre-release (alpha) | `alpha` | `npm install @universityofmaryland/web-components-library@alpha` |
| Pre-release (beta) | `beta` | `npm install @universityofmaryland/web-components-library@beta` |
| Pre-release (rc) | `rc` | `npm install @universityofmaryland/web-components-library@rc` |

**Note:** `latest` tag is only used for stable releases (patch/minor/major).

## Prerequisites

### NPM Token

The workflow requires an NPM authentication token stored as a GitHub Secret.

**Setup:**
1. Generate NPM token at https://www.npmjs.com/settings/tokens
2. Use **Granular Access Token** (not Classic)
3. Set permissions:
   - Packages and scopes: `Read and write`
   - Organizations: `@universityofmaryland`
4. Set expiration (recommended: 1 year)
5. Add to GitHub Secrets as `NPM_TOKEN`

### Branch Protection

The workflow requires write access to the repository. Configure branch protection to allow GitHub Actions bot:

**Settings → Branches → Branch protection rules:**
- ✅ Allow force pushes: Specify GitHub Actions
- ✅ Do not include administrators (for testing)

## Release Checklist

Before triggering a release:

- [ ] All changes committed and pushed to main
- [ ] CI tests passing
- [ ] CHANGELOG.md updated (if manual entries needed)
- [ ] Breaking changes documented
- [ ] NPM token is valid and not expired
- [ ] Decide on version bump type (patch/minor/major)
- [ ] For pre-releases, choose identifier (alpha/beta/rc)

## Testing the Workflow

### Local Testing

Test version bumping locally:

```bash
# See which packages changed
npm run version:check

# Dry-run version bump (no git tags, no push)
npm run version:dry-run

# Test badge update
npm run update-badges -- --dry-run
```

### Workflow Dry Run

Use the **dry run option** in GitHub Actions:

1. Run workflow with **Dry Run** = `true`
2. Review workflow output
3. Verify packages that would be published
4. Confirm no changes pushed to repo
5. If satisfied, run again with **Dry Run** = `false`

## Rollback Strategy

NPM publishes are permanent after 24 hours. If a bad release is published:

### Immediate Rollback (Within 24 hours)

```bash
# Unpublish the version (only works within 24 hours)
npm unpublish @universityofmaryland/web-components-library@1.16.0
```

### Long-term Rollback

```bash
# Deprecate the bad version
npm deprecate @universityofmaryland/web-components-library@1.16.0 "This version has issues. Please use 1.16.1"

# Publish a patch fix
# Then run release workflow with 'patch' to publish 1.16.1
```

### Emergency Hotfix

For critical fixes that can't wait for normal process:

1. Create hotfix branch
2. Make fix and commit
3. Run release workflow from hotfix branch
4. Merge hotfix back to main

## Troubleshooting

### "No changed packages to publish"

**Cause:** No commits since last release that affect any packages.

**Solution:** Make changes or use `--force-publish` flag (manual).

### "Authentication failed"

**Cause:** NPM token expired or invalid.

**Solution:**
1. Generate new NPM token
2. Update `NPM_TOKEN` secret in GitHub
3. Re-run workflow

### "Build failed"

**Cause:** Tests or builds failing.

**Solution:**
1. Review workflow logs
2. Fix failing tests/builds locally
3. Commit and push fixes
4. Re-run workflow

### "Version conflict"

**Cause:** Version tag already exists.

**Solution:**
1. Check if release already published
2. If duplicate tag, delete tag: `git tag -d package-name@version`
3. Push deletion: `git push origin :refs/tags/package-name@version`
4. Re-run workflow

## Monitoring Releases

### GitHub Releases

All releases create GitHub releases with:
- Changelog
- List of commits
- Download links for source code

**View:** `https://github.com/umd-digital/design-system/releases`

### NPM Registry

Published packages appear on NPM:

**View:** `https://www.npmjs.com/package/@universityofmaryland/web-components-library`

### Workflow Runs

Monitor workflow progress:

**View:** `Actions` tab → `Release Packages` → Select run

## Advanced Usage

### Release Specific Packages

To release only specific packages (not recommended, but possible):

```bash
# Manually with Lerna
npx lerna publish --scope=@universityofmaryland/web-components-library
```

### Custom Version Numbers

To set specific version numbers (not recommended):

```bash
# Set specific version
npx lerna version 2.0.0 --no-push
```

## Next Steps

Future enhancements planned:

- **Phase 3:** Automated changelog generation improvements
- **Phase 4:** Pre-release workflows (alpha/beta channels)
- **Phase 5:** Package-specific release workflows
- **Phase 6:** Slack/Discord notifications
- **Phase 7:** Visual regression testing (Percy)

## Support

For issues or questions:

- Create issue: https://github.com/umd-digital/design-system/issues
- Contact: Design System team

---

**Last Updated:** 2025-12-06
**Workflow Version:** 1.0.0
