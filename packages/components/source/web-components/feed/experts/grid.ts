import { grid } from '@universityofmaryland/web-feeds-library/experts';
import { Attributes, Register } from '@universityofmaryland/web-model-library';
import {
  CreateComponentFunction,
  ComponentRegistration,
} from '../../../_types';

const tagName = 'umd-feed-experts-grid';

const createComponent: CreateComponentFunction = (element) => {
  const token = Attributes.getValue.feedToken({ element });

  if (!token) {
    return { element: document.createElement('div'), styles: '' };
  }

  const columnCount =
    Number(Attributes.getValue.layoutColumnCount({ element })) || 3;
  const rowCount = Number(Attributes.getValue.layoutRowCount({ element })) || 1;
  const categoriesAttribute = Attributes.getValue.feedFilterIds({ element });
  const attributeMediaTrained = Attributes.getValue.mediaTrained({ element });

  return grid({
    token,
    numberOfColumnsToShow: Math.min(Math.max(columnCount, 1), 4),
    numberOfRowsToStart: Math.min(Math.max(rowCount, 1), 2),
    isThemeDark: Attributes.isTheme.dark({ element }),
    isLazyLoad: Attributes.includesFeature.lazyLoad({ element }),
    isTransparent: Attributes.isVisual.transparent({ element }),
    isOverlay: Attributes.isDisplay.overlay({ element }),
    ...(categoriesAttribute && { categories: categoriesAttribute.split(',') }),
    ...(attributeMediaTrained !== null && {
      isMediaTrained: attributeMediaTrained === 'true',
    }),
  });
};

/**
 * Experts Grid Feed Component
 *
 * Displays a dynamic grid of expert profiles fetched from an external feed.
 * Supports overlay card styles and transparent backgrounds.
 *
 * ## Custom Element
 * `<umd-feed-experts-grid>`
 *
 * ## Attributes
 * - `data-token` - API authentication token (required)
 * - `data-filter-group-ids` - Comma-separated category IDs to filter experts
 * - `data-layout-column-count` - Number of columns (default: 3)
 * - `data-layout-row-count` - Initial rows to display (default: 1)
 * - `data-theme` - Theme options:
 *   - `dark` - Dark theme styling
 * - `data-lazy-load` - Enable lazy loading of additional experts
 * - `data-display` - Display options:
 *   - `overlay` - Use overlay card style
 * - `data-visual-transparent` - Transparent card backgrounds
 *
 * @example
 * ```html
 * <!-- Basic experts grid -->
 * <umd-feed-experts-grid
 *   data-token="your-api-token">
 * </umd-feed-experts-grid>
 * ```
 *
 * @example
 * ```html
 * <!-- Experts grid with overlay style and filters -->
 * <umd-feed-experts-grid
 *   data-token="your-api-token"
 *   data-filter-group-ids="computer-science,engineering"
 *   data-display="overlay"
 *   data-layout-column-count="4"
 *   data-layout-row-count="2"
 *   data-lazy-load="true">
 * </umd-feed-experts-grid>
 * ```
 *
 * @example
 * ```html
 * <!-- Experts grid excluding specific profiles -->
 * <umd-feed-experts-grid
 *   data-token="your-api-token"
 *   data-theme="dark"
 *   data-visual-transparent>
 * </umd-feed-experts-grid>
 * ```
 *
 * @category Components
 * @since 1.17.0
 */
export const FeedExpertsGrid: ComponentRegistration = Register.webComponent({
  tagName,
  createComponent,
  afterConnect: (element, shadow) => {
    element?.events?.callback(shadow);
  },
});

/** Backwards compatibility alias for grouped exports */
export { FeedExpertsGrid as expertsGrid };
