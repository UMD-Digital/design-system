import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { token, layout } from '@universityofmaryland/web-styles-library';

import { type ElementModel } from '../_types';

export interface GridOffsetLayoutProps {
  columns?: 2 | 3 | 4;
  isLayoutReversed?: boolean;
  stickyTopPosition?: number;
  stickyMinHeight?: string;
  enableContainerQueries?: boolean;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  overlayCardClass?: string;
  overlayTextColor?: string;
}

/**
 * Creates a grid layout with offset sticky positioning
 *
 * Creates a grid where the first visual column is sticky-positioned.
 * The sticky column changes based on layout direction:
 * - isLayoutReversed: false → first child (left column) is sticky
 * - isLayoutReversed: true → second child (right column DOM, left column visually) is sticky
 *
 * Useful for featured layouts with a prominent item that stays visible while scrolling.
 *
 * @param props - Configuration for grid offset layout
 * @returns ElementModel with grid offset layout container and styles
 *
 * @example
 * ```typescript
 * // Standard layout: first child sticky on left
 * const offsetGridLayout = gridOffset({
 *   columns: 2,
 *   isLayoutReversed: false,
 *   stickyTopPosition: 100,
 * });
 * offsetGridLayout.element.appendChild(featuredItem); // Sticky, left column
 * offsetGridLayout.element.appendChild(gridOfItems);  // Right column
 *
 * // Reversed layout: second child sticky on left (visually)
 * const reversedLayout = gridOffset({
 *   columns: 2,
 *   isLayoutReversed: true,
 *   stickyTopPosition: 100,
 * });
 * reversedLayout.element.appendChild(featuredItem);  // Right column
 * reversedLayout.element.appendChild(gridOfItems);   // Sticky, left column
 * ```
 */
export default function gridOffset({
  columns = 2,
  isLayoutReversed = false,
  stickyTopPosition = 0,
  stickyMinHeight = '560px',
  enableContainerQueries = false,
  alignItems = 'start',
  overlayCardClass,
  overlayTextColor = token.color.white,
}: GridOffsetLayoutProps = {}): ElementModel {
  let gridStyle = layout.grid.gap.two;
  if (columns === 3) gridStyle = layout.grid.gap.three;
  if (columns === 4) gridStyle = layout.grid.gap.four;

  const containerQueryStyles = enableContainerQueries
    ? {
        containerType: 'inline-size',
      }
    : {};

  const alignmentMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
  };

  // Build child-specific styles based on layout direction
  // Scoped to .umd-layout-grid-offset to prevent affecting nested grids
  // When not reversed: first child gets order -1 AND sticky positioning
  // When reversed: first child gets order 2, second child gets sticky positioning
  const stickyMediaQuery = {
    [`@media (${token.media.queries.large.min})`]: {
      position: 'sticky',
      top: `${stickyTopPosition}px`,
      minHeight: stickyMinHeight,
    },
  };

  const childStyles = isLayoutReversed
    ? {
        [`&.umd-layout-grid-offset > *:first-child`]: {
          order: 2,
        },
        [`&.umd-layout-grid-offset > *:nth-child(2)`]: stickyMediaQuery,
      }
    : {
        [`&.umd-layout-grid-offset > *:first-child`]: {
          order: -1,
          ...stickyMediaQuery,
        },
      };

  const overlayCardStyles = overlayCardClass
    ? {
        [`& .${overlayCardClass}`]: {
          [`@media (${token.media.queries.large.min})`]: {
            height: 'inherit',
          },
          [`*`]: {
            color: overlayTextColor,
          },
          [`& > div`]: {
            [`@media (${token.media.queries.large.min})`]: {
              minHeight: `${stickyMinHeight} !important`,
            },
          },
        },
      }
    : {};

  return new ElementBuilder()
    .styled(gridStyle)
    .withClassName('umd-layout-grid-offset')
    .withStyles({
      element: {
        [` > *`]: {
          alignSelf: alignmentMap[alignItems],
          ...containerQueryStyles,
        },
        ...childStyles,
        ...overlayCardStyles,
      },
    })
    .build();
}
