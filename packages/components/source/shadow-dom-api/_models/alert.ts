import { Model, Register, Slots } from 'shadow-dom-model';

interface AlertBaseProps {
  headline: HTMLElement | null;
  text: HTMLElement | null;
  actions: HTMLElement | null;
}

interface AlertSiteProps extends AlertBaseProps {
  daysToHide: string;
}

interface AlertPageProps extends AlertBaseProps {
  isThemeLight: boolean;
  isThemeDark: boolean;
  isShowIcon: boolean;
}

interface AlertBannerProps extends AlertBaseProps {
  includeSeal: boolean;
  isThemeDark: boolean;
}

interface AlertProps extends AlertBaseProps {
  isThemeDark: boolean;
  alertUrl: string | null;
}

type AlertRenderer<T> = (props: T) => Model.ElementRef;

interface AlertConfig<T extends AlertBaseProps> {
  tagName: string;
  renderer: AlertRenderer<T>;
  getAdditionalProps?: (element: HTMLElement) => Partial<T>;
}

const slots = {
  headline: {
    allowedElements: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'],
  },
  body: {
    allowedElements: ['div', 'p'],
    deprecated:
      'Use "text" instead. This attribute will be removed in version 2.0.',
  },
  text: {
    allowedElements: ['div', 'p'],
  },
};

const createBaseProps = (element: HTMLElement): AlertBaseProps => ({
  headline: Slots.defined.headline({ element }),
  text:
    Slots.defined.body({ element, isDefaultStyling: true }) ||
    Slots.defined.text({ element, isDefaultStyling: true }),
  actions: Slots.defined.actions({ element }),
});

const createAlertComponent = <T extends AlertBaseProps>({
  tagName,
  renderer,
  getAdditionalProps = () => ({}),
}: AlertConfig<T>) => {
  const createComponent = (element: HTMLElement) => {
    const baseProps = createBaseProps(element);
    const additionalProps = getAdditionalProps(element);

    return renderer({
      ...baseProps,
      ...additionalProps,
    } as T);
  };

  const Load = () => {
    Register.registerWebComponent({
      name: tagName,
      element: Model.createCustomElement({
        tagName,
        slots,
        createComponent,
      }),
    });
  };

  return { Load };
};

export {
  createAlertComponent,
  type AlertBaseProps,
  type AlertSiteProps,
  type AlertPageProps,
  type AlertBannerProps,
  type AlertProps,
};
