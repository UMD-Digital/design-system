import {
  Typography,
  Tokens,
  Animations,
} from '@universityofmaryland/variables';
import { CheckForAnimationLinkSpan, SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { CardType } from 'components/card-overlay';
import { SLOTS, ELEMENTS } from 'components/card-overlay/globals';

const { Spacing, Colors } = Tokens;
const { LinkLineSlide } = Animations;
const { SansMin, SansSmall, SansLarger, Eyebrow } = Typography;

const { EYEBROW, HEADLINE, TEXT, DATE } = SLOTS;
const { CONTENT_CONTAINER, CARD_OVERLAY_HEADLINE, CARD_OVERLAY_TEXT } =
  ELEMENTS;

const CARD_OVERLAY_EYEBROW = 'umd-overlay-card-eyebrow';
const CARD_OVERLAY_DATE = 'umd-overlay-card-date';

// prettier-ignore
const eyebrowStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_EYEBROW}`]: Eyebrow,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_EYEBROW} *`]: Eyebrow,
    },
  })}
`;

// prettier-ignore
const headlineStyles = `
  * + .${CARD_OVERLAY_HEADLINE} {
    margin-top: ${Spacing.min}
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_HEADLINE}`]: SansLarger,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_HEADLINE} *`]: SansLarger,
    },
  })}

  .${CARD_OVERLAY_HEADLINE},
  .${CARD_OVERLAY_HEADLINE} * {
    font-weight: 700;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_HEADLINE} a`]:
      LinkLineSlide['.slidein-underline-white'],
    },
  })}
`;

// prettier-ignore
const textStyles = `
  * + .${CARD_OVERLAY_TEXT} {
    margin-top: ${Spacing.min}
  }

  @media (min-width: 768px) {
    * + .${CARD_OVERLAY_TEXT} {
      margin-top: ${Spacing.sm}
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_TEXT} *`]: SansSmall,
    },
  })}

  .${CARD_OVERLAY_TEXT} a {
    text-decoration: underline;
    transition: color 0.3s ease-in-out;
  }

  .${CARD_OVERLAY_TEXT} a:hover,
  .${CARD_OVERLAY_TEXT} a:focus {
    text-decoration: underline;
    color: ${Colors.red};
  }
`;

// prettier-ignore
const dateStyles = `
  * + .${CARD_OVERLAY_DATE} {
    margin-top: ${Spacing.min}
  }

  .${CARD_OVERLAY_DATE} * {
    color: ${Colors.gray.mediumAA};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_DATE}`]: SansMin,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_DATE} *`]: SansMin,
    },
  })}
`

// prettier-ignore
export const ContentStyles = `
  .${CONTENT_CONTAINER} {
    position: relative;
    z-index: 9;
  }

  ${eyebrowStyles}
  ${headlineStyles}
  ${textStyles}
  ${dateStyles}
`;

export const CreateContent = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const eyebrowSlot = SlotDefaultStyling({ element, slotRef: EYEBROW });
  const headlineSlot = SlotDefaultStyling({ element, slotRef: HEADLINE });
  const textSlot = SlotDefaultStyling({ element, slotRef: TEXT });
  const dateSlot = SlotDefaultStyling({ element, slotRef: DATE });

  container.classList.add(CONTENT_CONTAINER);

  if (eyebrowSlot) {
    eyebrowSlot.classList.add(CARD_OVERLAY_EYEBROW);
    container.appendChild(eyebrowSlot);
  }

  if (headlineSlot) {
    CheckForAnimationLinkSpan({ element: headlineSlot });
    headlineSlot.classList.add(CARD_OVERLAY_HEADLINE);
    container.appendChild(headlineSlot);
  }

  if (textSlot) {
    textSlot.classList.add(CARD_OVERLAY_TEXT);
    container.appendChild(textSlot);
  }

  if (dateSlot) {
    dateSlot.classList.add(CARD_OVERLAY_DATE);
    container.appendChild(dateSlot);
  }

  return container;
};
