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
          width: '100%',
          height: '100%',
          ...(isFixed && {
            width: '40px',
            height: '40px',
            position: 'absolute',
            inset: '0',
            margin: 'auto',
          }),
        },
      });

    const container = containerBuilder.getElement() as HTMLButtonElement;
    const declaration = declarationBuilder.getElement() as HTMLDivElement;

    const eventResize = () => {
      startingPosition = declaration.getBoundingClientRect().right;

      if (isFixed && !isShowing) {
        setHiddenPosition();
      }
    };

    const eventScroll = () => {
      const pagePosition = window.scrollY;
      const isPastFirstView = pagePosition > 0;

      if (isPastFirstView) {
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
      const getSpacing = () => {
        if (window.innerWidth > 768) {
          return 40;
        }

        return 8;
      };

      isShowing = false;

      if (startingPosition) {
        const spacing = getSpacing();
        const translateAmount = window.innerWidth - startingPosition;
        const position = translateAmount + spacing + container.offsetWidth;

        container.style.transform = `translateX(${position}px)`;
      } else {
        container.style.transform = DEFAULT_STARTING_POSITION;
      }
    };

    const load = () => {
      startingPosition = declaration.getBoundingClientRect().right;
      container.style.transition = 'none';

      if (isFixed) {
        eventScroll();
      }

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
