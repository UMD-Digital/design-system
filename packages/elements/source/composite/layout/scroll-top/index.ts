import * as token from '@universityofmaryland/web-token-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { debounce } from '@universityofmaryland/web-utilities-library/performance';
import { arrow_up as iconArrowUp } from '@universityofmaryland/web-icons-library/arrows';

type TypeScrollTopProps = {
  isFixed?: boolean;
};

const CreateScrollTopElement = (props: TypeScrollTopProps) =>
  (() => {
    const DEFAULT_STARTING_POSITION = `translateX(100vh)`;

    const { isFixed = false } = props;
    const getSpacing = () => (window.innerWidth > 768 ? 40 : 8);
    let startingPosition: null | number = null;
    let isShowing = false;

    const textBuilder = new ElementBuilder('span')
      .withClassName('sr-only')
      .withHTML('Scroll To Top');

    const containerBuilder = new ElementBuilder('button')
      .withClassName('scroll-top-container')
      .withHTML(iconArrowUp)
      .withChild(textBuilder)
      .withStyles({
        element: {
          backgroundColor: token.color.black,
          width: '100%',
          height: '100%',
          minHeight: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: `1px solid ${token.color.gold}`,
          cursor: 'pointer',
          transition: 'transform 250ms ease-in-out',
          '& svg': {
            display: 'block',
            width: '14px',
            height: '14px',
          },
        },
      })
      .on('click', () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      });

    const declarationBuilder = new ElementBuilder()
      .withClassName('scroll-top-declarion')
      .withChild(containerBuilder)
      .withStyles({
        element: {
          container: 'umd-element-scroll-top / inline-size',
        },
      });

    const container = containerBuilder.getElement() as HTMLButtonElement;
    const declaration = declarationBuilder.getElement() as HTMLDivElement;

    const eventResize = () => {
      startingPosition = declaration.getBoundingClientRect().right;
    };

    const eventScroll = () => {
      const windowHeight = window.innerHeight;
      const pagePosition = window.scrollY;
      const isPastFirstView = pagePosition > windowHeight;
      const isNearBottom =
        pagePosition + windowHeight >= document.body.scrollHeight - windowHeight;
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
          container.style.transform = DEFAULT_STARTING_POSITION;
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

    if (isFixed) {
      container.style.transform = DEFAULT_STARTING_POSITION;

      window.addEventListener('scroll', debounce(eventScroll, 10));
      window.addEventListener('resize', debounce(eventResize, 20));
    }

    return declarationBuilder.withEvents({ load }).build();
  })();

export const createCompositeLayoutScrollTop = CreateScrollTopElement;
