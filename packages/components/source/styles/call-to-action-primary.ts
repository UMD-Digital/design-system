import { colors, typography } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

export const CLASS_STYLES_REF_CTA_PRIMARY = 'umd-styles-call-to-action-primary';

// prettier-ignore
export const STYLES_CTA_PRIMARY = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CLASS_STYLES_REF_CTA_PRIMARY}`]:
        typography['.umd-interactive-sans-small'],
    },
  })}

  .${CLASS_STYLES_REF_CTA_PRIMARY} {
    background-color: ${colors.red};
    border: 1px solid ${colors.red};
    color: ${colors.white};
    transition: background .5s, border .5s, color .5s;
  }

  .${CLASS_STYLES_REF_CTA_PRIMARY}:hover,
  .${CLASS_STYLES_REF_CTA_PRIMARY}:focus {
    border: 1px solid ${colors.redDark};
    background-color: ${colors.redDark};
  }

  .${CLASS_STYLES_REF_CTA_PRIMARY} svg,
  .${CLASS_STYLES_REF_CTA_PRIMARY} path {
    fill: ${colors.white};
  }
`;
