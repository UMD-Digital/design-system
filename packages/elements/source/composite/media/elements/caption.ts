import { tokens, typography } from '@universityofmaryland/web-elements-styles';
import { Styles } from 'utilities';

export type TypeMediaCaptionRequirements = {
  caption: HTMLElement;
  isThemeDark?: boolean;
};

const { colors, spacing } = tokens;
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
      [`.${ELEMENT_MEDIA_CAPTIONS_CONTAINER}`]: typography.sans.small,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`${ELEMENT_MEDIA_CAPTIONS_CONTAINER} *`]: typography.sans.small,
    },
  })}

  .${ELEMENT_MEDIA_CAPTIONS_CONTAINER} {
    margin-top: ${spacing.sm};
    display: inline-block;
    text-align: left;
    opacity: 0;
    width: 100%;
  }

  .${ELEMENT_MEDIA_CAPTIONS_CONTAINER},
  .${ELEMENT_MEDIA_CAPTIONS_CONTAINER} > * {
    color: ${colors.gray.mediumAA};
  }

  ${OVERWRITE_CONTAINER_DARK},
  ${OVERWRITE_CONTAINER_DARK} * {
    color: ${colors.white};
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
