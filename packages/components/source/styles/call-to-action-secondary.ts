import { Animations, Tokens } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

const { Colors } = Tokens;
const { LinkLineSlide } = Animations;

export const CLASS_STYLES_REF_CTA_SECONDARY =
  'umd-styles-call-to-action-secondary';

// prettier-ignore
export const STYLES_CTA_SECONDARY = `
  .${CLASS_STYLES_REF_CTA_SECONDARY} {
    color: ${Colors.black};
    padding: 0 !important;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CLASS_STYLES_REF_CTA_SECONDARY} > span > span`]:
      LinkLineSlide['.slidein-underline-red'],
    },
  })}
`;
