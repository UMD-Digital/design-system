import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { layout } from '@universityofmaryland/web-styles-library';
import * as token from '@universityofmaryland/web-token-library';

import { type ElementModel } from '../_types';

export interface GridBorderLayoutProps {
  columns?: 2 | 3 | 4;
  isThemeDark?: boolean;
  enableContainerQueries?: boolean;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
}

/**
 * Creates a grid layout with borders between items
 *
 * Grid layout with visual borders separating grid items.
 * Supports light and dark theme variants with responsive behavior.
 *
 * @param props - Configuration for grid border layout
 * @returns ElementModel with grid border layout container and styles
 *
 * @example
 * ```typescript
 * // Three-column light border grid
 * const borderGridLayout = gridBorder({
 *   columns: 3,
 *   isThemeDark: false
 * });
 *
 * // Four-column dark border grid
 * const darkBorderGrid = gridBorder({
 *   columns: 4,
 *   isThemeDark: true,
 *   alignItems: 'start'
 * });
 *
 * // Add items to the grid
 * borderGridLayout.element.appendChild(item1);
 * borderGridLayout.element.appendChild(item2);
 * borderGridLayout.element.appendChild(item3);
 *
 * // Inject into DOM
 * document.body.appendChild(borderGridLayout.element);
 * document.head.appendChild(createStyleElement(borderGridLayout.styles));
 * ```
 */
export default function gridBorder({
  columns = 2,
  isThemeDark = false,
  enableContainerQueries = false,
  alignItems,
}: GridBorderLayoutProps = {}): ElementModel {
  // Select grid style based on columns and theme
  let gridStyle = isThemeDark
    ? layout.grid.border.columnsTwoDark
    : layout.grid.border.columnsTwo;

  if (columns === 3) {
    gridStyle = isThemeDark
      ? layout.grid.border.columnsThreeDark
      : layout.grid.border.columnsThree;
  } else if (columns === 4) {
    gridStyle = isThemeDark
      ? layout.grid.border.columnsFourDark
      : layout.grid.border.columnsFour;
  }

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

  const alignmentStyles = alignItems
    ? { alignSelf: alignmentMap[alignItems] }
    : {};

  return new ElementBuilder()
    .styled(gridStyle)
    .withStyles({
      element: {
        [` > *`]: {
          ...alignmentStyles,
          padding: token.spacing.xl,
          ...containerQueryStyles,
        },
      },
    })
    .build();
}
