import { ELEMENTS, SLOTS } from '../globals';

const { ACCORDION_BODY_WRAPPER } = ELEMENTS;
const { BODY } = SLOTS;

export const EventSize = ({ element }: { element: HTMLElement }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const headlineContainer = shadowRoot.querySelector(
    'button',
  ) as HTMLButtonElement;
  const bodyElement = element.querySelector(`[slot=${BODY}]`) as HTMLElement;
  const isExpanded = headlineContainer.ariaExpanded == 'true';

  if (!isExpanded) return;

  console.log('bodyElement', bodyElement);

  const bodyWrapperElement = shadowRoot.querySelector(
    `.${ACCORDION_BODY_WRAPPER}`,
  ) as HTMLElement;
  const bodyHeight = bodyElement.offsetHeight;

  bodyWrapperElement.style.height = `${bodyHeight}px`;
};
