import * as token from '@universityofmaryland/web-styles-library/token';
import { close_large as iconCloseLarge } from '@universityofmaryland/web-icons-library/controls';
import { layout } from 'atomic';

type TypeFixedFullScreenProps = {
  content: HTMLElement;
  callback: () => void;
};

const ELEMENT_CLOSE_BUTTON = 'carousel-fixed-screen-button';

const STYLES_FIXED_FULL_SCREEN = `


  .${ELEMENT_CLOSE_BUTTON} {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  @media (${token.media.queries.tablet.min}) {
    .${ELEMENT_CLOSE_BUTTON} {
      top: calc(10vh - 22px);
      right: calc(10vw - 22px);
    }
  }

  .${ELEMENT_CLOSE_BUTTON} > svg {
    fill: ${token.color.white};
    width: 20px;
    height: 20px;
  }
`;

export default ({ content, callback }: TypeFixedFullScreenProps) => {
  const modal = layout.overlay.modal({ content, callback });
  const closeButton = document.createElement('button');
  let styles = STYLES_FIXED_FULL_SCREEN;

  styles += modal.styles;

  closeButton.setAttribute('type', 'button');
  closeButton.setAttribute('aria-label', 'Close');
  closeButton.classList.add(ELEMENT_CLOSE_BUTTON);
  closeButton.innerHTML = iconCloseLarge;
  closeButton.addEventListener('click', modal.events.hide);

  modal.element.appendChild(closeButton);

  return {
    element: modal.element,
    styles,
    events: {
      show: modal.events.show,
      hide: modal.events.hide,
    },
  };
};
