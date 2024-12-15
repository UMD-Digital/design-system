// Base Types

export interface ElementStyles {
  element?: Record<string, any>;
  siblingAfter?: Record<string, any>;
  subElement?: Record<string, any>;
}

export interface FontOptions {
  className: string;
  fontStyles?: Record<string, any>;
}

export interface ElementProps {
  element: HTMLElement;
  elementStyles: ElementStyles;
  isThemeDark?: boolean;
}

// Modifer Types

export interface StyleModifierProps extends ElementStyles {
  fontStyles?: Record<string, any>;
  isColorWhite?: boolean;
  className: string;
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

// Configuration Types

export type ConfigurationProps = ElementProps & FontOptions;
