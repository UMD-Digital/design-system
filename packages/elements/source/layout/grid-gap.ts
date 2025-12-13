import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { layout } from '@universityofmaryland/web-styles-library';

import { type ElementModel } from '../_types';

export interface GridGapLayoutProps {
  columns?: 2 | 3 | 4;
  enableContainerQueries?: boolean;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
}

/**
 * Creates a grid layout with visual gaps between items
 *
 * Similar to the standard grid but with more pronounced spacing
 * between grid items. Items align to flex-start by default.
 *
 * @param props - Configuration for grid gap layout
 * @returns ElementModel with grid gap layout container and styles
 *
 * @example
 * ```typescript
 * const gapGridLayout = gridGap({
 *   columns: 3,
 *   alignItems: 'start'
 * });
 *
 * // Add items to the grid
 * gapGridLayout.element.appendChild(item1);
 * gapGridLayout.element.appendChild(item2);
 * gapGridLayout.element.appendChild(item3);
 *
 * // Inject into DOM
 * document.body.appendChild(gapGridLayout.element);
 * document.head.appendChild(createStyleElement(gapGridLayout.styles));
 * ```
 */
export default function gridGap({
  columns = 2,
  enableContainerQueries = true,
  alignItems = 'start',
}: GridGapLayoutProps = {}): ElementModel {
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

  return new ElementBuilder()
    .styled(gridStyle)
    .withStyles({
      element: {
        [` > *`]: {
          alignSelf: alignmentMap[alignItems],
          ...containerQueryStyles,
        },
      },
    })
    .build();
}
