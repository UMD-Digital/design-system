import { Styles } from 'utilities';

interface ElementStyles {
  element?: string;
  siblingAfter?: string;
  subElement?: string;
}

interface ElementConfigOptions {
  fontStyles?: Record<string, any>;
  additionalStyles?: ElementStyles;
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

    const { fontStyles = {}, additionalStyles = {} } = options;

    let styles = this.createBaseStyles({
      className,
      fontStyles,
      additionalStyles,
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
    fontStyles,
    additionalStyles,
  }: {
    className: string;
    fontStyles?: Record<string, any>;
    additionalStyles: ElementStyles;
  }): string {
    let styles = '';

    if (fontStyles) {
      styles += Styles.ConvertJSSObjectToStyles({
        styleObj: {
          [`.${className}`]: fontStyles,
        },
      });
    }

    if (additionalStyles.element) {
      styles += `
        .${className} { 
          ${additionalStyles.element} 
        }
      `;
    }

    if (additionalStyles.siblingAfter) {
      styles += `
        .${className} + * {
          ${additionalStyles.siblingAfter}
        }
      `;
    }

    if (additionalStyles.subElement) {
      styles += `
        .${className} * { 
          ${additionalStyles.subElement} 
        }
      `;
    }

    return styles;
  }
}
