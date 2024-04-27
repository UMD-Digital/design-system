import { Tokens, Elements } from '@universityofmaryland/variables';
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

const SMALL = 650;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const ELEMENT_NAME = 'umd-person-bio-full';
const ELEMENT_PERSON_BIO_FULL_CONTAINER = 'person-bio-full-container';
const ELEMENT_PERSON_BIO_FULL_IMAGE = 'person-bio-full-image';
const ELEMENT_PERSON_BIO_FULL_DESCRIPTION = 'person-bio-full-description';
const ELEMENT_PERSON_BIO_FULL_ACTIONS = 'person-bio-full-actions';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

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
    margin-top: ${Spacing.md};
  }
`;

const ImageStyles = `
  .${ELEMENT_PERSON_BIO_FULL_IMAGE} {
    margin-bottom: ${Spacing.md};
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
`;

const CreatePersonBioFullElement = (props: TypePersonBioFullProps) => {
  const { theme, image, actions, description, ...newProps } = props;
  const elementContainer = document.createElement('div');
  const textContainer = PersonTextContainer.CreateElement(newProps);

  if (image) {
    image.classList.add(ELEMENT_PERSON_BIO_FULL_IMAGE);
    elementContainer.appendChild(image);
  }
  elementContainer.appendChild(textContainer);

  if (description) {
    description.classList.add(ELEMENT_PERSON_BIO_FULL_DESCRIPTION);
    elementContainer.appendChild(description);
  }

  elementContainer.classList.add(ELEMENT_PERSON_BIO_FULL_CONTAINER);

  if (actions) {
    actions.classList.add(ELEMENT_PERSON_BIO_FULL_ACTIONS);
    elementContainer.appendChild(actions);
  }

  return elementContainer;
};

export default {
  CreateElement: CreatePersonBioFullElement,
  Styles: STYLES_PERSON_BIO_FULL_ELEMENT,
};
