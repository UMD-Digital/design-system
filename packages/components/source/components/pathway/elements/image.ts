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

const PATHWAY_IMAGE_CONTAINER = 'umd-pathway-image-column-container';
const PATHWAY_IMAGE_CONTAINER_WRAPPER = 'umd-pathway-image-wrapper';

// prettier-ignore
export const STYLES_PATHWAY_IMAGE_COLUMN = `
  .${PATHWAY_IMAGE_CONTAINER} {

  }

  .${PATHWAY_IMAGE_CONTAINER} * {
    height: 100%;
  }

  .${PATHWAY_IMAGE_CONTAINER} img {
    object-fit: cover;
    object-position: center;
  }
`

export const CreateImageColumn = ({ element }: { element: ELEMENT_TYPE }) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const imageSlot = SlotDefaultStyling({
    element,
    slotRef: SLOTS.IMAGE,
  });

  wrapper.classList.add(PATHWAY_IMAGE_CONTAINER_WRAPPER);

  if (imageSlot) {
    wrapper.appendChild(imageSlot);

    container.classList.add(PATHWAY_IMAGE_CONTAINER);
    container.appendChild(wrapper);

    return container;
  }

  return null;
};
