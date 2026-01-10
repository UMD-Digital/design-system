import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';

/**
 * Options for lazy loading image wrapper
 */
export interface LazyImageOptions {
  /** The image element to lazy load */
  image: HTMLImageElement;
  /** Optional placeholder element to show while loading */
  placeholder?: HTMLElement;
  /** IntersectionObserver root margin. Defaults to '50px' */
  rootMargin?: string;
  /** IntersectionObserver threshold. Defaults to 0.1 */
  threshold?: number;
  /** Callback when image starts loading */
  onLoadStart?: () => void;
  /** Callback when image finishes loading */
  onLoad?: () => void;
  /** Callback when image fails to load */
  onError?: (error: Event) => void;
  /** Optional custom styles for the wrapper */
  wrapperStyles?: Record<string, any>;
}

/**
 * Return type for lazy image element
 */
export interface LazyImageResult {
  /** The wrapper element */
  element: HTMLElement;
  /** Associated CSS styles */
  styles: string;
  /** Manually trigger loading (useful for programmatic control) */
  load: () => void;
  /** Check if image has been loaded */
  isLoaded: () => boolean;
  /** Disconnect the observer and cleanup */
  destroy: () => void;
}

/**
 * Wrapper container styles
 */
const wrapperBaseStyles = {
  className: 'umd-asset-image-lazy',
  position: 'relative' as const,
  display: 'inline-block',
  overflow: 'hidden',
};

/**
 * Default placeholder styles for lazy loading
 */
const placeholderBaseStyles = {
  className: 'umd-asset-image-lazy-placeholder',
  position: 'absolute' as const,
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: '#f0f0f0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'opacity 0.3s ease-in-out',
};

/**
 * Creates a lazy loading wrapper for images using IntersectionObserver.
 * Defers image loading until the element enters the viewport.
 *
 * @param options - Configuration options for lazy loading
 * @returns LazyImageResult with element, styles, and control methods
 *
 * @example
 * ```typescript
 * import { createLazyImage } from '@universityofmaryland/web-elements-library/atomic';
 *
 * const img = document.createElement('img');
 * img.src = 'large-image.jpg';
 *
 * const lazyImage = createLazyImage({
 *   image: img,
 *   onLoad: () => console.log('Image loaded'),
 * });
 *
 * document.body.appendChild(lazyImage.element);
 * ```
 */
export const createLazyImage = (options: LazyImageOptions): LazyImageResult => {
  const {
    image,
    placeholder,
    rootMargin = '50px',
    threshold = 0.1,
    onLoadStart,
    onLoad,
    onError,
    wrapperStyles = {},
  } = options;

  // State tracking
  let isLoaded = false;
  let observer: IntersectionObserver | null = null;

  // Store original src and prevent immediate loading
  const originalSrc = image.src;
  const originalSrcset = image.srcset;

  // Clear src to prevent loading
  image.removeAttribute('src');
  image.removeAttribute('srcset');

  // Add data attributes for restoration
  image.setAttribute('data-lazy-src', originalSrc);
  if (originalSrcset) {
    image.setAttribute('data-lazy-srcset', originalSrcset);
  }

  // Initially hide the image
  image.style.opacity = '0';
  image.style.transition = 'opacity 0.3s ease-in-out';

  // Create placeholder if not provided
  const placeholderElement =
    placeholder ||
    new ElementBuilder('div')
      .withClassName(placeholderBaseStyles.className)
      .withStyles({ element: placeholderBaseStyles })
      .build().element;

  /**
   * Loads the image by restoring src/srcset
   */
  const loadImage = () => {
    if (isLoaded) return;

    onLoadStart?.();

    const handleLoad = () => {
      isLoaded = true;
      image.style.opacity = '1';

      // Hide placeholder
      if (placeholderElement.parentNode) {
        (placeholderElement as HTMLElement).style.opacity = '0';
        setTimeout(() => {
          placeholderElement.remove();
        }, 300);
      }

      onLoad?.();
    };

    const handleError = (event: Event) => {
      onError?.(event);
    };

    image.addEventListener('load', handleLoad, { once: true });
    image.addEventListener('error', handleError, { once: true });

    // Restore src to trigger load
    const lazySrc = image.getAttribute('data-lazy-src');
    const lazySrcset = image.getAttribute('data-lazy-srcset');

    if (lazySrc) {
      image.src = lazySrc;
    }
    if (lazySrcset) {
      image.srcset = lazySrcset;
    }
  };

  /**
   * Sets up the IntersectionObserver
   */
  const setupObserver = (container: HTMLElement) => {
    // Handle non-browser environments
    if (typeof IntersectionObserver === 'undefined') {
      // Load immediately if IntersectionObserver is not available
      loadImage();
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            loadImage();
            observer?.disconnect();
          }
        });
      },
      {
        rootMargin,
        threshold,
      },
    );

    observer.observe(container);
  };

  /**
   * Cleanup function
   */
  const destroy = () => {
    observer?.disconnect();
    observer = null;
  };

  // Build the wrapper
  const composite = new ElementBuilder('div')
    .withClassName(wrapperBaseStyles.className)
    .withStyles({
      element: {
        ...wrapperBaseStyles,
        ...wrapperStyles,
      },
    })
    .withChild(placeholderElement)
    .withChild(image)
    .withModifier((el) => {
      setupObserver(el);
    })
    .build();

  return {
    element: composite.element as HTMLElement,
    styles: composite.styles,
    load: loadImage,
    isLoaded: () => isLoaded,
    destroy,
  };
};
