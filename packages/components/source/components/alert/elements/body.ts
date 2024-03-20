import { Tokens, Fields } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { SlotDefaultStyling } from 'helpers/ui';
import { SLOTS } from '../globals';
import { UMDAlertElement } from '../index';

const { RichText } = Fields;
const { Colors } = Tokens;

const { BODY } = SLOTS;

const ALERT_BODY = 'umd-alert-body';

// prettier-ignore
export const bodyStyles = `
  .${ALERT_BODY} * {
    font-weight: 500;
    color: ${Colors.gray.dark}
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ALERT_BODY}`]: RichText,
    },
  })}
`;

export const CreateBody = ({ element }: { element: UMDAlertElement }) => {
  const bodySlot = SlotDefaultStyling({ element, slotRef: BODY });

  if (bodySlot) {
    bodySlot.classList.add(ALERT_BODY);
    return bodySlot;
  }

  return null;
};
