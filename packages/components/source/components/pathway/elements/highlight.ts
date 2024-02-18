import { Tokens, Typography } from '@universityofmaryland/variables';
import { SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { BREAKPOINTS, ELEMENTS, SLOTS, VARIABLES } from '../globals';
import { ELEMENT_TYPE } from '../component';

const { Colors, Spacing } = Tokens;

const PATHWAY_HIGHLIGHT_CONTAINER = 'umd-pathway-highlight-column-container';
const PATHWAY_HIGHLIGHT_CONTAINER_WRAPPER = 'umd-pathway-highlight-wrapper';
const PATHWAY_HIGHLIGHT_CONTAINER_TEXT = 'umd-pathway-highlight-text';

// prettier-ignore
const ThemeStyles = `
  .${ELEMENTS.PATHWAY_CONTAINER}[${VARIABLES.ATTRIBUTE_THEME}] .${PATHWAY_HIGHLIGHT_CONTAINER} {
    background-color: ${Colors.black};
  }

  .${ELEMENTS.PATHWAY_CONTAINER}[${VARIABLES.ATTRIBUTE_THEME}] .${PATHWAY_HIGHLIGHT_CONTAINER} * {
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

  @container umd-pathway (min-width: ${BREAKPOINTS.medium}px) {
    .${PATHWAY_HIGHLIGHT_CONTAINER} {
      padding: ${Spacing['4xl']} ${Spacing['2xl']};
    }
  }

  @container umd-pathway (min-width: ${BREAKPOINTS.large}px) {
    .${PATHWAY_HIGHLIGHT_CONTAINER} {
      padding: ${Spacing['8xl']} ${Spacing['xl']};
    }
  }

  @container umd-pathway (min-width: ${BREAKPOINTS.medium}px) {
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

  @container umd-pathway (max-width: ${BREAKPOINTS.medium - 1}px) {
    .${PATHWAY_HIGHLIGHT_CONTAINER_WRAPPER}:before {
      top: ${Spacing['2xl']};
      width: ${Spacing['5xl']};
      height: 2px;
    }
  }

  @container umd-pathway (min-width: ${BREAKPOINTS.medium}px) {
    .${PATHWAY_HIGHLIGHT_CONTAINER_WRAPPER}:before {
      left: 0;
      width: 2px;
      height: 100%;
      background-color: ${Colors.red};
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_HIGHLIGHT_CONTAINER_TEXT}`]: Typography['.umd-sans-larger'],
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
