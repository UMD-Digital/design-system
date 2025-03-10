import * as Feeds from '@universityofmaryland/web-feeds-library';
import { CommonFeedNewsData } from './common';
import { Attributes, Model, Register } from 'model';

const tagName = 'umd-feed-news-featured';

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.visuallyPosition({
    callback: (element, value) => element.events?.setPosition(value),
  }),
);

const createComponent = (element: HTMLElement) => {
  const overwriteTopPosition = Attributes.getValue.topPosition({ element });
  const data = CommonFeedNewsData({
    element,
  });

  if (!data) {
    console.error('Feed news requires a token to be set');
    return { element: document.createElement('div'), styles: '' };
  }

  return Feeds.news.featured({
    ...data,
    numberOfRowsToStart: 1,
    isTransparent: element.getAttribute('transparent') === 'true',
    isLayoutReversed: element.getAttribute('layout') === 'reversed',
    overwriteStickyPosition: overwriteTopPosition
      ? parseInt(overwriteTopPosition)
      : undefined,
  });
};

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      attributes,
      createComponent,
      afterConnect: (element, shadow) => {
        element?.events?.callback(shadow);
      },
    }),
  });
};
