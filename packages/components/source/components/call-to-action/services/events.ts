import { ELEMENTS, VARIABLES } from '../globals';
import { CallToActionType } from '../component';

export const EventSize = ({ element }: { element: CallToActionType }) => {
  const type = element._type;
  const size = element._size;
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const wrapperElement = shadowRoot.querySelector(
    `.${ELEMENTS.CTA_CONTAINER_ELEMENT}`,
  ) as HTMLDivElement;

  if (!wrapperElement) return;
  let width = wrapperElement.offsetWidth;

  if (width > VARIABLES.MAX_WIDTH) {
    const textLink = wrapperElement.querySelector(
      `.${ELEMENTS.CTA_TEXT_WRAPPER}`,
    ) as HTMLElement;

    if (textLink) textLink.style.whiteSpace = `initial`;

    width = VARIABLES.MAX_WIDTH;
  }

  element.style.width = `${width}px`;
};
