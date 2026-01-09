import { list } from '@universityofmaryland/web-feeds-library/in-the-news';
import { Attributes, Register } from '@universityofmaryland/web-model-library';
import { CommonFeedInTheNewsData } from './common';
import {
  CreateComponentFunction,
  ComponentRegistration,
} from '../../../_types';

const tagName = 'umd-feed-in-the-news-list';

const createComponent: CreateComponentFunction = (element) => {
  const data = CommonFeedInTheNewsData({ element });

  if (!data) {
    return { element: document.createElement('div'), styles: '' };
  }

  const rowCount = Number(Attributes.getValue.layoutRowCount({ element })) || 5;

  return list({
    ...data,
    numberOfRowsToStart: rowCount >= 1 && rowCount <= 10 ? rowCount : 5,
  });
};

export const FeedInTheNewsList: ComponentRegistration = Register.webComponent({
  tagName,
  createComponent,
  afterConnect: (element, shadow) => {
    element?.events?.callback(shadow);
  },
});

export { FeedInTheNewsList as inTheNewsList };
