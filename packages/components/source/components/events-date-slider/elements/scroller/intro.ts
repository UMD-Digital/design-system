import { Tokens, Typography } from '@universityofmaryland/variables';
import { CheckForCtaStyle, SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  BREAKPOINTS,
  ELEMENTS,
  SLOTS,
} from 'components/events-date-slider/globals';

const { Colors, spacing } = Tokens;

const INTRO_CONTAINER = 'umd-element-date-slider-intro-container';
const INTRO_HEADLINE = 'umd-element-date-slider-headline';
const INTRO_LINK = 'umd-element-date-slider-link';

const headlineStyles = `
  .${INTRO_HEADLINE} {
    color: ${Colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${INTRO_HEADLINE}`]: Typography['.umd-sans-larger'],
    },
  })}

  .${ELEMENTS.CONTAINER_DARK_CLASS} .${INTRO_HEADLINE} {
    color: ${Colors.white};
  }
`;

const linkStyles = `
  * + .${INTRO_LINK} {
    text-decoration: none;
  }

  .${INTRO_LINK} {
    margin-top: ${spacing.min};
  }

  .${ELEMENTS.CONTAINER_DARK_CLASS} .${INTRO_LINK} {
    color: ${Colors.white};
  }
`;

export const IntroStyles = `
  .${INTRO_CONTAINER} {
    padding: 0 ${spacing.lg};
    position: relative;
  }

  @container dates-slider (max-width: ${BREAKPOINTS.tablet - 1}px) {
    .${INTRO_CONTAINER} {
      text-align: center;
    }
  }

  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    .${INTRO_CONTAINER} {
      padding: 0;
      padding-right: 24px;
      padding-left: 0;
      width: 200px;
    }
  }

  ${headlineStyles}
  ${linkStyles}
`;

export const CreateIntroWrapper = ({ element }: { element: HTMLElement }) => {
  const introductionWrapper = document.createElement('div');
  const headlineSlot = SlotDefaultStyling({
    element,
    slotRef: SLOTS.HEADLINE_SLOT_NAME,
  });
  const linkSlot = SlotDefaultStyling({
    element,
    slotRef: SLOTS.LINK_SLOT_NAME,
  });

  if (headlineSlot) {
    headlineSlot.classList.add(INTRO_HEADLINE);
    introductionWrapper.appendChild(headlineSlot);
  }
  if (linkSlot) {
    CheckForCtaStyle({ element: linkSlot, styleClass: INTRO_LINK });
    introductionWrapper.appendChild(linkSlot);
  }

  introductionWrapper.classList.add(INTRO_CONTAINER);

  return introductionWrapper;
};
