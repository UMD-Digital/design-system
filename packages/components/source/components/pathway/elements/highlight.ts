import {
  richText,
  spacing,
  typography,
  umdEyebrow,
} from '@universityofmaryland/variables';
import { SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { SLOTS } from 'components/pathway/globals';
import { ELEMENT_TYPE } from 'components/pathway/component';

const PATHWAY_HIGHLIGHT_CONTAINER = 'umd-pathway-highlight-column-container';
const PATHWAY_HIGHLIGHT_CONTAINER_WRAPPER = 'umd-pathway-highlight-wrapper';
const PATHWAY_HIGHLIGHT_CONTAINER_TEXT = 'umd-pathway-highlight-text';

// prettier-ignore
export const STYLES_PATHWAY_HIGHLIGHT_COLUMN = `
  .${PATHWAY_HIGHLIGHT_CONTAINER} {
    padding: ${spacing['8xl']} ${spacing['xl']};
  }

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
