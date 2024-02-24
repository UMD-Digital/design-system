import {
  Tokens,
  Fields,
  Animations,
  Typography,
  Layout,
} from '@universityofmaryland/variables';
import { CheckForAnimationLinkSpan, SlotDefaultStyling } from 'helpers/ui';
import { HeroType } from '../index';
import { ELEMENTS, SLOTS, BREAKPOINTS } from '../globals';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

const { Colors, Spacing } = Tokens;
const { Ribbon, Text } = Fields;
const { LinkLineSlide } = Animations;
const { SansLargest, SansMedium } = Typography;
const { FlexRows } = Layout;

const HERO_EYEBROW = 'umd-hero-overlay-eyebrow';
const HERO_HEADLINE = 'umd-hero-overlay-headline';
const HERO_TEXT = 'umd-hero-overlay-text';
const HERO_ACTION = 'umd-hero-overlay-actions';

// prettier-ignore
const EyebrowStyles = `
  .${HERO_EYEBROW} {
  
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_EYEBROW}`]: Ribbon,
    },
  })}
`

// prettier-ignore
const HeadlineStyles = `
  .${HERO_HEADLINE} {
    text-transform: uppercase;
    color: ${Colors.white};
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_HEADLINE}`]: SansLargest,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_HEADLINE} a`]: LinkLineSlide['.slidein-underline-white'],
    },
  })}
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
  .${ELEMENTS.HERO_BODY} {

  }

  .${ELEMENTS.HERO_BODY_WRAPPER} {

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

  container.classList.add(ELEMENTS.HERO_BODY);
  wrapper.classList.add(ELEMENTS.HERO_BODY_WRAPPER);

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
