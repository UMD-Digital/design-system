import {
  Layout,
  Tokens,
  Typography,
  Elements,
} from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import ImageContainer, { TypeImageContainerProps } from './elements/image';
import TextContainer, { TypeTextContainerProps } from './elements/text';

type TypeHeroStackedProps = TypeTextContainerProps &
  TypeImageContainerProps & {
    isTextCenter: boolean;
    isWithLock: boolean;
    isInterior: boolean;
  };

const { Lock } = Layout;
const { Colors, Spacing } = Tokens;
const { Eyebrow } = Elements;
const { CampaignExtralarge, CampaignLarge, SansLarger } = Typography;

const { ConvertJSSObjectToStyles } = Styles;

const TABLET = 768;

const ATTRIBUTE_WITHIN_LOCK = 'within-lock';

const IS_WITHIN_LOCK = `[${ATTRIBUTE_WITHIN_LOCK}]`;

const ELEMENT_NAME = 'umd-element-hero-stacked';
const ELEMENT_HERO_DECLARATION = 'hero-stacked-element-declaration';
const ELEMENT_HERO_CONTAINER = 'hero-stacked-container';
const ELEMENT_HERO_LOCK = 'hero-stacked-lock';

const OVERWRITE_TEXT_CONTAINER = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.container}`;
const OVERWRITE_IMAGE_CONTAINER = `.${ELEMENT_HERO_CONTAINER} .${ImageContainer.Elements.container}`;
const OVERWRITE_EYEBROW = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.eyebrow}`;
const OVERWRITE_HEADLINE = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.headline}`;
const OVERWRITE_RICH_TEXT = `.${ELEMENT_HERO_CONTAINER} .${TextContainer.Elements.richText}`;

const OVERWRITE_WITH_LOCK_HEADLINE = `.${ELEMENT_HERO_CONTAINER}${IS_WITHIN_LOCK} .${TextContainer.Elements.headline}`;

// prettier-ignore
const OverwriteEyebrow = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_EYEBROW}`]: Eyebrow.Ribbon,
    },
  })}

  .${OVERWRITE_EYEBROW} {
    color: ${Colors.black}
  }
`;

// prettier-ignore
const OverwriteHeadline = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_HEADLINE}`]: CampaignExtralarge,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_WITH_LOCK_HEADLINE}`]: CampaignLarge,
    },
  })}
  
  ${OVERWRITE_HEADLINE} {
    color: ${Colors.black};
    max-width: 700px;
    margin: 0 auto;
  }
`;

// prettier-ignore
const OverwriteRichText = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_RICH_TEXT}`]: SansLarger,
    },
  })}
  
  ${OVERWRITE_RICH_TEXT} {
    color: ${Colors.gray.dark};
    font-weight: 400;
  }
`;

// prettier-ignore
const OverwriteTextContainer = `
  ${OVERWRITE_TEXT_CONTAINER} {
    padding: ${Spacing['5xl']} 0 ${Spacing.lg};
    display: flex;
    justify-content: center;
    text-align: center;
  }
  
  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    ${OVERWRITE_TEXT_CONTAINER} {
      padding: ${Spacing['5xl']} 0 ${Spacing['3xl']};
    }
  }
`;

// prettier-ignore
const OverwriteImageContainer = `
  ${OVERWRITE_IMAGE_CONTAINER} img,
  ${OVERWRITE_IMAGE_CONTAINER} video {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
    max-height: 700px;
  }
`;

export const STYLES_HERO_STACKED_ELEMENT = `
  .${ELEMENT_HERO_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_HERO_CONTAINER} {
    display: flex;
    flex-direction: column-reverse;
  }
  
  .${ELEMENT_HERO_LOCK} {
    height: 100%;
    width: 100%;
    position: relative;
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HERO_LOCK}`]: Lock['.base'],
    },
  })}
  
  ${OverwriteEyebrow}
  ${OverwriteHeadline}
  ${OverwriteRichText}
  ${OverwriteTextContainer}
  ${OverwriteImageContainer}
`;

export const CreateHeroStackedElement = (element: TypeHeroStackedProps) => {
  const { isWithLock } = element;
  const declaration = document.createElement('div');
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const text = TextContainer.CreateElement(element);
  const asset = ImageContainer.CreateElement({
    ...element,
    isTypeStacked: true,
  });

  container.classList.add(ELEMENT_HERO_CONTAINER);

  lock.classList.add(ELEMENT_HERO_LOCK);
  lock.appendChild(text);

  if (asset) {
    if (isWithLock) {
      lock.appendChild(asset);
      container.setAttribute(ATTRIBUTE_WITHIN_LOCK, '');
    } else {
      container.appendChild(asset);
    }
  }

  container.appendChild(lock);

  declaration.classList.add(ELEMENT_HERO_DECLARATION);
  declaration.appendChild(container);

  return declaration;
};

export default {
  CreateElement: CreateHeroStackedElement,
  Styles: STYLES_HERO_STACKED_ELEMENT,
};
