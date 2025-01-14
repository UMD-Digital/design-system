import {
  token,
  typography,
  element,
} from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import TextLockupSmall, { TypeTextLockupSmall } from './small';

type TypeTextLockupSmallScaling = TypeTextLockupSmall;

const { font } = token;
const { convertJSSObjectToStyles } = Utility.styles;

const SMALL = 300;
const MEDIUM = 650;

const ELEMENT_NAME = 'umd-scaling-font-block-container';
const ELEMENT_SCALABLE_FONT_CONTAINER = 'scaling-font-block-container';

const OverwriteHeadline = `.${ELEMENT_SCALABLE_FONT_CONTAINER} .${TextLockupSmall.Elements.headline}`;
const OverwriteDate = `.${ELEMENT_SCALABLE_FONT_CONTAINER} .${TextLockupSmall.Elements.date}`;
const OverwriteText = `.${ELEMENT_SCALABLE_FONT_CONTAINER} .${TextLockupSmall.Elements.richText}`;

// prettier-ignore
const HeadlineStyles = `
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${convertJSSObjectToStyles({
      styleObj: {
        [`${OverwriteHeadline}`]: typography.sans.extraLarge,
      },
    })}
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${convertJSSObjectToStyles({
      styleObj: {
        [`${OverwriteHeadline} *`]: typography.sans.extraLarge,
      },
    })}
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${OverwriteHeadline},
    ${OverwriteHeadline} * {
      font-size: ${token.font.size.lg};
    }
  }
`;

// prettier-ignore
const DateStyles = `
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${convertJSSObjectToStyles({
      styleObj: {
        [`${OverwriteDate}`]: typography.sans.small,
      },
    })}
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${convertJSSObjectToStyles({
      styleObj: {
        [`${OverwriteDate} *`]: typography.sans.small,
      },
    })}
  }
`;

// prettier-ignore
const TextStyles = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OverwriteText} *`]: element.text.rich.advancedDark,
    },
  })}

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${convertJSSObjectToStyles({
      styleObj: {
        [`${OverwriteText}`]: typography.sans.medium,
      },
    })}

    ${convertJSSObjectToStyles({
      styleObj: {
        [`${OverwriteText} *`]: typography.sans.medium,
      },
    })}
  }
`;

// prettier-ignore
const STYLES_SCALING_FONT_BLOCK_CONTAINER = `
  .${ELEMENT_SCALABLE_FONT_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${TextLockupSmall.Styles}
  ${HeadlineStyles}
  ${DateStyles}
  ${TextStyles}
`;

const CreateScaleFontBlockContainer = (props: TypeTextLockupSmallScaling) => {
  const container = document.createElement('div');
  const textContainer = TextLockupSmall.CreateElement(props);

  container.classList.add(ELEMENT_SCALABLE_FONT_CONTAINER);
  container.appendChild(textContainer);

  return container;
};

export default {
  CreateElement: CreateScaleFontBlockContainer,
  Styles: STYLES_SCALING_FONT_BLOCK_CONTAINER,
  Elements: {
    container: ELEMENT_SCALABLE_FONT_CONTAINER,
  },
};
