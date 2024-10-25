import { Tokens } from '@universityofmaryland/variables';
import { MarkupCreate } from 'utilities';
import { ELEMENTS, SLOTS, REFERENCES } from '../../globals';

const { Colors, Spacing } = Tokens;

const { SlotWithDefaultStyling } = MarkupCreate;

const { CTA } = SLOTS;
const { ELEMENT_WRAPPER } = ELEMENTS;
const { IS_THEME_LIGHT } = REFERENCES;

export const CALL_TO_ACTION_CONTAINER = 'umd-footer-call-to-action-container';

export const CallToActionStyles = `
  .${CALL_TO_ACTION_CONTAINER} {
    margin-left: auto;
  }

  .${CALL_TO_ACTION_CONTAINER} a {
    display: inline-block;
    padding: ${Spacing.xs} ${Spacing['lg']};
    background-color: ${Colors.red};
    color: ${Colors.white} !important;
    transition: background-color 0.3s ease-in-out;
    font-weight: 700;
  }

  .${CALL_TO_ACTION_CONTAINER} a:hover,
  .${CALL_TO_ACTION_CONTAINER} a:focus {
    background-color: ${Colors.redDark};
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
    const slot = SlotWithDefaultStyling({ element, slotRef: CTA });
    if (slot) container.appendChild(slot);
  } else {
    container.appendChild(makeGivingLink());
  }

  return container;
};
