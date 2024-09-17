import { Tokens, Typography } from '@universityofmaryland/variables';
import { Styles } from 'utilities';

export type TypeMediaCaptionRequirements = {
  caption: HTMLElement;
};

const { Colors, Spacing } = Tokens;
const { SansSmall } = Typography;
const { ConvertJSSObjectToStyles } = Styles;

const ELEMENT_MEDIA_CAPTIONS_CONTAINER = 'element-media-inline-captions';

// prettier-ignore
const STYLES_MEDIA_CAPTIONS_ELEMENT = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_MEDIA_CAPTIONS_CONTAINER}`]: SansSmall,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${ELEMENT_MEDIA_CAPTIONS_CONTAINER} *`]: SansSmall,
    },
  })}

  .${ELEMENT_MEDIA_CAPTIONS_CONTAINER} {
    margin-top: ${Spacing.sm};
    color: ${Colors.gray.mediumAA};
    display: inline-block;
    text-align: left;
    opacity: 0;
  }
`;

const CreateMediaInline = ({ caption }: TypeMediaCaptionRequirements) => {
  caption.classList.add(ELEMENT_MEDIA_CAPTIONS_CONTAINER);

  return caption;
};

export default {
  CreateElement: CreateMediaInline,
  Styles: STYLES_MEDIA_CAPTIONS_ELEMENT,
  Elements: {
    container: ELEMENT_MEDIA_CAPTIONS_CONTAINER,
  },
};
