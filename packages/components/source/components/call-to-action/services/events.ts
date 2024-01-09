import { ELEMENTS, VARIABLES } from '../globals';
import { CallToActionType } from '../component';

export const EventSize = ({ element }: { element: CallToActionType }) => {
  const type = element._type;
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
    const alignmentWrapper = wrapperElement.querySelector(
      `.${ELEMENTS.CTA_WRAPPER}`,
    ) as HTMLDivElement;
    const icon = wrapperElement.querySelector('svg') as SVGElement;

    width = VARIABLES.MAX_WIDTH;
    if (alignmentWrapper) alignmentWrapper.style.alignItems = `flex-start`;
    if (textLink) textLink.style.whiteSpace = `initial`;
    if (icon) icon.style.marginTop = `3px`;
    if (type === VARIABLES.TYPE_SECONDARY) {
      if (textLink) textLink.style.textAlign = `left`;
      if (icon) icon.style.marginTop = `5px`;
    }
  }

  element.style.width = `${width}px`;
};
