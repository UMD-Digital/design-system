import { colors } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/colors.js';
import { spacing } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/layout.js';

const SLOT_CTA_NAME = 'call-to-action';
const CALL_TO_ACTION_CONTAINER = 'umd-footer-call-to-action-container';

export const CallToActionStyles = `
  .${CALL_TO_ACTION_CONTAINER} {
    margin-left: auto;
  }

  .${CALL_TO_ACTION_CONTAINER} a {
    padding: ${spacing.xs} ${spacing['lg']};
    background-color: ${colors.red};
    color: ${colors.white};
  }

  .${CALL_TO_ACTION_CONTAINER} a:hover, 
  .${CALL_TO_ACTION_CONTAINER} a:focus {
    background-size: none;
    color: ${colors.white};
  }
`;

const makeGivingLink = () => {
  const defaultLink = document.createElement('a');
  defaultLink.textContent = 'Support UMD';
  defaultLink.href = 'https://giving.umd.edu/';
  defaultLink.target = '_blank';
  defaultLink.rel = 'noopener noreferrer';

  return defaultLink;
};

export const CreateCallToActionContainer = ({
  element,
}: {
  element: HTMLElement;
}) => {
  const container = document.createElement('div');
  const ctaSlot = element.querySelector(
    `[slot="${SLOT_CTA_NAME}"]`,
  ) as HTMLAnchorElement;

  container.classList.add(CALL_TO_ACTION_CONTAINER);

  if (ctaSlot) {
    container.appendChild(ctaSlot);
  } else {
    container.appendChild(makeGivingLink());
  }

  return container;
};
