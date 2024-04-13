import { Tokens } from '@universityofmaryland/variables';

const { Spacing, Queries } = Tokens;

const sectionIntroSpacing = {
  marginBottom: `${Spacing.lg}`,

  [`@media (${Queries.tablet.min})`]: {
    marginBottom: `${Spacing['2xl']}`,
  },
};

export default {
  'umd-element-section-intro:not(:defined)': {
    display: 'none',
  },
  'umd-element-section-intro-wide:not(:defined)': {
    display: 'none',
  },
  'umd-element-section-intro:defined': {
    display: 'block',
    ...sectionIntroSpacing,
  },
  'umd-element-section-intro-wide:defined': {
    display: 'block',
    ...sectionIntroSpacing,
  },
};
