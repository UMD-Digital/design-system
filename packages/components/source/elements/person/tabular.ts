import { Tokens, Typography } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import { LayoutList, LayoutImage } from 'macros';
import PersonTextContainer, {
  TypePersonProps,
  DISPLAY_TABULAR,
} from './elements/text';

type TypeTabularPersonProps = TypePersonProps & {
  image?: HTMLImageElement | null;
  theme?: string;
};

const { Spacing, Colors } = Tokens;
const { SansLarge, SansSmaller } = Typography;
const { ConvertJSSObjectToStyles } = Styles;

const SMALL = 400;
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const LayoutListContainer = LayoutList.Elements.container;
const LayoutImageContainer = LayoutImage.Elements.container;
const LayoutTextContainer = PersonTextContainer.Elements.container;
const LayoutTextName = PersonTextContainer.Elements.name;

const ELEMENT_NAME = 'umd-person-tabluar';
const ELEMENT_PERSON_TABULAR_CONTAINER = 'person-tabluar-container';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const OVERWRITE_IMAGE_CONTAINER = `.${ELEMENT_PERSON_TABULAR_CONTAINER} .${LayoutListContainer} .${LayoutImageContainer}`;
const OVERWRITE_TEXT_CONTAINER = `.${ELEMENT_PERSON_TABULAR_CONTAINER} .${LayoutListContainer} .${LayoutTextContainer}`;
const OVERWRITE_PERSON_NAME = `.${ELEMENT_PERSON_TABULAR_CONTAINER} .${LayoutListContainer} .${LayoutTextName}`;

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_PERSON_TABULAR_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_DARK_IMAGE_CONTAINER = `${OVERWRITE_THEME_DARK_CONTAINER} .${LayoutImageContainer}`;

const OverwriteThemeDarkStyles = `
  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${OVERWRITE_THEME_DARK_IMAGE_CONTAINER} {
      background-color: ${Colors.gray.dark};
    }
  }
`;

const OverwriteImagesStyles = `
  ${OVERWRITE_IMAGE_CONTAINER} {
    order: 1;
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${OVERWRITE_IMAGE_CONTAINER} {
      float: none;
      width: 100%;
      margin-bottom: ${Spacing.md};
      background-color: ${Colors.gray.lighter};
      display: flex;
      justify-content: center;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${OVERWRITE_IMAGE_CONTAINER} {
      width: 96px;
      margin-right: ${Spacing.md};
    }
  }

  ${OVERWRITE_IMAGE_CONTAINER} img,
  ${OVERWRITE_IMAGE_CONTAINER} svg {
    width: 140px;
    max-width: 100%;
  }
`;

const OverwriteTextStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_TEXT_CONTAINER} *`]: SansSmaller,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_PERSON_NAME}`]: SansLarge,
    },
  })}

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${OVERWRITE_TEXT_CONTAINER} {
      order: 2;
      width: calc(100% - 120px);
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: ${Spacing.md};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${OVERWRITE_TEXT_CONTAINER} > *:nth-of-type(2) {
      justify-self: end;
    }
  }
`;

// prettier-ignore
const STYLES_PERSON_TABULAR_ELEMENT = `
  .${ELEMENT_PERSON_TABULAR_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }
  
  .${ELEMENT_PERSON_TABULAR_CONTAINER} + * {
    margin-top: ${Spacing.md}; 
  }

  ${PersonTextContainer.Styles}
  ${LayoutImage.Styles}
  ${LayoutList.Styles}
  ${OverwriteImagesStyles}
  ${OverwriteTextStyles}
  ${OverwriteThemeDarkStyles}
`;

const CreatePersonTabularElement = (props: TypeTabularPersonProps) => {
  const { theme, image } = props;
  const personContainer = PersonTextContainer.CreateElement({
    ...props,
    displayType: DISPLAY_TABULAR,
  });
  const elementContainer = document.createElement('div');
  const imageContainer = image ? LayoutImage.CreateElement({ image }) : null;
  const container = LayoutList.CreateElement({
    personContainer,
    imageContainer,
    theme,
  });

  if (theme) elementContainer.setAttribute(ATTRIBUTE_THEME, theme);

  elementContainer.appendChild(container);
  elementContainer.classList.add(ELEMENT_PERSON_TABULAR_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreatePersonTabularElement,
  Styles: STYLES_PERSON_TABULAR_ELEMENT,
};
