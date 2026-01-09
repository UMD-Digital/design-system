import { createBaseFeed } from 'factory';
import {
  inTheNewsFetchStrategy,
  inTheNewsDisplayStrategy,
  gridGapLayout,
} from 'strategies';
import { type GridProps } from './_types';
import { type ElementModel } from '../../_types';

export const inTheNewsGrid = (props: GridProps): ElementModel =>
  createBaseFeed({
    ...props,
    isAligned: true,
    fetchStrategy: inTheNewsFetchStrategy,
    displayStrategy: inTheNewsDisplayStrategy,
    layoutStrategy: gridGapLayout,
  });
