import { Animations } from '@universityofmaryland/variables';
import { Accessibility, Styles } from 'utilities';

const ShrinkThenRemove = ({ container }: { container: HTMLElement }) => {
  const frames = 30;
  const startingHeight = container.clientHeight;
  const startingPadding = parseInt(
    window.getComputedStyle(container).paddingBottom.split('px')[0],
  );
  const heightDiff = startingHeight / frames;
  const paddingDiff = startingPadding / frames;
  let currentFrame = 0;
  let currentHeight = startingHeight;
  let currentPadding = startingPadding;

  container.style.overflow = 'hidden';

  const shrink = () => {
    if (frames > currentFrame) {
      currentHeight = currentHeight - heightDiff;
      currentPadding = currentPadding - paddingDiff;

      container.style.height = `${currentHeight}px`;
      container.style.paddingBottom = `${currentPadding}px`;

      currentFrame++;
      window.requestAnimationFrame(shrink);
    } else {
      container.style.height = '0px';
      container.style.paddingBottom = '0px';

      setTimeout(() => {
        container.style.display = 'none';
        container.setAttribute('closed', 'true');
      }, 100);
    }
  };

  window.requestAnimationFrame(shrink);
};

const ScrollTo = ({
  element,
  spread = 30,
  frames = 60,
}: {
  element: HTMLElement;
  spread?: number;
  frames?: number;
}) => {
  if (!element) return;

  const documentBody =
    document.documentElement.scrollTop || document.body.scrollTop;
  const elm = document.body;
  let from = 0;
  const to = element.getBoundingClientRect();
  const toPosition =
    documentBody == 0 ? to.top - from - spread : to.top - spread;
  const currentPosition = window.pageYOffset;
  const jump = (toPosition - from) / frames;
  from = currentPosition;

  function scroll() {
    if (frames > 0) {
      const position = from + jump;

      from = position;
      elm.scrollTop = from;
      document.documentElement.scrollTop = from;

      frames--;
      window.requestAnimationFrame(scroll);
    } else {
      const elms = Array.from(
        element.querySelectorAll('a, button'),
      ) as Array<HTMLElement>;
      element.focus({ preventScroll: true });
      if (Array.isArray(elms) && elms.length > 0) {
        elms[0].focus({ preventScroll: true });
      }
    }
  }

  window.requestAnimationFrame(scroll);
};

const Load = () => {
  const { IsPrefferdReducedMotion } = Accessibility;
  const { convertJSSObjectToStyles } = Styles;
  const { Scroll } = Animations;

  if (IsPrefferdReducedMotion()) return;

  const idGridFadeIn = `umd-grid-fade-in`;
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
          [`.${idGridFadeIn}`]: Scroll.FadeInFromBottom,
        },
      })}
    `;

    body.appendChild(styleElement);
  };

  const Interactions = () => {
    const gridElements = Array.from(
      document.querySelectorAll('.umd-grid-animation > *'),
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

export default {
  Load,
  ShrinkThenRemove,
  ScrollTo,
};
