import {
  isElement,
  isHTMLElement,
  isCustomElement,
  isShadowRoot,
  isSlotElement,
  isTemplateElement,
  assertElement,
  assertHTMLElement,
  assertShadowRoot,
} from '../../source/utilities/types';

describe('isElement', () => {
  it('returns true for an HTMLElement', () => {
    expect(isElement(document.createElement('div'))).toBe(true);
  });

  it('returns true for an SVGElement', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    expect(isElement(svg)).toBe(true);
  });

  it('returns false for a text node', () => {
    expect(isElement(document.createTextNode('hi'))).toBe(false);
  });

  it('returns false for null', () => {
    expect(isElement(null)).toBe(false);
  });

  it('returns false for a plain object', () => {
    expect(isElement({ tagName: 'DIV' })).toBe(false);
  });
});

describe('isHTMLElement', () => {
  it('returns true for a div', () => {
    expect(isHTMLElement(document.createElement('div'))).toBe(true);
  });

  it('returns true for a button', () => {
    expect(isHTMLElement(document.createElement('button'))).toBe(true);
  });

  it('returns false for an SVGElement', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    expect(isHTMLElement(svg)).toBe(false);
  });

  it('returns false for a string', () => {
    expect(isHTMLElement('<div>')).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isHTMLElement(undefined)).toBe(false);
  });
});

describe('isCustomElement', () => {
  it('returns false when element is not registered', () => {
    const el = document.createElement('div');
    expect(isCustomElement(el)).toBe(false);
  });

  it('returns true when element tag is registered', () => {
    const el = document.createElement('my-component');
    (customElements.get as jest.Mock).mockReturnValueOnce(class {});
    expect(isCustomElement(el)).toBe(true);
  });

  it('checks lowercase tag name', () => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'tagName', { value: 'MY-ELEMENT' });
    (customElements.get as jest.Mock).mockReturnValueOnce(class {});
    isCustomElement(el);
    expect(customElements.get).toHaveBeenCalledWith('my-element');
  });

  it('returns false for standard HTML elements', () => {
    const el = document.createElement('span');
    expect(isCustomElement(el)).toBe(false);
  });
});

describe('isShadowRoot', () => {
  it('returns true for a shadow root', () => {
    const host = document.createElement('div');
    const shadow = host.attachShadow({ mode: 'open' });
    expect(isShadowRoot(shadow)).toBe(true);
  });

  it('returns false for a regular element', () => {
    expect(isShadowRoot(document.createElement('div'))).toBe(false);
  });

  it('returns false for null', () => {
    expect(isShadowRoot(null)).toBe(false);
  });

  it('returns false for a document fragment', () => {
    expect(isShadowRoot(document.createDocumentFragment())).toBe(false);
  });
});

describe('isSlotElement', () => {
  it('returns true for a slot element', () => {
    expect(isSlotElement(document.createElement('slot'))).toBe(true);
  });

  it('returns false for a div', () => {
    expect(isSlotElement(document.createElement('div'))).toBe(false);
  });

  it('returns false for null', () => {
    expect(isSlotElement(null)).toBe(false);
  });

  it('returns false for a string', () => {
    expect(isSlotElement('slot')).toBe(false);
  });
});

describe('isTemplateElement', () => {
  it('returns true for a template element', () => {
    expect(isTemplateElement(document.createElement('template'))).toBe(true);
  });

  it('returns false for a div', () => {
    expect(isTemplateElement(document.createElement('div'))).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isTemplateElement(undefined)).toBe(false);
  });

  it('returns false for a number', () => {
    expect(isTemplateElement(42)).toBe(false);
  });
});

describe('assertElement', () => {
  it('does not throw for a valid Element', () => {
    expect(() => assertElement(document.createElement('div'))).not.toThrow();
  });

  it('throws TypeError for null', () => {
    expect(() => assertElement(null)).toThrow(TypeError);
  });

  it('includes default message with typeof', () => {
    expect(() => assertElement(42)).toThrow('Expected Element, got number');
  });

  it('uses custom message when provided', () => {
    expect(() => assertElement(null, 'must be element')).toThrow(
      'must be element',
    );
  });

  it('does not throw for SVGElement', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    expect(() => assertElement(svg)).not.toThrow();
  });
});

describe('assertHTMLElement', () => {
  it('does not throw for a valid HTMLElement', () => {
    expect(() =>
      assertHTMLElement(document.createElement('div')),
    ).not.toThrow();
  });

  it('throws TypeError for a string', () => {
    expect(() => assertHTMLElement('div')).toThrow(TypeError);
  });

  it('includes default message with typeof', () => {
    expect(() => assertHTMLElement(true)).toThrow(
      'Expected HTMLElement, got boolean',
    );
  });

  it('throws for SVGElement (not HTMLElement)', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    expect(() => assertHTMLElement(svg)).toThrow(TypeError);
  });

  it('uses custom message when provided', () => {
    expect(() => assertHTMLElement(null, 'need HTML')).toThrow('need HTML');
  });
});

describe('assertShadowRoot', () => {
  it('does not throw for a valid ShadowRoot', () => {
    const host = document.createElement('div');
    const shadow = host.attachShadow({ mode: 'open' });
    expect(() => assertShadowRoot(shadow)).not.toThrow();
  });

  it('throws TypeError for a regular element', () => {
    expect(() => assertShadowRoot(document.createElement('div'))).toThrow(
      TypeError,
    );
  });

  it('includes default message with typeof', () => {
    expect(() => assertShadowRoot('shadow')).toThrow(
      'Expected ShadowRoot, got string',
    );
  });

  it('uses custom message when provided', () => {
    expect(() => assertShadowRoot(null, 'shadow required')).toThrow(
      'shadow required',
    );
  });
});
