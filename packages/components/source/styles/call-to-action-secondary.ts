import { Animations, Tokens } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

const { colors } = Tokens;
const { LinkLineSlide } = Animations;

export const CLASS_STYLES_REF_CTA_SECONDARY =
  'umd-styles-call-to-action-secondary';

// prettier-ignore
export const STYLES_CTA_SECONDARY = `
  .${CLASS_STYLES_REF_CTA_SECONDARY} {
    color: ${colors.black};
    padding: 0 !important;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CLASS_STYLES_REF_CTA_SECONDARY} > span > span`]:
      LinkLineSlide['.slidein-underline-red'],
    },
  })}
`;
