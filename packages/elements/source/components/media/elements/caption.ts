import { Tokens, Typography } from '@universityofmaryland/variables';
import { Styles } from 'utilities';

export type TypeMediaCaptionRequirements = {
  caption: HTMLElement;
  isThemeDark?: boolean;
};

const { Colors, Spacing } = Tokens;
const { SansSmall } = Typography;
const { convertJSSObjectToStyles } = Styles;

const ATTRIBUTE_THEME = 'data-theme';
const ATTRIBUTE_THEME_DARK = 'dark';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${ATTRIBUTE_THEME_DARK}"]`;

const ELEMENT_MEDIA_CAPTIONS_CONTAINER = 'element-media-inline-captions';

const OVERWRITE_CONTAINER_DARK = `.${ELEMENT_MEDIA_CAPTIONS_CONTAINER}${IS_THEME_DARK}`;

// prettier-ignore
const STYLES_MEDIA_CAPTIONS_ELEMENT = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_MEDIA_CAPTIONS_CONTAINER}`]: SansSmall,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`${ELEMENT_MEDIA_CAPTIONS_CONTAINER} *`]: SansSmall,
    },
  })}

  .${ELEMENT_MEDIA_CAPTIONS_CONTAINER} {
    margin-top: ${Spacing.sm};
    display: inline-block;
    text-align: left;
    opacity: 0;
    width: 100%;
  }

  .${ELEMENT_MEDIA_CAPTIONS_CONTAINER},
  .${ELEMENT_MEDIA_CAPTIONS_CONTAINER} > * {
    color: ${Colors.gray.mediumAA};
  }

  ${OVERWRITE_CONTAINER_DARK},
  ${OVERWRITE_CONTAINER_DARK} * {
    color: ${Colors.white};
  }
`;

const CreateMediaInline = ({
  caption,
  isThemeDark,
}: TypeMediaCaptionRequirements) => {
  caption.classList.add(ELEMENT_MEDIA_CAPTIONS_CONTAINER);

  if (isThemeDark) caption.setAttribute(ATTRIBUTE_THEME, ATTRIBUTE_THEME_DARK);

  return caption;
};

export default {
  CreateElement: CreateMediaInline,
  Styles: STYLES_MEDIA_CAPTIONS_ELEMENT,
  Elements: {
    container: ELEMENT_MEDIA_CAPTIONS_CONTAINER,
  },
};
