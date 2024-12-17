import { Tokens } from '@universityofmaryland/variables';

const { Spacing, Media } = Tokens;

const sectionIntroSpacing = {
  marginBottom: `${Spacing.lg}`,

  [`@media (${Media.queries.tablet.min})`]: {
    marginBottom: `${Spacing['2xl']}`,
  },
};

const Default = {
  'umd-element-section-intro:not(:defined)': {
    display: 'none',
  },
  'umd-element-section-intro:defined': {
    display: 'block',
    ...sectionIntroSpacing,
  },
};

const Wide = {
  'umd-element-section-intro-wide:not(:defined)': {
    display: 'none',
  },
  'umd-element-section-intro-wide:defined': {
    display: 'block',
    ...sectionIntroSpacing,
  },
};

export default {
  ...Default,
  ...Wide,
};
