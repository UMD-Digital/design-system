import { Tokens, Typography } from '@universityofmaryland/variables';
import { SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { BREAKPOINTS, ELEMENTS, NAMING, SLOTS } from '../globals';
import { ELEMENT_TYPE } from '../index';

const { Colors, Spacing } = Tokens;

const { HIGHLIGHT, HIGHLIGHT_ATTRIBUTION } = SLOTS;
const { medium, large } = BREAKPOINTS;
const { PATHWAY_CONTAINER } = ELEMENTS;
const { WITH_THEME } = NAMING;

const PATHWAY_HIGHLIGHT_CONTAINER = 'umd-pathway-highlight-column-container';
const PATHWAY_HIGHLIGHT_CONTAINER_WRAPPER = 'umd-pathway-highlight-wrapper';
const PATHWAY_HIGHLIGHT_CONTAINER_TEXT = 'umd-pathway-highlight-text';
const PATHWAY_HIGHLIGHT_CONTAINER_ATTRIBUTION =
  'umd-pathway-highlight-attribution';

// prettier-ignore
const ThemeStyles = `
  .${PATHWAY_CONTAINER}${WITH_THEME} .${PATHWAY_HIGHLIGHT_CONTAINER} {
    background-color: ${Colors.black};
  }

  .${PATHWAY_CONTAINER}${WITH_THEME} .${PATHWAY_HIGHLIGHT_CONTAINER} * {
    color: ${Colors.white};
  }
`

// prettier-ignore
export const STYLES_PATHWAY_HIGHLIGHT_COLUMN = `
  .${PATHWAY_HIGHLIGHT_CONTAINER} {
    padding: ${Spacing['5xl']} ${Spacing.md} ${Spacing.md} ${Spacing.md};
    background-color: ${Colors.gray.lightest};
    position: relative;
  }

  @container umd-pathway (min-width: ${medium}px) {
    .${PATHWAY_HIGHLIGHT_CONTAINER} {
      padding: ${Spacing['4xl']} ${Spacing['2xl']};
    }
  }

  @container umd-pathway (min-width: ${large}px) {
    .${PATHWAY_HIGHLIGHT_CONTAINER} {
      padding: ${Spacing['8xl']} ${Spacing['xl']};
    }
  }

  @container umd-pathway (min-width: ${medium}px) {
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

  @container umd-pathway (max-width: ${medium - 1}px) {
    .${PATHWAY_HIGHLIGHT_CONTAINER_WRAPPER}:before {
      top: ${Spacing['2xl']};
      width: ${Spacing['5xl']};
      height: 2px;
    }
  }

  @container umd-pathway (min-width: ${medium}px) {
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

  ${ThemeStyles}
`

export const CreateHighlightColumn = ({
  element,
}: {
  element: ELEMENT_TYPE;
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
