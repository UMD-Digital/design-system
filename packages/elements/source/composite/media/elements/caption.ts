import { token, typography } from '@universityofmaryland/web-styles-library';
import * as theme from 'helpers/theme';

export type TypeMediaCaptionRequirements = {
  caption: HTMLElement;
  isThemeDark?: boolean;
};

const ATTRIBUTE_THEME = 'data-theme';
const ATTRIBUTE_THEME_DARK = 'dark';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${ATTRIBUTE_THEME_DARK}"]`;

const ELEMENT_MEDIA_CAPTIONS_CONTAINER = 'element-media-inline-captions';

const OVERWRITE_CONTAINER_DARK = `.${ELEMENT_MEDIA_CAPTIONS_CONTAINER}${IS_THEME_DARK}`;

// prettier-ignore
const STYLES_MEDIA_CAPTIONS_ELEMENT = `
  ${theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_MEDIA_CAPTIONS_CONTAINER}`]: typography.sans.small,
    },
  })}

  ${theme.convertJSSObjectToStyles({
    styleObj: {
      [`${ELEMENT_MEDIA_CAPTIONS_CONTAINER} *`]: typography.sans.small,
    },
  })}

  .${ELEMENT_MEDIA_CAPTIONS_CONTAINER} {
    margin-top: ${token.spacing.sm};
    display: inline-block;
    text-align: left;
    opacity: 0;
    width: 100%;
  }

  .${ELEMENT_MEDIA_CAPTIONS_CONTAINER},
  .${ELEMENT_MEDIA_CAPTIONS_CONTAINER} > * {
    color: ${token.color.gray.mediumAA};
  }

  ${OVERWRITE_CONTAINER_DARK},
  ${OVERWRITE_CONTAINER_DARK} * {
    color: ${token.color.white};
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
