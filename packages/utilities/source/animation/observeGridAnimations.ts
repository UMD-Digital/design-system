import { animation } from '@universityofmaryland/web-styles-library';

/**
 * Loads an intersection observer that applies fade-in animations to grid elements.
 * Elements with classes 'umd-animation-grid' or 'umd-grid-animation' will have their
 * children animated with a fade-in-from-bottom effect.
 *
 * Respects user's reduced motion preferences and will not apply animations if enabled.
 *
 * @example
 * ```html
 * <div class="umd-animation-grid">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </div>
 * ```
 */
export const observeGridAnimations = () => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  if (prefersReducedMotion) return;

  const idGridFadeIn = `umd-animation-transition-fade-bottom`;
  const idOffsetAttr = `data-animation`;
  const animationOffset = `offset`;

  const applyStyles = () => {
    const body = document.body;
    const styleElement = document.createElement('style');

    // Convert JSS animation object to CSS string
    const jssToCSS = (obj: Record<string, any>): string => {
      let css = '';
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' && !Array.isArray(value)) {
          const nestedCSS = jssToCSS(value);
          css += `${key} { ${nestedCSS} } `;
        } else {
          const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
          css += `${cssKey}: ${value}; `;
        }
      }
      return css;
    };

    styleElement.innerHTML = `
      @keyframes fade-in-from-bottom {
        from {
          opacity: 0;
          transform: translateY(50px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .${idGridFadeIn} {
        ${jssToCSS(animation.transition.fadeInFromBottom)}
      }
    `;

    body.appendChild(styleElement);
  };

  const setupInteractions = () => {
    const gridElements = Array.from(
      document.querySelectorAll(
        '.umd-animation-grid > *, .umd-grid-animation > *',
      ),
    );

    const setAlignment = () => {
      let previousPosition = 0;

      gridElements.forEach((entry) => {
        const top = entry.getBoundingClientRect().top;
        if (previousPosition === top) {
          entry.setAttribute(idOffsetAttr, animationOffset);
        } else {
          previousPosition = top;
        }
      });
    };

    const gridAnimation: IntersectionObserverCallback = (entries, observer) => {
      let delay = 0;

      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        const offset = 350;

        if (entry.isIntersecting) {
          if (target.getAttribute(idOffsetAttr) === animationOffset) {
            delay = delay + offset;
          } else {
            delay = 0;
          }

          target.style.animationDelay = `${delay}ms`;
          target.classList.add(idGridFadeIn);
          observer.unobserve(target);
        }
      });
    };

    const observer = new IntersectionObserver(gridAnimation, {
      rootMargin: '0px',
      threshold: [0.35],
    });

    gridElements.forEach((element) => {
      observer.observe(element);
    });

    window.addEventListener('resize', () => {
      setAlignment();
    });
    setAlignment();
  };

  applyStyles();
  setupInteractions();
};
