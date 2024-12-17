import { ElementStyles } from '@universityofmaryland/variables';

export const ListStyles = {
  '.umd-lists': {
    ...ElementStyles.list.ordered,
    ...ElementStyles.list.unordered,
  },
};
