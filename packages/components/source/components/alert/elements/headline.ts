import {
  animatedLinks,
  spacing,
  typography,
} from '@universityofmaryland/umd-web-configuration';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { SLOTS } from 'components/alert/globals';
import { AlertType } from 'components/alert/component';
import { CheckForAnimationLinkSpan, SlotDefaultStyling } from 'helpers/ui';

const ALERT_HEADLINE = 'umd-alert-headline';

// prettier-ignore
export const headlineStyles = `
  .${ALERT_HEADLINE} {
    margin-bottom: ${spacing.sm};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ALERT_HEADLINE}`]: typography['.umd-sans-large'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ALERT_HEADLINE} *`]: typography['.umd-sans-large'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ALERT_HEADLINE} a`]: animatedLinks['.umd-slidein-underline-black'],
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
