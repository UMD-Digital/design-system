import { Styles } from 'utilities';

interface ElementStyles {
  element?: string;
  siblingAfter?: string;
  subElement?: string;
}

interface ElementConfigOptions {
  fontStyles?: Record<string, any>;
  elementStyles?: ElementStyles;
  isColorWhite?: boolean;
}

export interface ModifierProps extends ElementConfigOptions {
  className: string;
}

interface ElementConfig {
  styleModifiers?: (arg: ModifierProps) => string;
  elementModifiers?: ((element: HTMLElement) => void)[];
}

export interface ModelProps {
  config: ElementConfig;
  options?: ElementConfigOptions;
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

    const { elementStyles = {} } = options;

    let styles = this.createBaseStyles({
      className,
      elementStyles,
    });

    if (config.styleModifiers) {
      styles += config.styleModifiers({ ...options, className });
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

  private createBaseStyles({
    className,
    elementStyles,
  }: {
    className: string;
    elementStyles: ElementStyles;
  }): string {
    let styles = '';

    if (elementStyles.element) {
      styles += `
        .${className} { 
          ${elementStyles.element} 
        }
      `;
    }

    if (elementStyles.siblingAfter) {
      styles += `
        .${className} + * {
          ${elementStyles.siblingAfter}
        }
      `;
    }

    if (elementStyles.subElement) {
      styles += `
        .${className} * { 
          ${elementStyles.subElement} 
        }
      `;
    }

    return styles;
  }
}
