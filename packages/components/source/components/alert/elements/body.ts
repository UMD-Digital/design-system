import { richTextBase } from '@universityofmaryland/umd-web-configuration';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { SLOTS } from 'components/alert/globals';
import { AlertType } from 'components/alert/component';
import { SlotDefaultStyling } from 'helpers/ui';

const ALERT_BODY = 'umd-alert-body';

// prettier-ignore
export const bodyStyles = `
  .${ALERT_BODY} * {
    font-weight: 500;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ALERT_BODY}`]: richTextBase['.umd-rich-text-base'],
    },
  })}
`;

export const CreateBody = ({ element }: { element: AlertType }) => {
  const bodySlot = SlotDefaultStyling({ element, slotRef: SLOTS.BODY });

  if (bodySlot) {
    bodySlot.classList.add(ALERT_BODY);
    return bodySlot;
  }

  return null;
};
