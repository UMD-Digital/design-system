import { Tokens, Layout } from '@universityofmaryland/variables';
import { Styles, MarkupCreate } from 'utilities';
import { SLOTS } from '../globals';
import { UMDAlertElement } from '../index';

const { Spacing } = Tokens;
const { GridColumnAndRows } = Layout;

const { ConvertJSSObjectToStyles } = Styles;
const { SlotWithDefaultStyling } = MarkupCreate;

const { ACTIONS } = SLOTS;

const ALERT_CTA = 'umd-alert-cta';

// prettier-ignore
export const ctaStyles = `
  * + .${ALERT_CTA} {
    margin-top: ${Spacing.sm};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ALERT_CTA}`]: GridColumnAndRows['.mobile-tablet'],
    },
  })}
`;

export const CreateCta = ({ element }: { element: UMDAlertElement }) => {
  const wrapper = document.createElement('div');
  const ctaSlot = SlotWithDefaultStyling({ element, slotRef: ACTIONS });

  if (ctaSlot) {
    wrapper.classList.add(ALERT_CTA);
    wrapper.appendChild(ctaSlot);
    return wrapper;
  }

  return null;
};
