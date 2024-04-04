import { Tokens, Typography } from '@universityofmaryland/variables';
import { Styles } from 'utilities';

const { Colors } = Tokens;
const { InterativeSmall } = Typography;

const { ConvertJSSObjectToStyles } = Styles;

export const CLASS_STYLES_REF_CTA_PRIMARY = 'umd-styles-call-to-action-primary';

// prettier-ignore
export const STYLES_CTA_PRIMARY = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CLASS_STYLES_REF_CTA_PRIMARY}`]: InterativeSmall,
    },
  })}

  .${CLASS_STYLES_REF_CTA_PRIMARY} {
    background-color: ${Colors.red};
    border: 1px solid ${Colors.red};
    color: ${Colors.white};
    transition: background .5s, border .5s, color .5s;
  }

  .${CLASS_STYLES_REF_CTA_PRIMARY}:hover,
  .${CLASS_STYLES_REF_CTA_PRIMARY}:focus {
    border: 1px solid ${Colors.redDark};
    background-color: ${Colors.redDark};
  }

  .${CLASS_STYLES_REF_CTA_PRIMARY} svg,
  .${CLASS_STYLES_REF_CTA_PRIMARY} path {
    fill: ${Colors.white};
  }
`;
