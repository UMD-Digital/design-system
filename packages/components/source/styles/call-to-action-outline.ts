import { Tokens } from '@universityofmaryland/variables';

const { colors } = Tokens;

export const CLASS_STYLES_REF_CTA_OUTLINE = 'umd-styles-call-to-action-outline';

// prettier-ignore
export const STYLES_CTA_OUTLINE = `
  .${CLASS_STYLES_REF_CTA_OUTLINE} {
    background-color: ${colors.white};
    border: 1px solid ${colors.gray.darker};
    color: ${colors.black};
    transition: background .5s, border .5s, color .5s;
  }

  .${CLASS_STYLES_REF_CTA_OUTLINE} svg,
  .${CLASS_STYLES_REF_CTA_OUTLINE} path {
    fill: ${colors.red};
    transition: fill .5s;
  }

  .${CLASS_STYLES_REF_CTA_OUTLINE}:hover,
  .${CLASS_STYLES_REF_CTA_OUTLINE}:focus {
    background-color: ${colors.gray.darker};
    color: ${colors.white};
  }

  .${CLASS_STYLES_REF_CTA_OUTLINE}:hover svg,
  .${CLASS_STYLES_REF_CTA_OUTLINE}:hover path,
  .${CLASS_STYLES_REF_CTA_OUTLINE}:focus svg,
  .${CLASS_STYLES_REF_CTA_OUTLINE}:focus path {
    fill: ${colors.white};
  }
`;
