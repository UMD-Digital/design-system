import {
  colors,
  richText,
  spacing,
  typography,
  umdCta,
  umdLock,
} from '@universityofmaryland/umd-web-configuration';
import { MakeSlot, SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { SLOTS, BREAKPOINTS } from '../globals';
import { ELEMENT_TYPE } from '../component';

const INTRO_CONTAINER = 'umd-carousel-cards-intro-container';
const INTRO_CONTAINER_LOCK = 'umd-carousel-cards-intro-container-lock';
const INTRO_CONTAINER_HEADLINE = 'umd-carousel-cards-intro-container-headline';
const INTRO_CONTAINER_TEXT = 'umd-carousel-cards-intro-container-text';
const INTRO_CONTAINER_CTA = 'umd-carousel-cards-intro-container-cta';

export const IntroContainerStyles = `
  @container umd-carousel-card (max-width: ${BREAKPOINTS.large - 1}px) {
    .${INTRO_CONTAINER} {
      margin-bottom: ${spacing.md};
    }
  }

  @container umd-carousel-card (min-width: ${BREAKPOINTS.large}px) {
    .${INTRO_CONTAINER} {
      width: calc(40% - ${spacing['2xl']});
      padding-right: ${spacing['2xl']};
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${INTRO_CONTAINER_LOCK}`]: umdLock['.umd-lock'],
    },
  })}

  @media (min-width: ${BREAKPOINTS.large}px) {
    .${INTRO_CONTAINER} .${INTRO_CONTAINER_LOCK} {
      max-width: inherit;
      padding: 0;
    }
  }

  .${INTRO_CONTAINER_HEADLINE} * {
    color: ${colors.white};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${INTRO_CONTAINER_HEADLINE} *`]: typography['.umd-sans-largest'],
    },
  })}

  * + .${INTRO_CONTAINER_TEXT} {
    margin-top: ${spacing.md};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [` .${INTRO_CONTAINER_TEXT} *`]: richText['.umd-rich-text-dark'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${INTRO_CONTAINER_TEXT}`]: typography['.umd-sans-medium'],
    },
  })}

  * + .${INTRO_CONTAINER_CTA} {
    margin-top: ${spacing.md};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${INTRO_CONTAINER_CTA} a`]: umdCta['.umd-cta-secondary'],
    },
  })}

  .${INTRO_CONTAINER_CTA} a {
    color: ${colors.white};
  }
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

  container.classList.add(INTRO_CONTAINER);
  container.appendChild(wrapper);

  return container;
};
