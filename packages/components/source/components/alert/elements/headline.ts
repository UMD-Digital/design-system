import {
  Animations,
  Tokens,
  Typography,
} from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { SLOTS } from 'components/alert/globals';
import { AlertType } from 'components/alert/component';
import { CheckForAnimationLinkSpan, SlotDefaultStyling } from 'helpers/ui';

const { Colors, Spacing } = Tokens;
const { LinkLineSlide } = Animations;

const ALERT_HEADLINE = 'umd-alert-headline';

// prettier-ignore
export const headlineStyles = `
  .${ALERT_HEADLINE} {
    margin-bottom: ${Spacing.sm};
    color: ${Colors.black}
  }

  .${ALERT_HEADLINE} * {
    color: currentColor;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ALERT_HEADLINE}`]: Typography['.umd-sans-large'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ALERT_HEADLINE} *`]: Typography['.umd-sans-large'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ALERT_HEADLINE} a`]: LinkLineSlide['.slidein-underline-black'],
    },
  })}
`;

export const CreateHeadline = ({ element }: { element: AlertType }) => {
  const headlineSlot = SlotDefaultStyling({ element, slotRef: SLOTS.HEADLINE });

  if (headlineSlot) {
    CheckForAnimationLinkSpan({ element: headlineSlot });
    headlineSlot.classList.add(ALERT_HEADLINE);
    return headlineSlot;
  }

  return null;
};
