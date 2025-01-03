import { token } from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import { CreateModal, STYLES_MODAL } from './modal';

type TypeFixedFullScreenProps = {
  content: HTMLElement;
  callback: () => void;
};

const ELEMENT_CLOSE_BUTTON = 'carousel-fixed-screen-button';

const STYLES_FIXED_FULL_SCREEN = `
  ${STYLES_MODAL}

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

const CreateFixedFullScreen = ({
  content,
  callback,
}: TypeFixedFullScreenProps) => {
  const modal = CreateModal({ content, callback });
  const closeButton = document.createElement('button');

  closeButton.setAttribute('type', 'button');
  closeButton.setAttribute('aria-label', 'Close');
  closeButton.classList.add(ELEMENT_CLOSE_BUTTON);
  closeButton.innerHTML = Utility.asset.icon.X;
  closeButton.addEventListener('click', modal.events.hide);

  modal.element.appendChild(closeButton);

  return {
    element: modal.element,
    events: {
      show: modal.events.show,
      hide: modal.events.hide,
    },
  };
};

export default {
  CreateElement: CreateFixedFullScreen,
  Styles: STYLES_FIXED_FULL_SCREEN,
};
