import { createCompositeFooterLinkColumns as createLinkColumns } from '../../../source/composite/footer/elements/main-section/row-links/link-columns';
import '../test-helpers/setup';

jest.mock('@universityofmaryland/web-utilities-library/animation', () => ({
  wrapLinkForAnimation: jest.fn(),
}));

const createSlot = (headline: string | null, links: string[]) => {
  const slot = document.createElement('div') as unknown as HTMLSlotElement;

  if (headline !== null) {
    slot.setAttribute('data-headline', headline);
  }

  links.forEach((title) => {
    const link = document.createElement('a');

    link.href = 'https://example.com';
    link.textContent = title;
    slot.appendChild(link);
  });

  return slot;
};

const getHeadlines = (element: HTMLElement | DocumentFragment) =>
  Array.from(element.querySelectorAll('.link-column-headline'));

describe('Composite Footer Link Columns — section headings', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('renders default section labels as h2 headings', () => {
    const { element } = createLinkColumns({});
    const headings = Array.from(element.querySelectorAll('h2'));

    expect(headings.map((heading) => heading.textContent)).toEqual([
      'Information for',
      'Academics',
    ]);
    headings.forEach((heading) => {
      expect(heading.classList.contains('link-column-headline')).toBe(true);
    });
  });

  it('renders no default section labels as paragraphs', () => {
    const { element } = createLinkColumns({});
    const paragraphHeadlines = getHeadlines(element).filter(
      (headline) => headline.tagName === 'P',
    );

    expect(paragraphHeadlines).toHaveLength(0);
  });

  it('renders custom column headlines as h2 headings', () => {
    const { element } = createLinkColumns({
      slotColumns: [
        createSlot('Resources', ['One']),
        createSlot('Campus', ['Two']),
      ],
    });
    const headings = Array.from(element.querySelectorAll('h2'));

    expect(headings.map((heading) => heading.textContent)).toEqual([
      'Resources',
      'Campus',
    ]);
  });

  it('keeps empty custom headlines out of the heading outline', () => {
    const { element } = createLinkColumns({
      slotColumns: [createSlot('Resources', ['One']), createSlot('', ['Two'])],
    });
    const headlines = getHeadlines(element);
    const spacer = headlines[1];

    expect(element.querySelectorAll('h2')).toHaveLength(1);
    expect(spacer.tagName).toBe('P');
    expect(spacer.getAttribute('aria-hidden')).toBe('true');
    expect(spacer.getAttribute('data-empty')).toBe('true');
  });

  it('keeps every link in the column', () => {
    const { element } = createLinkColumns({
      slotColumns: [createSlot('Resources', ['One', 'Two'])],
    });

    expect(element.querySelectorAll('a')).toHaveLength(2);
  });
});
