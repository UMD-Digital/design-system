// Base Types

interface ElementColors {
  isTextColorWhite?: boolean;
  isTextColorBlack?: boolean;
  isColorWhite?: boolean;
  isColorBlack?: boolean;
  isColorRed?: boolean;
}

export interface ElementStyles {
  element?: Record<string, any>;
  siblingAfter?: Record<string, any>;
  subElement?: Record<string, any>;
}

export interface StyleOptions {
  className: string;
  baseStyles?: Record<string, any>;
}

export interface ElementProps extends ElementColors {
  element: HTMLElement;
  elementStyles?: ElementStyles;
  isThemeDark?: boolean;
}

// Configuration Types

export type ConfigurationProps = ElementProps & StyleOptions;

type ConfigurationStyles = ElementStyles & StyleOptions & ElementColors;

// Modifer Types

export interface StyleModifierProps extends ConfigurationStyles {}

// Builder Types

export interface BuilderConfig {
  styleModifiers: (props: StyleModifierProps) => string;
  elementModifiers?: ((element: HTMLElement) => void)[];
}

export interface BuilderProps {
  config: BuilderConfig;
  options?: Omit<StyleModifierProps, 'className'>;
}
