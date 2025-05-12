import { animation } from '@universityofmaryland/web-styles-library';
import { Utilities } from '@universityofmaryland/web-elements-library';

export const loadIntersectionObserver = () => {
  const { convertJSSObjectToStyles } = Utilities.styles;

  if (Utilities.accessibility.isPrefferdReducedMotion()) return;

  const idGridFadeIn = `umd-animation-transition-fade-bottom`;
  const idOffsetAttr = `data-animation`;
  const animationOffset = `offset`;

  const ApplyStyles = () => {
    const body = document.body;
    const styleElement = document.createElement('style');

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

      ${convertJSSObjectToStyles({
        styleObj: {
          [`.${idGridFadeIn}`]: animation.transition.fadeInFromBottom,
        },
      })}
    `;

    body.appendChild(styleElement);
  };

  const Interactions = () => {
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

  ApplyStyles();
  Interactions();
};
