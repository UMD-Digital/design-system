import { list } from '@universityofmaryland/web-feeds-library/experts';
import { Attributes, Register } from '@universityofmaryland/web-model-library';
import {
  CreateComponentFunction,
  ComponentRegistration,
} from '../../../_types';

const tagName = 'umd-feed-experts-list';

const createComponent: CreateComponentFunction = (element) => {
  const token = Attributes.getValue.feedToken({ element });

  if (!token) {
    return { element: document.createElement('div'), styles: '' };
  }

  const rowCount = Number(Attributes.getValue.layoutRowCount({ element })) || 5;
  const isDisplayList = Attributes.isDisplay.list({ element });
  const categoriesAttribute = Attributes.getValue.feedFilterIds({ element });
  const attributeMediaTrained = Attributes.getValue.mediaTrained({ element });
  const expertIds = Attributes.getValue.ids({ element }) || '';

  return list({
    token,
    numberOfRowsToStart: Math.min(Math.max(rowCount, 1), 10),
    cardType: isDisplayList ? 'list' : 'tabular',
    isThemeDark: Attributes.isTheme.dark({ element }),
    isLazyLoad: Attributes.includesFeature.lazyLoad({ element }),
    ...(categoriesAttribute && { categories: categoriesAttribute.split(',') }),
    ...(attributeMediaTrained !== null && {
      isMediaTrained: attributeMediaTrained === 'true',
    }),
    ...(expertIds && { ids: expertIds.split(',') }),
  });
};

/**
 * Experts List Feed Component
 *
 * Displays a dynamic list of expert profiles fetched from an external feed.
 * Optimized for vertical scanning with publication dates.
 *
 * ## Custom Element
 * `<umd-feed-experts-list>`
 *
 * ## Attributes
 * - `data-token` - API authentication token (required)
 * - `data-theme` - Theme options:
 *   - `dark` - Dark theme styling
 *
 * @example
 * ```html
 * <!-- Basic news list -->
 * <umd-feed-experts-list
 *   data-token="your-api-token">
 * </umd-feed-experts-list>
 * ```
 *
 * @example
 * ```html
 * <!-- News list with filters and more items -->
 * <umd-feed-experts-list
 *   data-token="your-api-token">
 * </umd-feed-experts-list>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme with exclusions -->
 * <umd-feed-experts-list
 *   data-token="your-api-token"
 *   data-theme="dark">
 * </umd-feed-experts-list>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
export const FeedExpertsList: ComponentRegistration = Register.webComponent({
  tagName,
  createComponent,
  afterConnect: (element, shadow) => {
    element?.events?.callback(shadow);
  },
});

/** Backwards compatibility alias for grouped exports */
export { FeedExpertsList as expertsList };
