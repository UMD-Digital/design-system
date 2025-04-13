import slider from '../slider';
import * as feedMacros from 'macros';

describe('Academic Slider Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders the slider component with required props', () => {
    // Create the component with only required props
    const component = slider({
      token: 'test-token',
    });

    // Check that the component has the expected structure
    expect(component).toBeDefined();
    expect(component.element).toBeInstanceOf(HTMLDivElement);
    expect(component.styles).toBe('.mock-slider-styles');
    expect(component.events).toBeDefined();

    // Cast the spy to any to access mock properties without TypeScript errors
    const sliderSpy = feedMacros.slider as any;
    
    // Verify that feedMacros.slider was called with correct params
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
    // Create the component with dark theme option
    slider({
      token: 'test-token',
      isThemeDark: true,
    });

    // Cast the spy to any to access mock properties without TypeScript errors
    const sliderSpy = feedMacros.slider as any;
    
    // Verify that feedMacros.slider was called with correct params
    expect(sliderSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        isThemeDark: true,
      }),
    );
  });

  test('passes categories to slider component', () => {
    // Create the component with categories
    const testCategories = 'test-category';
    slider({
      token: 'test-token',
      categories: testCategories,
    });

    // Cast the spy to any to access mock properties without TypeScript errors
    const sliderSpy = feedMacros.slider as any;
    
    // Verify that feedMacros.slider was called with correct params
    expect(sliderSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        categories: testCategories,
      }),
    );
  });

  test('uses correct GraphQL query structure', () => {
    // Create the component
    slider({
      token: 'test-token',
    });

    // Cast the spy to any to access mock properties without TypeScript errors
    const sliderSpy = feedMacros.slider as any;
    
    // Verify that the query contains required fields
    const sliderCallArgs = sliderSpy.mock.calls[0][0];

    // Query should include title and url at minimum
    expect(sliderCallArgs.query).toContain('title');
    expect(sliderCallArgs.query).toContain('url');
    
    // Check for academic-specific query elements
    expect(sliderCallArgs.query).toContain('calendarId: 5');
    expect(sliderCallArgs.query).toContain('loadOccurrences: true');
  });
});