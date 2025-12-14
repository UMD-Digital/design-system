import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { token } from '@universityofmaryland/web-styles-library';

import { type ElementModel } from '../_types';
import {
  type LoadingStateConfig,
  type LoaderLegacyAPI,
  FeedStateEvent,
} from './_types';

const ID_UMD_LOADER = 'umd-loader-container';

const keyframes = `
  @keyframes loader-first-animation {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes loader-last-animation {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }

  @keyframes loader-middle-animation {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;

/**
 * Creates a loading spinner element model
 *
 * @param config - Loading state configuration
 * @returns ElementModel with loading spinner
 *
 * @example
 * ```typescript
 * const loading = createLoadingElement({ isThemeDark: false });
 * container.appendChild(loading.element);
 * ```
 */
export function createLoadingElement(config: LoadingStateConfig = {}): ElementModel {
  const { isThemeDark = false } = config;

  const defaultDotStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: isThemeDark ? token.color.gray.light : token.color.gray.dark,
    animationTimingFunction: 'cubic-bezier(0, 1, 1, 0)',
  };

  const innerElmOne = new ElementBuilder()
    .withClassName(`${ID_UMD_LOADER}-one`)
    .withStyles({
      element: {
        ...defaultDotStyles,
        left: '5px',
        animation: 'loader-first-animation 0.6s infinite',
      },
    })
    .build();

  const innerElmTwo = new ElementBuilder()
    .withClassName(`${ID_UMD_LOADER}-two`)
    .withStyles({
      element: {
        ...defaultDotStyles,
        left: '5px',
        animation: 'loader-middle-animation 0.6s infinite',
      },
    })
    .build();

  const innerElmThree = new ElementBuilder()
    .withClassName(`${ID_UMD_LOADER}-three`)
    .withStyles({
      element: {
        ...defaultDotStyles,
        left: '24px',
        animation: 'loader-middle-animation 0.6s infinite',
      },
    })
    .build();

  const innerElmFour = new ElementBuilder()
    .withClassName(`${ID_UMD_LOADER}-four`)
    .withStyles({
      element: {
        ...defaultDotStyles,
        left: '45px',
        animation: 'loader-last-animation 0.6s infinite',
      },
    })
    .build();

  const wrapper = new ElementBuilder()
    .withClassName(`${ID_UMD_LOADER}-wrapper`)
    .withChild(innerElmOne)
    .withChild(innerElmTwo)
    .withChild(innerElmThree)
    .withChild(innerElmFour)
    .withStyles({
      element: {
        position: 'relative',
      },
    })
    .build();

  const composite = new ElementBuilder()
    .withClassName(ID_UMD_LOADER)
    .withChild(wrapper)
    .withStyles({
      element: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 0',
        minHeight: '40px',
        position: 'relative',
        gridColumn: '1 / -1',
      },
    })
    .build();

  composite.styles += keyframes;

  return composite;
}

/**
 * Loading state manager class
 *
 * Manages the lifecycle of a loading spinner with show/hide functionality.
 *
 * @example
 * ```typescript
 * const loading = new LoadingState({ isThemeDark: false });
 * loading.show(container);
 * // ... async operation
 * loading.hide();
 * ```
 */
export class LoadingState {
  private model: ElementModel;
  private container: HTMLElement | null = null;
  private isVisible: boolean = false;

  constructor(config: LoadingStateConfig = {}) {
    this.model = createLoadingElement(config);
  }

  /**
   * Show the loading spinner in a container
   */
  show(container: HTMLElement): void {
    if (!this.isVisible) {
      this.container = container;
      container.appendChild(this.model.element);
      this.isVisible = true;

      container.dispatchEvent(
        new CustomEvent(FeedStateEvent.LOADING_START, {
          bubbles: true,
          detail: { timestamp: Date.now() },
        })
      );
    }
  }

  /**
   * Hide and remove the loading spinner
   */
  hide(): void {
    if (this.isVisible && this.model.element.parentNode) {
      this.model.element.remove();
      this.isVisible = false;

      if (this.container) {
        this.container.dispatchEvent(
          new CustomEvent(FeedStateEvent.LOADING_END, {
            bubbles: true,
            detail: { timestamp: Date.now() },
          })
        );
      }
    }
  }

  /**
   * Cleanup and remove the loading spinner
   */
  destroy(): void {
    this.hide();
    this.container = null;
  }

  /**
   * Get the loading spinner element
   */
  get element(): HTMLElement {
    return this.model.element;
  }

  /**
   * Get the loading spinner styles
   */
  get styles(): string {
    return this.model.styles;
  }
}

// =============================================================================
// Backwards Compatible Exports (Legacy API)
// =============================================================================

/**
 * @deprecated Use LoadingState class instead
 */
const create = (config: LoadingStateConfig = {}): ElementModel => {
  return createLoadingElement(config);
};

/**
 * @deprecated Use LoadingState.show() instead
 */
const display = ({
  container,
  isThemeDark,
}: {
  container: HTMLElement;
  isThemeDark?: boolean;
}): void => {
  const loading = createLoadingElement({ isThemeDark });
  container.appendChild(loading.element);
};

/**
 * @deprecated Use LoadingState.hide() instead
 */
const remove = ({ container }: { container: HTMLElement }): void => {
  const loader = container.querySelector(`.${ID_UMD_LOADER}`) as HTMLDivElement;
  if (loader) loader.remove();
};

/**
 * Legacy API for backwards compatibility
 * @deprecated Use LoadingState class instead
 */
export default {
  create,
  display,
  remove,
} as LoaderLegacyAPI;
