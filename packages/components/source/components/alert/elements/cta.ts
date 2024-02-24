import { Tokens } from '@universityofmaryland/variables';
import { SlotDefaultStyling } from 'helpers/ui';
import { SLOTS } from 'components/alert/globals';
import { AlertType } from 'components/alert';

const { Spacing } = Tokens;

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

export const CreateCta = ({ element }: { element: AlertType }) => {
  const wrapper = document.createElement('div');
  const ctaSlot = SlotDefaultStyling({ element, slotRef: SLOTS.CTA });

  if (ctaSlot) {
    wrapper.classList.add(ALERT_CTA);
    wrapper.appendChild(ctaSlot);
    return wrapper;
  }

  return null;
};
