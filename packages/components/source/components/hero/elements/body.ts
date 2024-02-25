import {
  Tokens,
  Fields,
  Animations,
  Typography,
  Layout,
} from '@universityofmaryland/variables';
import { CheckForAnimationLinkSpan, SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { HeroType } from '../index';
import { ELEMENTS, SLOTS, BREAKPOINTS, NAMING, VARIABLES } from '../globals';

const { Colors, Spacing } = Tokens;
const { Ribbon } = Fields;
const { LinkLineSlide } = Animations;
const { CampaignExtralarge, CampaignLarge, SansMedium } = Typography;
const { FlexRows } = Layout;

const {
  DEFAULT_ATTR,
  STACKED_ATTR,
  OVERLAY_ATTR,
  MINIMAL_ATTR,
  LOGO_ATTR,
  DARK_ATTR,
  LIGHT_ATTR,
  MD_ATTR,
  TEXT_ALIGN_CENTER,
} = NAMING;
const {
  TYPE_DEFAULT,
  TYPE_STACKED,
  TYPE_MINIMAL,
  TYPE_OVERLAY,
  ATTRIBUTE_THEME,
  ATTRIBUTE_TYPE,
} = VARIABLES;
const { HERO_CONTAINER } = ELEMENTS;
const { EYEBROW, HEADLINE, TEXT, ACTIONS } = SLOTS;
const { HERO_BODY, HERO_BODY_WRAPPER } = ELEMENTS;
const { tablet } = BREAKPOINTS;

const HERO_EYEBROW = 'umd-hero-overlay-eyebrow';
const HERO_HEADLINE = 'umd-hero-overlay-headline';
const HERO_TEXT = 'umd-hero-overlay-text';
const HERO_ACTION = 'umd-hero-overlay-actions';

// prettier-ignore
const EyebrowStyles = `
  .${HERO_EYEBROW} {
    color: ${Colors.black} !important;
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_EYEBROW}`]: Ribbon,
    },
  })}

  .${HERO_EYEBROW} + * {
    margin-top: ${Spacing.sm} !important;
  }
`

// prettier-ignore
const HeadlineStyles = `
  .${HERO_HEADLINE} {
    text-transform: uppercase;
    color: ${Colors.white};
    max-width: 860px;
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${DEFAULT_ATTR} .${HERO_HEADLINE}`]: CampaignExtralarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${STACKED_ATTR} .${HERO_HEADLINE}`]: CampaignExtralarge,
    },
  })}

  .${HERO_CONTAINER}${STACKED_ATTR} .${HERO_HEADLINE} {
    max-width: 700px;
    margin: 0 auto;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${OVERLAY_ATTR} .${HERO_HEADLINE}`]: CampaignExtralarge,
    },
  })}

  .${HERO_CONTAINER}${OVERLAY_ATTR} .${HERO_HEADLINE} {
    width: 50%;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${LOGO_ATTR} .${HERO_HEADLINE}`]: CampaignLarge,
    },
  })}

  .${HERO_HEADLINE} + * {
    margin-top: ${Spacing.md};
  }
`

// prettier-ignore
const TextStyles = `
  .${HERO_TEXT} {
    max-width: 860px;
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_TEXT}`]: SansMedium,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_TEXT} *`]: SansMedium,
    },
  })}

  .${HERO_CONTAINER}${OVERLAY_ATTR} .${HERO_TEXT} {
    width: 50%;
  }

  .${HERO_TEXT} + * {
    margin-top: ${Spacing.lg};
  }
`

// prettier-ignore
const ActionStyles = `
  * + .${HERO_ACTION} {
    margin-top: ${Spacing.sm};
  }

  @container umd-hero (min-width: ${tablet}px) {
    * + .${HERO_ACTION} {
      margin-top: ${Spacing.lg};
    }
  }
`;

// prettier-ignore
export const STYLES_BODY = `
  .${HERO_BODY} {
    position: relative;
  }

  .${HERO_BODY_WRAPPER} {

  }

  ${EyebrowStyles}
  ${HeadlineStyles}
  ${TextStyles}
  ${ActionStyles}
`;

export const CreateBody = ({ element }: { element: HeroType }) => {
  const container = document.createElement('div');
  const eyebrowSlot = SlotDefaultStyling({ element, slotRef: EYEBROW });
  const headlineSlot = SlotDefaultStyling({ element, slotRef: HEADLINE });
  const textSlot = SlotDefaultStyling({ element, slotRef: TEXT });
  const actionSlot = SlotDefaultStyling({ element, slotRef: ACTIONS });

  container.classList.add(HERO_BODY);

  if (eyebrowSlot) {
    eyebrowSlot.classList.add(HERO_EYEBROW);
    container.appendChild(eyebrowSlot);
  }

  if (headlineSlot) {
    CheckForAnimationLinkSpan({ element: headlineSlot });
    headlineSlot.classList.add(HERO_HEADLINE);
    container.appendChild(headlineSlot);
  }

  if (textSlot) {
    textSlot.classList.add(HERO_TEXT);
    container.appendChild(textSlot);
  }

  if (actionSlot) {
    actionSlot.classList.add(HERO_ACTION);
    container.appendChild(actionSlot);
  }

  return container;
};
