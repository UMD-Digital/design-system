import * as Utility from 'utilities';
import { modifiers } from './style';
import {
  type ElementProps,
  type BuilderProps,
  type BuilderConfig,
  type StyleModifierProps,
  type ConfigurationProps,
} from './_types';

interface styleObject {
  className: string | string[];
  [key: string]: any;
}

// Configuration
const CONFIG = {
  modifiers: {
    base: (props: StyleModifierProps) => [
      modifiers.baseStyles(props),
      modifiers.element(props),
      modifiers.elementChild(props),
      modifiers.elementSiblingAfter(props),
    ],
    default: (props: StyleModifierProps) => [
      ...CONFIG.modifiers.base(props),
      modifiers.textColor(props),
    ],
    withChildLink: (props: StyleModifierProps) => [
      ...CONFIG.modifiers.default(props),
      modifiers.childLink(props),
    ],
    withAnimationLink: (props: StyleModifierProps) => [
      ...CONFIG.modifiers.default(props),
      modifiers.animationLink(props),
    ],
    withoutTextColor: (props: StyleModifierProps) => [
      ...CONFIG.modifiers.base(props),
    ],
  },

  builders: {
    action: {
      styleModifiers: (props: StyleModifierProps) =>
        Utility.styles.combineStyles(
          ...CONFIG.modifiers.withoutTextColor(props),
        ),
    },

    animationLine: {
      styleModifiers: (props: StyleModifierProps) =>
        Utility.styles.combineStyles(
          ...CONFIG.modifiers.withAnimationLink(props),
        ),
      elementModifiers: [
        (element: HTMLElement) =>
          Utility.markup.modify.wrapTextNodeInSpan(element),
      ],
    },

    base: {
      styleModifiers: (props: StyleModifierProps) =>
        Utility.styles.combineStyles(...CONFIG.modifiers.base(props)),
    },

    childLink: {
      styleModifiers: (props: StyleModifierProps) =>
        Utility.styles.combineStyles(...CONFIG.modifiers.withChildLink(props)),
    },

    default: {
      styleModifiers: (props: StyleModifierProps) =>
        Utility.styles.combineStyles(...CONFIG.modifiers.default(props)),
    },
  },
};

// Model

class ElementBuilder {
  private className: string;
  private element: HTMLElement;

  constructor(className: string, element: HTMLElement) {
    this.className = className;
    this.element = element;
  }

  createElement(props: BuilderProps) {
    const { config, options = {} } = props;
    const className = this.className;
    const element = this.element;

    if (!className || !element) {
      throw new Error(`element & className is required for Element Builder`);
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

// Helper Functions

const createElementBuild = (
  props: ConfigurationProps,
  config: BuilderConfig,
) => {
  const { element, className, elementStyles, ...rest } = props;

  return new ElementBuilder(className, element).createElement({
    config,
    options: {
      ...elementStyles,
      ...rest,
    },
  });
};

const createElementWithConfig = (
  props: ElementProps,
  stylesObj: styleObject,
  builderType: keyof typeof CONFIG.builders,
) => {
  const { className, ...baseStyles } = stylesObj;
  const config = CONFIG.builders[builderType];

  if (Array.isArray(className)) {
    return createElementBuild(
      { ...props, className: className[0], baseStyles },
      config,
    );
  }

  return createElementBuild({ ...props, className, baseStyles }, config);
};

const createElementFactory = (builderType: keyof typeof CONFIG.builders) => {
  return (props: ElementProps, stylesObj: styleObject) =>
    createElementWithConfig(props, stylesObj, builderType);
};

// Create Elements

type ElementFactoryFn = (
  props: ElementProps,
  stylesObj: styleObject,
) => ReturnType<typeof createElementBuild>;

type StyledElementCreator = ElementFactoryFn & {
  [K in keyof typeof CONFIG.builders]: ElementFactoryFn;
};

const createStyledElementFn = createElementFactory(
  'default',
) as StyledElementCreator;

(Object.keys(CONFIG.builders) as Array<keyof typeof CONFIG.builders>).forEach(
  (key) => {
    createStyledElementFn[key] = createElementFactory(key);
  },
);

createStyledElementFn.default = createStyledElementFn;

export const createStyledElement = createStyledElementFn;
