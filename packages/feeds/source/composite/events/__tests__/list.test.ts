import list from '../list';
import * as feedFetch from '../common/fetch';
import * as feedDisplay from '../common/display';
import { Utilities, Composite, Atomic } from '@universityofmaryland/web-elements-library';
import * as feedElements from 'elements';
import * as feedMacros from 'macros';
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
        altText: 'UMD Spring Concert'
      }
    ],
    location: [
      {
        title: 'Clarice Smith Performing Arts Center'
      }
    ]
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
        altText: 'Research Symposium'
      }
    ],
    location: [
      {
        title: 'Iribe Center'
      }
    ]
  }
];

describe('Events List Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Mock the fetch module
    jest.spyOn(feedFetch, 'start').mockImplementation(async (props) => {
      // Simulate the fetch response
      props.setTotalEntries(mockEventEntries.length);
      
      // Call displayResultStart directly
      props.displayResultStart({
        ...props,
        feedData: mockEventEntries
      });
      
      // Return mock data
      return Promise.resolve();
    });

    // Mock the display module functions
    jest.spyOn(feedDisplay, 'resultStart').mockImplementation((props) => {
      const { layoutElement } = props;
      const container = props.getContainer();
      
      // Simulate the display process
      container.appendChild(layoutElement.element);
      
      // Cast Styles.utilities to any to avoid TypeScript errors with the mock implementation
      const styleUtils = Styles.utilities as any;
      
      // Dispatch a custom event to simulate feed loaded
      styleUtils.events.dispatchEvent(container, 'feed:loaded', { items: mockEventEntries });
    });

    jest.spyOn(feedDisplay, 'resultLoad').mockImplementation(() => Promise.resolve());
    jest.spyOn(feedDisplay, 'setShadowStyles').mockImplementation(() => Promise.resolve());
    jest.spyOn(feedDisplay, 'noResults').mockImplementation(() => Promise.resolve());
  });
  
  test('renders the list component with default options', () => {
    // Create the component
    const component = list({
      token: 'test-token',
      numberOfRowsToStart: 3,
      isLazyLoad: false,
      isUnion: false
    });
    
    // Check that the component has the expected structure
    expect(component).toBeDefined();
    expect(component.element).toBeInstanceOf(HTMLDivElement);
    expect(component.styles).toContain('.loader');
    expect(component.events).toBeDefined();
    expect(component.events.callback).toBeInstanceOf(Function);
    
    // Verify that fetch.start was called with correct params
    expect(feedFetch.start).toHaveBeenCalledTimes(1);
    expect(feedFetch.start).toHaveBeenCalledWith(expect.objectContaining({
      token: 'test-token',
      numberOfRowsToStart: 3,
      isLazyLoad: false,
      isUnion: false
    }));
  });
  
  test('uses stacked layout for list view', () => {
    // Create the component
    list({
      token: 'test-token',
      numberOfRowsToStart: 3,
      isLazyLoad: false,
      isUnion: false
    });
    
    // Verify the correct layout was used
    expect(feedElements.layout.stacked).toHaveBeenCalled();
  });
  
  test('passes theme settings to start function', () => {
    // Create the component with dark theme option
    list({
      token: 'test-token',
      numberOfRowsToStart: 3,
      isLazyLoad: false,
      isUnion: false,
      isThemeDark: true
    });
    
    // Cast the spy to any to access mock properties without TypeScript errors
    const startSpy = feedFetch.start as any;
    
    // Verify dark theme was passed to start
    expect(startSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        isThemeDark: true
      })
    );
  });
});