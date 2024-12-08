import { Animations } from '@universityofmaryland/variables';
import { MarkupModify, Styles } from 'utilities';

interface ElementStyles {
  element?: string;
  siblingAfter?: string;
  subElement?: string;
}

interface BaseElementProps {
  element: HTMLElement;
  fontStyle: Record<string, any>;
  additionalStyles?: ElementStyles;
  isColorWhite?: boolean;
}

interface ElementConfig {
  styleModifiers?: ((styles: string, props: BaseElementProps) => string)[];
  elementModifiers?: ((
    element: HTMLElement,
    props: BaseElementProps,
  ) => void)[];
}

class ElementFactory {
  private configs: Map<string, ElementConfig> = new Map();

  registerElementType(type: string, config: ElementConfig): void {
    this.configs.set(type, config);
  }

  createElement(type: string, props: BaseElementProps) {
    const config = this.configs.get(type);
    if (!config) {
      throw new Error(`Unknown element type: ${type}`);
    }

    const { element, fontStyle, additionalStyles = {} } = props;
    const { class: className, ...fontStyles } = fontStyle;

    let styles = this.createBaseStyles(className, fontStyles, additionalStyles);

    if (config.styleModifiers) {
      for (const modifier of config.styleModifiers) {
        styles = modifier(styles, props);
      }
    }

    if (config.elementModifiers) {
      for (const modifier of config.elementModifiers) {
        modifier(element, props);
      }
    }

    element.classList.add(className);

    return {
      element,
      className,
      styles,
    };
  }

  private createBaseStyles(
    className: string,
    fontStyles: Record<string, any>,
    additionalStyles: ElementStyles,
  ): string {
    let styles = Styles.ConvertJSSObjectToStyles({
      styleObj: {
        [`.${className}`]: fontStyles,
      },
    });

    if (additionalStyles.element) {
      styles += `.${className} { ${additionalStyles.element} }`;
    }

    if (additionalStyles.siblingAfter) {
      styles += `.${className} + * { ${additionalStyles.siblingAfter} }`;
    }

    if (additionalStyles.subElement) {
      styles += `.${className} * { ${additionalStyles.subElement} }`;
    }

    return styles;
  }
}

const headlineModifiers = {
  styleModifiers: [
    (styles: string, props: BaseElementProps) => {
      const {
        fontStyle: { class: className, ...fontStyles },
      } = props;
      return (
        styles +
        Styles.ConvertJSSObjectToStyles({
          styleObj: {
            [`.${className} *`]: fontStyles,
          },
        })
      );
    },
    (styles: string, props: BaseElementProps) => {
      const {
        fontStyle: { class: className },
      } = props;
      return (
        styles +
        Styles.ConvertJSSObjectToStyles({
          styleObj: {
            [`.${className} a`]: Animations.Link.LineSlideUnder.black,
          },
        })
      );
    },
  ],
  elementModifiers: [
    (element: HTMLElement) => {
      MarkupModify.AnimationLinkSpan({ element });
    },
  ],
};

// Example usage:
const factory = new ElementFactory();

// Register different element types
factory.registerElementType('headline', headlineModifiers);
factory.registerElementType('text', {
  styleModifiers: [
    // Add text-specific style modifications
  ],
  elementModifiers: [
    // Add text-specific element modifications
  ],
});

// Create elements
const headline = factory.createElement('headline', {
  element: document.createElement('h1'),
  fontStyle: {
    class: 'my-headline',
    fontSize: '2rem',
    lineHeight: 1.5,
  },
  additionalStyles: {
    element: 'margin-bottom: 1rem;',
  },
});
