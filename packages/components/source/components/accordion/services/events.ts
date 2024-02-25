import { ELEMENTS } from '../globals';

const { ACCORDION_BODY, ACCORDION_BODY_WRAPPER } = ELEMENTS;

export const EventToggleExpand = ({
  element,
  expand,
}: {
  element: HTMLElement;
  expand: boolean;
}) => {
  const headlineContainer = element.shadowRoot?.querySelector(
    'button',
  ) as HTMLButtonElement;

  const bodyWrapperElement = element.shadowRoot?.querySelector(
    `.${ACCORDION_BODY_WRAPPER}`,
  ) as HTMLElement;

  const bodyElement = element.shadowRoot?.querySelector(
    `.${ACCORDION_BODY}`,
  ) as HTMLElement;

  const bodyHeight = bodyElement.offsetHeight;

  headlineContainer.ariaExpanded = expand ? 'true' : 'false';

  if (bodyWrapperElement)
    bodyWrapperElement.ariaHidden = expand ? 'false' : 'true';

  if (expand) {
    bodyWrapperElement.style.maxHeight = `${bodyHeight}px`;
    bodyElement.style.visibility = 'visible';
  } else {
    bodyWrapperElement.removeAttribute('style');
    setTimeout(() => {
      bodyElement.removeAttribute('style');
    }, 500);
  }
};
