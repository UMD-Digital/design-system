import { Tokens, Fields, Typography } from '@universityofmaryland/variables';
import { CheckForAnimationLinkSpan, SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { HeroType } from '../index';
import { ELEMENTS, SLOTS, BREAKPOINTS, NAMING } from '../globals';

const { Colors, Spacing } = Tokens;
const { Ribbon } = Fields;
const {
  CampaignExtralarge,
  SansLargest,
  CampaignLarge,
  SansMedium,
  SansSmaller,
} = Typography;
const { DEFAULT_ATTR, STACKED_ATTR, OVERLAY_ATTR, MINIMAL_ATTR, LOGO_ATTR } =
  NAMING;

const { HERO_CONTAINER } = ELEMENTS;
const { EYEBROW, HEADLINE, TEXT, ACTIONS } = SLOTS;
const { HERO_BODY } = ELEMENTS;
const { tablet } = BREAKPOINTS;

const HERO_EYEBROW = 'umd-hero-overlay-eyebrow';
const HERO_HEADLINE = 'umd-hero-overlay-headline';
const HERO_TEXT = 'umd-hero-overlay-text';
const HERO_ACTION = 'umd-hero-overlay-actions';

// prettier-ignore
const EyebrowStyles = `  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${DEFAULT_ATTR} .${HERO_EYEBROW}`]: Ribbon,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${STACKED_ATTR} .${HERO_EYEBROW}`]: Ribbon,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${OVERLAY_ATTR} .${HERO_EYEBROW}`]: Ribbon,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${LOGO_ATTR} .${HERO_EYEBROW}`]: Ribbon,
    },
  })}

  .${HERO_CONTAINER}${DEFAULT_ATTR} .${HERO_EYEBROW},
  .${HERO_CONTAINER}${STACKED_ATTR} .${HERO_EYEBROW},
  .${HERO_CONTAINER}${OVERLAY_ATTR} .${HERO_EYEBROW},
  .${HERO_CONTAINER}${LOGO_ATTR} .${HERO_EYEBROW} {
    color: ${Colors.black}
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${MINIMAL_ATTR} .${HERO_EYEBROW}`]: SansSmaller,
    },
  })}

  .${HERO_CONTAINER}${MINIMAL_ATTR} .${HERO_EYEBROW} {
    text-transform: uppercase;
    font-weight: 600;
  }

  .${HERO_EYEBROW} + * {
    margin-top: ${Spacing.sm} !important;
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

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${LOGO_ATTR} .${HERO_HEADLINE}`]: CampaignLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${MINIMAL_ATTR} .${HERO_HEADLINE}`]: SansLargest,
    },
  })}

  .${HERO_CONTAINER}${MINIMAL_ATTR} .${HERO_HEADLINE} {
    font-weight: 800;
  }

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
