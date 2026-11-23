import { createCompositeQuoteText } from '../../../source/composite/quote/elements/text';
import '../test-helpers/setup';

jest.mock('@universityofmaryland/web-styles-library/layout', () => ({
  grid: { inline: { tabletRows: { className: 'mock-grid-inline' } } },
}));

jest.mock('@universityofmaryland/web-icons-library/brand', () => ({
  quote: '<svg aria-hidden="true"></svg>',
}));

const createText = (tag: string, text: string) => {
  const element = document.createElement(tag);

  element.textContent = text;

  return element;
};

const buildQuote = (includesAnimation: boolean) =>
  createCompositeQuoteText({
    quote: createText('p', 'Fear the turtle.'),
    attribution: createText('p', 'Testudo'),
    attributionSubText: createText('p', 'Mascot'),
    includesAnimation,
  });

const getBlockquote = (element: HTMLElement | DocumentFragment) => {
  const blockquote = element.querySelector('blockquote');

  if (blockquote === null) {
    throw new Error('Quote was not wrapped in a blockquote');
  }

  return blockquote;
};

describe('Composite Quote Text — quotation semantics', () => {
  [false, true].forEach((includesAnimation) => {
    describe(`with includesAnimation: ${includesAnimation}`, () => {
      it('wraps the quote text in a blockquote', () => {
        const { element } = buildQuote(includesAnimation);
        const blockquote = getBlockquote(element);

        expect(
          blockquote.querySelector('.quote-container-quote'),
        ).not.toBeNull();
        expect(blockquote.textContent).toContain('Fear');
        expect(blockquote.textContent).toContain('turtle.');
      });

      it('keeps the attribution outside the blockquote', () => {
        const { element } = buildQuote(includesAnimation);
        const blockquote = getBlockquote(element);

        expect(blockquote.textContent).not.toContain('Testudo');
        expect(blockquote.textContent).not.toContain('Mascot');
      });

      it('renders the quote before its attribution', () => {
        const { element } = buildQuote(includesAnimation);
        const blockquote = getBlockquote(element);
        const attribution = element.querySelector(
          '.quote-container-attribution',
        );

        if (attribution === null) {
          throw new Error('Attribution was not rendered');
        }

        const position = blockquote.compareDocumentPosition(attribution);

        expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      });
    });
  });

  it('splits animated quotes into words inside the blockquote', () => {
    const { element } = buildQuote(true);
    const blockquote = getBlockquote(element);

    expect(
      blockquote.querySelectorAll('.quote-text-split-word').length,
    ).toBeGreaterThan(0);
  });
});
