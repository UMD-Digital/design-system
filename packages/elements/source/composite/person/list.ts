import { token } from '@universityofmaryland/web-styles-library';
import { List as LayoutList, Image as LayoutImage } from 'layout';
import PersonTextContainer, { TypePersonProps } from './elements/text';

type TypeListPersonProps = TypePersonProps & {
  image?: HTMLImageElement | null;
};

const SMALL = 400;
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const LayoutListContainer = LayoutList.Elements.container;
const LayoutImageContainer = LayoutImage.Elements.container;
const LayoutTextContainer = PersonTextContainer.Elements.container;

const ELEMENT_NAME = 'umd-person-list';
const ELEMENT_PERSON_LIST_CONTAINER = 'person-list-container';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const OVERWRITE_IMAGE_CONTAINER = `.${ELEMENT_PERSON_LIST_CONTAINER} .${LayoutListContainer} .${LayoutImageContainer}`;
const OVERWRITE_TEXT_CONTAINER = `.${ELEMENT_PERSON_LIST_CONTAINER} .${LayoutListContainer} .${LayoutTextContainer}`;

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_PERSON_LIST_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_DARK_IMAGE_CONTAINER = `${OVERWRITE_THEME_DARK_CONTAINER} .${LayoutImageContainer}`;

const OverwriteThemeDarkStyles = `
  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${OVERWRITE_THEME_DARK_IMAGE_CONTAINER} {
      background-color: ${token.color.gray.darker};
    }
  }
`;

const OverwriteImagesStyles = `
  ${OVERWRITE_IMAGE_CONTAINER} {
    order: 1;
    padding-right: ${token.spacing.md};
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${OVERWRITE_IMAGE_CONTAINER} {
      width: 100%;
      margin-bottom: ${token.spacing.md};
      background-color: ${token.color.gray.lighter};
      display: flex;
      justify-content: center;
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${OVERWRITE_IMAGE_CONTAINER} img,
    ${OVERWRITE_IMAGE_CONTAINER} svg {
      width: 140px;
    }
  }
`;

const OverwriteTextStyles = `
  ${OVERWRITE_TEXT_CONTAINER} {
    order: 2;
    width: 100%;
  }
`;

// prettier-ignore
const STYLES_PERSON_LIST_ELEMENT = `
  .${ELEMENT_PERSON_LIST_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }
  
  .${ELEMENT_PERSON_LIST_CONTAINER} + * {
    margin-top: ${token.spacing.md}; 
  }

  ${PersonTextContainer.Styles}
  ${LayoutImage.Styles}
  ${LayoutList.Styles}
  ${OverwriteImagesStyles}
  ${OverwriteTextStyles}
  ${OverwriteThemeDarkStyles}
`;

export default (props: TypeListPersonProps) => {
  const { isThemeDark, image } = props;
  const personContainer = PersonTextContainer.CreateElement(props);
  const elementContainer = document.createElement('div');
  const imageContainer = image ? LayoutImage.CreateElement({ image }) : null;
  const container = LayoutList.CreateElement({
    personContainer,
    imageContainer,
    isThemeDark,
  });
  let styles = STYLES_PERSON_LIST_ELEMENT;

  if (isThemeDark) elementContainer.setAttribute(ATTRIBUTE_THEME, THEME_DARK);

  elementContainer.appendChild(container);
  elementContainer.classList.add(ELEMENT_PERSON_LIST_CONTAINER);

  return { element: elementContainer, styles };
};
