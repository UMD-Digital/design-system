import { grid } from '@universityofmaryland/web-feeds-library/in-the-news';
import { Attributes, Register } from '@universityofmaryland/web-model-library';
import { CommonFeedInTheNewsData } from './common';
import {
  CreateComponentFunction,
  ComponentRegistration,
} from '../../../_types';

const tagName = 'umd-feed-in-the-news-grid';

const createComponent: CreateComponentFunction = (element) => {
  const data = CommonFeedInTheNewsData({ element });

  if (!data) {
    return { element: document.createElement('div'), styles: '' };
  }

  const columnCount =
    Number(Attributes.getValue.layoutColumnCount({ element })) || 3;
  const rowCount = Number(Attributes.getValue.layoutRowCount({ element })) || 1;

  return grid({
    ...data,
    numberOfColumnsToShow: Math.min(Math.max(columnCount, 1), 4),
    numberOfRowsToStart: Math.min(Math.max(rowCount, 1), 10),
    isTransparent: Attributes.isVisual.transparent({ element }),
  });
};

export const FeedInTheNewsGrid: ComponentRegistration = Register.webComponent({
  tagName,
  createComponent,
  afterConnect: (element, shadow) => {
    element?.events?.callback(shadow);
  },
});

export { FeedInTheNewsGrid as inTheNewsGrid };
