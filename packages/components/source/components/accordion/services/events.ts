import { ELEMENTS } from '../globals';

const { ACCORDION_BODY, ACCORDION_BODY_WRAPPER } = ELEMENTS;

export const EventSize = ({ element }: { element: HTMLElement }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const headlineContainer = shadowRoot.querySelector(
    'button',
  ) as HTMLButtonElement;
  const isExpanded = headlineContainer.ariaExpanded == 'true';

  if (!isExpanded) return;

  const bodyWrapperElement = shadowRoot.querySelector(
    `.${ACCORDION_BODY_WRAPPER}`,
  ) as HTMLElement;
  const bodyElement = shadowRoot.querySelector(
    `.${ACCORDION_BODY}`,
  ) as HTMLElement;
  const bodyHeight = bodyElement.offsetHeight;

  bodyWrapperElement.style.height = `${bodyHeight}px`;
};
