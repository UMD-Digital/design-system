import { Queries } from '../tokens/breakpoints';
import { Spacing, MaxWidth } from '../tokens/spacing';

const lockBase = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: Spacing['md'],
  paddingRight: Spacing['md'],
  maxWidth: `${MaxWidth.max}`,

  [`@media (${Queries.tablet.min})`]: {
    paddingLeft: Spacing['2xl'],
    paddingRight: Spacing['2xl'],
  },

  [`@media (${Queries.desktop.min})`]: {
    paddingLeft: Spacing['4xl'],
    paddingRight: Spacing['4xl'],
  },
};

const LockMax = {
  ...lockBase,
};

const LockLarge = {
  ...lockBase,
  maxWidth: `${MaxWidth.large}`,
};

const LockNormal = {
  ...lockBase,
  maxWidth: `${MaxWidth.normal}`,
};

const LockSmall = {
  ...lockBase,
  maxWidth: `${MaxWidth.small}`,
};

const LockSmallest = {
  ...lockBase,
  maxWidth: `${MaxWidth.smallest}`,
};

export default { LockMax, LockLarge, LockNormal, LockSmall, LockSmallest };
