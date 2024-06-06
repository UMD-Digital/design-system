import { Tokens } from '@universityofmaryland/variables';
import { Accessibility, AssetIcon } from 'utilities';

type TypeFixedFullScreenProps = {
  content: HTMLElement;
  callback: () => void;
};

const { Colors, Queries, Spacing } = Tokens;
const { EventAccessibilityFocusTrap } = Accessibility;

const ELEMENT_CONTAINER = 'fixed-full-screen-container';
const ELEMENT_CLOSE_BUTTON = 'fixed-full-screen-button';

const STYLES_FIXED_FULL_SCREEN = `
  .${ELEMENT_CONTAINER} {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 999999;
    padding: ${Spacing.xl} ${Spacing.md};
  }

  @media (${Queries.tablet.min}) {
    .${ELEMENT_CONTAINER} {
      padding: 10vh 10vw;
    }
  }

  .${ELEMENT_CLOSE_BUTTON} {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  @media (${Queries.tablet.min}) {
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
  const body = document.body;
  const container = document.createElement('div');
  const closeButton = document.createElement('button');
  const show = () => {
    container.style.display = 'block';
    body.style.overflow = 'hidden';
    eventReference = container.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      if (target === container) hide();
    });
    accessibiltyEventReference = EventAccessibilityFocusTrap({
      element: container,
      action: hide,
    });

    setTimeout(() => {
      content.focus();
    }, 100);
  };
  const hide = () => {
    body.style.overflow = 'visible';
    container.style.display = 'none';

    if (accessibiltyEventReference) accessibiltyEventReference();
    if (eventReference)
      eventReference.removeEventListener('click', () => hide());

    callback();
  };
  let eventReference: any = null;
  let accessibiltyEventReference: any = null;

  closeButton.setAttribute('type', 'button');
  closeButton.setAttribute('aria-label', 'Close');
  closeButton.classList.add(ELEMENT_CLOSE_BUTTON);
  closeButton.innerHTML = AssetIcon.X;
  closeButton.addEventListener('click', hide);

  container.classList.add(ELEMENT_CONTAINER);
  container.appendChild(closeButton);
  container.appendChild(content);

  return {
    element: container,
    events: {
      show,
      hide,
    },
  };
};

export default {
  CreateElement: CreateFixedFullScreen,
  Styles: STYLES_FIXED_FULL_SCREEN,
};
