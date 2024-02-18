import { Tokens, Typography, UmdFields } from '@universityofmaryland/variables';
import { SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  SLOTS,
  BREAKPOINTS,
  ELEMENTS,
} from 'components/carousel-cards/globals';
import { ELEMENT_TYPE } from 'components/carousel-cards/component';

const { colors, spacing } = Tokens;
const { Text } = UmdFields;

const INTRO_CONTAINER_LOCK = 'umd-carousel-cards-intro-container-lock';
const INTRO_CONTAINER_HEADLINE = 'umd-carousel-cards-intro-container-headline';
const INTRO_CONTAINER_TEXT = 'umd-carousel-cards-intro-container-text';
const INTRO_CONTAINER_CTA = 'umd-carousel-cards-intro-container-cta';

// prettier-ignore
const headlineStyles = `
  .${INTRO_CONTAINER_HEADLINE} * {
    color: ${colors.white};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${INTRO_CONTAINER_HEADLINE}`]: Typography['.umd-sans-largest'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${INTRO_CONTAINER_HEADLINE} *`]: Typography['.umd-sans-largest'],
    },
  })}
`;

// prettier-ignore
const textStyles = `
  * + .${INTRO_CONTAINER_TEXT} {
    margin-top: ${spacing.md};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${INTRO_CONTAINER_TEXT}`]: Text['.umd-text-dark'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${INTRO_CONTAINER_TEXT}`]: Typography['.umd-sans-medium'],
    },
  })}
`;

// prettier-ignore
const ctaStyles = `
  * + .${INTRO_CONTAINER_CTA} {
    margin-top: ${spacing.md};
  }

  .${INTRO_CONTAINER_CTA} a {
    color: ${colors.white};
  }
`;

// prettier-ignore
export const IntroContainerStyles = `
  @container umd-carousel-card (max-width: ${BREAKPOINTS.large - 1}px) {
    .${ELEMENTS.INTRO_CONTAINER} {
      margin-bottom: ${spacing.md};
    }
  }

  @container umd-carousel-card (min-width: ${BREAKPOINTS.large}px) {
    .${ELEMENTS.INTRO_CONTAINER} {
      width: calc(40% - ${spacing['2xl']});
      padding-right: ${spacing['2xl']};
    }
  }

  @media (min-width: ${BREAKPOINTS.large}px) {
    .${ELEMENTS.INTRO_CONTAINER} .${INTRO_CONTAINER_LOCK} {
      max-width: inherit;
      padding: 0;
    }
  }

  ${headlineStyles}
  ${textStyles}
  ${ctaStyles}
`;

export const CreateIntroColumn = ({ element }: { element: ELEMENT_TYPE }) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const headlineSlot = SlotDefaultStyling({ element, slotRef: SLOTS.HEADLINE });
  const textSlot = SlotDefaultStyling({ element, slotRef: SLOTS.TEXT });
  const ctaSlot = SlotDefaultStyling({ element, slotRef: SLOTS.CTA });

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

  container.classList.add(ELEMENTS.INTRO_CONTAINER);
  container.appendChild(wrapper);

  return container;
};
