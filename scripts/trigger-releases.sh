#!/bin/bash

###
# Release Trigger Script
#
# Triggers release-package workflows for each package that needs releasing
# Uses GitHub CLI to dispatch workflows and wait for completion
###

set -e

# Colors for output
RED='\033[0:31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO="${GITHUB_REPOSITORY:-umd-digital/design-system}"
WORKFLOW="release-package.yml"
MAX_WAIT_TIME=1800  # 30 minutes
CHECK_INTERVAL=30    # 30 seconds

# Input: comma-separated list of packages
PACKAGES="$1"
TIER_NAME="${2:-unknown}"

if [ -z "$PACKAGES" ] || [ "$PACKAGES" == "none" ]; then
  echo -e "${BLUE}ℹ️  No packages to release in $TIER_NAME tier${NC}"
  exit 0
fi

echo -e "${BLUE}🚀 Starting release for $TIER_NAME tier: $PACKAGES${NC}"

# Convert comma-separated string to array
IFS=',' read -ra PACKAGE_ARRAY <<< "$PACKAGES"

# Track workflow run IDs
declare -A RUN_IDS
FAILED_PACKAGES=()
SUCCESS_PACKAGES=()

# Function to trigger workflow and get run ID
trigger_workflow() {
  local package=$1

  echo -e "${YELLOW}📦 Triggering release for $package...${NC}"

  # Trigger workflow
  gh workflow run "$WORKFLOW" \
    --repo "$REPO" \
    --ref "${GITHUB_REF_NAME:-release}" \
    --field package="$package" \
    --field auto_detect_version=true \
    --field dry_run=false

  # Wait a moment for workflow to appear
  sleep 5

  # Get the most recent run ID for this workflow
  RUN_ID=$(gh run list \
    --repo "$REPO" \
    --workflow "$WORKFLOW" \
    --limit 1 \
    --json databaseId \
    --jq '.[0].databaseId')

  echo -e "${GREEN}✓ Triggered workflow run ID: $RUN_ID${NC}"
  RUN_IDS[$package]=$RUN_ID
}

# Function to check workflow status
check_workflow_status() {
  local run_id=$1

  gh run view "$run_id" \
    --repo "$REPO" \
    --json status,conclusion \
    --jq '{status: .status, conclusion: .conclusion}'
}

# Function to wait for workflow completion
wait_for_workflow() {
  local package=$1
  local run_id=$2
  local elapsed=0

  echo -e "${YELLOW}⏳ Waiting for $package release to complete (run ID: $run_id)...${NC}"

  while [ $elapsed -lt $MAX_WAIT_TIME ]; do
    STATUS_JSON=$(check_workflow_status "$run_id")
    STATUS=$(echo "$STATUS_JSON" | jq -r '.status')
    CONCLUSION=$(echo "$STATUS_JSON" | jq -r '.conclusion')

    if [ "$STATUS" == "completed" ]; then
      if [ "$CONCLUSION" == "success" ]; then
        echo -e "${GREEN}✅ $package released successfully!${NC}"
        SUCCESS_PACKAGES+=("$package")
        return 0
      else
        echo -e "${RED}❌ $package release failed with conclusion: $CONCLUSION${NC}"
        FAILED_PACKAGES+=("$package")
        return 1
      fi
    fi

    sleep $CHECK_INTERVAL
    elapsed=$((elapsed + CHECK_INTERVAL))
    echo -e "${BLUE}  Still running... (${elapsed}s elapsed)${NC}"
  done

  echo -e "${RED}⏱️  Timeout waiting for $package release${NC}"
  FAILED_PACKAGES+=("$package (timeout)")
  return 1
}

# Main execution
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Releasing $TIER_NAME Tier Packages${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Trigger all workflows
for package in "${PACKAGE_ARRAY[@]}"; do
  trigger_workflow "$package"
  sleep 2  # Stagger triggers slightly
done

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Waiting for Releases to Complete${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Wait for all workflows to complete
for package in "${PACKAGE_ARRAY[@]}"; do
  run_id="${RUN_IDS[$package]}"
  wait_for_workflow "$package" "$run_id" || true  # Continue even if one fails
done

# Summary
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Release Summary for $TIER_NAME Tier${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}✅ Successful: ${#SUCCESS_PACKAGES[@]}${NC}"
for pkg in "${SUCCESS_PACKAGES[@]}"; do
  echo -e "  - $pkg"
done

if [ ${#FAILED_PACKAGES[@]} -gt 0 ]; then
  echo ""
  echo -e "${RED}❌ Failed: ${#FAILED_PACKAGES[@]}${NC}"
  for pkg in "${FAILED_PACKAGES[@]}"; do
    echo -e "  - $pkg"
  done
  echo ""
  exit 1
fi

echo ""
echo -e "${GREEN}🎉 All packages released successfully!${NC}"
exit 0
