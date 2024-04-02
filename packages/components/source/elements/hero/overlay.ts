import {
  Layout,
  Tokens,
  Typography,
  Elements,
} from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import ImageContainer, {
  TypeImageContainerProps,
  ELEMENT_IMAGE_CONTINATER,
} from './elements/image';
import TextContainer, {
  TypeTextContainerProps,
  ELEMENT_TEXT_CONTAINER,
  ELEMENT_HERO_EYEBROW,
  ELEMENTS_HERO_HEADLINE,
  ELEMENTS_HERO_RICH_TEXT,
} from './elements/text';

type TypeHeroOverlayProps = TypeTextContainerProps & TypeImageContainerProps;

const { Lock } = Layout;
const { Colors, Spacing } = Tokens;
const { Eyebrow } = Elements;
const { CampaignExtralarge, SansLarger } = Typography;

const TABLET = 768;
const DESKTOP = 1024;

const ELEMENT_NAME = 'umd-element-hero-overlay';
const ELEMENT_HERO_DECLARATION = 'hero-overlay-element-declaration';
const ELEMENT_HERO_CONTAINER = 'hero-overlay-container';
const ELEMENT_HERO_LOCK = 'hero-overlay-lock';

const OVERWRITE_TEXT_CONTAINER = `.${ELEMENT_HERO_CONTAINER} .${ELEMENT_TEXT_CONTAINER}`;
const OVERWRITE_IMAGE_CONTAINER = `.${ELEMENT_HERO_CONTAINER} .${ELEMENT_IMAGE_CONTINATER}`;
const OVERWRITE_EYEBROW = `.${ELEMENT_HERO_CONTAINER} .${ELEMENT_HERO_EYEBROW}`;
const OVERWRITE_HEADLINE = `.${ELEMENT_HERO_CONTAINER} .${ELEMENTS_HERO_HEADLINE}`;
const OVERWRITE_RICH_TEXT = `.${ELEMENT_HERO_CONTAINER} .${ELEMENTS_HERO_RICH_TEXT}`;

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
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_TEXT_CONTAINER} {
      width: 60%;
      padding: ${Spacing['5xl']} 0;
    }
  }
`;

// prettier-ignore
const OverwriteImageContainer = `
  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_IMAGE_CONTAINER} {
      position: absolute;
      width: 50%;
      height: calc(100% - ${Spacing['5xl']});
      right: 0;
      top: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_IMAGE_CONTAINER}:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 50%;
      height: 100%;
      background: linear-gradient(90deg, rgba(0, 0, 0, .9) 0%, rgba(0, 0, 0, 0) 80%);
    }
  }

  ${OVERWRITE_IMAGE_CONTAINER} img,
  ${OVERWRITE_IMAGE_CONTAINER} video {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }
`;

export const STYLES_HERO_OVERLAY_ELEMENT = `
  .${ELEMENT_HERO_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_HERO_CONTAINER} {
    position: relative;
    background-color: ${Colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HERO_LOCK}`]: Lock['.base'],
    },
  })}

  .${ELEMENT_HERO_LOCK} {
    height: 100%;
    width: 100%;
    position: relative;
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
  const text = TextContainer.CreateElement({ element });
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
