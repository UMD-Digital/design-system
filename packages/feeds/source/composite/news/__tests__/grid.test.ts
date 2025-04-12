import grid from '../grid';
import * as feedFetch from '../common/fetch';
import * as feedDisplay from '../common/display';
import * as feedElements from 'elements';
import * as Styles from '@universityofmaryland/web-styles-library';

// Mock data for tests
const mockNewsEntries = [
  {
    id: 1,
    title: 'UMD Researchers Make Breakthrough Discovery',
    url: 'https://example.com/article1',
    date: '2023-06-15T14:30:00',
    dateFormatted: 'June 15, 2023',
    summary:
      'Researchers at the University of Maryland have made a groundbreaking discovery.',
    image: [
      {
        url: 'https://example.com/image1.jpg',
        altText: 'UMD Research Laboratory',
      },
    ],
    categories: [
      {
        title: 'Research',
        url: 'https://example.com/categories/research',
      },
    ],
  },
  {
    id: 2,
    title: 'UMD Athletics Wins Championship',
    url: 'https://example.com/article2',
    date: '2023-06-10T18:45:00',
    dateFormatted: 'June 10, 2023',
    summary:
      'The University of Maryland athletics team has won the championship.',
    image: [
      {
        url: 'https://example.com/image2.jpg',
        altText: 'UMD Athletics Team',
      },
    ],
    categories: [
      {
        title: 'Athletics',
        url: 'https://example.com/categories/athletics',
      },
    ],
  },
];

jest.spyOn(feedFetch, 'start').mockImplementation(async (props) => {
  const feedData = {
    entries: mockNewsEntries,
    count: mockNewsEntries.length,
  };

  props.setTotalEntries(feedData.count);

  props.displayResultStart({
    ...props,
    feedData: feedData.entries,
  });

  return Promise.resolve();
});

jest.spyOn(feedDisplay, 'resultStart').mockImplementation((props) => {
  const { layoutElement } = props;
  const container = props.getContainer();

  container.appendChild(layoutElement.element);

  const styleUtils = Styles.utilities as any;

  styleUtils.events.dispatchEvent(container, 'feed:loaded', {
    items: mockNewsEntries,
  });
});

jest
  .spyOn(feedDisplay, 'resultLoad')
  .mockImplementation(() => Promise.resolve());
jest
  .spyOn(feedDisplay, 'setShadowStyles')
  .mockImplementation(() => Promise.resolve());
jest
  .spyOn(feedDisplay, 'noResults')
  .mockImplementation(() => Promise.resolve());

// Mock data module
jest.mock('../common/data', () => ({
  display: jest.fn().mockReturnValue({
    title: 'Mocked Title',
    description: 'Mocked Description',
    date: 'Mocked Date',
  }),
  apiVariables: jest.fn().mockReturnValue({
    token: 'test-token',
    limit: 10,
    offset: 0,
  }),
}));

describe('News Grid Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the grid component with default options', async () => {
    const component = grid({
      token: 'test-token',
      numberOfRowsToStart: 3,
      isLazyLoad: false,
      isUnion: false,
    });

    expect(component).toBeDefined();
    expect(component.element).toBeInstanceOf(HTMLDivElement);
    expect(component.styles).toContain('.loader');
    expect(component.events).toBeDefined();
    expect(component.events.callback).toBeInstanceOf(Function);

    expect(feedFetch.start).toHaveBeenCalledTimes(1);
    expect(feedFetch.start).toHaveBeenCalledWith(
      expect.objectContaining({
        token: 'test-token',
        numberOfRowsToStart: 3,
        isLazyLoad: false,
        isUnion: false,
      }),
    );
  });

  test('renders overlay cards when isTypeOverlay is true', async () => {
    const component = grid({
      token: 'test-token',
      numberOfRowsToStart: 3,
      isLazyLoad: false,
      isUnion: false,
      isTypeOverlay: true,
    });

    await new Promise(process.nextTick);

    expect(feedElements.layout.grid).toHaveBeenCalled();
    expect(feedElements.layout.gridGap).not.toHaveBeenCalled();
  });

  test('renders block cards when isTypeOverlay is false', async () => {
    const component = grid({
      token: 'test-token',
      numberOfRowsToStart: 3,
      isLazyLoad: false,
      isUnion: false,
      isTypeOverlay: false,
    });

    await new Promise(process.nextTick);

    expect(feedElements.layout.gridGap).toHaveBeenCalled();
    expect(feedElements.layout.grid).not.toHaveBeenCalled();
  });

  test('uses correct number of columns', async () => {
    const numberOfColumnsToShow = 4;

    const component = grid({
      token: 'test-token',
      numberOfRowsToStart: 3,
      isLazyLoad: false,
      isUnion: false,
      numberOfColumnsToShow,
    });

    await new Promise(process.nextTick);

    expect(feedElements.layout.gridGap).toHaveBeenCalledWith(
      expect.objectContaining({ count: numberOfColumnsToShow }),
    );
  });

  test('fires feed:loaded event when data is loaded', async () => {
    const listener = jest.fn();

    const component = grid({
      token: 'test-token',
      numberOfRowsToStart: 3,
      isLazyLoad: false,
      isUnion: false,
    });

    component.element.addEventListener('feed:loaded', listener);

    await new Promise(process.nextTick);

    const styleUtils = Styles.utilities as any;

    styleUtils.events.dispatchEvent(component.element, 'feed:loaded', {
      items: mockNewsEntries,
    });

    expect(listener).toHaveBeenCalledTimes(1);
  });
});
