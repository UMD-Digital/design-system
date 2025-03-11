import * as Feeds from '@universityofmaryland/web-feeds-library';
import { CommonFeedEventsData } from './common';
import { Attributes, Model, Register } from 'model';

const tagName = 'umd-feed-events';

const createComponent = (element: HTMLElement) => {
  const isTransparent = element.getAttribute('transparent') === 'true';
  let numberOfColumnsToShow =
    Number(element.getAttribute(Attributes.names.FEED_COLUMN_COUNT)) || 3;
  let numberOfRowsToStart =
    Number(element.getAttribute(Attributes.names.FEED_ROW_COUNT)) || 1;

  if (numberOfColumnsToShow < 1 || numberOfColumnsToShow > 4) {
    numberOfColumnsToShow = 3;
  }

  if (numberOfRowsToStart > 2 || numberOfRowsToStart < 1) {
    numberOfRowsToStart = 1;
  }

  const data = CommonFeedEventsData({
    element,
  });

  if (!data) {
    console.error('Feed news requires a token to be set');
    return { element: document.createElement('div'), styles: '' };
  }

  return Feeds.events.grid({
    ...data,
    numberOfColumnsToShow,
    numberOfRowsToStart,
    isTransparent,
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
