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
 * Creates a grid layout with offset sticky positioning for the first item
 *
 * Creates a grid where the first item can be sticky-positioned and offset
 * from the rest of the grid. Useful for featured layouts with a prominent
 * first item that stays visible while scrolling.
 *
 * @param props - Configuration for grid offset layout
 * @returns ElementModel with grid offset layout container and styles
 *
 * @example
 * ```typescript
 * const offsetGridLayout = gridOffset({
 *   columns: 2,
 *   isLayoutReversed: false,
 *   stickyTopPosition: 100,
 *   overlayCardClass: 'card-overlay'
 * });
 *
 * // First item will be sticky, remaining items flow normally
 * offsetGridLayout.element.appendChild(featuredItem);
 * offsetGridLayout.element.appendChild(item1);
 * offsetGridLayout.element.appendChild(item2);
 *
 * // Inject into DOM
 * document.body.appendChild(offsetGridLayout.element);
 * document.head.appendChild(createStyleElement(offsetGridLayout.styles));
 * ```
 */
export default function gridOffset({
  columns = 2,
  isLayoutReversed = false,
  stickyTopPosition = 0,
  stickyMinHeight = '560px',
  enableContainerQueries = true,
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

  // Optional overlay card styling if class name is provided
  const overlayCardStyles = overlayCardClass
    ? {
        [`& .${overlayCardClass}`]: {
          [`@media (${token.media.queries.large.min})`]: {
            height: 'inherit',
            position: 'sticky',
            top: `${stickyTopPosition}px`,
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
    .withStyles({
      element: {
        [` > *`]: {
          alignSelf: alignmentMap[alignItems],
          ...containerQueryStyles,
        },
        [` > *:first-child`]: {
          order: isLayoutReversed ? 2 : -1,
        },
        ...overlayCardStyles,
      },
    })
    .build();
}
