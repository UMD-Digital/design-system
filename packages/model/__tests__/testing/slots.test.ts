import {
  createSlotContent,
  assertSlot,
  isAllowedElement,
  getSlotElements,
} from '../../source/testing/slots';

describe('createSlotContent', () => {
  it('creates element with slot attribute and text', () => {
    const el = createSlotContent('headline', 'Hello');
    expect(el.tagName.toLowerCase()).toBe('span');
    expect(el.getAttribute('slot')).toBe('headline');
    expect(el.textContent).toBe('Hello');
  });

  it('accepts HTMLElement as content', () => {
    const child = document.createElement('strong');
    child.textContent = 'Bold';

    const el = createSlotContent('body', child);
    expect(el.querySelector('strong')?.textContent).toBe('Bold');
  });

  it('defaults to span tag', () => {
    const el = createSlotContent('test', 'content');
    expect(el.tagName.toLowerCase()).toBe('span');
  });

  it('uses custom tag when provided', () => {
    const el = createSlotContent('title', 'Heading', 'h2');
    expect(el.tagName.toLowerCase()).toBe('h2');
    expect(el.getAttribute('slot')).toBe('title');
  });

  it('omits slot attribute for undefined slotName', () => {
    const el = createSlotContent(undefined, 'Default content');
    expect(el.hasAttribute('slot')).toBe(false);
    expect(el.textContent).toBe('Default content');
  });
});

describe('getSlotElements', () => {
  it('returns slotted direct children', () => {
    const host = document.createElement('div');
    host.innerHTML =
      '<span slot="headline">Title</span><p slot="body">Content</p>';

    expect(getSlotElements(host, 'headline')).toHaveLength(1);
    expect(getSlotElements(host, 'body')).toHaveLength(1);
  });

  it('returns only direct children', () => {
    const host = document.createElement('div');
    host.innerHTML =
      '<div slot="wrapper"><span slot="nested">Nested</span></div>';

    expect(getSlotElements(host, 'wrapper')).toHaveLength(1);
    expect(getSlotElements(host, 'nested')).toHaveLength(0);
  });

  it('returns unslotted children for default slot', () => {
    const host = document.createElement('div');
    host.innerHTML =
      '<span slot="named">Named</span><p>Default 1</p><p>Default 2</p>';

    const defaults = getSlotElements(host, 'default');
    expect(defaults).toHaveLength(2);
  });

  it('returns unslotted children when slotName is undefined', () => {
    const host = document.createElement('div');
    host.innerHTML = '<p>A</p><span slot="x">B</span><p>C</p>';

    const defaults = getSlotElements(host);
    expect(defaults).toHaveLength(2);
  });
});

describe('isAllowedElement', () => {
  it('matches exact tag names', () => {
    const el = document.createElement('p');
    expect(isAllowedElement(el, ['p', 'div'])).toBe(true);
    expect(isAllowedElement(el, ['span', 'div'])).toBe(false);
  });

  it('matches h* wildcard pattern', () => {
    expect(isAllowedElement(document.createElement('h1'), ['h*'])).toBe(true);
    expect(isAllowedElement(document.createElement('h3'), ['h*'])).toBe(true);
    expect(isAllowedElement(document.createElement('h6'), ['h*'])).toBe(true);
    expect(isAllowedElement(document.createElement('p'), ['h*'])).toBe(false);
  });

  it('is case-insensitive', () => {
    const el = document.createElement('div');
    expect(isAllowedElement(el, ['DIV'])).toBe(true);
  });
});

describe('assertSlot', () => {
  it('passes when slot exists with content', () => {
    const host = document.createElement('div');
    host.innerHTML = '<span slot="headline">Title</span>';

    expect(() => assertSlot(host, 'headline')).not.toThrow();
  });

  it('throws when expected slot is empty', () => {
    const host = document.createElement('div');

    expect(() => assertSlot(host, 'headline')).toThrow(
      'expected content but found none',
    );
  });

  it('throws when slot should not exist but does', () => {
    const host = document.createElement('div');
    host.innerHTML = '<span slot="extra">Oops</span>';

    expect(() => assertSlot(host, 'extra', { exists: false })).toThrow(
      'expected no content',
    );
  });

  it('validates count', () => {
    const host = document.createElement('div');
    host.innerHTML =
      '<span slot="items">A</span><span slot="items">B</span>';

    expect(() => assertSlot(host, 'items', { count: 2 })).not.toThrow();
    expect(() => assertSlot(host, 'items', { count: 3 })).toThrow(
      'expected 3 element(s) but found 2',
    );
  });

  it('validates allowedElements', () => {
    const host = document.createElement('div');
    host.innerHTML = '<div slot="content">Text</div>';

    expect(() =>
      assertSlot(host, 'content', { allowedElements: ['p', 'span'] }),
    ).toThrow('disallowed element <div>');
  });

  it('supports h* wildcard in allowedElements', () => {
    const host = document.createElement('div');
    host.innerHTML = '<h2 slot="title">Heading</h2>';

    expect(() =>
      assertSlot(host, 'title', { allowedElements: ['h*'] }),
    ).not.toThrow();
  });

  it('handles default slot (unslotted children)', () => {
    const host = document.createElement('div');
    host.innerHTML = '<p>Paragraph</p>';

    expect(() => assertSlot(host, 'default')).not.toThrow();
    expect(() => assertSlot(host, 'default', { count: 1 })).not.toThrow();
  });
});
