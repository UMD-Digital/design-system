import {
  Typography,
  Layout,
  Tokens,
  Fields,
} from '@universityofmaryland/variables';
import { SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  SLOTS,
  ELEMENTS,
  REFERENCES,
  BREAKPOINTS,
  VARIABLES,
} from '../globals';
import { UMDPathwayElement } from '../index';

const { Spacing, Colors, FontSize } = Tokens;
const { Ribbon, RichText } = Fields;
const { GridColumnAndRows } = Layout;
const { SansLargest, CampaignExtralarge, SansLarger } = Typography;

const { EYEBROW, HEADLINE, TEXT, ACTIONS } = SLOTS;
const { MEDIUM, LARGE } = BREAKPOINTS;
const { PATHWAY_CONTAINER } = ELEMENTS;
const { ELEMENT_NAME } = VARIABLES;
const {
  IS_WITH_IMAGE_RIGHT,
  IS_WITH_IMAGE_LEFT,
  IS_WITH_IMAGE,
  IS_WITH_HIGHLIGHT,
  IS_WITH_HERO,
} = REFERENCES;

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
const PositionStyles = `
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER}${IS_WITH_IMAGE_RIGHT} .${SUMMARY_CONTAINER} {
      order: 1;
    }

    .${PATHWAY_CONTAINER}${IS_WITH_IMAGE_RIGHT} .${SUMMARY_CONTAINER_WRAPPER} {
      padding-left: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER}${IS_WITH_IMAGE_LEFT} .${SUMMARY_CONTAINER_WRAPPER} {
      padding-right: 0;
    }
  }
`;

// prettier-ignore
const WithImageStyles = `
  .${PATHWAY_CONTAINER}${IS_WITH_IMAGE} .${SUMMARY_CONTAINER_WRAPPER} {
    padding: ${Spacing.md};
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER}${IS_WITH_IMAGE} .${SUMMARY_CONTAINER_WRAPPER} {
      padding: ${Spacing['4xl']} ${Spacing['2xl']};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${PATHWAY_CONTAINER}${IS_WITH_IMAGE} .${SUMMARY_CONTAINER_WRAPPER} {
      padding: ${Spacing['8xl']} ${Spacing['6xl']};
    }
  }
`;

// prettier-ignore
const WithHighlightStyles = `
  .${PATHWAY_CONTAINER}${IS_WITH_HIGHLIGHT} .${SUMMARY_CONTAINER_WRAPPER} {
    padding-bottom: ${Spacing.md};
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER}${IS_WITH_HIGHLIGHT} .${SUMMARY_CONTAINER_WRAPPER} {
      padding-right: ${Spacing['4xl']};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${PATHWAY_CONTAINER}${IS_WITH_HIGHLIGHT} .${SUMMARY_CONTAINER_WRAPPER} {
      padding-right: ${Spacing['6xl']};
    }
  }
`;

// prettier-ignore
const WithHeroStyles = `
  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${PATHWAY_CONTAINER}${IS_WITH_HERO} .${SUMMARY_CONTAINER_WRAPPER} {
      padding: ${Spacing.md} 0;
    }
  }

  .${PATHWAY_CONTAINER}${IS_WITH_HERO} .${SUMMARY_HEADLINE_CONTAINER} {
    max-width: 85%;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_CONTAINER}${IS_WITH_HERO} .${SUMMARY_HEADLINE_CONTAINER}`]: CampaignExtralarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_CONTAINER}${IS_WITH_HERO} .${SUMMARY_HEADLINE_CONTAINER} *`]: CampaignExtralarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_CONTAINER}${IS_WITH_HERO} .${SUMMARY_TEXT_CONTAINER} *`]: SansLarger,
    },
  })}
`;

// prettier-ignore
const EyebrowStyles = `
  .${SUMMARY_EYEBROW_CONTAINER} {
    margin-bottom: ${Spacing.sm};
    color: ${Colors.black} !important;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${SUMMARY_EYEBROW_CONTAINER}`]: Ribbon,
    },
  })}
`;

// prettier-ignore
const HeadlineStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${SUMMARY_HEADLINE_CONTAINER}`]: SansLargest,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${SUMMARY_HEADLINE_CONTAINER} *`]: SansLargest,
    },
  })}

  .${SUMMARY_HEADLINE_CONTAINER} {
    color: ${Colors.black};
    font-weight: 800;
    text-transform: uppercase;
  }
`;

// prettier-ignore
const TextStyles = `
  * + .${SUMMARY_TEXT_CONTAINER} {
    margin-top: ${Spacing.sm};
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    * + .${SUMMARY_TEXT_CONTAINER} {
      margin-top: ${Spacing.md};
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${SUMMARY_TEXT_CONTAINER}`]: RichText,
    },
  })}


  .${SUMMARY_TEXT_CONTAINER} * {
    font-size: ${FontSize['lg']};
    line-height: 1.5em;
  }
`;

// prettier-ignore
const ActionStyles = `
  * + .${SUMMARY_ACTIONS_CONTAINER} {
    margin-top: ${Spacing.sm};
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    * + .${SUMMARY_ACTIONS_CONTAINER} {
      margin-top: ${Spacing.lg};
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${SUMMARY_ACTIONS_CONTAINER}`]: GridColumnAndRows['.mobile-tablet'],
    },
  })}
`;

// prettier-ignore
export const STYLES_PATHWAY_SUMMARY_COLUMN = `
  .${SUMMARY_CONTAINER} {
    display: flex;
    align-items: center;
    z-index: 99;
  }

  ${EyebrowStyles}
  ${HeadlineStyles}
  ${TextStyles}
  ${ActionStyles}
  ${WithImageStyles}
  ${WithHighlightStyles}
  ${WithHeroStyles}
  ${PositionStyles}
`;

export const CreateSummaryColumn = ({
  element,
}: {
  element: UMDPathwayElement;
}) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const eyebrowSlot = SlotDefaultStyling({ element, slotRef: EYEBROW });
  const headlineSlot = SlotDefaultStyling({ element, slotRef: HEADLINE });
  const textSlot = SlotDefaultStyling({ element, slotRef: TEXT });
  const actionSlot = SlotDefaultStyling({ element, slotRef: ACTIONS });

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
