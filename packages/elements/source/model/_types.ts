// Base Types

export interface ElementStyles {
  element?: Record<string, any>;
  siblingAfter?: Record<string, any>;
  subElement?: Record<string, any>;
}

export interface StyleOptions {
  className: string;
  baseStyles?: Record<string, any>;
}

export interface ElementProps {
  element: HTMLElement;
  elementStyles?: ElementStyles;
  isThemeDark?: boolean;
}

// Configuration Types

export type ConfigurationProps = ElementProps & StyleOptions;

type ConfigurationStyles = ElementStyles & StyleOptions;

// Modifer Types

export interface StyleModifierProps extends ConfigurationStyles {
  isColorWhite?: boolean;
}

// Builder Types

export interface BuilderConfig {
  styleModifiers: (props: StyleModifierProps) => string;
  elementModifiers?: ((element: HTMLElement) => void)[];
}

export interface BuilderProps {
  config: BuilderConfig;
  options?: Omit<StyleModifierProps, 'className'>;
}
