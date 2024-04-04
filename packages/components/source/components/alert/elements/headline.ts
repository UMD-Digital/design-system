import {
  Animations,
  Tokens,
  Typography,
} from '@universityofmaryland/variables';
import { MarkupCreate, MarkupModify, Styles } from 'utilities';
import { SLOTS } from '../globals';
import { UMDAlertElement } from '../index';

const { Colors, Spacing } = Tokens;
const { Link } = Animations;
const { SansLarge } = Typography;

const { ConvertJSSObjectToStyles } = Styles;
const { SlotWithDefaultStyling } = MarkupCreate;

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
      [`.${ALERT_HEADLINE} a`]: Link.LineSlideUnder.black,
    },
  })}
`;

export const CreateHeadline = ({ element }: { element: UMDAlertElement }) => {
  const headlineSlot = SlotWithDefaultStyling({
    element,
    slotRef: HEADLINE,
  });

  if (headlineSlot) {
    MarkupModify.AnimationLinkSpan({ element: headlineSlot });
    headlineSlot.classList.add(ALERT_HEADLINE);
    return headlineSlot;
  }

  return null;
};
