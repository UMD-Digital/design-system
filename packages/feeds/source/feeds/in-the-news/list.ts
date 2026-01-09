import { createBaseFeed } from 'factory';
import {
  inTheNewsFetchStrategy,
  inTheNewsDisplayStrategy,
  stackedLayout,
} from 'strategies';
import { type ListProps } from './_types';
import { type ElementModel } from '../../_types';

export const inTheNewsList = (props: ListProps): ElementModel =>
  createBaseFeed({
    ...props,
    cardType: 'list',
    isAligned: false,
    fetchStrategy: inTheNewsFetchStrategy,
    displayStrategy: inTheNewsDisplayStrategy,
    layoutStrategy: stackedLayout,
  });
