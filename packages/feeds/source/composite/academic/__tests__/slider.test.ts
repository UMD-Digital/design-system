import slider from '../slider';
import * as feedMacros from 'macros';

describe('Academic Slider Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the slider component with required props', () => {
    const component = slider({
      token: 'test-token',
    });

    expect(component).toBeDefined();
    expect(component.element).toBeInstanceOf(HTMLDivElement);
    expect(component.styles).toBe('.mock-slider-styles');
    expect(component.events).toBeDefined();

    const sliderSpy = feedMacros.slider as any;

    expect(sliderSpy).toHaveBeenCalledTimes(1);
    expect(sliderSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        token: 'test-token',
        query: expect.stringContaining('query getEvents'),
        url: 'https://provost.umd.edu/graphql',
      }),
    );
  });

  test('passes dark theme setting to slider component', () => {
    slider({
      token: 'test-token',
      isThemeDark: true,
    });

    const sliderSpy = feedMacros.slider as any;

    expect(sliderSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        isThemeDark: true,
      }),
    );
  });

  test('passes categories to slider component', () => {
    const testCategories = 'test-category';
    slider({
      token: 'test-token',
      categories: testCategories,
    });

    const sliderSpy = feedMacros.slider as any;

    expect(sliderSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        categories: testCategories,
      }),
    );
  });

  test('uses correct GraphQL query structure', () => {
    slider({
      token: 'test-token',
    });

    const sliderSpy = feedMacros.slider as any;
    const sliderCallArgs = sliderSpy.mock.calls[0][0];

    expect(sliderCallArgs.query).toContain('title');
    expect(sliderCallArgs.query).toContain('url');

    expect(sliderCallArgs.query).toContain('calendarId: 5');
    expect(sliderCallArgs.query).toContain('loadOccurrences: true');
  });
});
