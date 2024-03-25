import { Tokens } from '@universityofmaryland/variables';

const { Colors } = Tokens;

export const CLASS_STYLES_REF_CTA_OUTLINE = 'umd-styles-call-to-action-outline';

// prettier-ignore
export const STYLES_CTA_OUTLINE = `
  .${CLASS_STYLES_REF_CTA_OUTLINE} {
    background-color: ${Colors.white};
    border: 1px solid ${Colors.gray.darker};
    color: ${Colors.black};
    transition: background .5s, border .5s, color .5s;
  }

  .${CLASS_STYLES_REF_CTA_OUTLINE} svg,
  .${CLASS_STYLES_REF_CTA_OUTLINE} path {
    fill: ${Colors.red};
    transition: fill .5s;
  }

  .${CLASS_STYLES_REF_CTA_OUTLINE}:hover,
  .${CLASS_STYLES_REF_CTA_OUTLINE}:focus {
    background-color: ${Colors.gray.darker};
    color: ${Colors.white};
  }

  .${CLASS_STYLES_REF_CTA_OUTLINE}:hover svg,
  .${CLASS_STYLES_REF_CTA_OUTLINE}:hover path,
  .${CLASS_STYLES_REF_CTA_OUTLINE}:focus svg,
  .${CLASS_STYLES_REF_CTA_OUTLINE}:focus path {
    fill: ${Colors.white};
  }
`;
