import { ELEMENTS } from '../globals';
import { CallToActionType } from '../component';

export const EventSize = ({ element }: { element: CallToActionType }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const wrapperElement = shadowRoot.querySelector(
    `.${ELEMENTS.CTA_CONTAINER}`,
  ) as HTMLDivElement;

  if (!wrapperElement) return;
  let width = wrapperElement.offsetWidth;

  if (width > 400) {
    width = 400;
    const slottedLink = wrapperElement.querySelector(
      `${ELEMENTS.CTA_TEXT_WRAPPER}`,
    ) as HTMLAnchorElement;
    slottedLink.style.whiteSpace = `initial`;
  }

  element.style.width = `${width}px`;
};
