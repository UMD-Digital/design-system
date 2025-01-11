import { atomic } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';

const { callToAction } = atomic;

const tagName = 'umd-element-call-to-action';

const createComponent = (element: HTMLElement) => {
  const button = element.querySelector('button') as HTMLButtonElement;
  const link = element.querySelector('a:not([slot])') as HTMLAnchorElement;
  const plainText = element.querySelector(`[slot="plain-text"]`) as HTMLElement;

  if (!button && !link) {
    console.error('Call to action element requires a button or link');
  }

  return callToAction.options({
    element: link || button,
    isTypeOutline: Attributes.isType.outline({ element }),
    isTypePrimary: Attributes.isType.primary({ element }),
    isTypeSecondary: Attributes.isType.secondary({ element }),
    isSizeLarge: Attributes.isVisual.sizeLarge({ element }),
    isThemeDark: Attributes.isTheme.dark({ element }),
    isThemeGold: Attributes.isTheme.gold({ element }),
    elementStyles: Attributes.getValue.styleProps({ element }),
    plainText,
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
