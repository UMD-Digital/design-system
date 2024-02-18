import {
  Typography,
  Layout,
  Tokens,
  Fields,
} from '@universityofmaryland/variables';
import { SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { SLOTS, ELEMENTS, VARIABLES, BREAKPOINTS } from '../globals';
import { ELEMENT_TYPE } from '../component';

const { spacing, Colors, FontSize } = Tokens;
const { Eyebrow, Text } = Fields;
const { FlexRows } = Layout;

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
const ThemeStyles = `
  .${ELEMENTS.PATHWAY_CONTAINER}[${VARIABLES.ATTRIBUTE_THEME}] .${SUMMARY_HEADLINE_CONTAINER},
  .${ELEMENTS.PATHWAY_CONTAINER}[${VARIABLES.ATTRIBUTE_THEME}] .${SUMMARY_TEXT_CONTAINER} * {
    color: ${Colors.white};
  }
`

// prettier-ignore
const PositionStyles = `
  @container umd-pathway (min-width: ${BREAKPOINTS.medium}px) {
    .${ELEMENTS.PATHWAY_CONTAINER}[${VARIABLES.ATTRIBUTE_IMAGE_POSITION}="right"] .${SUMMARY_CONTAINER} {
      order: 1;
    }

    .${ELEMENTS.PATHWAY_CONTAINER}[${VARIABLES.ATTRIBUTE_IMAGE_POSITION}="right"] .${SUMMARY_CONTAINER_WRAPPER} {
      padding-left: 0;
    }
  }

  @container umd-pathway (min-width: ${BREAKPOINTS.medium}px) {
    .${ELEMENTS.PATHWAY_CONTAINER}[${VARIABLES.ATTRIBUTE_IMAGE_POSITION}="left"] .${SUMMARY_CONTAINER_WRAPPER} {
      padding-right: 0;
    }
  }
`;

// prettier-ignore
const WithImageStyles = `
  .${ELEMENTS.PATHWAY_CONTAINER}[${VARIABLES.ATTRIBUTE_IMAGE}] .${SUMMARY_CONTAINER_WRAPPER} {
    padding: ${spacing.md};
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
const WithHighlightStyles = `
  .${ELEMENTS.PATHWAY_CONTAINER}[${VARIABLES.ATTRIBUTE_HIGHLIGHT}] .${SUMMARY_CONTAINER_WRAPPER} {
    padding-bottom: ${spacing.md};
  }

  @container umd-pathway (min-width: ${BREAKPOINTS.medium}px) {
    .${ELEMENTS.PATHWAY_CONTAINER}[${VARIABLES.ATTRIBUTE_HIGHLIGHT}] .${SUMMARY_CONTAINER_WRAPPER} {
      padding-right: ${spacing['4xl']};
    }
  }

  @container umd-pathway (min-width: ${BREAKPOINTS.large}px) {
    .${ELEMENTS.PATHWAY_CONTAINER}[${VARIABLES.ATTRIBUTE_HIGHLIGHT}] .${SUMMARY_CONTAINER_WRAPPER} {
      padding-right: ${spacing['6xl']};
    }
  }
`;

// prettier-ignore
const EyebrowStyles = `
  .${SUMMARY_EYEBROW_CONTAINER} {
    margin-bottom: ${spacing.sm};
    color: ${Colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${SUMMARY_EYEBROW_CONTAINER}`]: Eyebrow['.umd-eyebrow-ribbon'],
    },
  })}
`;

// prettier-ignore
const HeadlineStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${SUMMARY_HEADLINE_CONTAINER}`]: Typography['.umd-sans-largest'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${SUMMARY_HEADLINE_CONTAINER} *`]: Typography['.umd-sans-largest'],
    },
  })}

  .${SUMMARY_HEADLINE_CONTAINER} {
    color: ${Colors.black};
  }
`;

// prettier-ignore
const TextStyles = `
  * + .${SUMMARY_TEXT_CONTAINER} {
    margin-top: ${spacing.sm};
  }

  @container umd-pathway (min-width: ${BREAKPOINTS.medium}px) {
    * + .${SUMMARY_TEXT_CONTAINER} {
      margin-top: ${spacing.md};
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${SUMMARY_TEXT_CONTAINER} *`]: Text['.umd-text'],
    },
  })}

  .${SUMMARY_TEXT_CONTAINER} * {
    font-size: ${FontSize['lg']};
  }
`;

// prettier-ignore
const ActionStyles = `
  * + .${SUMMARY_ACTIONS_CONTAINER} {
    margin-top: ${spacing.sm};
  }

  @container umd-pathway (min-width: ${BREAKPOINTS.medium}px) {
    * + .${SUMMARY_ACTIONS_CONTAINER} {
      margin-top: ${spacing.lg};
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${SUMMARY_ACTIONS_CONTAINER}`]: FlexRows['.auto'],
    },
  })}
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
  ${WithHighlightStyles}
  ${PositionStyles}
  ${ThemeStyles}
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
