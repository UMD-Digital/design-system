import { Tokens, Elements, Typography } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import PersonImage from './elements/image';
import PersonTextContainer, { TypePersonProps } from './elements/text';

type TypePersonBioFullProps = TypePersonProps & {
  image?: HTMLImageElement | null;
  description?: HTMLElement | null;
};

const { ConvertJSSObjectToStyles } = Styles;
const { Spacing, Colors } = Tokens;
const { Text } = Elements;
const { SansExtraLarge } = Typography;

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
    color: ${Colors.white};
  }

  ${OverwriteThemeDarkDescription} * {
    color: ${Colors.white};
  }

  ${OverwriteThemeDarkName} {
    color: ${Colors.white};
  }
`;

const OverwriteText = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OverwriteTextName}`]: SansExtraLarge,
    },
  })}
  
  ${OverwriteTextName} {
    color: ${Colors.black};
    text-transform: uppercase;
    font-weight: 800;
  }
`;

const ActionStyles = `
  .${ELEMENT_PERSON_BIO_FULL_ACTIONS} {
    margin-top: ${Spacing.md};
  }
`;

const DescriptionStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_BIO_FULL_DESCRIPTION}`]: Text.RichText,
    },
  })}

  .${ELEMENT_PERSON_BIO_FULL_DESCRIPTION} {
    margin-top: ${Spacing.lg};
  }
`;

const ImageStyles = `
  .${ELEMENT_PERSON_BIO_FULL_IMAGE} {
    margin-bottom: ${Spacing.lg};
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

const CreatePersonBioFullElement = (props: TypePersonBioFullProps) => {
  const { isThemeDark, image, actions, description, ...newProps } = props;
  const elementContainer = document.createElement('div');
  const textContainer = PersonTextContainer.CreateElement({
    ...newProps,
    isThemeDark,
  });

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

  return elementContainer;
};

export default {
  CreateElement: CreatePersonBioFullElement,
  Styles: STYLES_PERSON_BIO_FULL_ELEMENT,
};
