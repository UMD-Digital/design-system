/**
 * Component registration utilities.
 *
 * Provides validated registration, idempotent same-constructor handling,
 * conflict detection, batch registration, and query helpers.
 */

import { isDev, createLogger } from '../utilities/debug';
import {
  ComponentRegistrationError,
  BatchRegistrationError,
} from './errors';

const TAG_NAME_RE = /^[a-z][a-z0-9]*(-[a-z0-9]+)+$/;

export interface RegisterOptions {
  /** Register immediately (true, default) or only when DOM elements exist (false). */
  eager?: boolean;
  /** Custom element registry. Defaults to `window.customElements`. */
  registry?: CustomElementRegistry;
}

/**
 * Validate and register a custom element.
 *
 * - Returns `true` on successful registration.
 * - Returns `false` if the same constructor is already registered (idempotent).
 * - Throws `ComponentRegistrationError` on conflict, invalid name, or missing constructor.
 */
export function registerComponent(
  tagName: string,
  element: CustomElementConstructor,
  options?: RegisterOptions,
): boolean {
  const registry = options?.registry ?? window.customElements;
  const eager = options?.eager ?? true;

  if (!element || typeof element !== 'function') {
    throw new ComponentRegistrationError(
      tagName,
      'missing-constructor',
      'Constructor is required and must be a function.',
    );
  }

  if (!TAG_NAME_RE.test(tagName)) {
    throw new ComponentRegistrationError(
      tagName,
      'invalid-name',
      `"${tagName}" is not a valid custom element name. Must match ${TAG_NAME_RE}.`,
    );
  }

  const existing = registry.get(tagName);
  if (existing) {
    if (existing === element) {
      return false;
    }
    throw new ComponentRegistrationError(
      tagName,
      'conflict',
      `Already registered with a different constructor.`,
      existing,
    );
  }

  if (!eager) {
    const hasElement = document.getElementsByTagName(tagName).length > 0;
    if (!hasElement) {
      if (isDev()) {
        const logger = createLogger(tagName);
        logger.debug('Lazy registration skipped — no DOM elements found.');
      }
      return false;
    }
  }

  registry.define(tagName, element);
  return true;
}

/**
 * Check whether a tag name is already registered.
 */
export function isComponentRegistered(
  tagName: string,
  registry?: CustomElementRegistry,
): boolean {
  return (registry ?? window.customElements).get(tagName) !== undefined;
}

/**
 * Promise that resolves when a tag name is defined.
 */
export function whenComponentDefined(
  tagName: string,
  registry?: CustomElementRegistry,
): Promise<CustomElementConstructor> {
  return (registry ?? window.customElements).whenDefined(tagName);
}

/**
 * Return the constructor for a registered tag, or `undefined`.
 */
export function getComponentConstructor(
  tagName: string,
  registry?: CustomElementRegistry,
): CustomElementConstructor | undefined {
  return (registry ?? window.customElements).get(tagName);
}

/**
 * Register multiple components. Attempts all registrations; throws
 * `BatchRegistrationError` if any fail (with per-component errors attached).
 */
export function registerComponents(
  components: Array<{ tagName: string; element: CustomElementConstructor }>,
  options?: RegisterOptions,
): void {
  const errors: ComponentRegistrationError[] = [];
  const succeeded: string[] = [];

  for (const { tagName, element } of components) {
    try {
      const result = registerComponent(tagName, element, options);
      if (result) {
        succeeded.push(tagName);
      }
    } catch (error) {
      if (error instanceof ComponentRegistrationError) {
        errors.push(error);
      } else {
        throw error;
      }
    }
  }

  if (errors.length > 0) {
    throw new BatchRegistrationError(errors, succeeded);
  }
}
