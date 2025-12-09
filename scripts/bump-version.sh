#!/bin/bash

###
# Version Bump Helper Script
#
# Easily bump versions for one or more packages
# Usage: ./bump-version.sh <bump-type> <package1> [package2] [package3] ...
# Example: ./bump-version.sh patch components elements
###

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Help message
show_help() {
  cat << EOF
Version Bump Helper Script

Usage:
  ./bump-version.sh <bump-type> <package1> [package2] ...

Bump Types:
  patch       Bump patch version (1.2.3 → 1.2.4)
  minor       Bump minor version (1.2.3 → 1.3.0)
  major       Bump major version (1.2.3 → 2.0.0)
  prerelease  Bump prerelease version (1.2.3 → 1.2.4-beta.0)
  prepatch    Bump to next patch prerelease (1.2.3 → 1.2.4-beta.0)
  preminor    Bump to next minor prerelease (1.2.3 → 1.3.0-beta.0)
  premajor    Bump to next major prerelease (1.2.3 → 2.0.0-beta.0)

Pre-release Identifiers (optional for prerelease):
  --preid=<id>  Set pre-release identifier (alpha, beta, rc, etc.)

Packages:
  icons, tokens, utilities, builder, model, styles, elements, feeds, components
  Or use 'all' to bump all packages

Examples:
  # Bump components patch version
  ./bump-version.sh patch components

  # Bump multiple packages
  ./bump-version.sh minor components elements feeds

  # Bump all packages
  ./bump-version.sh patch all

  # Create beta pre-release
  ./bump-version.sh prerelease --preid=beta components

  # Create alpha pre-release for new major version
  ./bump-version.sh premajor --preid=alpha components

Options:
  --dry-run     Show what would happen without making changes
  --help        Show this help message

EOF
}

# Check arguments
if [ $# -lt 2 ]; then
  echo -e "${RED}Error: Not enough arguments${NC}"
  echo ""
  show_help
  exit 1
fi

# Parse arguments
BUMP_TYPE=$1
shift

PREID=""
DRY_RUN=false
PACKAGES=()

while [ $# -gt 0 ]; do
  case $1 in
    --preid=*)
      PREID="${1#*=}"
      ;;
    --help)
      show_help
      exit 0
      ;;
    --dry-run)
      DRY_RUN=true
      ;;
    *)
      PACKAGES+=("$1")
      ;;
  esac
  shift
done

# All available packages
ALL_PACKAGES=(icons tokens utilities builder model styles elements feeds components)

# Expand 'all' keyword
if [[ " ${PACKAGES[@]} " =~ " all " ]]; then
  PACKAGES=("${ALL_PACKAGES[@]}")
fi

# Validate bump type
case $BUMP_TYPE in
  patch|minor|major|prerelease|prepatch|preminor|premajor)
    ;;
  *)
    echo -e "${RED}Error: Invalid bump type '$BUMP_TYPE'${NC}"
    echo "Valid types: patch, minor, major, prerelease, prepatch, preminor, premajor"
    exit 1
    ;;
esac

# Validate packages
for pkg in "${PACKAGES[@]}"; do
  if [[ ! " ${ALL_PACKAGES[@]} " =~ " ${pkg} " ]]; then
    echo -e "${RED}Error: Invalid package '$pkg'${NC}"
    echo "Valid packages: ${ALL_PACKAGES[*]}"
    exit 1
  fi
done

# Confirmation
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Version Bump Summary${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}Bump Type:${NC} $BUMP_TYPE"
if [ -n "$PREID" ]; then
  echo -e "${YELLOW}Pre-release ID:${NC} $PREID"
fi
echo -e "${YELLOW}Packages:${NC} ${PACKAGES[*]}"
if [ "$DRY_RUN" = true ]; then
  echo -e "${YELLOW}Mode:${NC} DRY RUN (no changes will be made)"
fi
echo ""

# Function to bump version for a package
bump_package() {
  local pkg=$1
  local pkg_dir="packages/$pkg"

  if [ ! -f "$pkg_dir/package.json" ]; then
    echo -e "${RED}✗ Package directory not found: $pkg_dir${NC}"
    return 1
  fi

  # Get current version
  local current_version=$(node -p "require('./$pkg_dir/package.json').version")
  echo -e "${BLUE}📦 $pkg${NC}"
  echo -e "  Current version: ${current_version}"

  # Build npm version command
  local npm_cmd="npm version $BUMP_TYPE --no-git-tag-version"
  if [ -n "$PREID" ]; then
    npm_cmd="$npm_cmd --preid=$PREID"
  fi

  if [ "$DRY_RUN" = true ]; then
    # Simulate version bump
    echo -e "  ${YELLOW}Would run: $npm_cmd${NC}"
    # Try to calculate new version
    local new_version=$(cd "$pkg_dir" && $npm_cmd 2>&1 | tail -n 1 || echo "error")
    if [ "$new_version" != "error" ]; then
      echo -e "  New version: ${new_version}"
    fi
  else
    # Actually bump version
    (cd "$pkg_dir" && $npm_cmd > /dev/null 2>&1)
    local new_version=$(node -p "require('./$pkg_dir/package.json').version")
    echo -e "  ${GREEN}✓ New version: ${new_version}${NC}"
  fi

  echo ""
}

# Bump all packages
FAILED_PACKAGES=()
SUCCESS_PACKAGES=()

for pkg in "${PACKAGES[@]}"; do
  if bump_package "$pkg"; then
    SUCCESS_PACKAGES+=("$pkg")
  else
    FAILED_PACKAGES+=("$pkg")
  fi
done

# Summary
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Summary${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}✓ Success: ${#SUCCESS_PACKAGES[@]}${NC}"
for pkg in "${SUCCESS_PACKAGES[@]}"; do
  echo "  - $pkg"
done

if [ ${#FAILED_PACKAGES[@]} -gt 0 ]; then
  echo ""
  echo -e "${RED}✗ Failed: ${#FAILED_PACKAGES[@]}${NC}"
  for pkg in "${FAILED_PACKAGES[@]}"; do
    echo "  - $pkg"
  done
  exit 1
fi

if [ "$DRY_RUN" = true ]; then
  echo ""
  echo -e "${YELLOW}This was a dry run. No changes were made.${NC}"
  echo -e "${YELLOW}Run without --dry-run to apply changes.${NC}"
  exit 0
fi

# Git instructions
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Next Steps${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "1. Review the changes:"
echo -e "   ${YELLOW}git diff packages/*/package.json${NC}"
echo ""
echo "2. Stage the changes:"
echo -e "   ${YELLOW}git add packages/*/package.json${NC}"
echo ""
echo "3. Commit the changes:"
echo -e "   ${YELLOW}git commit -m \"chore: bump version for ${PACKAGES[*]}\"${NC}"
echo ""
echo "4. Push to release branch:"
echo -e "   ${YELLOW}git push origin release${NC}"
echo ""
echo "The automated release workflow will detect and publish these packages."
echo ""
