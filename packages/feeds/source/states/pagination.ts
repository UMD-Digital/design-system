import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';

import { type ElementModel } from '../_types';
import {
  type PaginationStateConfig,
  type PaginationLegacyAPI,
  FeedStateEvent,
} from './_types';

/**
 * Creates a pagination "Load more" button element
 *
 * @param config - Pagination state configuration
 * @returns ElementModel with load more button, or undefined if pagination not needed
 *
 * @example
 * ```typescript
 * const pagination = createPaginationElement({
 *   callback: () => loadMoreItems(),
 *   isThemeDark: false,
 *   isLazyLoad: true,
 *   totalEntries: 50,
 *   offset: 10
 * });
 * if (pagination) {
 *   container.appendChild(pagination.element);
 * }
 * ```
 */
export function createPaginationElement(
  config: PaginationStateConfig
): ElementModel | undefined {
  const { callback, isLazyLoad, totalEntries, offset } = config;

  // Guard clauses for when pagination is not needed
  if (!isLazyLoad) return;
  if (!totalEntries) return;
  if (!offset) return;
  if (!callback) return;
  if (offset >= totalEntries) return;

  const button = document.createElement('button');
  button.textContent = 'Load more'; // Use textContent for security
  button.addEventListener('click', () => {
    callback();
    button.dispatchEvent(
      new CustomEvent(FeedStateEvent.PAGINATION_LOADED, {
        bubbles: true,
        detail: {
          offset,
          totalEntries,
          timestamp: Date.now(),
        },
      })
    );
  });

  const ctaButton = new ElementBuilder(button)
    .styled(Styles.element.action.outline.normal)
    .build();

  return new ElementBuilder()
    .styled(Styles.layout.alignment.block.center)
    .withChild(ctaButton)
    .withStyles({
      element: {
        marginTop: `${Styles.token.spacing.lg}`,
      },
    })
    .build();
}

/**
 * Pagination state manager class
 *
 * Manages a "Load more" button for paginated feed content.
 *
 * @example
 * ```typescript
 * const pagination = new PaginationState({
 *   callback: () => loadMore(),
 *   isLazyLoad: true,
 *   totalEntries: 50,
 *   offset: 10
 * });
 *
 * const button = pagination.render(container);
 * if (button) {
 *   // Pagination was rendered
 * }
 *
 * // Later, update state
 * pagination.updateState(20, 50);
 * ```
 */
export class PaginationState {
  private config: PaginationStateConfig;
  private model: ElementModel | undefined;
  private container: HTMLElement | null = null;

  constructor(config: PaginationStateConfig) {
    this.config = config;
    this.model = createPaginationElement(config);
  }

  /**
   * Render the pagination button if applicable
   * @returns ElementModel if rendered, undefined otherwise
   */
  render(container: HTMLElement): ElementModel | undefined {
    if (this.model) {
      this.container = container;
      container.appendChild(this.model.element);
    }
    return this.model;
  }

  /**
   * Remove the pagination button from DOM
   */
  remove(): void {
    if (this.model && this.model.element.parentNode) {
      this.model.element.remove();
    }
  }

  /**
   * Update pagination state with new offset and total
   * Re-creates button if needed
   */
  updateState(offset: number, totalEntries: number): void {
    this.config.offset = offset;
    this.config.totalEntries = totalEntries;

    // Remove old button
    this.remove();

    // Create new button if still needed
    this.model = createPaginationElement(this.config);

    // Re-render if we have a container
    if (this.container && this.model) {
      this.container.appendChild(this.model.element);
    }
  }

  /**
   * Check if more items are available to load
   */
  hasMore(): boolean {
    const { offset, totalEntries } = this.config;
    return !!(totalEntries && offset < totalEntries);
  }

  /**
   * Cleanup and remove pagination
   */
  destroy(): void {
    this.remove();
    this.container = null;
  }

  /**
   * Get the pagination element if it exists
   */
  get element(): HTMLElement | undefined {
    return this.model?.element;
  }

  /**
   * Get the pagination styles if element exists
   */
  get styles(): string | undefined {
    return this.model?.styles;
  }
}

// =============================================================================
// Backwards Compatible Exports (Legacy API)
// =============================================================================

/**
 * @deprecated Use PaginationState class or createPaginationElement instead
 */
const create = (config: PaginationStateConfig): ElementModel | undefined => {
  return createPaginationElement(config);
};

/**
 * @deprecated Use PaginationState.remove() instead
 */
const remove = ({ container }: { container: HTMLElement }): void => {
  const button = container.querySelector(
    `.${Styles.layout.alignment.block.center.className}`
  ) as HTMLDivElement;

  if (button) button.remove();
};

/**
 * Legacy API for backwards compatibility
 * @deprecated Use PaginationState class instead
 */
export default {
  remove,
  create,
} as PaginationLegacyAPI;
