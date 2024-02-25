import { Layout, Tokens } from '@universityofmaryland/variables';
import { CheckForImageAlt } from 'helpers/ui';
import { SLOTS, ELEMENTS, NAMING } from '../globals';
import { HeroType } from '../index';

const { Spacing } = Tokens;

const { DEFAULT_ATTR, STACKED_ATTR, OVERLAY_ATTR, MINIMAL_ATTR, LOGO_ATTR } =
  NAMING;
const { HERO_CONTAINER } = ELEMENTS;
const { IMAGE } = SLOTS;

const HERO_IMAGE = 'umd-hero-image';

const StackDefaultOverwrite = `
  .${HERO_CONTAINER}${DEFAULT_ATTR} .${HERO_IMAGE}:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, .8) 85%);
  }

  .${HERO_CONTAINER}${DEFAULT_ATTR} .${HERO_IMAGE} img  {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }
`;

const StackTypeOverwrite = `
  .${HERO_CONTAINER}${STACKED_ATTR} {

  }
`;

const OverlayTypeOverwrite = `
  .${HERO_CONTAINER}${OVERLAY_ATTR} {

  }
`;

const MinimalTypeOverwrite = `
  .${HERO_CONTAINER}${MINIMAL_ATTR} {

  }

`;

const LogoTypeOverwrite = `
  .${HERO_CONTAINER}${LOGO_ATTR} .${HERO_IMAGE} {
    max-width: 90%;
    text-align: center;
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: ${Spacing.xl};
  }
`;

// prettier-ignore
export const STYLES_IMAGE = `
  .${HERO_IMAGE} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .${HERO_IMAGE} img {

  }

  ${StackDefaultOverwrite}
  ${StackTypeOverwrite}
  ${OverlayTypeOverwrite}
  ${MinimalTypeOverwrite}
  ${LogoTypeOverwrite}
`;

export const CreateImage = ({ element }: { element: HeroType }) => {
  const imageRef = element.querySelector(
    `[slot="${IMAGE}"]`,
  ) as HTMLImageElement;

  const container = document.createElement('div');
  const isProperImage = CheckForImageAlt({ element, slotRef: IMAGE });

  container.classList.add(HERO_IMAGE);

  // TO DO - ADD DEFAULT IMAGE CHECK

  if (isProperImage && imageRef) {
    const image = imageRef.cloneNode(true) as HTMLImageElement;
    container.appendChild(image);
  }

  return container;
};
