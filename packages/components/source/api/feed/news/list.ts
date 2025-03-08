import * as Feeds from '@universityofmaryland/web-feeds-library';
import { CommonFeedNewsData } from './common';
import { Model, Register } from 'model';

const tagName = 'umd-feed-news-list';

const createComponent = (element: HTMLElement) => {
  const data = CommonFeedNewsData({
    element,
  });

  if (!data) {
    console.error('Feed news requires a token to be set');
    return { element: document.createElement('div'), styles: '' };
  }

  return Feeds.news.list({
    ...data,
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
