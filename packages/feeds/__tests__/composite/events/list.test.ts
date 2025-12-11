import list from '../../../source/composite/events/list';
import * as feedFetch from '../../../source/composite/events/common/fetch';
import * as feedDisplay from '../../../source/composite/events/common/display';
import * as feedElements from 'elements';
import * as Styles from '@universityofmaryland/web-styles-library';

// Mock data for tests
const mockEventEntries = [
  {
    id: 1,
    title: 'UMD Spring Concert',
    url: 'https://example.com/event1',
    startDayOfWeek: 'Friday',
    startStamp: '2023-05-15T18:00:00',
    startMonth: 'May',
    startDay: '15',
    startTime: '6:00 PM',
    endDayOfWeek: 'Friday',
    endMonth: 'May',
    endDay: '15',
    endTime: '9:00 PM',
    allDay: false,
    summary: 'Annual spring concert featuring university performers.',
    image: [
      {
        url: 'https://example.com/image1.jpg',
        altText: 'UMD Spring Concert',
      },
    ],
    location: [
      {
        title: 'Clarice Smith Performing Arts Center',
      },
    ],
  },
  {
    id: 2,
    title: 'Faculty Research Symposium',
    url: 'https://example.com/event2',
    startDayOfWeek: 'Monday',
    startStamp: '2023-05-18T09:00:00',
    startMonth: 'May',
    startDay: '18',
    startTime: '9:00 AM',
    endDayOfWeek: 'Monday',
    endMonth: 'May',
    endDay: '18',
    endTime: '5:00 PM',
    allDay: false,
    summary: 'Faculty members present their latest research findings.',
    image: [
      {
        url: 'https://example.com/image2.jpg',
        altText: 'Research Symposium',
      },
    ],
    location: [
      {
        title: 'Iribe Center',
      },
    ],
  },
];

describe('Events List Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(feedFetch, 'start').mockImplementation(async (props) => {
      props.setTotalEntries(mockEventEntries.length);

      props.displayResultStart({
        ...props,
        feedData: mockEventEntries,
      });

      return Promise.resolve();
    });

    jest.spyOn(feedDisplay, 'resultStart').mockImplementation((props) => {
      const { layoutElement } = props;
      const container = props.getContainer();

      container.appendChild(layoutElement.element);

      // Dispatch a custom event manually since Styles doesn't have an events utility
      const event = new CustomEvent('feed:loaded', {
        detail: { items: mockEventEntries }
      });
      container.dispatchEvent(event);
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
  });

  test('renders the list component with default options', () => {
    const component = list({
      token: 'test-token',
      numberOfRowsToStart: 3,
      isLazyLoad: false,
    });

    expect(component).toBeDefined();
    expect(component.element).toBeInstanceOf(HTMLDivElement);
    expect(component.styles).toContain('.loader');
    expect(component.events).toBeDefined();
    expect(component?.events?.callback).toBeInstanceOf(Function);

    expect(feedFetch.start).toHaveBeenCalledTimes(1);
    expect(feedFetch.start).toHaveBeenCalledWith(
      expect.objectContaining({
        token: 'test-token',
        numberOfRowsToStart: 3,
        isLazyLoad: false,
      }),
    );
  });

  test('passes theme settings to start function', () => {
    list({
      token: 'test-token',
      numberOfRowsToStart: 3,
      isLazyLoad: false,
      isThemeDark: true,
    });

    const startSpy = feedFetch.start as any;

    expect(startSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        isThemeDark: true,
      }),
    );
  });
});
