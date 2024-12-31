import { Tokens } from '@universityofmaryland/web-elements-styles';
import { Asset } from 'utilities';
import { CreateModal, STYLES_MODAL } from './modal';

type TypeFixedFullScreenProps = {
  content: HTMLElement;
  callback: () => void;
};

const { Colors, Media } = Tokens;

const ELEMENT_CLOSE_BUTTON = 'carousel-fixed-screen-button';

const STYLES_FIXED_FULL_SCREEN = `
  ${STYLES_MODAL}

  .${ELEMENT_CLOSE_BUTTON} {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  @media (${Media.queries.tablet.min}) {
    .${ELEMENT_CLOSE_BUTTON} {
      top: calc(10vh - 22px);
      right: calc(10vw - 22px);
    }
  }

  .${ELEMENT_CLOSE_BUTTON} > svg {
    fill: ${Colors.white};
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
  closeButton.innerHTML = Asset.icon.X;
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
