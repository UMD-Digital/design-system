import { Tokens } from '@universityofmaryland/variables';
import { Accessibility } from 'utilities';

type TypeFixedFullScreenProps = {
  content: HTMLElement | null;
  isHidden?: boolean;
  callback?: () => void;
  context?: HTMLElement | null;
};

const { Queries, Spacing } = Tokens;

const ELEMENT_CONTAINER = 'modal-screen-container';

export const STYLES_MODAL = `
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
`;

export const CreateModal = ({
  content,
  callback,
  isHidden,
  context,
}: TypeFixedFullScreenProps) => {
  const body = document.body;
  const html = document.documentElement;
  const container = document.createElement('div');
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

    accessibiltyEventReference = Accessibility.eventAccessibilityFocusTrap({
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

    if (callback) callback();
  };

  container.classList.add(ELEMENT_CONTAINER);
  if (content) container.appendChild(content);
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

export default CreateModal;
