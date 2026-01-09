import { inTheNews } from '@universityofmaryland/web-feeds-library/experts';
import { Attributes, Register } from '@universityofmaryland/web-model-library';
import {
  CreateComponentFunction,
  ComponentRegistration,
} from '../../../_types';

const tagName = 'umd-feed-expert-in-the-news';

const createComponent: CreateComponentFunction = (element) => {
  const token = Attributes.getValue.feedToken({ element });
  const expertId = Attributes.getValue.id({ element }) || '';

  if (!token || !expertId) {
    console.error(
      'Feed expert in the news requires both data-token and data-id attributes',
    );
    return { element: document.createElement('div'), styles: '' };
  }

  const rowCount = Number(Attributes.getValue.layoutRowCount({ element })) || 5;

  return inTheNews({
    token,
    expertId,
    numberOfRowsToStart: Math.min(Math.max(rowCount, 2), 10),
    isThemeDark: Attributes.isTheme.dark({ element }),
    isLazyLoad: Attributes.includesFeature.lazyLoad({ element }),
  });
};

export const FeedExpertInTheNews: ComponentRegistration = Register.webComponent(
  {
    tagName,
    createComponent,
    afterConnect: (element, shadow) => {
      element?.events?.callback(shadow);
    },
  },
);

export { FeedExpertInTheNews as expertsInTheNews };
