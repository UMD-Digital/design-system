import { Animations, Tokens } from '@universityofmaryland/variables';
import { Styles } from 'utilities';

const { Colors } = Tokens;
const { Link } = Animations;

const { ConvertJSSObjectToStyles } = Styles;

export const CLASS_STYLES_REF_CTA_SECONDARY =
  'umd-styles-call-to-action-secondary';

// prettier-ignore
export const STYLES_CTA_SECONDARY = `
  .${CLASS_STYLES_REF_CTA_SECONDARY} {
    color: ${Colors.black};
    padding: 0 !important;
  }

  .${CLASS_STYLES_REF_CTA_SECONDARY} > span > span {
    width: calc(100% - 16px);
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CLASS_STYLES_REF_CTA_SECONDARY} > span > span`]:
      Link.LineSlideUnder.red,
    },
  })}
`;
