#!/bin/bash
# Track Component Count Across Git Releases
#
# This script counts components at each git tag/release and outputs
# a CSV file showing component growth over time.
#
# Usage:
#   bash scripts/track-components-history.sh
#   bash scripts/track-components-history.sh --tags "Release-1.0 Release-1.10 Release-1.15"

set -e

OUTPUT_FILE="component-count-history.csv"
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Get tags to process
if [[ "$1" == "--tags" ]]; then
  TAGS="$2"
else
  # Get all Release tags
  TAGS=$(git tag -l 'Release*' | sort -V)
fi

# Initialize CSV
echo "Tag,Date,Total,Elements,Feeds,Commit" > $OUTPUT_FILE

echo "Tracking component counts across releases..."
echo "Current branch: $CURRENT_BRANCH"
echo ""

for TAG in $TAGS; do
  echo "Processing $TAG..."

  # Checkout the tag
  git checkout $TAG 2>/dev/null || {
    echo "  ⚠️  Could not checkout $TAG, skipping..."
    continue
  }

  # Get commit date
  COMMIT_DATE=$(git log -1 --format=%ai $TAG | cut -d' ' -f1)
  COMMIT_HASH=$(git rev-parse --short $TAG)

  # Check if the count script exists at this point
  if [ ! -f "scripts/count-components.js" ]; then
    # Use inline grep if script doesn't exist yet
    # Try new structure first (api directory with tagName)
    ELEMENT_COUNT_NEW=$(grep -r "const tagName = " packages/components/source/api --include="*.ts" --exclude-dir="__tests__" 2>/dev/null | grep "umd-element-" | wc -l | tr -d ' ')
    FEED_COUNT_NEW=$(grep -r "const tagName = " packages/components/source/api --include="*.ts" --exclude-dir="__tests__" 2>/dev/null | grep "umd-feed-" | wc -l | tr -d ' ')

    # Try old structure (shadow-dom-api with ELEMENT_NAME)
    ELEMENT_COUNT_OLD=$(grep -r "const ELEMENT_NAME = " packages/components/source/shadow-dom-api --include="*.ts" 2>/dev/null | grep "umd-element-" | wc -l | tr -d ' ')
    FEED_COUNT_OLD=$(grep -r "const ELEMENT_NAME = " packages/components/source/shadow-dom-api --include="*.ts" 2>/dev/null | grep "umd-feed-" | wc -l | tr -d ' ')

    # Use whichever structure has data
    if [ "$ELEMENT_COUNT_NEW" -gt 0 ] || [ "$FEED_COUNT_NEW" -gt 0 ]; then
      ELEMENT_COUNT=$ELEMENT_COUNT_NEW
      FEED_COUNT=$FEED_COUNT_NEW
    else
      ELEMENT_COUNT=$ELEMENT_COUNT_OLD
      FEED_COUNT=$FEED_COUNT_OLD
    fi

    TOTAL=$((ELEMENT_COUNT + FEED_COUNT))
  else
    # Use the count script
    COUNTS=$(node scripts/count-components.js --json 2>/dev/null)
    if [ $? -eq 0 ]; then
      TOTAL=$(echo $COUNTS | grep -o '"total":[0-9]*' | cut -d':' -f2)
      ELEMENT_COUNT=$(echo $COUNTS | grep -o '"elements":[0-9]*' | cut -d':' -f2)
      FEED_COUNT=$(echo $COUNTS | grep -o '"feeds":[0-9]*' | cut -d':' -f2)
    else
      TOTAL=0
      ELEMENT_COUNT=0
      FEED_COUNT=0
    fi
  fi

  echo "  📊 Total: $TOTAL (Elements: $ELEMENT_COUNT, Feeds: $FEED_COUNT)"
  echo "$TAG,$COMMIT_DATE,$TOTAL,$ELEMENT_COUNT,$FEED_COUNT,$COMMIT_HASH" >> $OUTPUT_FILE
done

# Return to original branch
git checkout $CURRENT_BRANCH 2>/dev/null

echo ""
echo "✅ Component count history saved to $OUTPUT_FILE"
echo ""
echo "Summary:"
head -1 $OUTPUT_FILE
tail -5 $OUTPUT_FILE
