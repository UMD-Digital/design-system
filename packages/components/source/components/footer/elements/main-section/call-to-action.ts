import { colors, spacing } from '@universityofmaryland/umd-web-configuration';
import { SLOTS } from 'components/footer/globals';
import { SlotDefaultStyling } from 'helpers/ui';

export const CALL_TO_ACTION_CONTAINER = 'umd-footer-call-to-action-container';

export const CallToActionStyles = `
  .${CALL_TO_ACTION_CONTAINER} {
    margin-left: auto;
  }

  .${CALL_TO_ACTION_CONTAINER} a {
    padding: ${spacing.xs} ${spacing['lg']};
    background-color: ${colors.red};
    color: ${colors.white};
    font-weight: 800;
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
    `[slot="${SLOTS.CTA}"]`,
  ) as HTMLAnchorElement;

  container.classList.add(CALL_TO_ACTION_CONTAINER);

  if (ctaSlot) {
    const slot = SlotDefaultStyling({ element, slotRef: SLOTS.CTA });
    if (slot) container.appendChild(slot);
  } else {
    container.appendChild(makeGivingLink());
  }

  return container;
};
