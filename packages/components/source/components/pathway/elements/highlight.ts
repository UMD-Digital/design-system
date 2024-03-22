import { Tokens, Typography } from '@universityofmaryland/variables';
import { SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { BREAKPOINTS, SLOTS, VARIABLES } from '../globals';
import { UMDPathwayElement } from '../index';

const { Colors, Spacing } = Tokens;

const { HIGHLIGHT, HIGHLIGHT_ATTRIBUTION } = SLOTS;
const { MEDIUM, LARGE } = BREAKPOINTS;
const { ELEMENT_NAME } = VARIABLES;

const PATHWAY_HIGHLIGHT_CONTAINER = 'umd-pathway-highlight-column-container';
const PATHWAY_HIGHLIGHT_CONTAINER_WRAPPER = 'umd-pathway-highlight-wrapper';
const PATHWAY_HIGHLIGHT_CONTAINER_TEXT = 'umd-pathway-highlight-text';
const PATHWAY_HIGHLIGHT_CONTAINER_ATTRIBUTION =
  'umd-pathway-highlight-attribution';

// prettier-ignore
export const STYLES_PATHWAY_HIGHLIGHT_COLUMN = `
  .${PATHWAY_HIGHLIGHT_CONTAINER} {
    padding: ${Spacing['5xl']} ${Spacing.md} ${Spacing.md} ${Spacing.md};
    background-color: ${Colors.gray.lightest};
    position: relative;
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_HIGHLIGHT_CONTAINER} {
      padding: ${Spacing['4xl']} ${Spacing['2xl']};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${PATHWAY_HIGHLIGHT_CONTAINER} {
      padding: ${Spacing['8xl']} ${Spacing['xl']};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_HIGHLIGHT_CONTAINER_WRAPPER} {
      padding-left: ${Spacing['xl']};
      position: relative;
    }
  }

  .${PATHWAY_HIGHLIGHT_CONTAINER_WRAPPER}:before {
    content: '';
    position: absolute;
    background-color: ${Colors.red};
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${PATHWAY_HIGHLIGHT_CONTAINER_WRAPPER}:before {
      top: ${Spacing['2xl']};
      width: ${Spacing['5xl']};
      height: 2px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_HIGHLIGHT_CONTAINER_WRAPPER}:before {
      left: 0;
      width: 2px;
      height: 100%;
      background-color: ${Colors.red};
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_HIGHLIGHT_CONTAINER_TEXT}`]: Typography.SansLarger,
    },
  })}

  .${PATHWAY_HIGHLIGHT_CONTAINER_TEXT},
  .${PATHWAY_HIGHLIGHT_CONTAINER_TEXT} * {
    font-weight: 700;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_HIGHLIGHT_CONTAINER_ATTRIBUTION}`]: Typography.SansMedium,
    },
  })}

  .${PATHWAY_HIGHLIGHT_CONTAINER_ATTRIBUTION} {
    margin-top: ${Spacing.sm};
  }
`

export const CreateHighlightColumn = ({
  element,
}: {
  element: UMDPathwayElement;
}) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const highlightSlot = SlotDefaultStyling({
    element,
    slotRef: HIGHLIGHT,
  });
  const highlightAttributionSlot = SlotDefaultStyling({
    element,
    slotRef: HIGHLIGHT_ATTRIBUTION,
  });

  wrapper.classList.add(PATHWAY_HIGHLIGHT_CONTAINER_WRAPPER);

  if (highlightSlot) {
    highlightSlot.classList.add(PATHWAY_HIGHLIGHT_CONTAINER_TEXT);
    wrapper.appendChild(highlightSlot);

    if (highlightAttributionSlot) {
      const attributionElement = document.createElement('div');
      attributionElement.classList.add(PATHWAY_HIGHLIGHT_CONTAINER_ATTRIBUTION);
      attributionElement.appendChild(highlightAttributionSlot);
      wrapper.appendChild(attributionElement);
    }

    container.classList.add(PATHWAY_HIGHLIGHT_CONTAINER);
    container.appendChild(wrapper);

    return container;
  }

  return null;
};
