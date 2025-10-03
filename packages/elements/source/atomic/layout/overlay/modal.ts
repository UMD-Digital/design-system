import { token } from '@universityofmaryland/web-styles-library';
import { eventAccessibilityFocusTrap } from '@universityofmaryland/web-utilities-library/accessibility';

type TypeFixedFullScreenProps = {
  content: HTMLElement | null;
  isHidden?: boolean;
  callback?: () => void;
  context?: HTMLElement | null;
};

const ELEMENT_CONTAINER = 'modal-screen-container';
const ELEMENT_CONTAINER_BACKGROUND = 'modal-screen-container-background';

export const STYLES_MODAL = `
  .${ELEMENT_CONTAINER} {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999999;
  }

  .${ELEMENT_CONTAINER_BACKGROUND} {
    background-color: rgba(0, 0, 0, 0.9);
    padding: ${token.spacing.xl} ${token.spacing.md};
    width: 100%;
    height: 100%;
  }

  @media (${token.media.queries.tablet.min}) {
    .${ELEMENT_CONTAINER_BACKGROUND} {
      padding: 10vh 10vw;
    }
  }
`;

export const createModal = ({
  content,
  callback,
  isHidden,
  context,
}: TypeFixedFullScreenProps) => {
  const body = document.body;
  const html = document.documentElement;
  const container = document.createElement('div');
  const background = document.createElement('div');
  let eventReference: any = null;
  let accessibiltyEventReference: any = null;

  const show = () => {
    container.style.display = 'block';
    body.style.overflow = 'hidden';
    body.style.height = '100%';
    html.style.overflow = 'hidden';
    html.style.height = '100%';
    eventReference = container.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      if (target === container) hide();
    });

    accessibiltyEventReference =
      eventAccessibilityFocusTrap({
        element: container,
        action: hide,
        shadowDomContext: context || null,
      });

    setTimeout(() => {
      if (content) content.focus();
    }, 100);
  };
  const hide = () => {
    body.style.overflow = 'visible';
    body.style.height = 'inherit';
    html.style.overflow = 'visible';
    html.style.height = 'inherit';
    container.style.display = 'none';

    if (accessibiltyEventReference) accessibiltyEventReference();
    if (eventReference)
      eventReference.removeEventListener('click', () => hide());

    setTimeout(() => {
      if (context) {
        const firstItem = context.querySelector('button, a') as HTMLElement;
        firstItem?.focus();
      }
    }, 100);
  };

  background.classList.add(ELEMENT_CONTAINER_BACKGROUND);
  if (content) background.appendChild(content);

  container.classList.add(ELEMENT_CONTAINER);
  container.appendChild(background);
  if (isHidden) container.style.display = 'none';

  return {
    element: container,
    styles: STYLES_MODAL,
    events: {
      show,
      hide,
    },
  };
};
