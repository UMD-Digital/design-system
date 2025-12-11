import { getLinkFromSlot } from '../../source/dom/getLinkFromSlot';

describe('getLinkFromSlot', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('returns null when slot is null', () => {
    const result = getLinkFromSlot(null);
    expect(result).toBeNull();
  });

  it('returns null when slot contains no links', () => {
    const slot = document.createElement('div');
    slot.setAttribute('slot', 'actions');
    slot.innerHTML = '<p>No links here</p>';
    container.appendChild(slot);

    const result = getLinkFromSlot(slot);
    expect(result).toBeNull();
  });

  it('returns the anchor when slot itself is an anchor element', () => {
    const anchor = document.createElement('a');
    anchor.setAttribute('slot', 'actions');
    anchor.href = '/test';
    anchor.textContent = 'Test Link';
    container.appendChild(anchor);

    const result = getLinkFromSlot(anchor);
    expect(result).toBe(anchor);
    expect(result?.href).toContain('/test');
  });

  it('returns the first anchor when slot contains a single link', () => {
    const slot = document.createElement('div');
    slot.setAttribute('slot', 'actions');
    const anchor = document.createElement('a');
    anchor.href = '/single';
    anchor.textContent = 'Single Link';
    slot.appendChild(anchor);
    container.appendChild(slot);

    const result = getLinkFromSlot(slot);
    expect(result).toBe(slot);
    expect(result?.querySelector('a')?.href).toContain('/single');
  });

  it('returns the first anchor when slot contains nested single link', () => {
    const slot = document.createElement('div');
    slot.setAttribute('slot', 'actions');
    const wrapper = document.createElement('div');
    const anchor = document.createElement('a');
    anchor.href = '/nested';
    anchor.textContent = 'Nested Link';
    wrapper.appendChild(anchor);
    slot.appendChild(wrapper);
    container.appendChild(slot);

    const result = getLinkFromSlot(slot);
    expect(result).toBe(slot);
    expect(result?.querySelector('a')?.href).toContain('/nested');
  });

  it('warns and removes parent elements of additional links when multiple links exist', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

    const slot = document.createElement('div');
    slot.setAttribute('slot', 'actions');

    const wrapper1 = document.createElement('div');
    const anchor1 = document.createElement('a');
    anchor1.href = '/first';
    anchor1.textContent = 'First Link';
    wrapper1.appendChild(anchor1);

    const wrapper2 = document.createElement('div');
    const anchor2 = document.createElement('a');
    anchor2.href = '/second';
    anchor2.textContent = 'Second Link';
    wrapper2.appendChild(anchor2);

    const wrapper3 = document.createElement('div');
    const anchor3 = document.createElement('a');
    anchor3.href = '/third';
    anchor3.textContent = 'Third Link';
    wrapper3.appendChild(anchor3);

    slot.appendChild(wrapper1);
    slot.appendChild(wrapper2);
    slot.appendChild(wrapper3);
    container.appendChild(slot);

    const result = getLinkFromSlot(slot);

    expect(result).toBe(slot);
    expect(result?.querySelector('a')?.href).toContain('/first');

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Multiple links found in slot. Using the first link and removing parent elements of additional links.',
    );

    expect(slot.children.length).toBe(1);
    expect(slot.children[0]).toBe(wrapper1);

    expect(slot.contains(wrapper2)).toBe(false);
    expect(slot.contains(wrapper3)).toBe(false);

    consoleWarnSpy.mockRestore();
  });

  it('handles multiple links at the same level without wrappers', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

    const slot = document.createElement('div');
    slot.setAttribute('slot', 'actions');

    const anchor1 = document.createElement('a');
    anchor1.href = '/first';
    anchor1.textContent = 'First';

    const anchor2 = document.createElement('a');
    anchor2.href = '/second';
    anchor2.textContent = 'Second';

    slot.appendChild(anchor1);
    slot.appendChild(anchor2);
    container.appendChild(slot);

    const result = getLinkFromSlot(slot);

    expect(result).toBe(slot);
    expect(consoleWarnSpy).toHaveBeenCalled();
    expect(slot.contains(anchor2)).toBe(false);

    consoleWarnSpy.mockRestore();
  });

  it('preserves other non-link content when removing extra links', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

    const slot = document.createElement('div');
    slot.setAttribute('slot', 'actions');

    const anchor1 = document.createElement('a');
    anchor1.href = '/first';
    anchor1.textContent = 'First';
    slot.appendChild(anchor1);

    const paragraph = document.createElement('p');
    paragraph.textContent = 'Some text';
    slot.appendChild(paragraph);

    const anchor2 = document.createElement('a');
    anchor2.href = '/second';
    anchor2.textContent = 'Second';
    slot.appendChild(anchor2);

    container.appendChild(slot);

    const result = getLinkFromSlot(slot);

    expect(result).toBe(slot);
    expect(slot.contains(paragraph)).toBe(true);
    expect(slot.contains(anchor2)).toBe(false);

    consoleWarnSpy.mockRestore();
  });

  it('handles deeply nested multiple links', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

    const slot = document.createElement('div');
    slot.setAttribute('slot', 'actions');

    const wrapper1 = document.createElement('div');
    const inner1 = document.createElement('span');
    const anchor1 = document.createElement('a');
    anchor1.href = '/first';
    inner1.appendChild(anchor1);
    wrapper1.appendChild(inner1);

    const wrapper2 = document.createElement('div');
    const inner2 = document.createElement('span');
    const anchor2 = document.createElement('a');
    anchor2.href = '/second';
    inner2.appendChild(anchor2);
    wrapper2.appendChild(inner2);

    slot.appendChild(wrapper1);
    slot.appendChild(wrapper2);
    container.appendChild(slot);

    const result = getLinkFromSlot(slot);

    expect(result).toBe(slot);
    expect(slot.contains(wrapper1)).toBe(true);
    expect(slot.contains(wrapper2)).toBe(false);

    consoleWarnSpy.mockRestore();
  });
});
