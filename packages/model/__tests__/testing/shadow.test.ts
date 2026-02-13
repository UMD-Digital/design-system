import {
  queryShadow,
  queryShadowAll,
  getShadowStyles,
  getShadowHTML,
} from '../../source/testing/shadow';

function createHostWithShadow(shadowHTML: string): HTMLElement {
  const host = document.createElement('div');
  const shadow = host.attachShadow({ mode: 'open' });
  shadow.innerHTML = shadowHTML;
  return host;
}

describe('queryShadow', () => {
  it('returns matching element in shadow root', () => {
    const host = createHostWithShadow('<span class="inner">text</span>');
    const result = queryShadow(host, '.inner');
    expect(result).toBeInstanceOf(HTMLSpanElement);
    expect(result?.textContent).toBe('text');
  });

  it('returns null on no match', () => {
    const host = createHostWithShadow('<span>text</span>');
    expect(queryShadow(host, '.missing')).toBeNull();
  });

  it('returns null when host has no shadow root', () => {
    const host = document.createElement('div');
    expect(queryShadow(host, 'span')).toBeNull();
  });
});

describe('queryShadowAll', () => {
  it('returns array of matching elements', () => {
    const host = createHostWithShadow(
      '<span class="item">a</span><span class="item">b</span>',
    );
    const results = queryShadowAll(host, '.item');
    expect(results).toHaveLength(2);
    expect(results[0].textContent).toBe('a');
    expect(results[1].textContent).toBe('b');
  });

  it('returns empty array on no match', () => {
    const host = createHostWithShadow('<span>text</span>');
    expect(queryShadowAll(host, '.missing')).toEqual([]);
  });

  it('returns empty array when host has no shadow root', () => {
    const host = document.createElement('div');
    expect(queryShadowAll(host, 'span')).toEqual([]);
  });
});

describe('getShadowStyles', () => {
  it('returns CSS text from style element', () => {
    const host = createHostWithShadow(
      '<style>.test { color: red; }</style><div>content</div>',
    );
    const styles = getShadowStyles(host);
    expect(styles).toContain('.test');
    expect(styles).toContain('color: red');
  });

  it('returns null when no style element', () => {
    const host = createHostWithShadow('<div>content</div>');
    expect(getShadowStyles(host)).toBeNull();
  });

  it('returns null when no shadow root', () => {
    const host = document.createElement('div');
    expect(getShadowStyles(host)).toBeNull();
  });
});

describe('getShadowHTML', () => {
  it('returns HTML without style elements', () => {
    const host = createHostWithShadow(
      '<style>.test { color: red; }</style><div class="content">hello</div>',
    );
    const html = getShadowHTML(host);
    expect(html).toContain('class="content"');
    expect(html).toContain('hello');
    expect(html).not.toContain('<style>');
  });

  it('returns null for empty shadow root', () => {
    const host = createHostWithShadow('');
    expect(getShadowHTML(host)).toBeNull();
  });

  it('returns null when shadow root has only styles', () => {
    const host = createHostWithShadow('<style>.x { color: blue; }</style>');
    expect(getShadowHTML(host)).toBeNull();
  });

  it('returns null when no shadow root', () => {
    const host = document.createElement('div');
    expect(getShadowHTML(host)).toBeNull();
  });
});
