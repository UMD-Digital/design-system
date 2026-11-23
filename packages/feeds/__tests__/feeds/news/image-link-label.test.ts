/**
 * Tests for the accessible name of news feed image links
 *
 * @group feeds/news
 */

import { createBaseFeed } from 'factory';
import { newsGrid } from '../../../source/feeds/news/grid';
import { newsList } from '../../../source/feeds/news/list';

jest.mock('factory', () => ({
  createBaseFeed: jest.fn(() => ({
    element: document.createElement('div'),
    styles: '',
  })),
}));

const mockedCreateBaseFeed = jest.mocked(createBaseFeed);

const entry = {
  id: 1,
  title: 'Terps Win the Big Ten',
  url: 'https://today.umd.edu/terps-win',
  image: [{ url: 'https://example.com/image.jpg', altText: 'Team photo' }],
};

const getImageConfig = () => {
  const config = mockedCreateBaseFeed.mock.calls[0][0];
  const { imageConfig } = config;

  if (imageConfig === undefined) {
    throw new Error('Feed did not provide an imageConfig');
  }

  return imageConfig(entry);
};

const feeds = [
  {
    name: 'news grid',
    create: () =>
      newsGrid({
        token: 'test-token',
        numberOfColumnsToShow: 3,
        numberOfRowsToStart: 1,
        isUnion: false,
      }),
  },
  {
    name: 'news list',
    create: () =>
      newsList({
        token: 'test-token',
        numberOfRowsToStart: 1,
        isUnion: false,
      }),
  },
];

describe('News feed image link label', () => {
  beforeEach(() => {
    mockedCreateBaseFeed.mockClear();
  });

  feeds.forEach(({ name, create }) => {
    it(`${name} names the image link after the article it links to`, () => {
      create();

      const imageConfig = getImageConfig();

      if (imageConfig === null) {
        throw new Error('Image config was not created');
      }

      expect(imageConfig.linkLabel).toBe('Read Terps Win the Big Ten');
      expect(imageConfig.linkUrl).toBe('https://today.umd.edu/terps-win');
    });
  });
});
