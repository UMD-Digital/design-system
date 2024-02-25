import { SlotDefaultStyling } from 'helpers/ui';
import { SLOTS, VARIABLES, BREAKPOINTS, ELEMENTS } from '../globals';
import { ELEMENT_TYPE } from '../index';

const { IMAGE } = SLOTS;
const { medium, large } = BREAKPOINTS;
const { PATHWAY_CONTAINER } = ELEMENTS;
const { ATTRIBUTE_IMAGE_POSITION, ATTRIBUTE_IMAGE_SCALED } = VARIABLES;

const PATHWAY_IMAGE_CONTAINER = 'umd-pathway-image-column-container';
const PATHWAY_IMAGE_CONTAINER_WRAPPER = 'umd-pathway-image-wrapper';

// prettier-ignore
const PositionStyles = `
  @container umd-pathway (min-width: ${medium}px) {
    .${PATHWAY_CONTAINER}[${ATTRIBUTE_IMAGE_POSITION}="right"] .${PATHWAY_IMAGE_CONTAINER} {
      order: 2;
    }
  }
`;

// prettier-ignore
const SizeStyles = `
  .${PATHWAY_CONTAINER}[${ATTRIBUTE_IMAGE_SCALED}="false"] img {
    object-fit: contain;
    height: inherit;
    min-height: inherit;
  }
`;

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

  @container umd-pathway (min-width: ${large}px) {
    .${PATHWAY_IMAGE_CONTAINER} img {
      min-height: 656px;
    }
  }

  ${PositionStyles}
  ${SizeStyles}
`

export const CreateImageColumn = ({ element }: { element: ELEMENT_TYPE }) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const imageSlot = SlotDefaultStyling({
    element,
    slotRef: IMAGE,
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
