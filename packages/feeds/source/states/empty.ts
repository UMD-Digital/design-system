import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { Atomic } from '@universityofmaryland/web-elements-library';
import * as Styles from '@universityofmaryland/web-styles-library';
import { theme } from '@universityofmaryland/web-utilities-library/theme';

import { type ElementModel } from '../_types';
import { type EmptyStateConfig, FeedStateEvent } from './_types';

/**
 * Creates an empty/no results state element
 *
 * @param config - Empty state configuration
 * @returns ElementModel with empty state UI
 *
 * @example
 * ```typescript
 * const empty = createEmptyElement({
 *   message: 'No events found',
 *   linkUrl: 'https://calendar.umd.edu',
 *   linkText: 'View all events'
 * });
 * container.appendChild(empty.element);
 * ```
 */
export function createEmptyElement(config: EmptyStateConfig = {}): ElementModel {
  const {
    message = 'No results found',
    linkUrl,
    linkText,
    isThemeDark = false,
    isAlignedCenter = true,
  } = config;

  const headline = new ElementBuilder(document.createElement('p'))
    .styled(Styles.typography.sans.compose('extralarge'))
    .withStyles({
      element: {
        textTransform: 'uppercase',
        color: theme.foreground(isThemeDark),
      },
    })
    .build();

  // Use textContent for security instead of innerHTML
  headline.element.textContent = message;

  const composite = new ElementBuilder()
    .styled(Styles.layout.grid.stacked)
    .withChild(headline)
    .withStyles({
      element: {
        [`& *`]: {
          textAlign: isAlignedCenter ? 'center' : 'left',
        },
        [`& *:not(:first-child)`]: {
          marginTop: `${Styles.token.spacing.md}`,
        },
      },
    });

  // Add optional CTA link
  if (linkUrl && linkText) {
    const link = document.createElement('a');
    link.textContent = linkText; // Use textContent for security
    link.setAttribute('href', linkUrl);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');

    const ctaButton = Atomic.actions.options({
      element: link,
      isTypeOutline: true,
      isThemeDark,
    });

    composite.withChild(ctaButton);
  }

  return composite.build();
}

/**
 * Empty state manager class
 *
 * Manages the display of empty/no results state with optional CTA.
 *
 * @example
 * ```typescript
 * const empty = new EmptyState({
 *   message: 'No articles found',
 *   linkUrl: 'https://today.umd.edu',
 *   linkText: 'View all articles'
 * });
 * empty.render(container);
 * ```
 */
export class EmptyState {
  private model: ElementModel;
  private container: HTMLElement | null = null;
  private config: EmptyStateConfig;

  constructor(config: EmptyStateConfig = {}) {
    this.config = config;
    this.model = createEmptyElement(config);
  }

  /**
   * Render the empty state in a container
   */
  render(container: HTMLElement): void {
    this.container = container;
    container.appendChild(this.model.element);

    container.dispatchEvent(
      new CustomEvent(FeedStateEvent.EMPTY_SHOWN, {
        bubbles: true,
        detail: {
          message: this.config.message,
          timestamp: Date.now(),
        },
      })
    );
  }

  /**
   * Update the empty state message
   */
  updateMessage(message: string): void {
    const headline = this.model.element.querySelector('p');
    if (headline) {
      headline.textContent = message;
      this.config.message = message;
    }
  }

  /**
   * Remove the empty state from DOM
   */
  destroy(): void {
    if (this.model.element.parentNode) {
      this.model.element.remove();
    }
    this.container = null;
  }

  /**
   * Get the empty state element
   */
  get element(): HTMLElement {
    return this.model.element;
  }

  /**
   * Get the empty state styles
   */
  get styles(): string {
    return this.model.styles;
  }
}

