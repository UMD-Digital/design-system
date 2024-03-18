import { Tokens } from '@universityofmaryland/variables';
import { SlotDefaultStyling } from 'helpers/ui';
import { ELEMENTS, VARIABLES, SLOTS } from '../../globals';

const { Colors, Spacing } = Tokens;

const { CTA } = SLOTS;
const { ELEMENT_WRAPPER } = ELEMENTS;
const { THEME_OPTION_LIGHT } = VARIABLES;

export const CALL_TO_ACTION_CONTAINER = 'umd-footer-call-to-action-container';

export const CallToActionStyles = `
  .${CALL_TO_ACTION_CONTAINER} {
    margin-left: auto;
  }

  .${CALL_TO_ACTION_CONTAINER} a {
    display: inline-block;
    padding: ${Spacing.xs} ${Spacing['lg']};
    background-color: ${Colors.red};
    color: ${Colors.white};
    border: 1px solid ${Colors.red};
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    font-weight: 700;
  }

  .${CALL_TO_ACTION_CONTAINER} a:hover,
  .${CALL_TO_ACTION_CONTAINER} a:focus {
    background-size: none;
    color: ${Colors.white};
    background-color: ${Colors.black};
  }

  .${ELEMENT_WRAPPER}[theme="${THEME_OPTION_LIGHT}"] .${CALL_TO_ACTION_CONTAINER} a {
    background-color: ${Colors.black};
    color: ${Colors.white};
    border: 1px solid ${Colors.black};
  }

  .${ELEMENT_WRAPPER}[theme="${THEME_OPTION_LIGHT}"] .${CALL_TO_ACTION_CONTAINER} a:hover,
  .${ELEMENT_WRAPPER}[theme="${THEME_OPTION_LIGHT}"] .${CALL_TO_ACTION_CONTAINER} a:focus {
    color: ${Colors.black};
    background-color: ${Colors.gray.lightest};
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
  const ctaSlot = element.querySelector(`[slot="${CTA}"]`) as HTMLAnchorElement;

  container.classList.add(CALL_TO_ACTION_CONTAINER);

  if (ctaSlot) {
    const slot = SlotDefaultStyling({ element, slotRef: CTA });
    if (slot) container.appendChild(slot);
  } else {
    container.appendChild(makeGivingLink());
  }

  return container;
};
