import * as Feeds from '@universityofmaryland/web-feeds-library';
import { CommonFeedNewsData } from './common';
import { Attributes, Model, Register } from 'model';

const ATTRIBUTE_TYPE = 'type';
const ATTRIBUTE_TRANSPARENT = 'transparent';

const tagName = 'umd-feed-news';

const createComponent = (element: HTMLElement) => {
  const attributeType = element.getAttribute(ATTRIBUTE_TYPE);
  const isTransparent = element.getAttribute(ATTRIBUTE_TRANSPARENT) === 'true';
  const numberOfColumnsToShow =
    Number(element.getAttribute(Attributes.names.FEED_COLUMN_COUNT)) || 3;

  const isTypeGrid = attributeType === 'grid' || !attributeType;
  const isTypeOverlay = attributeType === 'overlay';

  const data = CommonFeedNewsData({
    element,
    numberOfRowsToStartDefault: 1,
  });

  if (!data) {
    console.error('Feed news requires a token to be set');
    return { element: document.createElement('div'), styles: '' };
  }

  return Feeds.news.block({
    ...data,
    numberOfColumnsToShow,
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
