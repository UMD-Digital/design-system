import { actions } from '@universityofmaryland/web-elements-library/atomic';
import { Attributes, Register, Slots } from 'model';
import {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../../_types';

const tagName = 'umd-element-call-to-action';

const slots: SlotConfiguration = {
  text: {
    allowedElements: ['a', 'button'],
  },
  plainText: {
    deprecated:
      'Use "text" instead. This attribute will be removed in version 2.0.',
    allowedElements: ['a', 'button'],
  },
};

const createComponent: CreateComponentFunction = (element) => {
  const interactiveElement = element.querySelector('button, a:not([slot])');
  const plainTextSlot = element.querySelector(
    `[slot="plain-text"]`,
  ) as HTMLElement;
  const textSlot = element.querySelector(`[slot="text"]`) as HTMLElement;

  if (!interactiveElement) {
    throw new Error('Component requires a button or link');
  }

  const optionProps = {
    element: interactiveElement.cloneNode(true) as HTMLElement,
    isTypeOutline: Attributes.isDisplay.outline({ element }),
    isTypePrimary: Attributes.isDisplay.primary({ element }),
    isTypeSecondary: Attributes.isDisplay.secondary({ element }),
    isSizeLarge: Attributes.isVisual.sizeLarge({ element }),
    isThemeDark: Attributes.isTheme.dark({ element }),
    isThemeGold: Attributes.isTheme.gold({ element }),
    elementStyles: Attributes.getValue.styleProps({ element }),
  };

  if (plainTextSlot || textSlot) {
    const plainText =
      Slots.deprecated.plainText({ element }) ||
      Slots.text.default({ element });

    return actions.options({
      ...optionProps,
      plainText,
    });
  }

  return actions.options({
    ...optionProps,
  });
};

/**
 * Call-to-Action
 *
 * A web component that enhances buttons and links with consistent UMD styling.
 *
 * ## Custom Element
 * `<umd-element-call-to-action>`
 *
 * ## Slots
 * - `text` - Additional text content for links (optional, accepts: a)
 * - `plainText` - Deprecated: Use `text` slot instead
 *
 * ## Attributes
 * - `data-display` - Display style options:
 *   - `primary` - Primary button style (red background)
 *   - `secondary` - Secondary button style
 *   - `outline` - Outline button style
 * - `data-visual-size` - Size options:
 *   - `large` - Larger button size
 * - `data-theme` - Theme options:
 *   - `dark` - Dark theme variant
 *   - `gold` - Gold theme variant
 *
 * @example
 * ```html
 * <!-- Primary button -->
 * <umd-element-call-to-action data-display="primary">
 *   <button>Apply Now</button>
 * </umd-element-call-to-action>
 * ```
 *
 * @example
 * ```html
 * <!-- Large secondary link -->
 * <umd-element-call-to-action data-display="secondary" data-visual-size="large">
 *   <a href="/learn-more">Learn More</a>
 * </umd-element-call-to-action>
 * ```
 *
 * @example
 * ```html
 * <!-- Outline button with dark theme -->
 * <umd-element-call-to-action data-display="outline" data-theme="dark">
 *   <button>Contact Us</button>
 * </umd-element-call-to-action>
 * ```
 *
 * @example
 * ```html
 * <!-- Link with additional text -->
 * <umd-element-call-to-action>
 *   <a href="/admissions" slot="text">View admission requirements</a>
 * </umd-element-call-to-action>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const registration: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
});

export default registration;
