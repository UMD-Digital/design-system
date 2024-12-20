import { Tokens, Typography } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import TextLockupSmall, { TypeTextLockupSmall } from './small';

type TypeTextLockupSmallScaling = TypeTextLockupSmall;

const { FontSize } = Tokens;
const { SansExtraLarge, SansMedium, SansSmall } = Typography;
const { convertJSSObjectToStyles } = Styles;

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
        [`${OverwriteHeadline}`]: SansExtraLarge,
      },
    })}
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${convertJSSObjectToStyles({
      styleObj: {
        [`${OverwriteHeadline} *`]: SansExtraLarge,
      },
    })}
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    ${OverwriteHeadline},
    ${OverwriteHeadline} * {
      font-size: ${FontSize.lg};
    }
  }
`;

// prettier-ignore
const DateStyles = `
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${convertJSSObjectToStyles({
      styleObj: {
        [`${OverwriteDate}`]: SansSmall,
      },
    })}
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${convertJSSObjectToStyles({
      styleObj: {
        [`${OverwriteDate} *`]: SansSmall,
      },
    })}
  }
`;

// prettier-ignore
const TextStyles = `
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${convertJSSObjectToStyles({
      styleObj: {
        [`${OverwriteText}`]: SansMedium,
      },
    })}

    ${convertJSSObjectToStyles({
      styleObj: {
        [`${OverwriteText} *`]: SansMedium,
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
