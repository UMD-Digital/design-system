# Release Automation Setup Guide

This guide walks through the one-time setup required to enable automated releases for the UMD Design System.

## Required: NPM Token Setup

The release workflow needs an NPM token to publish packages. Follow these steps:

### 1. Generate NPM Token

1. Log in to npmjs.com
2. Navigate to your profile → **Access Tokens**
3. Click **"Generate New Token"**
4. Select **"Granular Access Token"** (recommended)

### 2. Configure Token Permissions

**Token Settings:**
- **Token Name:** `UMD Design System GitHub Actions`
- **Expiration:** 1 year (set calendar reminder to renew)
- **Packages and scopes:**
  - Select **"Only select packages and scopes"**
  - Choose: `@universityofmaryland/*`
  - Permissions: **Read and write**
- **Organizations:**
  - Select: `@universityofmaryland`

### 3. Copy Token

After generation, **copy the token immediately** (it won't be shown again).

### 4. Add to GitHub Secrets

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Name: `NPM_TOKEN`
4. Value: Paste the NPM token
5. Click **"Add secret"**

### 5. Verify Access

Test the token has correct permissions:

```bash
# Create .npmrc with token (don't commit this!)
echo "//registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE" > .npmrc

# Test access
npm whoami
# Should show your NPM username

# Test package access
npm access ls-packages @universityofmaryland
# Should list all packages

# Remove test file
rm .npmrc
```

## Optional: Branch Protection Configuration

If your repository has branch protection rules that prevent GitHub Actions from pushing:

### 1. Allow GitHub Actions Bot

**Settings → Branches → Branch protection rules:**

1. Select `main` branch rule (or create one)
2. Under **"Allow force pushes"**:
   - Enable the toggle
   - Select **"Specify who can force push"**
   - Add: `github-actions[bot]`
3. Under **"Restrict who can push to matching branches"** (if enabled):
   - Add: `github-actions[bot]`

### 2. Alternative: Deploy Key

For more secure setup, use a deploy key instead:

1. Generate SSH key pair:
   ```bash
   ssh-keygen -t ed25519 -C "github-actions@design-system"
   ```
2. Add public key to repository deploy keys with write access
3. Add private key to GitHub Secrets as `DEPLOY_KEY`
4. Update workflow to use deploy key instead of `GITHUB_TOKEN`

## Verification

### Test the Workflow

1. Make a small change to any package
2. Commit with conventional commit format:
   ```bash
   git commit -m "test: verify release workflow"
   ```
3. Push to main
4. Go to **Actions** tab
5. Manually trigger **"Release Packages"** workflow
6. Select **dry_run = true**
7. Verify workflow completes successfully

### Expected Output

✅ Tests pass
✅ Builds complete
✅ Badges update
✅ Workflow shows which packages would be published
✅ NO actual publish (dry run)
✅ NO tags created (dry run)
✅ NO pushes to repo (dry run)

## Security Best Practices

### NPM Token Security

- ✅ Use **Granular Access Tokens** (not Classic)
- ✅ Scope to specific organization (`@universityofmaryland`)
- ✅ Set expiration date (recommended: 1 year)
- ✅ Set calendar reminder to rotate token before expiration
- ✅ Use minimum required permissions (Read and Write only)
- ❌ Never commit tokens to repository
- ❌ Never share tokens via chat/email
- ❌ Never use tokens with admin permissions

### Token Rotation

When token expires or needs rotation:

1. Generate new token (follow steps above)
2. Update `NPM_TOKEN` secret in GitHub
3. Test with dry-run workflow
4. Revoke old token in NPM

### Secret Access

GitHub Secrets are:
- ✅ Encrypted at rest
- ✅ Masked in workflow logs
- ✅ Only accessible during workflow runs
- ✅ Not exposed in pull requests from forks

## Troubleshooting Setup

### "Authentication Failed" Error

**Symptoms:** Workflow fails with NPM authentication error

**Solutions:**
1. Verify `NPM_TOKEN` secret exists in GitHub
2. Check token hasn't expired
3. Verify token permissions include `@universityofmaryland` scope
4. Regenerate token if needed

### "Permission Denied" on Git Push

**Symptoms:** Workflow fails when pushing tags/commits

**Solutions:**
1. Verify branch protection allows GitHub Actions bot
2. Check workflow has `contents: write` permission
3. Consider using deploy key for more granular control

### "Package Already Published" Error

**Symptoms:** Workflow tries to publish existing version

**Solutions:**
1. This shouldn't happen with automated workflow
2. Verify version tags are in sync with NPM
3. Check if manual publish happened outside workflow

## Post-Setup

After successful setup:

1. **Document:** Add release process to team docs
2. **Train:** Walk team through release workflow
3. **Test:** Run a test release (dry-run first)
4. **Monitor:** Watch first few releases carefully
5. **Iterate:** Gather feedback and improve process

## Support

If you encounter issues during setup:

1. Check [RELEASE.md](./RELEASE.md) for usage guide
2. Review workflow logs in Actions tab
3. Create issue with `release` label
4. Contact DevOps team

---

**Setup Version:** 1.0.0
**Last Updated:** 2025-12-06
