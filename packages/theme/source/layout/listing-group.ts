import { Tokens } from '@universityofmaryland/variables';

const { Colors, Spacing } = Tokens;

export const ListingGroup = {
  '.umd-listing-group': {
    borderTop: `1px solid ${Colors.gray.light}`,
    display: 'grid',
    gridGap: Spacing.sm,
    gridTemplateColumns: '1fr',
    paddingTop: Spacing.sm,
  },
};
