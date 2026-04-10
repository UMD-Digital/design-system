import * as token from '@universityofmaryland/web-token-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { trapFocus } from '@universityofmaryland/web-utilities-library/accessibility';

type TypeFixedFullScreenProps = {
  content: HTMLElement | null;
  isHidden?: boolean;
  context?: HTMLElement | null;
};

export const createModal = ({
  content,
  isHidden,
  context,
}: TypeFixedFullScreenProps) => {
  const body = document.body;
  const html = document.documentElement;
  let eventReference: any = null;
  let accessibiltyEventReference: any = null;

  const backgroundBuilder = new ElementBuilder()
    .withClassName('modal-screen-container-background')
    .withStyles({
      element: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        padding: `${token.spacing.xl} ${token.spacing.md}`,
        width: '100%',
        height: '100%',
        [`@media (${token.media.queries.tablet.min})`]: {
          padding: '10vh 10vw',
        },
      },
    })
    .withChildIf(!!content, content as HTMLElement);

  const containerBuilder = new ElementBuilder()
    .withClassName('modal-screen-container')
    .withStyles({
      element: {
        display: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 999999,
      },
    })
    .withChild(backgroundBuilder);

  const container = containerBuilder.getElement();

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

    accessibiltyEventReference = trapFocus({
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
		
    if (eventReference) eventReference.removeEventListener('click', () => hide());

    setTimeout(() => {
      if (context) {
        const firstItem = context.querySelector('button, a') as HTMLElement;
        firstItem?.focus();
      }
    }, 100);
  };

  if (isHidden) container.style.display = 'none';

  return containerBuilder.withEvents({ show, hide }).build();
};
