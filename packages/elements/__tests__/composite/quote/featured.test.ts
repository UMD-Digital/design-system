import { createCompositeQuoteFeatured } from '../../../source/composite/quote/featured';
import '../test-helpers/setup';

jest.mock('@universityofmaryland/web-utilities-library/media', () => ({
  imageFromSvg: jest.fn(() => {
    const image = document.createElement('img');

    image.src = 'data:image/svg+xml;base64,';

    return image;
  }),
}));

jest.mock('@universityofmaryland/web-styles-library/layout', () => ({
  grid: { inline: { tabletRows: { className: 'mock-grid-inline' } } },
}));

jest.mock('@universityofmaryland/web-icons-library/brand', () => ({
  quote: '<svg aria-hidden="true"></svg>',
}));

const createText = (text: string) => {
  const element = document.createElement('p');

  element.textContent = text;

  return element;
};

const getTexture = (element: HTMLElement | DocumentFragment) => {
  const texture = element.querySelector('.quote-background-texture');

  if (texture === null) {
    throw new Error('Background texture was not rendered');
  }

  return texture;
};

describe('Composite Quote Featured — decorative background texture', () => {
  it('marks the background texture as decorative', () => {
    const { element } = createCompositeQuoteFeatured({
      quote: createText('An example quotation.'),
      attribution: createText('Example speaker'),
    });

    expect(getTexture(element).getAttribute('alt')).toBe('');
  });

  it('marks the dark theme background texture as decorative', () => {
    const { element } = createCompositeQuoteFeatured({
      quote: createText('An example quotation.'),
      isThemeDark: true,
    });

    expect(getTexture(element).getAttribute('alt')).toBe('');
  });

  it('keeps the alt text on a supplied portrait image', () => {
    const portrait = document.createElement('img');

    portrait.src = 'https://example.com/portrait.jpg';
    portrait.alt = 'Portrait of the speaker';

    const { element } = createCompositeQuoteFeatured({
      quote: createText('An example quotation.'),
      image: portrait,
    });
    const images = Array.from(element.querySelectorAll('img'));
    const suppliedImage = images.find(
      (image) => image.getAttribute('alt') === 'Portrait of the speaker',
    );

    expect(suppliedImage).toBeDefined();
  });
});
