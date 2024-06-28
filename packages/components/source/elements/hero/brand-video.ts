import {
  Layout,
  Tokens,
  Elements,
  Typography,
} from '@universityofmaryland/variables';
import { MarkupCreate, Styles } from 'utilities';

type TypeHeroBrandVideoProps = {
  video: HTMLVideoElement;
};

const { LockSmall } = Layout;
const { Colors, Spacing } = Tokens;
const { Eyebrow } = Elements;
const { CampaignLarge, SansLarger } = Typography;

const { ConvertJSSObjectToStyles } = Styles;
const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-hero-brand-video';
const ELEMENT_HERO_ELEMENT_DECLARATION = 'hero-logo-brand-video-declaration';
const ELEMENT_HERO_ELEMENT_CONTAINER = 'hero-logo-brand-video-container';
const ELEMENT_HERO_ELEMENT_VIDEO = 'hero-logo-brand-video';
const ELEMENT_HERO_ELEMENT_OVERLAY = 'hero-logo-brand-video-overlay';
const ELEMENT_HERO_ELEMENT_ARROW = 'hero-logo-brand-video-arrow';

const OVERLAY_SVG = `<svg id="${ELEMENT_HERO_ELEMENT_OVERLAY}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1728 976"><defs><style>.cls-1{fill-rule:evenodd;}</style></defs><path class="cls-1" d="m492.28,0H0v976h503.46l414.11-481.49L492.28,0Zm556.75,976l414.11-481.49L1037.85,0h690.15v976h-678.97Z"/></svg>`;
const ANIMATION_ARROW = `<svg id="${ELEMENT_HERO_ELEMENT_ARROW}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 973.01 976"><defs><style>.arrow-video{fill:#e21833;fill-rule:evenodd;}</style></defs><path class="arrow-video" d="m427.44,497.01L0,0h545.57l427.44,497.01-411.96,478.99H15.48l411.96-478.99Z"/></svg>`;

const MainArrowStyles = `
  #${ELEMENT_HERO_ELEMENT_ARROW} {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 9;
  }
`;

const OverlayStyles = `
  #${ELEMENT_HERO_ELEMENT_OVERLAY} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
  }
`;

const VideoStyles = `
  .${ELEMENT_HERO_ELEMENT_VIDEO} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const STYLES_HERO_BRAND_VIDEO_ELEMENT = `
  .${ELEMENT_HERO_ELEMENT_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_HERO_ELEMENT_CONTAINER} {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 9;
  }

  ${VideoStyles}
  ${OverlayStyles}
  ${MainArrowStyles}
`;

export const CreateHeroBrandVideoElement = (props: TypeHeroBrandVideoProps) => {
  const { video } = props;
  const declaration = document.createElement('div');
  const container = document.createElement('div');

  video.classList.add(ELEMENT_HERO_ELEMENT_VIDEO);

  container.innerHTML = `${OVERLAY_SVG} ${ANIMATION_ARROW}`;

  container.insertBefore(video, container.firstChild);

  container.classList.add(ELEMENT_HERO_ELEMENT_CONTAINER);

  declaration.classList.add(ELEMENT_HERO_ELEMENT_DECLARATION);
  declaration.appendChild(container);

  return declaration;
};

export default {
  CreateElement: CreateHeroBrandVideoElement,
  Styles: STYLES_HERO_BRAND_VIDEO_ELEMENT,
};
