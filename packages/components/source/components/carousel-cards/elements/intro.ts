import { Tokens, Typography, Elements } from '@universityofmaryland/variables';
import { SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { SLOTS, BREAKPOINTS, ELEMENTS, VARIABLES } from '../globals';
import { UMDCarouselCardsElement } from '../index';

const { Colors, Spacing } = Tokens;
const { Text } = Elements;
const { SansMedium, SansLargest } = Typography;

const { LARGE } = BREAKPOINTS;
const { HEADLINE, TEXT, CTA } = SLOTS;
const { INTRO_CONTAINER } = ELEMENTS;
const { ELEMENT_NAME } = VARIABLES;

const INTRO_CONTAINER_LOCK = 'umd-carousel-cards-intro-container-lock';
const INTRO_CONTAINER_HEADLINE = 'umd-carousel-cards-intro-container-headline';
const INTRO_CONTAINER_TEXT = 'umd-carousel-cards-intro-container-text';
const INTRO_CONTAINER_CTA = 'umd-carousel-cards-intro-container-cta';

// prettier-ignore
const headlineStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${INTRO_CONTAINER_HEADLINE}`]: SansLargest,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${INTRO_CONTAINER_HEADLINE} *`]: SansLargest,
    },
  })}

  .${INTRO_CONTAINER_HEADLINE},
  .${INTRO_CONTAINER_HEADLINE} * {
    color: ${Colors.white};
    font-weight: 800;
    text-transform: uppercase;
  }
`;

// prettier-ignore
const textStyles = `
  * + .${INTRO_CONTAINER_TEXT} {
    margin-top: ${Spacing.md};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${INTRO_CONTAINER_TEXT}`]: Text.RichTextDark,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${INTRO_CONTAINER_TEXT}`]: SansMedium,
    },
  })}
`;

// prettier-ignore
const ctaStyles = `
  * + .${INTRO_CONTAINER_CTA} {
    margin-top: ${Spacing.md};
  }

  .${INTRO_CONTAINER_CTA} a {
    color: ${Colors.white};
  }
`;

// prettier-ignore
export const IntroContainerStyles = `
  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${INTRO_CONTAINER} {
      margin-bottom: ${Spacing.md};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${INTRO_CONTAINER} {
      width: calc(40% - ${Spacing['2xl']});
      padding-right: ${Spacing['2xl']};
    }
  }

  @media (min-width: ${LARGE}px) {
    .${INTRO_CONTAINER} .${INTRO_CONTAINER_LOCK} {
      max-width: inherit;
      padding: 0;
    }
  }

  ${headlineStyles}
  ${textStyles}
  ${ctaStyles}
`;

export const CreateIntroColumn = ({
  element,
}: {
  element: UMDCarouselCardsElement;
}) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const headlineSlot = SlotDefaultStyling({ element, slotRef: HEADLINE });
  const textSlot = SlotDefaultStyling({ element, slotRef: TEXT });
  const ctaSlot = SlotDefaultStyling({ element, slotRef: CTA });

  wrapper.classList.add(INTRO_CONTAINER_LOCK);

  if (headlineSlot) {
    headlineSlot.classList.add(INTRO_CONTAINER_HEADLINE);
    wrapper.appendChild(headlineSlot);
  }

  if (textSlot) {
    textSlot.classList.add(INTRO_CONTAINER_TEXT);
    wrapper.appendChild(textSlot);
  }

  if (ctaSlot) {
    ctaSlot.classList.add(INTRO_CONTAINER_CTA);
    wrapper.appendChild(ctaSlot);
  }

  container.classList.add(INTRO_CONTAINER);
  container.appendChild(wrapper);

  return container;
};
