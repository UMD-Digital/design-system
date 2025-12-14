import { type AnnouncerConfig, type AnnouncerLegacyAPI, FeedStateEvent } from './_types';

/**
 * Creates an ARIA live region for screen reader announcements
 *
 * @param config - Announcer configuration
 * @returns HTMLElement configured as an ARIA live region
 *
 * @example
 * ```typescript
 * const announcer = createAnnouncerElement({
 *   message: 'Loading complete, 10 items found',
 *   politeness: 'polite'
 * });
 * document.body.appendChild(announcer);
 * ```
 */
export function createAnnouncerElement(config: AnnouncerConfig): HTMLElement {
  const { message, politeness = 'polite' } = config;

  const container = document.createElement('div');
  const textElement = document.createElement('p');

  container.setAttribute('aria-live', politeness);
  container.setAttribute('role', 'status');
  container.classList.add('sr-only');

  // Use textContent for security instead of innerHTML
  textElement.textContent = message;

  container.appendChild(textElement);

  return container;
}

/**
 * Announcer class for managing ARIA live regions
 *
 * Provides a reusable way to announce dynamic content changes to screen readers.
 *
 * @example
 * ```typescript
 * const announcer = new Announcer({ politeness: 'polite' });
 * document.body.appendChild(announcer.element);
 *
 * // Later, announce something
 * announcer.announce('20 new items loaded');
 *
 * // Cleanup when done
 * announcer.destroy();
 * ```
 */
export class Announcer {
  private element: HTMLElement;
  private textElement: HTMLElement;
  private politeness: 'polite' | 'assertive';

  constructor(config: Partial<AnnouncerConfig> = {}) {
    this.politeness = config.politeness || 'polite';

    // Create the live region
    this.element = document.createElement('div');
    this.element.setAttribute('aria-live', this.politeness);
    this.element.setAttribute('role', 'status');
    this.element.classList.add('sr-only');

    // Create text container
    this.textElement = document.createElement('p');
    this.element.appendChild(this.textElement);

    // Set initial message if provided
    if (config.message) {
      this.announce(config.message);
    }
  }

  /**
   * Announce a message to screen readers
   */
  announce(message: string): void {
    // Use textContent for security
    this.textElement.textContent = message;

    // Dispatch custom event for tracking
    this.element.dispatchEvent(
      new CustomEvent(FeedStateEvent.ANNOUNCEMENT, {
        bubbles: true,
        detail: {
          message,
          politeness: this.politeness,
          timestamp: Date.now(),
        },
      })
    );
  }

  /**
   * Clear the announcement
   */
  clear(): void {
    this.textElement.textContent = '';
  }

  /**
   * Change the politeness level
   */
  setPoliteness(politeness: 'polite' | 'assertive'): void {
    this.politeness = politeness;
    this.element.setAttribute('aria-live', politeness);
  }

  /**
   * Remove the announcer from DOM
   */
  destroy(): void {
    if (this.element.parentNode) {
      this.element.remove();
    }
  }

  /**
   * Get the announcer element
   */
  getElement(): HTMLElement {
    return this.element;
  }
}

// =============================================================================
// Backwards Compatible Exports (Legacy API)
// =============================================================================

/**
 * @deprecated Use Announcer class or createAnnouncerElement instead
 */
const create = (config: AnnouncerConfig): HTMLElement => {
  return createAnnouncerElement(config);
};

/**
 * @deprecated Use Announcer.announce() instead
 */
const update = ({
  container,
  message,
}: {
  container: HTMLElement;
  message: string;
}): void => {
  const element = container.querySelector(`[aria-live]`) as HTMLDivElement;
  const textElement = element?.querySelector('p');

  if (textElement) {
    textElement.textContent = message; // Use textContent for security
  }
};

/**
 * Legacy API for backwards compatibility
 * @deprecated Use Announcer class instead
 */
export default {
  create,
  update,
} as AnnouncerLegacyAPI;
