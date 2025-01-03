import {
  elementStyles,
  tokens,
  typography,
} from '@universityofmaryland/web-elements-styles';
import * as Utility from 'utilities';
import PersonImage from './elements/image';
import PersonTextContainer, { TypePersonProps } from './elements/text';

type TypePersonBioProps = TypePersonProps & {
  image?: HTMLImageElement | null;
  description?: HTMLElement | null;
};

const { convertJSSObjectToStyles } = Utility.styles;
const { spacing, colors } = tokens;

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
    color: ${colors.white};
  }

  ${OverwriteThemeDarkDescription} * {
    color: ${colors.white};
  }

  ${OverwriteThemeDarkName} {
    color: ${colors.white};
  }
`;

const OverwriteText = `
  ${OverwriteTextMainWrapper} {
    padding-left: ${spacing.sm};
    border-left: 2px solid ${colors.red};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OverwriteTextName}`]: typography.sans.extraLarge,
    },
  })}

  ${OverwriteTextName} {
    color: ${colors.black};
    text-transform: uppercase;
    font-weight: 800;
  }
`;

const DescriptionStyles = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_BIO_DESCRIPTION}`]: elementStyles.text.rich.advanced,
    },
  })}

  .${ELEMENT_PERSON_BIO_DESCRIPTION} {
    margin-top: ${spacing.lg};
  }
`;

const WrapperStyles = `
  .${ELEMENT_PERSON_BIO_WRAPPER} {
    display: grid;
    grid-gap: ${spacing.md};
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_PERSON_BIO_WRAPPER} {
      grid-template-columns: repeat(8, 1fr);
      grid-gap: ${spacing.lg};
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
