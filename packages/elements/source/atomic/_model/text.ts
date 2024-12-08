import { Styles } from 'utilities';

interface ElementStyles {
  element?: string;
  siblingAfter?: string;
  subElement?: string;
}

export interface TextModelProps {
  element: HTMLElement;
  className: string;
  fontStyles?: Record<string, any>;
  additionalStyles?: ElementStyles;
  isColorWhite?: boolean;
}

export interface ElementConfigStyleProps extends TextModelProps {
  styles: string;
}

interface ElementConfig {
  type: string;
  styleModifiers?: ((arg: ElementConfigStyleProps) => string)[];
  elementModifiers?: ((arg: TextModelProps) => void)[];
}

export default class TextElementModel {
  private config: ElementConfig;

  constructor(config: ElementConfig) {
    this.config = config;
  }

  createElement(props: TextModelProps) {
    const config = this.config;
    if (!config) {
      throw new Error(`Unknown element type`);
    }

    const { element, className, fontStyles, additionalStyles = {} } = props;

    let styles = this.createBaseStyles({
      className,
      fontStyles,
      additionalStyles,
    });

    if (config.styleModifiers) {
      for (const modifier of config.styleModifiers) {
        styles = modifier({ styles, ...props });
      }
    }

    if (config.elementModifiers) {
      for (const modifier of config.elementModifiers) {
        modifier(props);
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
