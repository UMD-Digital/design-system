import { Media, Spacing, SpaceLayout } from '../tokens';

const lockBase = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: Spacing['md'],
  paddingRight: Spacing['md'],
  maxWidth: `${SpaceLayout.maxWidth.max}`,

  [`@media (${Media.queries.tablet.min})`]: {
    paddingLeft: Spacing['2xl'],
    paddingRight: Spacing['2xl'],
  },

  [`@media (${Media.queries.desktop.min})`]: {
    paddingLeft: Spacing['4xl'],
    paddingRight: Spacing['4xl'],
  },

  [`@media (${Media.queries.highDef.min})`]: {
    paddingLeft: Spacing.max,
    paddingRight: Spacing.max,
  },
};

export const full = {
  ...lockBase,
  maxWidth: '100%',
};

export const max = {
  ...lockBase,
};

export const large = {
  ...lockBase,
  maxWidth: `${SpaceLayout.maxWidth.large}`,
};

export const normal = {
  ...lockBase,
  maxWidth: `${SpaceLayout.maxWidth.normal}`,
};

export const small = {
  ...lockBase,
  maxWidth: `${SpaceLayout.maxWidth.small}`,
};

export const smallest = {
  ...lockBase,
  maxWidth: `${SpaceLayout.maxWidth.smallest}`,
};
