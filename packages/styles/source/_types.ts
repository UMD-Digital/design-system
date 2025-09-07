/**
 * Interface for a JSS entry with className and other properties.
 */
export interface JssEntry {
  className: string | string[];
  [key: string]: any;
}

/**
 * A JSS object that represents a styled component.
 * This is the standard object format used throughout the design system.
 */
export interface JssObject {
  className: string | string[];
  [key: string]: any;
}

/**
 * Input format for JSS objects.
 */
export interface JssInputFormat {
  [key: string]: JssEntry;
}

/**
 * Output format for JSS objects with class names as keys.
 */
export interface JssNamedOutputFormat {
  [className: string]: {
    [key: string]: any;
  };
}
