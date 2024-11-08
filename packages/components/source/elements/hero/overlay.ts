import {
  Layout,
  Tokens,
  Typography,
  Elements,
} from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import ImageContainer, { TypeImageContainerProps } from './elements/image';
import TextContainer, { TypeTextContainerProps } from './elements/text';

type TypeHeroOverlayProps = TypeTextContainerProps & TypeImageContainerProps;

const { LockMax } = Layout;
const { Colors, Spacing } = Tokens;
const { Eyebrow } = Elements;
const { CampaignExtralarge, SansLarger } = Typography;

const { ConvertJSSObjectToStyles } = Styles;

const TABLET = 768;
const DESKTOP = 1024;

const ELEMENT_NAME = 'umd-element-hero-overlay';
const ELEMENT_HERO_DECLARATION = 'hero-overlay-element-declaration';
const ELEMENT_HERO_CONTAINER = 'hero-overlay-container';
const ELEMENT_HERO_LOCK = 'hero-overlay-lock';

const OVERWRITE_TEXT_CONTAINER = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.container}`;
const OVERWRITE_IMAGE_CONTAINER = `.${ELEMENT_HERO_CONTAINER} .${ImageContainer.Elements.container}`;
const OVERWRITE_EYEBROW = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.eyebrow}`;
const OVERWRITE_HEADLINE = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.headline}`;
const OVERWRITE_RICH_TEXT = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.richText}`;

// prettier-ignore
const OverwriteEyebrow = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_EYEBROW}`]: Eyebrow.Ribbon,
    },
  })}

  ${OVERWRITE_EYEBROW} {
    color: ${Colors.black} !important;
  }
`;

// prettier-ignore
const OverwriteHeadline = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_HEADLINE}`]: CampaignExtralarge,
    },
  })}
`;

// prettier-ignore
const OverwriteRichText = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_RICH_TEXT}`]: SansLarger,
    },
  })}
  
  ${OVERWRITE_RICH_TEXT} {
    font-weight: 400;
  }
  
  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_RICH_TEXT} {
      max-width: 60%;
    }
  }
`;

// prettier-ignore
const OverwriteTextContainer = `
  ${OVERWRITE_TEXT_CONTAINER} {
    padding: ${Spacing.lg} 0;
    display: flex;
    position: relative;
    z-index: 99;
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    @media (prefers-reduced-motion: no-preference) {
      ${OVERWRITE_TEXT_CONTAINER} {
        animation: hero-slide-up forwards 1.5s;
      }
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_TEXT_CONTAINER} {
      width: 55%;
      padding: ${Spacing['5xl']} 0;
    }
  }
`;

// prettier-ignore
const OverwriteImageContainer = `
  @keyframes hero-overlay-resize {
    from { transform: scale(1.1); }
    to { transform: scale(1); }
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_IMAGE_CONTAINER} {
      position: absolute;
      width: 60%;
      height: calc(100% - ${Spacing['5xl']});
      right: 0;
      top: 0;
      overflow: visible;
    }
  }

  ${OVERWRITE_IMAGE_CONTAINER} img,
  ${OVERWRITE_IMAGE_CONTAINER} video {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    @media (prefers-reduced-motion: no-preference) {
      ${OVERWRITE_IMAGE_CONTAINER} img,
      ${OVERWRITE_IMAGE_CONTAINER} video{
        animation: hero-overlay-resize forwards 1.5s;
      }
    }
  }
`;

export const STYLES_HERO_OVERLAY_ELEMENT = `
  .${ELEMENT_HERO_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
    overflow: clip;
  }

  .${ELEMENT_HERO_CONTAINER} {
    position: relative;
    background-color: ${Colors.black};
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${ELEMENT_HERO_CONTAINER}:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
      z-index: 999;
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HERO_LOCK}`]: LockMax,
    },
  })}

  .${ELEMENT_HERO_LOCK} {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 999;
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${ELEMENT_HERO_LOCK} {
      min-height: 640px;
      display: flex;
      align-items: center;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${DESKTOP}px) {
    .${ELEMENT_HERO_LOCK} {
      min-height: 764px;
    }
  }
  
  ${OverwriteEyebrow}
  ${OverwriteHeadline}
  ${OverwriteRichText}
  ${OverwriteTextContainer}
  ${OverwriteImageContainer}
`;

export const CreateHeroOverlayElement = (element: TypeHeroOverlayProps) => {
  const declaration = document.createElement('div');
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const text = TextContainer.CreateElement(element);
  const asset = ImageContainer.CreateElement(element);

  lock.classList.add(ELEMENT_HERO_LOCK);
  lock.appendChild(text);

  if (asset) {
    container.appendChild(asset);
  }

  container.classList.add(ELEMENT_HERO_CONTAINER);
  container.appendChild(lock);

  declaration.classList.add(ELEMENT_HERO_DECLARATION);
  declaration.appendChild(container);

  return declaration;
};

export default {
  CreateElement: CreateHeroOverlayElement,
  Styles: STYLES_HERO_OVERLAY_ELEMENT,
};
