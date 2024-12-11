import {
  type ElementStyleOptions,
  type ModifierProps,
} from '../_modifiers/style';

interface ElementConfig {
  styleModifiers?: (arg: ModifierProps) => string;
  elementModifiers?: ((element: HTMLElement) => void)[];
}

export interface ModelProps {
  config: ElementConfig;
  options?: ElementStyleOptions;
}

export interface ElementConfigStyleProps extends ModelProps {
  styles: string;
}

export default class TextElementModel {
  private className: string;
  private element: HTMLElement;

  constructor(className: string, element: HTMLElement) {
    this.className = className;
    this.element = element;
  }

  createElement(props: ModelProps) {
    const { config, options = {} } = props;
    const className = this.className;
    const element = this.element;

    if (!className || !element) {
      throw new Error(`element & className is required for TextElementModel`);
    }

    let styles = '';

    if (config.styleModifiers) {
      styles += config.styleModifiers({ className, ...options });
    }

    if (config.elementModifiers) {
      for (const modifier of config.elementModifiers) {
        modifier(element);
      }
    }

    element.classList.add(className);

    return {
      element,
      className,
      styles,
    };
  }
}
