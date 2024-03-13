import { ELEMENTS, VARIABLES } from '../globals';

const { ACCORDION_BODY, ACCORDION_BODY_WRAPPER } = ELEMENTS;
const { ANIMATION_TIME } = VARIABLES;

type StateProps = {
  element: HTMLElement;
  hasAnimation?: boolean;
};

type ActionAnimationProps = StateProps & {
  isOpening: boolean;
};

const ActionAnimation = ({
  element,
  isOpening = true,
  hasAnimation = true,
}: ActionAnimationProps) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const headlineContainer = element.shadowRoot?.querySelector(
    'button',
  ) as HTMLButtonElement;
  const bodyWrapperElement = shadowRoot.querySelector(
    `.${ACCORDION_BODY_WRAPPER}`,
  ) as HTMLElement;
  const bodyElement = shadowRoot.querySelector(
    `.${ACCORDION_BODY}`,
  ) as HTMLElement;

  if (!headlineContainer || !bodyWrapperElement || !bodyElement) {
    throw new Error('headlineContainer or bodyWrapperElement is not found');
  }

  if (hasAnimation)
    bodyWrapperElement.style.transition = `height ${ANIMATION_TIME}ms ease-in-out`;

  if (isOpening) {
    headlineContainer.ariaExpanded = 'true';
    bodyWrapperElement.ariaHidden = 'false';
  } else {
    headlineContainer.ariaExpanded = 'false';
    bodyWrapperElement.ariaHidden = 'true';
  }

  setTimeout(() => {
    const bodyHeight = bodyElement.offsetHeight;
    bodyWrapperElement.style.height = isOpening ? `${bodyHeight}px` : '0';
  }, 100);

  setTimeout(() => {
    bodyWrapperElement.style.transition = 'none';
  }, 100 + ANIMATION_TIME);
};

export const SetOpen = (props: StateProps) =>
  ActionAnimation({ ...props, isOpening: true });

export const SetClosed = (props: StateProps) =>
  ActionAnimation({ ...props, isOpening: false });
