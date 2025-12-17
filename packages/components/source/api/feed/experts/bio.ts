import { bio } from '@universityofmaryland/web-feeds-library/experts';
import { Attributes, Register } from '@universityofmaryland/web-model-library';
import {
  CreateComponentFunction,
  ComponentRegistration,
} from '../../../_types';

const tagName = 'umd-feed-expert-bio';

const createComponent: CreateComponentFunction = (element) => {
  const token = Attributes.getValue.feedToken({ element });
  const expertId = element.getAttribute('data-id') || '';

  if (!token || !expertId) {
    return { element: document.createElement('div'), styles: '' };
  }

  const bioElement = bio({
    token,
    expertId,
    isThemeDark: Attributes.isTheme.dark({ element }),
  });

  return bioElement;
};

/**
 * Expert Bio Feed Component
 *
 * Displays a single expert's profile with summary and contact information.
 * Always uses the small layout format.
 *
 * ## Custom Element
 * `<umd-feed-expert-bio>`
 *
 * ## Attributes
 * - `data-token` - API authentication token (required)
 * - `data-id` - Expert ID to display (required)
 * - `data-theme` - Theme options:
 *   - `dark` - Dark theme styling
 *
 * @example
 * ```html
 * <!-- Basic expert bio -->
 * <umd-feed-expert-bio
 *   data-token="your-api-token"
 *   data-id="john-doe">
 * </umd-feed-expert-bio>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme bio -->
 * <umd-feed-expert-bio
 *   data-token="your-api-token"
 *   data-id="john-doe"
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
