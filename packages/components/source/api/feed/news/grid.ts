import * as Feeds from '@universityofmaryland/web-feeds-library';
import { CommonFeedNewsData } from './common';
import { Attributes, Model, Register } from 'model';

const tagName = 'umd-feed-news';

const createComponent = (element: HTMLElement) => {
  const isTransparent = element.getAttribute('transparent') === 'true';
  const isTypeOverlay = element.getAttribute('type') === 'overlay';
  const numberOfColumnsToShow =
    Number(element.getAttribute(Attributes.names.FEED_COLUMN_COUNT)) || 3;
  const numberOfRowsToStart =
    Number(element.getAttribute(Attributes.names.FEED_ROW_COUNT)) || 1;

  const data = CommonFeedNewsData({
    element,
  });

  if (!data) {
    console.error('Feed news requires a token to be set');
    return { element: document.createElement('div'), styles: '' };
  }

  return Feeds.news.grid({
    ...data,
    numberOfColumnsToShow,
    numberOfRowsToStart,
    isTransparent,
    isTypeOverlay,
  });
};

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent,
      afterConnect: (element, shadow) => {
        element?.events?.callback(shadow);
      },
    }),
  });
};
