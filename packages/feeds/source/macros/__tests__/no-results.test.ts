import noResults from '../no-results';
import { Atomic, Model } from '@universityofmaryland/web-elements-library';

jest.mock('@universityofmaryland/web-elements-library', () => {
  return {
    Atomic: {
      actions: {
        options: jest.fn().mockImplementation(({ element }) => {
          return {
            element,
            styles: '.mock-style-actions',
          };
        }),
      },
    },
    Model: {
      ElementModel: {
        layout: {
          gridStacked: jest.fn().mockReturnValue({
            element: document.createElement('div'),
            styles: '.mock-style-grid',
          }),
        },
        headline: {
          sansExtraLarge: jest.fn().mockReturnValue({
            element: document.createElement('p'),
            styles: '.mock-style-headline',
          }),
        },
      },
    },
  };
});

describe('No Results Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('creates no results component with default message', () => {
    const component = noResults({});

    expect(component).toBeDefined();
    expect(component.element).toBeInstanceOf(HTMLDivElement);
    expect(component.styles).toContain('.mock-style-grid');
    expect(component.styles).toContain('.mock-style-headline');

    expect(Model.ElementModel.layout.gridStacked).toHaveBeenCalledWith(
      expect.objectContaining({
        element: expect.any(HTMLDivElement),
        isThemeDark: undefined,
      }),
    );

    expect(Model.ElementModel.headline.sansExtraLarge).toHaveBeenCalledWith(
      expect.objectContaining({
        element: expect.any(HTMLElement),
        isThemeDark: undefined,
      }),
    );

    const headlineElement = component.element.querySelector('p');
    expect(headlineElement?.innerHTML).toBe('No results found');
  });

  test('creates no results component with custom message', () => {
    const message = 'Custom message';
    const component = noResults({ message });

    const headlineElement = component.element.querySelector('p');
    expect(headlineElement?.innerHTML).toBe(message);
  });

  test('creates no results component with link', () => {
    const linkUrl = 'https://example.com';
    const linkText = 'Example Link';

    const component = noResults({
      message: 'No results',
      linkUrl,
      linkText,
    });

    expect(component.styles).toContain('.mock-style-actions');
    expect(Atomic.actions.options).toHaveBeenCalledWith(
      expect.objectContaining({
        element: expect.any(HTMLAnchorElement),
        isTypeOutline: true,
      }),
    );

    const linkElement = component.element.querySelector('a');
    expect(linkElement).toBeDefined();
    expect(linkElement?.getAttribute('href')).toBe(linkUrl);
    expect(linkElement?.getAttribute('target')).toBe('_blank');
    expect(linkElement?.getAttribute('rel')).toBe('noopener noreferrer');
    expect(linkElement?.innerHTML).toBe(linkText);
  });

  test('applies dark theme', () => {
    const isThemeDark = true;
    const component = noResults({ isThemeDark });

    expect(Model.ElementModel.layout.gridStacked).toHaveBeenCalledWith(
      expect.objectContaining({
        isThemeDark: true,
      }),
    );

    expect(Model.ElementModel.headline.sansExtraLarge).toHaveBeenCalledWith(
      expect.objectContaining({
        isThemeDark: true,
      }),
    );
  });

  test('applies left alignment', () => {
    const isAlignedCenter = false;
    const component = noResults({ isAlignedCenter });

    expect(Model.ElementModel.layout.gridStacked).toHaveBeenCalledWith(
      expect.objectContaining({
        elementStyles: expect.objectContaining({
          element: expect.objectContaining({
            [`& *`]: {
              textAlign: 'left',
            },
          }),
        }),
      }),
    );
  });
});
