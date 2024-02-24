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
const { Ribbon, Text } = Fields;
const { LinkLineSlide } = Animations;
const { CampaignExtralarge, SansMedium } = Typography;
const { FlexRows } = Layout;

const {
  DEFAULT_ATTR,
  STACKED_ATTR,
  OVERLAY_ATTR,
  MINIMAL_ATTR,
  DARK_ATTR,
  LIGHT_ATTR,
  MD_ATTR,
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

const { HERO_BODY, HERO_BODY_WRAPPER } = ELEMENTS;

const HERO_EYEBROW = 'umd-hero-overlay-eyebrow';
const HERO_HEADLINE = 'umd-hero-overlay-headline';
const HERO_TEXT = 'umd-hero-overlay-text';
const HERO_ACTION = 'umd-hero-overlay-actions';

// prettier-ignore
const EyebrowStyles = `
  .${HERO_EYEBROW} {

  }

  .${HERO_CONTAINER}${DEFAULT_ATTR} .${HERO_EYEBROW} {
    color: ${Colors.black};
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_EYEBROW}`]: Ribbon,
    },
  })}

  .${HERO_EYEBROW} + * {
    margin-top: ${Spacing.sm};
  }
`

// prettier-ignore
const HeadlineStyles = `
  .${HERO_HEADLINE} {
    text-transform: uppercase;
    color: ${Colors.white};
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${DEFAULT_ATTR} .${HERO_HEADLINE}`]: CampaignExtralarge,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_HEADLINE} a`]: LinkLineSlide['.slidein-underline-white'],
    },
  })}

  .${HERO_HEADLINE} + * {
    margin-top: ${Spacing.md};
  }
`

// prettier-ignore
const TextStyles = `
  .${HERO_TEXT} {
  
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

  .${HERO_TEXT} + * {
    margin-top: ${Spacing.lg};
  }
`

// prettier-ignore
const ActionStyles = `
  * + .${HERO_ACTION} {
    margin-top: ${Spacing.sm};
  }

  @container umd-pathway (min-width: ${BREAKPOINTS.medium}px) {
    * + .${HERO_ACTION} {
      margin-top: ${Spacing.lg};
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_ACTION}`]: FlexRows['.auto'],
    },
  })}
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
  const wrapper = document.createElement('div');
  const eyebrowSlot = SlotDefaultStyling({ element, slotRef: SLOTS.EYEBROW });
  const headlineSlot = SlotDefaultStyling({ element, slotRef: SLOTS.HEADLINE });
  const textSlot = SlotDefaultStyling({ element, slotRef: SLOTS.TEXT });
  const actionSlot = SlotDefaultStyling({ element, slotRef: SLOTS.ACTIONS });

  container.classList.add(HERO_BODY);
  wrapper.classList.add(HERO_BODY_WRAPPER);

  if (eyebrowSlot) {
    eyebrowSlot.classList.add(HERO_EYEBROW);
    wrapper.appendChild(eyebrowSlot);
  }

  if (headlineSlot) {
    CheckForAnimationLinkSpan({ element: headlineSlot });
    headlineSlot.classList.add(HERO_HEADLINE);
    wrapper.appendChild(headlineSlot);
  }

  if (textSlot) {
    textSlot.classList.add(HERO_TEXT);
    wrapper.appendChild(textSlot);
  }

  if (actionSlot) {
    actionSlot.classList.add(HERO_ACTION);
    wrapper.appendChild(actionSlot);
  }

  container.appendChild(wrapper);

  return container;
};
