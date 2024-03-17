import { Tokens } from '@universityofmaryland/variables';
import { SlotDefaultStyling } from 'helpers/ui';
import { SLOTS } from '../globals';
import { UMDAlertElement } from '../index';

const { Spacing } = Tokens;

const { CTA } = SLOTS;

const ALERT_CTA = 'umd-alert-cta';

// prettier-ignore
export const ctaStyles = `
  * + .${ALERT_CTA} {
    margin-top: ${Spacing.sm};
  }

  .${ALERT_CTA} {
    overflow: hidden;
    display: flex;
  }
`;

export const CreateCta = ({ element }: { element: UMDAlertElement }) => {
  const wrapper = document.createElement('div');
  const ctaSlot = SlotDefaultStyling({ element, slotRef: CTA });

  if (ctaSlot) {
    wrapper.classList.add(ALERT_CTA);
    wrapper.appendChild(ctaSlot);
    return wrapper;
  }

  return null;
};
