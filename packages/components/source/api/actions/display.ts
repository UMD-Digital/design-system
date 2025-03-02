import { Atomic } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';

const { actions } = Atomic;

const tagName = 'umd-element-call-to-action';

const createComponent = (element: HTMLElement) => {
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

const slots = {
  text: {
    allowedElements: ['a'],
  },
  plainText: {
    deprecated:
      'Use "text" instead. This attribute will be removed in version 2.0.',
    allowedElements: ['a'],
  },
};

export default () => {
  const element = Model.createCustomElement({
    tagName,
    slots,
    createComponent,
  });

  if (element) {
    Register.registerWebComponent({
      name: tagName,
      element,
    });
  }
};
