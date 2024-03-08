import { SlotDefaultStyling } from 'helpers/ui';
import { SLOTS, BREAKPOINTS, ELEMENTS, NAMING } from '../globals';
import { ELEMENT_TYPE } from '../index';

const { IMAGE } = SLOTS;
const { medium, large } = BREAKPOINTS;
const { PATHWAY_CONTAINER } = ELEMENTS;
const { WITHOUT_IMAGE_SCALED, WITH_IMAGE_RIGHT, WITH_HERO } = NAMING;

const PATHWAY_IMAGE_CONTAINER = 'umd-pathway-image-column-container';
const PATHWAY_IMAGE_CONTAINER_WRAPPER = 'umd-pathway-image-wrapper';

// prettier-ignore
const PositionStyles = `
  @container umd-pathway (min-width: ${medium}px) {
    .${PATHWAY_CONTAINER}${WITH_IMAGE_RIGHT} .${PATHWAY_IMAGE_CONTAINER} {
      order: 2;
    }
  }
`;

// prettier-ignore
const SizeStyles = `
  .${PATHWAY_CONTAINER}${WITHOUT_IMAGE_SCALED} img {
    object-fit: contain;
    height: inherit;
    min-height: inherit;
  }
`;

// prettier-ignore
const HeroStyles = `
  @container umd-pathway (min-width: ${medium}px) {
    .${PATHWAY_CONTAINER}${WITH_HERO} .${PATHWAY_IMAGE_CONTAINER} {
      width: 50%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
    }
  }

  @container umd-pathway (min-width: ${medium}px) {
    .${PATHWAY_CONTAINER}${WITH_HERO}${WITH_IMAGE_RIGHT} .${PATHWAY_IMAGE_CONTAINER} {
      left: inherit;
      right: 0;
    }
  }

  @container umd-pathway (min-width: ${medium}px) {
    .${PATHWAY_CONTAINER}${WITH_HERO} .${PATHWAY_IMAGE_CONTAINER} img {
      min-height: inherit;
    }
  }
`;

// prettier-ignore
export const STYLES_PATHWAY_IMAGE_COLUMN = `
  .${PATHWAY_IMAGE_CONTAINER_WRAPPER} > * {
    display: flex;
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
  ${HeroStyles}
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
