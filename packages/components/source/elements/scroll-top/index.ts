import { Tokens } from '@universityofmaryland/variables';
import { Performance } from 'utilities';

type TypeScrollTopProps = {};

const { Colors } = Tokens;
const { Debounce } = Performance;

const chevron = `<svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103.4 185.34"> <path d="M51.71,185.34A10.74,10.74,0,0,1,44.11,167l74.36-74.35L44.11,18.32A10.73,10.73,0,0,1,59.29,3.14l81.94,81.94a10.73,10.73,0,0,1,0,15.17L59.29,182.19A10.67,10.67,0,0,1,51.71,185.34Z" transform="translate(-40.97 0)" /> </svg>`;

const ELEMENT_NAME = 'umd-element-scroll-top';
const ELEMENT_SCROLL_TOP_DECLARATION = 'scroll-top-declarion';
const ELEMENT_SCROLL_TOP_CONTAINER = 'scroll-top-container';

// prettier-ignore
const STYLES_SCROLL_TOP_ELEMENT = `
  .${ELEMENT_SCROLL_TOP_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_SCROLL_TOP_CONTAINER} {
    background-color: ${Colors.gray.light};
    width: 100%;
    align-items: center;
    justify-content: center;
    transform: translateX(100%);
    transition: transform 0.5s ease-in-out;
  }

  .${ELEMENT_SCROLL_TOP_CONTAINER} button {
    border: none;
    background: transparent;
    cursor: pointer;
  }

  .${ELEMENT_SCROLL_TOP_CONTAINER} svg {
    width: 10px;
    transform: rotate(-90deg);
    display: block;
    margin: 0 auto 5px;
  }

  .${ELEMENT_SCROLL_TOP_CONTAINER} > span {
    display: block;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    color: ${Colors.gray.light};
  }
`;

// if (this._showMobile || window.innerWidth >= 768) {

//   if (!this._isBottomSet) {
//     if (
//       document.body.scrollHeight - window.pageYOffset <
//       window.innerHeight * 2
//     ) {
//       container.style.transform = 'translateX(100%)';
//     }
//   }
// }

// if (window.innerWidth < 768 && !this._showMobile) {
//   container.style.display = 'none';
// }

const CreateScrollTopElement = (props: TypeScrollTopProps) =>
  (() => {
    const declaration = document.createElement('div');
    const container = document.createElement('button');
    const text = document.createElement('span');
    const eventScroll = () => {
      if (window.pageYOffset > window.innerHeight) {
        container.style.transform = 'translateX(0)';
      } else {
        container.style.transform = 'translateX(100%)';
      }
    };

    const eventResize = () => {
      if (window.innerWidth >= 768) {
        container.style.display = 'flex';
      }

      if (window.innerWidth < 768) {
        container.style.display = 'none';
      }
    };

    text.innerHTML = 'Scroll To Top';

    container.classList.add(ELEMENT_SCROLL_TOP_CONTAINER);
    container.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    });
    container.innerHTML = chevron;
    container.appendChild(text);

    declaration.appendChild(container);
    declaration.classList.add(ELEMENT_SCROLL_TOP_DECLARATION);

    window.addEventListener(
      'scroll',
      Debounce(() => eventScroll()),
    );

    window.addEventListener(
      'resize',
      Debounce(() => eventResize()),
    );

    return declaration;
  })();

export default {
  CreateElement: CreateScrollTopElement,
  Styles: STYLES_SCROLL_TOP_ELEMENT,
};
