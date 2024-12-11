import { Animations } from '@universityofmaryland/variables';
import { Accessibility, Styles } from 'utilities';

export const shrinkThenRemove = ({ container }: { container: HTMLElement }) => {
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

export const scrollTo = ({
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
