import grouped from '../../../source/composite/events/grouped';
import * as feedFetch from '../../../source/composite/events/common/fetch';
import * as feedDisplay from '../../../source/composite/events/common/display';

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
  {
    id: 3,
    title: 'Another Event Same Day',
    url: 'https://example.com/event3',
    startDayOfWeek: 'Friday',
    startStamp: '2023-05-15T14:00:00',
    startMonth: 'May',
    startDay: '15',
    startTime: '2:00 PM',
    endDayOfWeek: 'Friday',
    endMonth: 'May',
    endDay: '15',
    endTime: '4:00 PM',
    allDay: false,
    summary: 'Another event happening on the same day.',
    image: [
      {
        url: 'https://example.com/image3.jpg',
        altText: 'Another Event',
      },
    ],
    location: [
      {
        title: 'Student Union',
      },
    ],
  },
];

describe('Events Grouped Component', () => {
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

  test('renders the grouped component with default options', () => {
    const component = grouped({
      token: 'test-token',
      numberOfRowsToStart: 3,
      isLazyLoad: false,
    });

    expect(component).toBeDefined();
    expect(component.element).toBeInstanceOf(HTMLDivElement);
    expect(component.styles).toContain('.loader');
    expect(component.events).toBeDefined();
    expect(component?.events?.callback).toBeInstanceOf(Function);

    const startSpy = feedFetch.start as any;

    expect(startSpy).toHaveBeenCalledTimes(1);
    expect(startSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        token: 'test-token',
        numberOfRowsToStart: 3,
        isLazyLoad: false,
      }),
    );
  });

  test('creates grouped layout with custom div structure', () => {
    const component = grouped({
      token: 'test-token',
      numberOfRowsToStart: 3,
      isLazyLoad: false,
    });

    // The grouped component uses its own groupLayout function, not feedElements.layout.stacked
    // Verify the component structure instead
    expect(component.element).toBeInstanceOf(HTMLDivElement);
    expect(component.styles).toBeDefined();
  });

  test('includes theme dark flag in props when set', () => {
    grouped({
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

  test('handles categories correctly', () => {
    const categories = ['sports', 'academic'];

    grouped({
      token: 'test-token',
      numberOfRowsToStart: 3,
      isLazyLoad: false,
      categories,
    });

    const startSpy = feedFetch.start as any;

    expect(startSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        categories,
      }),
    );
  });
});