import {
  richText,
  spacing,
  typography,
  umdEyebrow,
} from '@universityofmaryland/variables';
import { SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { SLOTS, ELEMENTS, VARIABLES, BREAKPOINTS } from '../globals';
import { ELEMENT_TYPE } from '../component';

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
const WithImageStyles = `
  .${ELEMENTS.PATHWAY_CONTAINER}[${VARIABLES.ATTRIBUTE_IMAGE}] .${SUMMARY_CONTAINER_WRAPPER} {
    padding-top: ${spacing.md};
  }

  @container umd-pathway (min-width: ${BREAKPOINTS.medium}px) {
    .${ELEMENTS.PATHWAY_CONTAINER}[${VARIABLES.ATTRIBUTE_IMAGE}] .${SUMMARY_CONTAINER_WRAPPER} {
      padding: ${spacing['4xl']} ${spacing['2xl']};
    }
  }

  @container umd-pathway (min-width: ${BREAKPOINTS.large}px) {
    .${ELEMENTS.PATHWAY_CONTAINER}[${VARIABLES.ATTRIBUTE_IMAGE}] .${SUMMARY_CONTAINER_WRAPPER} {
      padding: ${spacing['8xl']} ${spacing['6xl']};
    }
  }
`;

// prettier-ignore
const EyebrowStyles = `
  .${SUMMARY_EYEBROW_CONTAINER}  {
    margin-bottom: ${spacing.sm};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${SUMMARY_EYEBROW_CONTAINER}`]: umdEyebrow['.umd-eyebrow-ribbon'],
    },
  })}
`;

// prettier-ignore
const HeadlineStyles = `
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
      [`.${SUMMARY_TEXT_CONTAINER} *`]: richText['.umd-rich-text'],
    },
  })}
`;

// prettier-ignore
const ActionStyles = `
  * + .${SUMMARY_ACTIONS_CONTAINER} {
    margin-top: ${spacing.lg};
  }
`;

// prettier-ignore
export const STYLES_PATHWAY_SUMMARY_COLUMN = `
  .${SUMMARY_CONTAINER} {
    display: flex;
    align-items: center;
  }

  ${EyebrowStyles}
  ${HeadlineStyles}
  ${TextStyles}
  ${ActionStyles}
  ${WithImageStyles}
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
