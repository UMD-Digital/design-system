import { bio } from '@universityofmaryland/web-feeds-library/experts';
import { Attributes, Register } from '@universityofmaryland/web-model-library';
import {
  CreateComponentFunction,
  ComponentRegistration,
} from '../../../_types';

const tagName = 'umd-feed-expert-bio';

const createComponent: CreateComponentFunction = (element) => {
  const token = Attributes.getValue.feedToken({ element });
  const expertId = element.getAttribute('data-expert-id') || '';

  if (!token || !expertId) {
    return { element: document.createElement('div'), styles: '' };
  }

  const bioElement = bio({
    token,
    expertId,
    isThemeDark: Attributes.isTheme.dark({ element }),
  });

  // Set data-display attribute if present
  const displayType = element.getAttribute('data-display');
  if (displayType === 'full') {
    bioElement.element.setAttribute('data-display', 'full');
  }

  return bioElement;
};

/**
 * Expert Bio Feed Component
 *
 * Displays a single expert's biography with contact information.
 * Defaults to 'small' layout showing summary.
 * Use data-display="full" to show complete biography.
 *
 * ## Custom Element
 * `<umd-feed-expert-bio>`
 *
 * ## Attributes
 * - `data-token` - API authentication token (required)
 * - `data-expert-id` - Expert ID to display (required)
 * - `data-display` - Display mode:
 *   - `small` (default) - Shows summary
 *   - `full` - Shows complete biography
 * - `data-theme` - Theme options:
 *   - `dark` - Dark theme styling
 *
 * @example
 * ```html
 * <!-- Basic expert bio (small/summary) -->
 * <umd-feed-expert-bio
 *   data-token="your-api-token"
 *   data-expert-id="john-doe">
 * </umd-feed-expert-bio>
 * ```
 *
 * @example
 * ```html
 * <!-- Full expert bio -->
 * <umd-feed-expert-bio
 *   data-token="your-api-token"
 *   data-expert-id="jane-smith"
 *   data-display="full">
 * </umd-feed-expert-bio>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme bio -->
 * <umd-feed-expert-bio
 *   data-token="your-api-token"
 *   data-expert-id="john-doe"
 *   data-theme="dark">
 * </umd-feed-expert-bio>
 * ```
 *
 * @category Components
 * @since 1.17.0
 */
const registration: ComponentRegistration = Register.webComponent({
  tagName,
  createComponent,
  afterConnect: (element, shadow) => {
    element?.events?.callback(shadow);
  },
});

export default registration;
