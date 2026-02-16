declare global {
  interface Window {
    __UMD_DEV__?: boolean;
  }
}

/**
 * Check if the current environment is development mode.
 *
 * - `window.__UMD_DEV__ === true` (strict boolean check)
 * - `process.env.NODE_ENV === 'development'` (replaced at build time by Vite)
 * - Returns `false` by default
 */
export function isDev(): boolean {
  if (typeof window !== 'undefined' && window.__UMD_DEV__ === true) {
    return true;
  }

  try {
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
      return true;
    }
  } catch {
    // Bundler edge cases where process is defined but access throws
  }

  return false;
}

export interface Logger {
  debug: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  group: (...args: unknown[]) => void;
  groupEnd: () => void;
}

/**
 * Create a prefixed logger for a component.
 *
 * - `warn` / `error` always log
 * - `debug` / `info` / `group` / `groupEnd` are gated by `isDev()`
 */
export function createLogger(componentName: string): Logger {
  const prefix = `[UMD-DS:${componentName}]`;

  return {
    debug: (...args: unknown[]) => {
      if (isDev()) console.debug(prefix, ...args);
    },
    info: (...args: unknown[]) => {
      if (isDev()) console.info(prefix, ...args);
    },
    warn: (...args: unknown[]) => {
      console.warn(prefix, ...args);
    },
    error: (...args: unknown[]) => {
      console.error(prefix, ...args);
    },
    group: (...args: unknown[]) => {
      if (isDev()) console.group(prefix, ...args);
    },
    groupEnd: () => {
      if (isDev()) console.groupEnd();
    },
  };
}

type Constructor<T = HTMLElement> = new (...args: any[]) => T;

/**
 * Mixin that adds lifecycle debug logging to a custom element class.
 *
 * Wraps `connectedCallback`, `disconnectedCallback`, and `attributeChangedCallback`
 * with logger output. Logging is gated by `isDev()`.
 */
const debugLoggerKey = Symbol('debugLogger');

export function withLifecycleDebug<T extends Constructor>(Base: T) {
  return class LifecycleDebug extends Base {
    [debugLoggerKey]: Logger;

    constructor(...args: any[]) {
      super(...args);
      const tag = (this as unknown as HTMLElement).tagName?.toLowerCase() ?? 'unknown';
      this[debugLoggerKey] = createLogger(tag);
    }

    connectedCallback() {
      this[debugLoggerKey].debug('connectedCallback');
      const superProto = Object.getPrototypeOf(Object.getPrototypeOf(this));
      if (typeof superProto?.connectedCallback === 'function') {
        superProto.connectedCallback.call(this);
      }
    }

    disconnectedCallback() {
      this[debugLoggerKey].debug('disconnectedCallback');
      const superProto = Object.getPrototypeOf(Object.getPrototypeOf(this));
      if (typeof superProto?.disconnectedCallback === 'function') {
        superProto.disconnectedCallback.call(this);
      }
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
      this[debugLoggerKey].debug('attributeChangedCallback', { name, oldValue, newValue });
      const superProto = Object.getPrototypeOf(Object.getPrototypeOf(this));
      if (typeof superProto?.attributeChangedCallback === 'function') {
        superProto.attributeChangedCallback.call(this, name, oldValue, newValue);
      }
    }
  };
}
