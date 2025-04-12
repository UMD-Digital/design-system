import lazyLoad from '../lazy-load';
import * as Styles from '@universityofmaryland/web-styles-library';
import { Model } from '@universityofmaryland/web-elements-library';

describe('Lazy Load Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('creates a lazy load component with correct structure', () => {
    const callback = jest.fn();
    const isThemeDark = false;
    const totalEntries = 10;
    const offset = 5;

    const component = lazyLoad.create({
      callback,
      isThemeDark,
      isLazyLoad: true,
      totalEntries,
      offset,
    });

    expect(component).toBeDefined();
    expect(component?.element).toBeInstanceOf(HTMLDivElement);
    expect(component?.styles).toContain('.aligned-center');
    expect(component?.styles).toContain('.outline-button');

    expect(Model.ElementModel.layout.alignedCenter).toHaveBeenCalledWith(
      expect.objectContaining({
        isThemeDark: false,
        elementStyles: expect.objectContaining({
          element: expect.objectContaining({
            marginTop: `${Styles.token.spacing.lg}`,
          }),
        }),
      }),
    );

    expect(Model.ElementModel.actions.outline).toHaveBeenCalledWith(
      expect.objectContaining({
        isThemeDark: false,
      }),
    );

    expect(component?.element.querySelector('button')?.innerHTML).toBe(
      'Load more',
    );
  });

  test('attaches click handler to button', () => {
    const callback = jest.fn();
    const component = lazyLoad.create({
      callback,
      isLazyLoad: true,
      totalEntries: 10,
      offset: 5,
    });

    const button = component?.element.querySelector(
      'button',
    ) as HTMLButtonElement;
    expect(button).toBeDefined();

    button.click();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('returns undefined when conditions are not met', () => {
    expect(
      lazyLoad.create({
        callback: jest.fn(),
        isLazyLoad: false,
        totalEntries: 10,
        offset: 5,
      }),
    ).toBeUndefined();

    expect(
      lazyLoad.create({
        callback: jest.fn(),
        isLazyLoad: true,
        totalEntries: null,
        offset: 5,
      }),
    ).toBeUndefined();

    expect(
      lazyLoad.create({
        callback: jest.fn(),
        isLazyLoad: true,
        totalEntries: 10,
        offset: 0,
      }),
    ).toBeUndefined();

    expect(
      lazyLoad.create({
        callback: undefined as any,
        isLazyLoad: true,
        totalEntries: 10,
        offset: 5,
      }),
    ).toBeUndefined();

    expect(
      lazyLoad.create({
        callback: jest.fn(),
        isLazyLoad: true,
        totalEntries: 10,
        offset: 10,
      }),
    ).toBeUndefined();
  });

  test('removes lazy load button from container', () => {
    const container = document.createElement('div');
    const button = document.createElement('div');
    button.className = Styles.layout.alignment.block.center.className as string;
    container.appendChild(button);

    lazyLoad.remove({ container });

    expect(
      container.querySelector(
        `.${Styles.layout.alignment.block.center.className}`,
      ),
    ).toBeNull();
  });
});
