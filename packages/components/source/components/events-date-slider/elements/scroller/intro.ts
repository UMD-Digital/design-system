import { Tokens, Typography } from '@universityofmaryland/variables';
import { CheckForCtaStyle } from 'utilities/ui';
import { Styles, MarkupCreate } from 'utilities';
import {
  BREAKPOINTS,
  ELEMENTS,
  SLOTS,
  REFERENCES,
} from 'components/events-date-slider/globals';

const { Colors, Spacing } = Tokens;

const { ConvertJSSObjectToStyles } = Styles;
const { SlotWithDefaultStyling } = MarkupCreate;

const { TABLET } = BREAKPOINTS;
const { CONTAINER_CLASS } = ELEMENTS;
const { HEADLINE_SLOT_NAME, LINK_SLOT_NAME } = SLOTS;
const { IS_THEME_DARK } = REFERENCES;

const INTRO_CONTAINER = 'umd-element-date-slider-intro-container';
const INTRO_HEADLINE = 'umd-element-date-slider-headline';
const INTRO_LINK = 'umd-element-date-slider-link';

const headlineStyles = `
  .${INTRO_HEADLINE} {
    color: ${Colors.black};
    font-weight: 700;
  }

  .${INTRO_HEADLINE} + * {
    margin-top: ${Spacing.min};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${INTRO_HEADLINE}`]: Typography.SansLarger,
    },
  })}

  .${CONTAINER_CLASS}${IS_THEME_DARK} .${INTRO_HEADLINE} {
    color: ${Colors.white};
  }
`;

const linkStyles = `
  * + .${INTRO_LINK} {
    text-decoration: none;
  }

  .${INTRO_LINK} {
    margin-top: ${Spacing.min};
  }

  .${CONTAINER_CLASS}${IS_THEME_DARK} .${INTRO_LINK} {
    color: ${Colors.white};
  }
`;

export const IntroStyles = `
  .${INTRO_CONTAINER} {
    padding: 0 ${Spacing.lg};
    position: relative;
  }

  @container dates-slider (max-width: ${TABLET - 1}px) {
    .${INTRO_CONTAINER} {
      text-align: center;
    }
  }

  @container dates-slider (min-width: ${TABLET}px) {
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
  const headlineSlot = SlotWithDefaultStyling({
    element,
    slotRef: HEADLINE_SLOT_NAME,
  });
  const linkSlot = SlotWithDefaultStyling({
    element,
    slotRef: LINK_SLOT_NAME,
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
