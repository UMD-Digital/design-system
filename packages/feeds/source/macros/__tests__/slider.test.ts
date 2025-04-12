import slider from '../slider';
import {
  Atomic,
  Composite,
  Utilities,
} from '@universityofmaryland/web-elements-library';

jest.mock('@universityofmaryland/web-elements-library', () => {
  const mockFetchGraphQL = jest.fn();
  return {
    Atomic: {
      events: {
        sign: jest.fn().mockReturnValue({
          element: document.createElement('div'),
          styles: '.mock-style-sign',
        }),
      },
      textLockup: {
        date: jest.fn().mockReturnValue({
          element: document.createElement('div'),
          styles: '.mock-style-textlockup',
        }),
      },
    },
    Composite: {
      slider: {
        events: jest.fn().mockReturnValue({
          element: document.createElement('div'),
          styles: '.mock-style-slider',
          events: {
            load: jest.fn(),
          },
        }),
      },
    },
    Utilities: {
      network: {
        FetchGraphQL: mockFetchGraphQL,
      },
      styles: {
        optimizedCss: jest.fn().mockResolvedValue('optimized-css'),
      },
    },
  };
});

describe('Slider Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('handles categories parameter', async () => {
    (Utilities.network.FetchGraphQL as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        data: {
          entries: {
            events: [],
          },
        },
      }),
    );

    slider({
      token: 'token123',
      query: 'query{}',
      url: 'https://example.com/api',
      categories: 'cat1,cat2,cat3',
    });

    await Promise.resolve();
    expect(Utilities.network.FetchGraphQL).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: expect.objectContaining({
          related: ['cat1', 'cat2', 'cat3'],
        }),
      }),
    );
  });

  test('applies shadow DOM styles when callback is used', async () => {
    (Utilities.network.FetchGraphQL as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        data: {
          entries: {
            events: [
              {
                title: 'Event 1',
                startMonth: 'Jan',
                startDay: '01',
              },
            ],
          },
        },
      }),
    );

    const mockShadowRoot = {
      appendChild: jest.fn(),
    };

    const sliderComponent = slider({
      token: 'token123',
      query: 'query{}',
      url: 'https://example.com/api',
    });

    sliderComponent.events.callback(mockShadowRoot as unknown as ShadowRoot);

    await Promise.resolve();
    expect(Utilities.styles.optimizedCss).toHaveBeenCalledWith(
      expect.any(String),
    );
    expect(mockShadowRoot.appendChild).toHaveBeenCalledWith(
      expect.any(HTMLStyleElement),
    );
  });

  test('handles errors in feed data', async () => {
    console.error = jest.fn();

    (Utilities.network.FetchGraphQL as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        message: 'Error message',
      }),
    );

    expect(() => {
      slider({
        token: 'token123',
        query: 'query{}',
        url: 'https://example.com/api',
      });
    }).not.toThrow();

    await Promise.resolve();
  });

  test('handles missing feed data', async () => {
    console.error = jest.fn();

    (Utilities.network.FetchGraphQL as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        data: {},
      }),
    );

    expect(() => {
      slider({
        token: 'token123',
        query: 'query{}',
        url: 'https://example.com/api',
      });
    }).not.toThrow();

    await Promise.resolve();
  });
});
