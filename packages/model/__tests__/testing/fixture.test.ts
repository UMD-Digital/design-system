import {
  createFixture,
  createFixtureSync,
  cleanupFixtures,
} from '../../source/testing/fixture';

afterEach(() => {
  cleanupFixtures();
});

describe('createFixtureSync', () => {
  it('creates element from HTML and appends to document.body', () => {
    const el = createFixtureSync('<div id="test-el"></div>');
    expect(el).toBeInstanceOf(HTMLDivElement);
    expect(el.id).toBe('test-el');
    expect(document.body.contains(el)).toBe(true);
  });

  it('applies options.attributes', () => {
    const el = createFixtureSync('<div></div>', {
      attributes: { 'data-theme': 'dark', role: 'banner' },
    });
    expect(el.getAttribute('data-theme')).toBe('dark');
    expect(el.getAttribute('role')).toBe('banner');
  });

  it('appends to custom options.container', () => {
    const container = document.createElement('section');
    document.body.appendChild(container);

    const el = createFixtureSync('<p>hello</p>', { container });
    expect(container.contains(el)).toBe(true);
    expect(el.parentElement).toBe(container);

    container.remove();
  });

  it('throws on empty HTML string', () => {
    expect(() => createFixtureSync('')).toThrow('must not be empty');
    expect(() => createFixtureSync('   ')).toThrow('must not be empty');
  });

  it('throws on HTML that produces no element', () => {
    expect(() => createFixtureSync('<!-- comment only -->')).toThrow(
      'produced no element',
    );
  });

  it('preserves child elements (slot content)', () => {
    const el = createFixtureSync(
      '<div><span slot="headline">Title</span><p>Body</p></div>',
    );
    expect(el.querySelector('span[slot="headline"]')?.textContent).toBe(
      'Title',
    );
    expect(el.querySelector('p')?.textContent).toBe('Body');
  });
});

describe('createFixture', () => {
  it('returns Promise resolving to the element', async () => {
    const el = await createFixture('<div id="async-el"></div>');
    expect(el).toBeInstanceOf(HTMLDivElement);
    expect(el.id).toBe('async-el');
  });

  it('element is in DOM when Promise resolves', async () => {
    const el = await createFixture('<span>content</span>');
    expect(document.body.contains(el)).toBe(true);
  });
});

describe('cleanupFixtures', () => {
  it('removes all tracked fixtures', () => {
    const el1 = createFixtureSync('<div id="f1"></div>');
    const el2 = createFixtureSync('<div id="f2"></div>');
    expect(document.body.contains(el1)).toBe(true);
    expect(document.body.contains(el2)).toBe(true);

    cleanupFixtures();
    expect(document.body.contains(el1)).toBe(false);
    expect(document.body.contains(el2)).toBe(false);
  });

  it('is safe to call with no fixtures', () => {
    expect(() => cleanupFixtures()).not.toThrow();
  });

  it('tracks multiple fixtures independently', () => {
    const el1 = createFixtureSync('<div></div>');
    const el2 = createFixtureSync('<span></span>');
    const el3 = createFixtureSync('<p></p>');

    expect(document.body.querySelectorAll('div, span, p').length).toBeGreaterThanOrEqual(3);

    cleanupFixtures();
    expect(document.body.contains(el1)).toBe(false);
    expect(document.body.contains(el2)).toBe(false);
    expect(document.body.contains(el3)).toBe(false);
  });
});
