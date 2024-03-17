import {
  Animations,
  Tokens,
  Typography,
} from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { CheckForAnimationLinkSpan, SlotDefaultStyling } from 'helpers/ui';
import { SLOTS } from '../globals';
import { UMDAlertElement } from '../index';

const { Colors, Spacing } = Tokens;
const { LinkLineSlide } = Animations;
const { SansLarge } = Typography;

const { HEADLINE } = SLOTS;

const ALERT_HEADLINE = 'umd-alert-headline';

// prettier-ignore
export const headlineStyles = `
  .${ALERT_HEADLINE} {
    margin-bottom: ${Spacing.sm};
    color: ${Colors.black};
    padding-right: ${Spacing.md};
  }

  .${ALERT_HEADLINE} * {
    color: currentColor;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ALERT_HEADLINE}`]: SansLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ALERT_HEADLINE} *`]: SansLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ALERT_HEADLINE} a`]: LinkLineSlide['.slidein-underline-black'],
    },
  })}
`;

export const CreateHeadline = ({ element }: { element: UMDAlertElement }) => {
  const headlineSlot = SlotDefaultStyling({ element, slotRef: HEADLINE });

  if (headlineSlot) {
    CheckForAnimationLinkSpan({ element: headlineSlot });
    headlineSlot.classList.add(ALERT_HEADLINE);
    return headlineSlot;
  }

  return null;
};
