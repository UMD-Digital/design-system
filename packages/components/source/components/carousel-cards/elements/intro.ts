import {
  colors,
  spacing,
  typography,
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

  .${INTRO_CONTAINER_LOCK} {
    ${ConvertJSSObjectToStyles({
      styleObj: umdLock['.umd-lock'],
    })}
  }

  @media (min-width: ${BREAKPOINTS.large}px) {
    .${INTRO_CONTAINER} .${INTRO_CONTAINER_LOCK} {
      max-width: inherit;
      padding: 0;
    }
  }

  .${INTRO_CONTAINER_HEADLINE} * {
    ${ConvertJSSObjectToStyles({
      styleObj: typography['.umd-sans-largest'],
    })}
    color: ${colors.white};
  }

  * + .${INTRO_CONTAINER_TEXT} {
    margin-top: ${spacing.md};
  }

  * + .${INTRO_CONTAINER_CTA} {
    margin-top: ${spacing.md};
  }
`;

export const CreateIntroColumn = ({ element }: { element: ELEMENT_TYPE }) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const headlineSlot = SlotDefaultStyling({ element, slotRef: SLOTS.HEADLINE });
  const textSlot = MakeSlot({ type: SLOTS.TEXT });
  const ctaSlot = MakeSlot({ type: SLOTS.CTA });

  wrapper.classList.add(INTRO_CONTAINER_LOCK);

  if (headlineSlot) {
    const headlineWrapper = document.createElement('div');
    headlineWrapper.appendChild(headlineSlot);
    headlineWrapper.classList.add(INTRO_CONTAINER_HEADLINE);
    wrapper.appendChild(headlineWrapper);
  }

  if (textSlot) {
    const textWrapper = document.createElement('div');
    textWrapper.appendChild(textSlot);
    textWrapper.classList.add(INTRO_CONTAINER_TEXT);
    wrapper.appendChild(textWrapper);
  }

  if (ctaSlot) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.appendChild(ctaSlot);
    ctaWrapper.classList.add(INTRO_CONTAINER_CTA);
    wrapper.appendChild(ctaWrapper);
  }

  container.classList.add(INTRO_CONTAINER);
  container.appendChild(wrapper);

  return container;
};
