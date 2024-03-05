import { ELEMENTS } from '../globals';

const { ACCORDION_BODY, ACCORDION_BODY_WRAPPER } = ELEMENTS;

const isExpanded = ({ element }: { element: HTMLElement }) => {
  const headlineContainer = element.shadowRoot?.querySelector(
    'button',
  ) as HTMLButtonElement;

  return headlineContainer.ariaExpanded == 'true';
};

export const EventAdjustHeight = ({
  element,
  maintainExpandState,
  noTransition = false,
}: {
  element: HTMLElement;
  maintainExpandState: Boolean;
  noTransition?: Boolean;
}) => {
  const bodyWrapperElement = element.shadowRoot?.querySelector(
    `.${ACCORDION_BODY_WRAPPER}`,
  ) as HTMLElement;

  const bodyElement = element.shadowRoot?.querySelector(
    `.${ACCORDION_BODY}`,
  ) as HTMLElement;

  const expanded = isExpanded({ element });

  if (!bodyElement || !bodyWrapperElement) {
    throw new Error('bodyElement or bodyWrapperElement is not found');
  }

  if (expanded) {
    const bodyHeight = bodyElement.offsetHeight;

    bodyWrapperElement.style.height = `${bodyHeight}px`;
    if (noTransition) bodyWrapperElement.style.transition = 'none';
  } else if (!maintainExpandState && !expanded) {
    bodyWrapperElement.removeAttribute('style');
  }
};

export const EventAdjustExpandState = ({
  element,
}: {
  element: HTMLElement;
}) => {
  const headlineContainer = element.shadowRoot?.querySelector(
    'button',
  ) as HTMLButtonElement;

  const bodyWrapperElement = element.shadowRoot?.querySelector(
    `.${ACCORDION_BODY_WRAPPER}`,
  ) as HTMLElement;

  const expanded = isExpanded({ element });

  if (!headlineContainer || !bodyWrapperElement) {
    throw new Error('headlineContainer or bodyWrapperElement is not found');
  }

  if (expanded) {
    headlineContainer.ariaExpanded = 'false';
    bodyWrapperElement.ariaHidden = 'true';
  } else {
    headlineContainer.ariaExpanded = 'true';
    bodyWrapperElement.ariaHidden = 'false';
  }
};
