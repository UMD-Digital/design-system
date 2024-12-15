import { Tokens } from '@universityofmaryland/variables';
import { Asset, Performance } from 'utilities';

type TypeScrollTopProps = {
  isFixed?: boolean;
};

const { Colors } = Tokens;

const ELEMENT_NAME = 'umd-element-scroll-top';
const ELEMENT_SCROLL_TOP_DECLARATION = 'scroll-top-declarion';
const ELEMENT_SCROLL_TOP_CONTAINER = 'scroll-top-container';

// prettier-ignore
const STYLES_SCROLL_TOP_ELEMENT = `
  .${ELEMENT_SCROLL_TOP_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_SCROLL_TOP_CONTAINER} {
    background-color: ${Colors.black};
    width: 100%;
    height: 100%;
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${Colors.gold};
    cursor: pointer;
    transition: transform 250ms ease-in-out;
  }

  .${ELEMENT_SCROLL_TOP_CONTAINER} svg {
    display: block;
    width: 14px;
    height: 14px;
  }
`;

// @media (${Queries.medium.max}) {
//   .${ELEMENT_SCROLL_TOP_CONTAINER} {
//     display: none;
//   }
// }

const CreateScrollTopElement = (props: TypeScrollTopProps) =>
  (() => {
    const { isFixed = false } = props;
    const declaration = document.createElement('div');
    const container = document.createElement('button');
    const text = document.createElement('span');
    const defaultStartingPosition = `translateX(100vh)`;
    const getSpacing = () => (window.innerWidth > 768 ? 40 : 8);
    let startingPosition: null | number = null;
    let isShowing = false;

    const eventResize = () => {
      startingPosition = declaration.getBoundingClientRect().right;
    };

    const eventScroll = () => {
      const windowHeight = window.innerHeight;
      const pagePosition = window.scrollY;
      const isPastFirstView = pagePosition > windowHeight;
      const isNearBottom =
        pagePosition + windowHeight >=
        document.body.scrollHeight - windowHeight;
      const showWindow = isPastFirstView && !isNearBottom;

      if (showWindow) {
        setVisiblePosition();
      } else {
        setHiddenPosition();
      }
    };

    const setVisiblePosition = () => {
      if (!isShowing) {
        container.style.transform = 'translateX(0)';
        isShowing = true;
      }
    };

    const setHiddenPosition = () => {
      if (isShowing) {
        isShowing = false;

        if (startingPosition) {
          const spacing = getSpacing();
          const translateAmount = window.innerWidth - startingPosition;
          const position = translateAmount + spacing + container.offsetWidth;

          container.style.transform = `translateX(${position}px)`;
        } else {
          container.style.transform = defaultStartingPosition;
        }
      }
    };

    const load = () => {
      startingPosition = declaration.getBoundingClientRect().right;
      container.style.transition = 'none';
      setHiddenPosition();

      setTimeout(() => {
        container.style.transition = 'transform 250ms ease-in-out';
      }, 100);
    };

    text.classList.add('sr-only');
    text.innerHTML = 'Scroll To Top';

    container.classList.add(ELEMENT_SCROLL_TOP_CONTAINER);
    container.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    });
    container.innerHTML = Asset.icon.ARROW;
    container.appendChild(text);

    declaration.appendChild(container);
    declaration.classList.add(ELEMENT_SCROLL_TOP_DECLARATION);

    if (isFixed) {
      container.style.transform = defaultStartingPosition;

      window.addEventListener(
        'scroll',
        Performance.debounce(() => eventScroll(), 10),
      );

      window.addEventListener(
        'resize',
        Performance.debounce(() => eventResize(), 20),
      );
    }

    return {
      element: declaration,
      events: {
        load,
      },
    };
  })();

export default {
  CreateElement: CreateScrollTopElement,
  Styles: STYLES_SCROLL_TOP_ELEMENT,
};
