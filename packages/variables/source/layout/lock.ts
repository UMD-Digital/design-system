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

const LockFull = {
  ...lockBase,
  maxWidth: '100%',
};

const LockMax = {
  ...lockBase,
};

const LockLarge = {
  ...lockBase,
  maxWidth: `${SpaceLayout.maxWidth.large}`,
};

const LockNormal = {
  ...lockBase,
  maxWidth: `${SpaceLayout.maxWidth.normal}`,
};

const LockSmall = {
  ...lockBase,
  maxWidth: `${SpaceLayout.maxWidth.small}`,
};

const LockSmallest = {
  ...lockBase,
  maxWidth: `${SpaceLayout.maxWidth.smallest}`,
};

export default {
  LockFull,
  LockMax,
  LockLarge,
  LockNormal,
  LockSmall,
  LockSmallest,
};
