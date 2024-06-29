import { AnimationOverlayBrand } from 'macros';

type TypeHeroBrandVideoProps = {
  video: HTMLVideoElement;
};

const ELEMENT_NAME = 'umd-element-hero-brand-video';
const ELEMENT_HERO_ELEMENT_DECLARATION = 'hero-logo-brand-video-declaration';
const ELEMENT_HERO_ELEMENT_CONTAINER = 'hero-logo-brand-video-container';
const ELEMENT_HERO_ELEMENT_WRAPPER = 'hero-logo-brand-video-wrapper';
const ELEMENT_HERO_ELEMENT_VIDEO = 'hero-logo-brand-video';

const VideoStyles = `
  .${ELEMENT_HERO_ELEMENT_VIDEO} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: auto;
    min-width: 100%;
    min-height: 100%;
  }
`;

const STYLES_HERO_BRAND_VIDEO_ELEMENT = `
  .${ELEMENT_HERO_ELEMENT_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_HERO_ELEMENT_CONTAINER} {
    aspect-ratio: 16 / 9;
  }

  .${ELEMENT_HERO_ELEMENT_WRAPPER} {
    position: relative;
    overflow: hidden;
    max-height: 90vh;
    height: 100%;
    width: 100%;
  }

  ${VideoStyles}
  ${AnimationOverlayBrand.Styles}
`;

const CreateHeroBrandVideoElement = (props: TypeHeroBrandVideoProps) => {
  const { video } = props;
  const declaration = document.createElement('div');
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const overlay = AnimationOverlayBrand.CreateElement({
    sizedContainer: container,
    sizedWrapper: wrapper,
  });

  video.classList.add(ELEMENT_HERO_ELEMENT_VIDEO);

  wrapper.classList.add(ELEMENT_HERO_ELEMENT_WRAPPER);
  wrapper.appendChild(video);
  wrapper.appendChild(overlay.element);

  container.classList.add(ELEMENT_HERO_ELEMENT_CONTAINER);
  container.appendChild(wrapper);

  declaration.classList.add(ELEMENT_HERO_ELEMENT_DECLARATION);
  declaration.appendChild(container);

  return {
    element: declaration,
    events: {
      load: overlay.events.load,
    },
  };
};

export default {
  CreateElement: CreateHeroBrandVideoElement,
  Styles: STYLES_HERO_BRAND_VIDEO_ELEMENT,
};
