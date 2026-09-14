import { debounce } from '@universityofmaryland/web-utilities-library/performance';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';

export const createCompositeNavigationSticky = ({
  content,
  component,
}: {
  content: HTMLElement;
  component: HTMLElement;
}) => {
  const headerElement = component.querySelector(
    'umd-element-navigation-header',
  );

  const wrapperBuilder = new ElementBuilder()
    .withClassName('nav-sticky-wrapper')
    .withChild(content)
    .withStyles({
      element: {
        width: '100%',
        backgroundColor: 'white',

        '&.nav-sticky-wrapper-fixed': {
          position: 'fixed',
          top: 0,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
      },
    });

  const wrapperElement = wrapperBuilder.getElement();

  const containerBuilder = new ElementBuilder()
    .withClassName('nav-sticky-container')
    .withChild(wrapperBuilder)
    .withStyles({
      element: {
        width: '100%',
      },
    });

  const containerElement = containerBuilder.getElement();

  let hasIncorrectHeight = false;

  const eventResize = () => {
    const wrapperSize = wrapperElement.offsetHeight;

    if (wrapperSize !== 0) {
      containerElement.style.height = `${wrapperSize}px`;
    }
  };

  const eventScroll = () => {
    const componentBounds = component.getBoundingClientRect();

    if (componentBounds.top < 0) {
      if (headerElement) {
        headerElement.setAttribute('sticky', 'true');
        wrapperElement.classList.add('nav-sticky-wrapper-fixed');
      }
    } else {
      if (headerElement) {
        headerElement.removeAttribute('sticky');
        wrapperElement.classList.remove('nav-sticky-wrapper-fixed');

        if (hasIncorrectHeight) {
          setTimeout(() => {
            eventResize();
          }, 200);
          setTimeout(() => {
            eventResize();
          }, 500);
          hasIncorrectHeight = false;
        }
      }
    }
  };

  window.addEventListener('scroll', eventScroll);
  window.addEventListener(
    'resize',
    debounce(() => {
      eventResize();
    }, 20),
  );

  window.addEventListener('load', () => {
    setTimeout(() => {
      eventResize();
    }, 500);
  });

  if (window.scrollY > 0) {
    hasIncorrectHeight = true;
  }

  return containerBuilder.build();
};
