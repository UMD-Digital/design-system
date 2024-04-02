import { Layout, Tokens } from '@universityofmaryland/variables';

const { Lock } = Layout;
const { MaxWidth } = Tokens;

export default {
  '.umd-lock': {
    ...Lock['.base'],
  },

  '.umd-lock-small': {
    ...Lock['.base'],
    maxWidth: `${MaxWidth.large}`,
  },

  '.umd-lock-smaller': {
    ...Lock['.base'],
    maxWidth: `${MaxWidth.normal}`,
  },

  '.umd-lock-extra-small': {
    ...Lock['.base'],
    maxWidth: `${MaxWidth.small}`,
  },

  '.umd-lock-smallest': {
    ...Lock['.base'],
    maxWidth: `${MaxWidth.smallest}`,
  },
};
