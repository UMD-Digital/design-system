import { Tokens, Elements, Typography } from '@universityofmaryland/variables';
import { CheckForAnimationLinkSpan, SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  ELEMENTS,
  SLOTS,
  BREAKPOINTS,
  REFERENCES,
  VARIABLES,
} from '../globals';
import { UMDHeroElement } from '../index';

const { Colors, Spacing } = Tokens;
const { Eyebrow } = Elements;
const {
  CampaignExtralarge,
  SansLargest,
  CampaignLarge,
  SansLarger,
  SansMedium,
  SansSmaller,
} = Typography;

const { TABLET, DESKTOP } = BREAKPOINTS;
const { HERO_CONTAINER, HERO_BODY, HERO_EYEBROW } = ELEMENTS;
const { EYEBROW, HEADLINE, TEXT, ACTIONS } = SLOTS;
const { ELEMENT_NAME } = VARIABLES;
const {
  IS_TYPE_DEFAULT,
  IS_TYPE_STACKED,
  IS_TYPE_OVERLAY,
  IS_TYPE_MINIMAL,
  IS_TYPE_LOGO,
  IS_THEME_DARK,
  IS_WITHIN_LOCK,
} = REFERENCES;

const HERO_HEADLINE = 'umd-hero-overlay-headline';
const HERO_TEXT = 'umd-hero-overlay-text';
const HERO_ACTION = 'umd-hero-overlay-actions';

// prettier-ignore
const EyebrowStyles = `  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${IS_TYPE_DEFAULT} .${HERO_EYEBROW}`]: Eyebrow.Ribbon,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${IS_TYPE_STACKED} .${HERO_EYEBROW}`]: Eyebrow.Ribbon,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${IS_TYPE_OVERLAY} .${HERO_EYEBROW}`]: Eyebrow.Ribbon,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${IS_TYPE_LOGO} .${HERO_EYEBROW}`]: Eyebrow.Ribbon,
    },
  })}

  .${HERO_CONTAINER}${IS_TYPE_DEFAULT} .${HERO_EYEBROW},
  .${HERO_CONTAINER}${IS_TYPE_STACKED} .${HERO_EYEBROW},
  .${HERO_CONTAINER}${IS_TYPE_OVERLAY} .${HERO_EYEBROW},
  .${HERO_CONTAINER}${IS_TYPE_LOGO} .${HERO_EYEBROW} {
    color: ${Colors.black}
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${IS_TYPE_MINIMAL} .${HERO_EYEBROW}`]: SansSmaller,
    },
  })}

  .${HERO_CONTAINER}${IS_TYPE_MINIMAL} .${HERO_EYEBROW} {
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
      [`.${HERO_CONTAINER}${IS_TYPE_DEFAULT} .${HERO_HEADLINE}`]: CampaignExtralarge,
    },
  })}

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${HERO_CONTAINER}${IS_TYPE_DEFAULT} .${HERO_HEADLINE} {
      max-width: 700px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${DESKTOP}px) {
    .${HERO_CONTAINER}${IS_TYPE_DEFAULT} .${HERO_HEADLINE} {
      max-width: 776px;
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${IS_TYPE_STACKED} .${HERO_HEADLINE}`]: CampaignExtralarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${IS_TYPE_STACKED}${IS_WITHIN_LOCK} .${HERO_HEADLINE}`]: CampaignLarge,
    },
  })}

  .${HERO_CONTAINER}${IS_TYPE_STACKED} .${HERO_HEADLINE} {
    max-width: 700px;
    margin: 0 auto;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${IS_TYPE_OVERLAY} .${HERO_HEADLINE}`]: CampaignExtralarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${IS_TYPE_LOGO} .${HERO_HEADLINE}`]: CampaignLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${IS_TYPE_MINIMAL} .${HERO_HEADLINE}`]: SansLargest,
    },
  })}

  .${HERO_CONTAINER}${IS_TYPE_MINIMAL} .${HERO_HEADLINE} {
    font-weight: 800;
  }

  .${HERO_HEADLINE} + * {
    margin-top: ${Spacing.md};
  }

  .${HERO_HEADLINE} > a:hover,
  .${HERO_HEADLINE} > a:focus {
    text-decoration: underline;
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

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${IS_TYPE_DEFAULT} .${HERO_TEXT}`]: SansLarger,
    },
  })}

  .${HERO_CONTAINER}${IS_TYPE_DEFAULT} .${HERO_TEXT} {
    font-weight: 400;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${IS_TYPE_LOGO} .${HERO_TEXT}`]: SansLarger,
    },
  })}

  .${HERO_CONTAINER}${IS_TYPE_LOGO} .${HERO_TEXT} {
    color: ${Colors.gray.dark};
    font-weight: 400;
  }

  .${HERO_CONTAINER}${IS_TYPE_LOGO}${IS_THEME_DARK} .${HERO_TEXT} {
    color: ${Colors.white};
  }



  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${IS_TYPE_STACKED} .${HERO_TEXT}`]: SansLarger,
    },
  })}

  .${HERO_CONTAINER}${IS_TYPE_STACKED} .${HERO_TEXT} {
    color: ${Colors.gray.dark};
    font-weight: 400;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_CONTAINER}${IS_TYPE_OVERLAY} .${HERO_TEXT}`]: SansLarger,
    },
  })}

  .${HERO_CONTAINER}${IS_TYPE_OVERLAY} .${HERO_TEXT} {
    font-weight: 400;
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${HERO_CONTAINER}${IS_TYPE_OVERLAY} .${HERO_TEXT} {
      max-width: 60%;
    }
  }

  .${HERO_CONTAINER}${IS_TYPE_STACKED} .${HERO_TEXT} * {
    color: ${Colors.gray.dark};
  }
`

// prettier-ignore
const ActionStyles = `
  * + .${HERO_ACTION} {
    margin-top: ${Spacing.sm};
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
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

export const CreateBody = ({ element }: { element: UMDHeroElement }) => {
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
