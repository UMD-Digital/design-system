# UMD Design System - Release Guide

How to publish the design system packages to npm.

---

## Overview

All nine packages share **one version number**, and every release publishes **every package** at that version, whether or not it changed.

Releases run through one GitHub Actions workflow, [`auto-release.yml`](workflows/auto-release.yml), which is triggered manually. You type the version once and the workflow:

1. Checks the inputs
2. Builds and tests every package
3. Writes the version into every `package.json`
4. Updates the README badges
5. Publishes each package to npm, in dependency order
6. Commits the version bump back to `npm-release`
7. Tags that commit `release-v<version>` and creates a **draft** GitHub release
8. Sends a Slack notification (real releases only)

npm authentication uses **trusted publishing (OIDC)**. There is no npm token stored in the repo.

---

## How to Release

### 1. Get `npm-release` ready

Releases only run from the `npm-release` branch. Before releasing, bring `npm-release` up to date with the code you want to publish (for example, syncing it up to branch `release/2.x`).

Whatever is on `npm-release` is what gets released.

### 2. Do a dry run

1. Go to **Actions → Automated Release → Run workflow**
2. Choose the **`npm-release`** branch
3. Fill in the inputs (see below) and leave **Dry run** checked
4. Run it and check the logs:
   - Every package shows `🧪 Would publish <name>@<version> (<tag>)`
   - The styles package's file list includes `dist/css/styles.min.css`

A dry run builds, tests, and simulates the publish. It does **not** publish, commit, or send Slack messages.

> A dry run doesn't contact npm's authentication, so it can't catch auth or provenance problems. Those only show up on a real run.

### 3. Release for real

Run the workflow again with the same inputs and **Dry run unchecked**.

### 4. Write the release notes

The workflow creates a draft release named `Release <version>` on the `release-v<version>` tag, with empty notes. Drafts aren't public.

1. Go to **Releases** and open the draft
2. Write the notes
3. Click **Publish release**

---

## Inputs

| Input | Required | Default | Notes |
|---|---|---|---|
| `version` | Yes | — | An exact version like `2.2.0` or `2.2.0-alpha.1`. No `v` prefix, and no keywords like `patch`. |
| `tag` | No | `latest` | The npm dist-tag. Use `latest` for normal releases and something like `alpha`, `beta` or `next` for pre-releases. |
| `dry_run` | No | checked | Leave it checked to test. Uncheck it to publish. |

---

## Safety Checks

The first step, **Validate inputs**, stops the run within seconds if:

| Check | Example that fails |
|---|---|
| The workflow isn't running from `npm-release` | Running it from `main` or a feature branch |
| The version isn't an exact version | `patch`, `v2.2.0`, empty |
| A pre-release is being published as `latest` | `2.2.0-alpha.1` with tag `latest` |

The last check exists because whatever is on `latest` is what everyone gets from `npm install`.

---

## Pre-releases

1. Use a version with a dash, like `2.2.0-alpha.1` or `2.2.0-beta.2`
2. Set `tag` to a pre-release tag like `alpha` or `beta`

Users only get a pre-release if they ask for it, for example `npm install @universityofmaryland/web-components-library@alpha`.

---

## If a Release Fails

The workflow is designed so that a failure can be rerun safely:

- **The version bump is committed only after publishing succeeds.** A failed publish doesn't leave a version bump on the branch.
- **Already-published versions are skipped.** If some packages published before a failure, rerunning with the same version publishes only the ones that are missing.
- **Setting the same version twice is fine.** If a `package.json` on `npm-release` is already at the version you enter, the bump step leaves it as is and the release continues.

To recover: fix the cause and **rerun with the same inputs**.

If publishing succeeded but the final commit or push failed (for example, because of branch protection), the packages are on npm but the version bump isn't on `npm-release`. A rerun skips publishing and tries the commit again.

---

## Publish Order

Packages publish in dependency order (from `lerna list --toposort`), so a package is never published before the packages it depends on. For example, `tokens` publishes before `styles`, which publishes before `elements`.

Internal dependencies use `workspace:^` in the repo. `pnpm publish` rewrites them to real version ranges like `^2.2.0` in the published package.

---

## Build Notes

- Each package is built with its own `build` script.
- Packages with a `build:css` script also run it. Today that's only `styles`, which produces the static CSS files in `dist/css/`.
- `build:tailwind` (in `styles`) is **not** run by the release workflow, so `tailwind.css` and `tailwind-theme.css` aren't included in releases.

---

## One-Time Setup

These have to be in place for real releases to work.

### npm trusted publishing

Each package needs a trusted publisher on npmjs.com:

1. Open the package on npmjs.com → **Settings → Trusted publishing**
2. Add a GitHub Actions publisher:
   - Organization/user: `UMD-Digital`
   - Repository: `design-system`
   - Workflow filename: `auto-release.yml`

If the workflow file is ever renamed, update this setting for all nine packages.

### `repository` field

Each package's `package.json` must have a `repository` that matches this repo. npm checks it against the provenance record and rejects the publish (E422) if they don't match:

```json
"repository": {
  "type": "git",
  "url": "git+https://github.com/UMD-Digital/design-system.git",
  "directory": "packages/<package>"
}
```

### Branch protection on `npm-release`

The workflow pushes the version bump commit to `npm-release` using the built-in `GITHUB_TOKEN`. If `npm-release` is protected (required PRs or reviews), GitHub Actions must be allowed to bypass that rule (**Settings → Rules**), or the final push will be rejected.

### Slack notifications

Set the `SLACK_WEBHOOK_URL` repository secret. Notifications are sent by [`release-notification.yml`](workflows/release-notification.yml) after real releases (success or failure), and not for dry runs.

---

## Legacy Workflows

`release.yml` and `release-package.yml` are the previous release workflows. They publish with the `NPM_TOKEN` secret and **do not** have this workflow's safety checks or CSS build.

They are kept only as a fallback until the first real release through `auto-release.yml` succeeds. After that:

1. Delete `release.yml` and `release-package.yml`
2. Delete the `NPM_TOKEN` and `PAT_TOKEN` repository secrets
3. Consider turning on npm's option to disallow token-based publishing for each package
4. Remove this section
