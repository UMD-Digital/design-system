import {
  token,
  element,
  typography,
} from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import PersonImage from '../elements/image';
import PersonTextContainer, { TypePersonProps } from '../elements/text';

type TypePersonBioFullProps = TypePersonProps & {
  image?: HTMLImageElement | null;
  description?: HTMLElement | null;
};

const { convertJSSObjectToStyles } = Utility.styles;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const ELEMENT_NAME = 'umd-person-bio-full';
const ELEMENT_PERSON_BIO_FULL_CONTAINER = 'person-bio-full-container';
const ELEMENT_PERSON_BIO_FULL_IMAGE = 'person-bio-full-image';
const ELEMENT_PERSON_BIO_FULL_DESCRIPTION = 'person-bio-full-description';
const ELEMENT_PERSON_BIO_FULL_ACTIONS = 'person-bio-full-actions';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const OverwriteTextName = `.${ELEMENT_PERSON_BIO_FULL_CONTAINER} .${PersonTextContainer.Elements.name}`;

const OverwriteThemeDarkDescription = `.${ELEMENT_PERSON_BIO_FULL_CONTAINER}${IS_THEME_DARK} .${ELEMENT_PERSON_BIO_FULL_DESCRIPTION}`;
const OverwriteThemeDarkName = `.${ELEMENT_PERSON_BIO_FULL_CONTAINER}${IS_THEME_DARK} .${PersonTextContainer.Elements.name}`;

const OverwriteThemeDark = `
  ${OverwriteThemeDarkDescription} {
    color: ${token.color.white};
  }

  ${OverwriteThemeDarkDescription} * {
    color: ${token.color.white};
  }

  ${OverwriteThemeDarkName} {
    color: ${token.color.white};
  }
`;

const OverwriteText = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OverwriteTextName}`]: typography.sans.extraLarge,
    },
  })}
  
  ${OverwriteTextName} {
    color: ${token.color.black};
    text-transform: uppercase;
    font-weight: 800;
  }
`;

const ActionStyles = `
  .${ELEMENT_PERSON_BIO_FULL_ACTIONS} {
    margin-top: ${token.spacing.md};
  }
`;

const DescriptionStyles = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_BIO_FULL_DESCRIPTION}`]: element.text.rich.advanced,
    },
  })}

  .${ELEMENT_PERSON_BIO_FULL_DESCRIPTION} {
    margin-top: ${token.spacing.lg};
  }
`;

const ImageStyles = `
  .${ELEMENT_PERSON_BIO_FULL_IMAGE} {
    margin-bottom: ${token.spacing.lg};
  }
`;

// prettier-ignore
const STYLES_PERSON_BIO_FULL_ELEMENT = `
  .${ELEMENT_PERSON_BIO_FULL_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${PersonImage.Styles}
  ${PersonTextContainer.Styles}
  ${ImageStyles}
  ${DescriptionStyles}
  ${ActionStyles}
  ${OverwriteText}
  ${OverwriteThemeDark}
`;

export default (props: TypePersonBioFullProps) => {
  const { isThemeDark, image, actions, description, ...newProps } = props;
  const elementContainer = document.createElement('div');
  const textContainer = PersonTextContainer.CreateElement({
    ...newProps,
    isThemeDark,
  });
  let styles = STYLES_PERSON_BIO_FULL_ELEMENT;

  if (image) {
    image.classList.add(ELEMENT_PERSON_BIO_FULL_IMAGE);
    elementContainer.appendChild(image);
  }
  elementContainer.appendChild(textContainer);

  if (description) {
    description.classList.add(ELEMENT_PERSON_BIO_FULL_DESCRIPTION);
    elementContainer.appendChild(description);
  }

  if (actions) {
    actions.classList.add(ELEMENT_PERSON_BIO_FULL_ACTIONS);
    elementContainer.appendChild(actions);
  }

  elementContainer.classList.add(ELEMENT_PERSON_BIO_FULL_CONTAINER);
  if (isThemeDark) elementContainer.setAttribute(ATTRIBUTE_THEME, THEME_DARK);

  return { element: elementContainer, styles };
};
