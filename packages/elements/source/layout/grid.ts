import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { token, layout } from '@universityofmaryland/web-styles-library';

import { type ElementModel } from '../_types';

export interface GridLayoutProps {
  columns?: 2 | 3 | 4;
  minHeight?: string;
  enableContainerQueries?: boolean;
}

/**
 * Creates a responsive column grid layout
 *
 * Provides a multi-column grid layout that adapts to screen size.
 * Columns are responsive and collapse to single column on mobile.
 *
 * @param props - Configuration for grid layout
 * @returns ElementModel with grid layout container and styles
 *
 * @example
 * ```typescript
 * const gridLayout = grid({
 *   columns: 3,
 *   minHeight: '400px'
 * });
 *
 * // Add items to the grid
 * gridLayout.element.appendChild(item1);
 * gridLayout.element.appendChild(item2);
 * gridLayout.element.appendChild(item3);
 *
 * // Inject into DOM
 * document.body.appendChild(gridLayout.element);
 * document.head.appendChild(createStyleElement(gridLayout.styles));
 * ```
 */
export function createLayoutGrid({
  columns = 2,
  minHeight,
  enableContainerQueries = true,
}: GridLayoutProps = {}): ElementModel {
  let gridStyle = layout.grid.columnsTwo;
  if (columns === 3) gridStyle = layout.grid.columnsThree;
  if (columns === 4) gridStyle = layout.grid.columnsFour;

  const containerQueryStyles = enableContainerQueries
    ? {
        containerType: 'inline-size',
      }
    : {};

  const minHeightStyles = minHeight
    ? {
        [`@media (${token.media.queries.tablet.min})`]: {
          minHeight: `${minHeight} !important`,
        },
      }
    : {};

  return new ElementBuilder()
    .styled(gridStyle)
    .withStyles({
      element: {
        [` > *`]: {
          ...containerQueryStyles,
          ...minHeightStyles,
        },
      },
    })
    .build();
}
