import { Performance } from 'utilities';

const ELEMENT_NAV_STICKY_CONTAINER = 'nav-sticky-container';
const ELEMENT_NAV_STICKY_WRAPPER = 'nav-sticky-wrapper';

const ELEMENT_NAV_STIKCY_WRAPPER_FIXED = 'nav-sticky-wrapper-fixed';

const { Debounce } = Performance;

// prettier-ignore
const STYLES_NAV_STICKY_ELEMENT = `
  .${ELEMENT_NAV_STICKY_CONTAINER} {
    width: 100%;
  }

  .${ELEMENT_NAV_STICKY_WRAPPER} {
    width: 100%;
    background-color: white;
  }

  .${ELEMENT_NAV_STIKCY_WRAPPER_FIXED} {
    position: fixed;
    top: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const CreateNavStickyElement = ({
  content,
  component,
}: {
  content: HTMLElement;
  component: HTMLElement;
}) =>
  (() => {
    const elementContainer = document.createElement('div');
    const elementWrapper = document.createElement('div');
    const headerElement = component.querySelector(
      'umd-element-navigation-header',
    );
    const eventScroll = () => {
      const componentBounds = component.getBoundingClientRect();

      if (componentBounds.top < 0) {
        if (headerElement) {
          headerElement.setAttribute('sticky', 'true');
          elementWrapper.classList.add(ELEMENT_NAV_STIKCY_WRAPPER_FIXED);
        }
      } else {
        if (headerElement) {
          headerElement.removeAttribute('sticky');
          elementWrapper.classList.remove(ELEMENT_NAV_STIKCY_WRAPPER_FIXED);

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

    const eventResize = () => {
      const wrapperSize = elementWrapper.offsetHeight;

      if (wrapperSize !== 0) {
        elementContainer.style.height = `${wrapperSize}px`;
      }
    };
    let hasIncorrectHeight = false;

    elementWrapper.classList.add(ELEMENT_NAV_STICKY_WRAPPER);
    elementWrapper.appendChild(content);

    elementContainer.classList.add(ELEMENT_NAV_STICKY_CONTAINER);
    elementContainer.appendChild(elementWrapper);

    window.addEventListener('scroll', eventScroll);
    window.addEventListener(
      'resize',
      Debounce(() => {
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

    return elementContainer;
  })();

export default {
  CreateElement: CreateNavStickyElement,
  Styles: STYLES_NAV_STICKY_ELEMENT,
};
