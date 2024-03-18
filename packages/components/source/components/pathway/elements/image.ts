import { SlotDefaultStyling } from 'helpers/ui';
import {
  SLOTS,
  BREAKPOINTS,
  ELEMENTS,
  REFERENCES,
  VARIABLES,
} from '../globals';
import { UMDPathwayElement } from '../index';

const { IMAGE } = SLOTS;
const { MEDIUM, LARGE } = BREAKPOINTS;
const { PATHWAY_CONTAINER } = ELEMENTS;
const { ELEMENT_NAME } = VARIABLES;
const { IS_WITHOUT_IMAGE_SCALED, IS_WITH_IMAGE_RIGHT, IS_WITH_HERO } =
  REFERENCES;

const PATHWAY_IMAGE_CONTAINER = 'umd-pathway-image-column-container';
const PATHWAY_IMAGE_CONTAINER_WRAPPER = 'umd-pathway-image-wrapper';

// prettier-ignore
const PositionStyles = `
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER}${IS_WITH_IMAGE_RIGHT} .${PATHWAY_IMAGE_CONTAINER} {
      order: 2;
    }
  }
`;

// prettier-ignore
const SizeStyles = `
  .${PATHWAY_CONTAINER}${IS_WITHOUT_IMAGE_SCALED} img {
    object-fit: contain;
    height: inherit;
    min-height: inherit;
  }
`;

// prettier-ignore
const HeroStyles = `
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER}${IS_WITH_HERO} .${PATHWAY_IMAGE_CONTAINER} {
      width: 50%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER}${IS_WITH_HERO}${IS_WITH_IMAGE_RIGHT} .${PATHWAY_IMAGE_CONTAINER} {
      left: inherit;
      right: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER}${IS_WITH_HERO} .${PATHWAY_IMAGE_CONTAINER} img {
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

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${PATHWAY_IMAGE_CONTAINER} img {
      min-height: 656px;
    }
  }

  ${PositionStyles}
  ${SizeStyles}
  ${HeroStyles}
`

export const CreateImageColumn = ({
  element,
}: {
  element: UMDPathwayElement;
}) => {
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
