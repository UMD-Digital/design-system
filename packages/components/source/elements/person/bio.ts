import { Tokens, Elements } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import PersonImage from './elements/image';
import PersonTextContainer, { TypePersonProps } from './elements/text';

type TypePersonBioProps = TypePersonProps & {
  image?: HTMLImageElement | null;
  description?: HTMLElement | null;
};

const { ConvertJSSObjectToStyles } = Styles;
const { Spacing, Colors } = Tokens;
const { Text } = Elements;

const SMALL = 650;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const ELEMENT_NAME = 'umd-person-bio';
const ELEMENT_PERSON_BIO_CONTAINER = 'person-bio-container';
const ELEMENT_PERSON_BIO_WRAPPER = 'person-bio-text';
const ELEMENT_PERSON_BIO_DESCRIPTION = 'person-bio-description';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const OverwriteText = `
  .${ELEMENT_PERSON_BIO_WRAPPER} .${PersonTextContainer.Elements.mainWrapper} {
    padding-left: ${Spacing.sm};
    border-left: 2px solid ${Colors.red};
  }
`;

const DescriptionStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_BIO_DESCRIPTION}`]: Text.RichText,
    },
  })}

  .${ELEMENT_PERSON_BIO_DESCRIPTION} {
    margin-top: ${Spacing.md};
  }
`;

const WrapperStyles = `
  .${ELEMENT_PERSON_BIO_WRAPPER} {

  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_PERSON_BIO_WRAPPER} {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: ${Spacing.md};
    }
  }
`;

// prettier-ignore
const STYLES_PERSON_BIO_ELEMENT = `
  .${ELEMENT_PERSON_BIO_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${PersonImage.Styles}
  ${PersonTextContainer.Styles}
  ${DescriptionStyles}
  ${WrapperStyles}
  ${OverwriteText}
`;

const CreatePersonBioElement = (props: TypePersonBioProps) => {
  const { theme, image, description } = props;
  const elementContainer = document.createElement('div');
  const wrapper = document.createElement('div');
  const textContainer = PersonTextContainer.CreateElement(props);

  wrapper.classList.add(ELEMENT_PERSON_BIO_WRAPPER);
  if (image) wrapper.appendChild(image);
  wrapper.appendChild(textContainer);

  elementContainer.appendChild(wrapper);

  if (description) {
    description.classList.add(ELEMENT_PERSON_BIO_DESCRIPTION);
    elementContainer.appendChild(description);
  }

  elementContainer.classList.add(ELEMENT_PERSON_BIO_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreatePersonBioElement,
  Styles: STYLES_PERSON_BIO_ELEMENT,
};
