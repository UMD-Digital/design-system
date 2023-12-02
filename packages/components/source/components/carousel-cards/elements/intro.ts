import {
  spacing,
  typography,
  umdLock,
} from '@universityofmaryland/umd-web-configuration';
import { MakeSlot } from 'helpers/ui';
import {
  CovertObjectMediaQueriesToStyles,
  CovertObjectToStyles,
} from 'helpers/styles';
import { SLOTS, BREAKPOINTS } from '../globals';

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
    ${CovertObjectToStyles({ styles: umdLock['.umd-lock'] })}
  }

  ${CovertObjectMediaQueriesToStyles({
    element: INTRO_CONTAINER_LOCK,
    styles: umdLock['.umd-lock'],
  })}

  @media (min-width: ${BREAKPOINTS.large}px) {
    .${INTRO_CONTAINER} .${INTRO_CONTAINER_LOCK} {
      max-width: inherit;
      padding: 0;
    }
  }

  .${INTRO_CONTAINER_HEADLINE} ::slotted(*) {
    ${CovertObjectToStyles({ styles: typography['.umd-sans-largest'] })}
    color: theme(colors.white);
  }

  * + .${INTRO_CONTAINER_TEXT} {
    margin-top: ${spacing.md};
  }

  * + .${INTRO_CONTAINER_CTA} {
    margin-top: ${spacing.md};
  }
`;

export const CreateIntroColumn = () => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const headlineWrapper = document.createElement('div');
  const textWrapper = document.createElement('div');
  const ctaWrapper = document.createElement('div');
  const headlineSlot = MakeSlot({ type: SLOTS.HEADLINE });
  const textSlot = MakeSlot({ type: SLOTS.TEXT });
  const ctaSlot = MakeSlot({ type: SLOTS.CTA });

  wrapper.classList.add(INTRO_CONTAINER_LOCK);

  if (headlineSlot) {
    headlineWrapper.appendChild(headlineSlot);
    headlineWrapper.classList.add(INTRO_CONTAINER_HEADLINE);
    wrapper.appendChild(headlineWrapper);
  }

  if (textSlot) {
    textWrapper.appendChild(textSlot);
    textWrapper.classList.add(INTRO_CONTAINER_TEXT);
    wrapper.appendChild(textWrapper);
  }

  if (ctaSlot) {
    ctaWrapper.appendChild(ctaSlot);
    ctaWrapper.classList.add(INTRO_CONTAINER_CTA);
    wrapper.appendChild(ctaWrapper);
  }

  container.classList.add(INTRO_CONTAINER);
  container.appendChild(wrapper);

  return container;
};
