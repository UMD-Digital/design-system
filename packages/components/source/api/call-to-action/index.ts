import { atomic } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';

const { callToAction } = atomic;

const tagName = 'umd-element-call-to-action';

const createComponent = (element: HTMLElement) => {
  const interactiveElement = element.querySelector('button, a:not([slot])');
  const plainTextSlot = element.querySelector(
    `[slot="plain-text"]`,
  ) as HTMLElement;

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

  if (plainTextSlot) {
    // To Do - Implement Plain Text Slot with Text slot
    const plainText = Slots.deprecated.plainText({ element });

    return callToAction.options({
      ...optionProps,
      plainText,
    });
  }

  return callToAction.options({
    ...optionProps,
  });
};

const Load = () => {
  const element = Model.createCustomElement({
    tagName,
    createComponent,
  });

  if (element) {
    Register.registerWebComponent({
      name: tagName,
      element,
    });
  }
};

export default {
  Load,
};
