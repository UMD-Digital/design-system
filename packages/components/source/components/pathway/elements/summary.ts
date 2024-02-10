import {
  colors,
  richText,
  spacing,
  typography,
  umdCta,
  umdEyebrow,
} from '@universityofmaryland/variables';
import { SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { SLOTS, BREAKPOINTS } from 'components/pathway/globals';
import { ELEMENT_TYPE } from 'components/pathway/component';

const SUMMARY_CONTAINER = 'umd-pathway-summary-column-container';
const SUMMARY_CONTAINER_WRAPPER =
  'umd-pathway-summary-column-container-wrapper';
const SUMMARY_HEADLINE_CONTAINER =
  'umd-pathway-summary-column-headline-container';
const SUMMARY_EYEBROW_CONTAINER =
  'umd-pathway-summary-column-eyebrow-container';
const SUMMARY_TEXT_CONTAINER = 'umd-pathway-summary-column-text-container';
const SUMMARY_ACTIONS_CONTAINER =
  'umd-pathway-summary-column-actions-container';

// prettier-ignore
const EyebrowStyles = `
  .${SUMMARY_EYEBROW_CONTAINER} * {
    color: ${colors.white};
  }


  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${SUMMARY_EYEBROW_CONTAINER}`]: umdEyebrow['.umd-eyebrow-ribbon'],
    },
  })}
`;

// prettier-ignore
const HeadlineStyles = `
  .${SUMMARY_HEADLINE_CONTAINER} * {
    color: ${colors.white};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${SUMMARY_HEADLINE_CONTAINER}`]: typography['.umd-sans-largest'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${SUMMARY_HEADLINE_CONTAINER} *`]: typography['.umd-sans-largest'],
    },
  })}
`;

// prettier-ignore
const TextStyles = `
  * + .${SUMMARY_TEXT_CONTAINER} {
    margin-top: ${spacing.md};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${SUMMARY_TEXT_CONTAINER}`]: richText['.umd-rich-text-dark'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${SUMMARY_TEXT_CONTAINER}`]: typography['.umd-sans-medium'],
    },
  })}
`;

// prettier-ignore
const ActionStyles = `
  * + .${SUMMARY_ACTIONS_CONTAINER} {
    margin-top: ${spacing.md};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${SUMMARY_ACTIONS_CONTAINER} a`]: umdCta['.umd-cta-secondary'],
    },
  })}

  .${SUMMARY_ACTIONS_CONTAINER} a {
    color: ${colors.white};
  }
`;

// prettier-ignore
export const STYLES_PATHWAY_SUMMARY_COLUMN = `
  @container umd-pathway (max-width: ${BREAKPOINTS.large - 1}px) {

  }

  .${SUMMARY_CONTAINER} {

  }

  .${SUMMARY_CONTAINER_WRAPPER} {

  }

  ${EyebrowStyles}
  ${HeadlineStyles}
  ${TextStyles}
  ${ActionStyles}
`;

export const CreateSummaryColumn = ({ element }: { element: ELEMENT_TYPE }) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const eyebrowSlot = SlotDefaultStyling({ element, slotRef: SLOTS.EYEBROW });
  const headlineSlot = SlotDefaultStyling({ element, slotRef: SLOTS.HEADLINE });
  const textSlot = SlotDefaultStyling({ element, slotRef: SLOTS.TEXT });
  const actionSlot = SlotDefaultStyling({ element, slotRef: SLOTS.ACTIONS });

  wrapper.classList.add(SUMMARY_CONTAINER_WRAPPER);

  if (eyebrowSlot) {
    eyebrowSlot.classList.add(SUMMARY_EYEBROW_CONTAINER);
    wrapper.appendChild(eyebrowSlot);
  }

  if (headlineSlot) {
    headlineSlot.classList.add(SUMMARY_HEADLINE_CONTAINER);
    wrapper.appendChild(headlineSlot);
  }

  if (textSlot) {
    textSlot.classList.add(SUMMARY_TEXT_CONTAINER);
    wrapper.appendChild(textSlot);
  }

  if (actionSlot) {
    actionSlot.classList.add(SUMMARY_ACTIONS_CONTAINER);
    wrapper.appendChild(actionSlot);
  }

  container.classList.add(SUMMARY_CONTAINER);
  container.appendChild(wrapper);

  return container;
};
