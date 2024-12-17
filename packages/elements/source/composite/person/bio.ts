import {
  ElementStyles,
  Tokens,
  Typography,
} from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import PersonImage from './elements/image';
import PersonTextContainer, { TypePersonProps } from './elements/text';

type TypePersonBioProps = TypePersonProps & {
  image?: HTMLImageElement | null;
  description?: HTMLElement | null;
};

const { convertJSSObjectToStyles } = Styles;
const { Spacing, Colors } = Tokens;

const SMALL = 650;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const ELEMENT_NAME = 'umd-person-bio';
const ELEMENT_PERSON_BIO_CONTAINER = 'person-bio-container';
const ELEMENT_PERSON_BIO_WRAPPER = 'person-bio-text';
const ELEMENT_PERSON_BIO_DESCRIPTION = 'person-bio-description';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const OverwriteTextMainWrapper = `.${ELEMENT_PERSON_BIO_WRAPPER} .${PersonTextContainer.Elements.mainWrapper}`;
const OverwriteTextName = `.${ELEMENT_PERSON_BIO_WRAPPER} .${PersonTextContainer.Elements.name}`;

const OverwriteThemeDarkDescription = `.${ELEMENT_PERSON_BIO_CONTAINER}${IS_THEME_DARK} .${ELEMENT_PERSON_BIO_DESCRIPTION}`;
const OverwriteThemeDarkName = `.${ELEMENT_PERSON_BIO_CONTAINER}${IS_THEME_DARK} .${PersonTextContainer.Elements.name}`;

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
  ${OverwriteTextMainWrapper} {
    padding-left: ${Spacing.sm};
    border-left: 2px solid ${Colors.red};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OverwriteTextName}`]: Typography.sans.extraLarge,
    },
  })}

  ${OverwriteTextName} {
    color: ${Colors.black};
    text-transform: uppercase;
    font-weight: 800;
  }
`;

const DescriptionStyles = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_BIO_DESCRIPTION}`]: ElementStyles.richText.advanced,
    },
  })}

  .${ELEMENT_PERSON_BIO_DESCRIPTION} {
    margin-top: ${Spacing.lg};
  }
`;

const WrapperStyles = `
  .${ELEMENT_PERSON_BIO_WRAPPER} {
    display: grid;
    grid-gap: ${Spacing.md};
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_PERSON_BIO_WRAPPER} {
      grid-template-columns: repeat(8, 1fr);
      grid-gap: ${Spacing.lg};
      align-items: center;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_PERSON_BIO_WRAPPER} > * {
      grid-column: span 5;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_PERSON_BIO_WRAPPER}:has(> :nth-child(2)) > *:first-child {
      grid-column: span 3;
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
  ${OverwriteThemeDark}
`;

const CreatePersonBioElement = (props: TypePersonBioProps) => {
  const { isThemeDark, image, description } = props;
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
  if (isThemeDark) elementContainer.setAttribute(ATTRIBUTE_THEME, THEME_DARK);

  return elementContainer;
};

export default {
  CreateElement: CreatePersonBioElement,
  Styles: STYLES_PERSON_BIO_ELEMENT,
};
