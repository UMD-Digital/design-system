import { Tokens } from '@universityofmaryland/variables';
import { CheckForImageAlt } from 'helpers/ui';
import { SLOTS, ELEMENTS, NAMING, BREAKPOINTS } from '../globals';
import { HeroType } from '../index';

const { Spacing } = Tokens;

const { DEFAULT_ATTR, STACKED_ATTR, OVERLAY_ATTR, MINIMAL_ATTR, LOGO_ATTR } =
  NAMING;
const { HERO_CONTAINER } = ELEMENTS;
const { IMAGE } = SLOTS;
const { tablet } = BREAKPOINTS;

const HERO_IMAGE = 'umd-hero-image';

// prettier-ignore
const StackDefaultOverwrite = `
  @container umd-hero (max-width: ${tablet - 1}px) {
    .${HERO_CONTAINER}${DEFAULT_ATTR} .${HERO_IMAGE} {
      aspect-ratio: 16 / 9;
    }
  }

  @container umd-hero (min-width: ${tablet}px) {
    .${HERO_CONTAINER}${DEFAULT_ATTR} .${HERO_IMAGE} {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  @container umd-hero (min-width: ${tablet}px) {
    .${HERO_CONTAINER}${DEFAULT_ATTR} .${HERO_IMAGE}:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, .8) 85%);
    }
  }

  .${HERO_CONTAINER}${DEFAULT_ATTR} .${HERO_IMAGE} img  {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }
`;

// prettier-ignore
const LogoTypeOverwrite = `
  .${HERO_CONTAINER}${LOGO_ATTR} .${HERO_IMAGE} {
    text-align: center;
    display: flex;
    justify-content: center;
    margin-bottom: ${Spacing.xl};
  }

  .${HERO_CONTAINER}${LOGO_ATTR} .${HERO_IMAGE} img {
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
`;

// prettier-ignore
const StackTypeOverwrite = `
  .${HERO_CONTAINER}${STACKED_ATTR} .${HERO_IMAGE} {
    aspect-ratio: 16 / 9;
  }
`;

// prettier-ignore
const OverlayTypeOverwrite = `
  @container umd-hero (min-width: ${tablet}px) {
    .${HERO_CONTAINER}${OVERLAY_ATTR} .${HERO_IMAGE} {
      position: absolute;
      width: 50%;
      height: calc(100% - ${Spacing['5xl']});
      right: 0;
      top: 0;
    }
  }

  .${HERO_CONTAINER}${OVERLAY_ATTR} .${HERO_IMAGE} img {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }
`;

// prettier-ignore
const MinimalTypeOverwrite = `
  @container umd-hero (min-width: ${tablet}px) {
    .${HERO_CONTAINER}${MINIMAL_ATTR} .${HERO_IMAGE} {
      position: absolute;
      right: 0;
      top: 0;
      width: 50%;
      height: 100%;
    }
  }

  @container umd-hero (min-width: ${tablet}px) {
    .${HERO_CONTAINER}${MINIMAL_ATTR} .${HERO_IMAGE} img {
      object-fit: cover;
      object-position: center;
      height: 100%;
      width: 100%;
    }
  }
`;

// prettier-ignore
export const STYLES_IMAGE = `
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

  // TO DO - ADD DEFAULT IMAGE CHECK Based on type

  if (isProperImage && imageRef) {
    const image = imageRef.cloneNode(true) as HTMLImageElement;
    container.appendChild(image);

    return container;
  }

  return null;
};
