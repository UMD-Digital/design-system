import { Tokens, Elements } from '@universityofmaryland/variables';
import { Styles, MarkupCreate } from 'utilities';
import { SLOTS } from '../globals';
import { UMDAlertElement } from '../index';

const { Text } = Elements;
const { Colors } = Tokens;

const { ConvertJSSObjectToStyles } = Styles;
const { SlotWithDefaultStyling } = MarkupCreate;

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
      [`.${ALERT_BODY}`]: Text.RichText,
    },
  })}
`;

export const CreateBody = ({ element }: { element: UMDAlertElement }) => {
  const bodySlot = SlotWithDefaultStyling({ element, slotRef: BODY });

  if (bodySlot) {
    bodySlot.classList.add(ALERT_BODY);
    return bodySlot;
  }

  return null;
};
