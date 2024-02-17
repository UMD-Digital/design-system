import { Tokens, typography } from '@universityofmaryland/variables';
import { SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { BREAKPOINTS, ELEMENTS, SLOTS, VARIABLES } from '../globals';
import { ELEMENT_TYPE } from '../component';

const { colors, spacing } = Tokens;

const PATHWAY_HIGHLIGHT_CONTAINER = 'umd-pathway-highlight-column-container';
const PATHWAY_HIGHLIGHT_CONTAINER_WRAPPER = 'umd-pathway-highlight-wrapper';
const PATHWAY_HIGHLIGHT_CONTAINER_TEXT = 'umd-pathway-highlight-text';

// prettier-ignore
const ThemeStyles = `
  .${ELEMENTS.PATHWAY_CONTAINER}[${VARIABLES.ATTRIBUTE_THEME}] .${PATHWAY_HIGHLIGHT_CONTAINER} {
    background-color: ${colors.black};
  }

  .${ELEMENTS.PATHWAY_CONTAINER}[${VARIABLES.ATTRIBUTE_THEME}] .${PATHWAY_HIGHLIGHT_CONTAINER} * {
    color: ${colors.white};
  }
`

// prettier-ignore
export const STYLES_PATHWAY_HIGHLIGHT_COLUMN = `
  .${PATHWAY_HIGHLIGHT_CONTAINER} {
    padding: ${spacing['5xl']} ${spacing.md} ${spacing.md} ${spacing.md};
    background-color: ${colors.gray.lightest};
    position: relative;
  }

  @container umd-pathway (min-width: ${BREAKPOINTS.medium}px) {
    .${PATHWAY_HIGHLIGHT_CONTAINER} {
      padding: ${spacing['4xl']} ${spacing['2xl']};
    }
  }

  @container umd-pathway (min-width: ${BREAKPOINTS.large}px) {
    .${PATHWAY_HIGHLIGHT_CONTAINER} {
      padding: ${spacing['8xl']} ${spacing['xl']};
    }
  }

  @container umd-pathway (min-width: ${BREAKPOINTS.medium}px) {
    .${PATHWAY_HIGHLIGHT_CONTAINER_WRAPPER} {
      padding-left: ${spacing['xl']};
      position: relative;
    }
  }

  .${PATHWAY_HIGHLIGHT_CONTAINER_WRAPPER}:before {
    content: '';
    position: absolute;
    background-color: ${colors.red};
  }

  @container umd-pathway (max-width: ${BREAKPOINTS.medium - 1}px) {
    .${PATHWAY_HIGHLIGHT_CONTAINER_WRAPPER}:before {
      top: ${spacing['2xl']};
      width: ${spacing['5xl']};
      height: 2px;
    }
  }

  @container umd-pathway (min-width: ${BREAKPOINTS.medium}px) {
    .${PATHWAY_HIGHLIGHT_CONTAINER_WRAPPER}:before {
      left: 0;
      width: 2px;
      height: 100%;
      background-color: ${colors.red};
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_HIGHLIGHT_CONTAINER_TEXT}`]: typography['.umd-sans-larger'],
    },
  })}

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
    slotRef: SLOTS.HIGHLIGHT,
  });

  wrapper.classList.add(PATHWAY_HIGHLIGHT_CONTAINER_WRAPPER);

  if (highlightSlot) {
    highlightSlot.classList.add(PATHWAY_HIGHLIGHT_CONTAINER_TEXT);
    wrapper.appendChild(highlightSlot);

    container.classList.add(PATHWAY_HIGHLIGHT_CONTAINER);
    container.appendChild(wrapper);

    return container;
  }

  return null;
};
