import { wrapTextNodeInSpan } from '../../dom/wrapTextNodeInSpan';

describe('wrapTextNodeInSpan', () => {
  describe('happy path', () => {
    it('should wrap text nodes in button', () => {
      const button = document.createElement('button');
      button.textContent = 'Click me';

      const result = wrapTextNodeInSpan(button);

      const span = button.querySelector('span');
      expect(span).not.toBeNull();
      expect(span?.textContent).toBe('Click me');
      expect(result).toBe(button);
    });

    it('should wrap text nodes in anchor', () => {
      const anchor = document.createElement('a');
      anchor.href = '#';
      anchor.textContent = 'Link text';

      const result = wrapTextNodeInSpan(anchor);

      const span = anchor.querySelector('span');
      expect(span).not.toBeNull();
      expect(span?.textContent).toBe('Link text');
      expect(result).toBe(anchor);
    });

    it('should find and wrap button in container', () => {
      const container = document.createElement('div');
      const button = document.createElement('button');
      button.textContent = 'Button text';
      container.appendChild(button);

      const result = wrapTextNodeInSpan(container);

      const span = button.querySelector('span');
      expect(span).not.toBeNull();
      expect(span?.textContent).toBe('Button text');
      expect(result).toBe(button);
    });

    it('should find and wrap anchor in container', () => {
      const container = document.createElement('div');
      const anchor = document.createElement('a');
      anchor.href = '#';
      anchor.textContent = 'Link text';
      container.appendChild(anchor);

      const result = wrapTextNodeInSpan(container);

      const span = anchor.querySelector('span');
      expect(span).not.toBeNull();
      expect(span?.textContent).toBe('Link text');
      expect(result).toBe(anchor);
    });

    it('should trim whitespace in text nodes', () => {
      const button = document.createElement('button');
      button.textContent = '  Button text  ';

      wrapTextNodeInSpan(button);

      const span = button.querySelector('span');
      expect(span?.textContent).toBe('Button text');
    });

    it('should wrap multiple text nodes separately', () => {
      const button = document.createElement('button');
      const textNode1 = document.createTextNode('First');
      const textNode2 = document.createTextNode('Second');
      button.appendChild(textNode1);
      button.appendChild(textNode2);

      wrapTextNodeInSpan(button);

      const spans = button.querySelectorAll('span');
      expect(spans.length).toBe(2);
      expect(spans[0].textContent).toBe('First');
      expect(spans[1].textContent).toBe('Second');
    });
  });

  describe('edge cases', () => {
    it('should return undefined if no link or button found in container', () => {
      const container = document.createElement('div');
      const div = document.createElement('div');
      div.textContent = 'No link or button';
      container.appendChild(div);

      const result = wrapTextNodeInSpan(container);

      expect(result).toBeUndefined();
    });

    it('should handle empty button', () => {
      const button = document.createElement('button');

      const result = wrapTextNodeInSpan(button);

      expect(result).toBe(button);
      expect(button.children.length).toBe(0);
    });

    it('should handle button with only element children', () => {
      const button = document.createElement('button');
      const icon = document.createElement('i');
      icon.className = 'icon';
      button.appendChild(icon);

      wrapTextNodeInSpan(button);

      expect(button.querySelector('i')).not.toBeNull();
      expect(button.querySelectorAll('span').length).toBe(0);
    });

    it('should handle mixed content (text + elements)', () => {
      const button = document.createElement('button');
      const textNode = document.createTextNode('Text');
      const icon = document.createElement('i');
      button.appendChild(textNode);
      button.appendChild(icon);

      wrapTextNodeInSpan(button);

      const spans = button.querySelectorAll('span');
      expect(spans.length).toBe(1);
      expect(spans[0].textContent).toBe('Text');
      expect(button.querySelector('i')).not.toBeNull();
    });

    it('should handle whitespace-only text nodes', () => {
      const button = document.createElement('button');
      button.textContent = '   ';

      wrapTextNodeInSpan(button);

      const span = button.querySelector('span');
      expect(span?.textContent).toBe('');
    });

    it('should handle newlines and tabs', () => {
      const button = document.createElement('button');
      button.textContent = '\n\tButton\n\t';

      wrapTextNodeInSpan(button);

      const span = button.querySelector('span');
      expect(span?.textContent).toBe('Button');
    });

    it('should prefer button over anchor in container', () => {
      const container = document.createElement('div');
      const anchor = document.createElement('a');
      anchor.href = '#';
      anchor.textContent = 'Link';
      const button = document.createElement('button');
      button.textContent = 'Button';

      container.appendChild(anchor);
      container.appendChild(button);

      const result = wrapTextNodeInSpan(container);

      // querySelector('a, button') returns first match (anchor)
      expect(result).toBe(anchor);
    });

    it('should handle nested elements in text nodes', () => {
      const button = document.createElement('button');
      const textNode1 = document.createTextNode('Before ');
      const bold = document.createElement('strong');
      bold.textContent = 'bold';
      const textNode2 = document.createTextNode(' after');

      button.appendChild(textNode1);
      button.appendChild(bold);
      button.appendChild(textNode2);

      wrapTextNodeInSpan(button);

      const spans = button.querySelectorAll('span');
      expect(spans.length).toBe(2);
      expect(button.querySelector('strong')).not.toBeNull();
    });

    it('should handle button with type attribute', () => {
      const button = document.createElement('button');
      button.type = 'submit';
      button.textContent = 'Submit';

      const result = wrapTextNodeInSpan(button);

      expect(result).toBe(button);
      expect(button.type).toBe('submit');
    });

    it('should handle anchor with href attribute', () => {
      const anchor = document.createElement('a');
      anchor.href = 'https://example.com';
      anchor.textContent = 'Link';

      const result = wrapTextNodeInSpan(anchor);

      expect(result).toBe(anchor);
      expect(anchor.href).toContain('example.com');
    });
  });

  describe('error conditions', () => {
    it('should return undefined for null element', () => {
      expect(wrapTextNodeInSpan(null as any)).toBeUndefined();
    });

    it('should return undefined for undefined element', () => {
      expect(wrapTextNodeInSpan(undefined as any)).toBeUndefined();
    });

    it('should handle detached element', () => {
      const button = document.createElement('button');
      button.textContent = 'Button';

      expect(() => wrapTextNodeInSpan(button)).not.toThrow();

      const span = button.querySelector('span');
      expect(span).not.toBeNull();
    });
  });

  describe('return value', () => {
    it('should return the target element', () => {
      const button = document.createElement('button');
      button.textContent = 'Click me';

      const result = wrapTextNodeInSpan(button);

      expect(result).toBe(button);
      expect(result).toBeInstanceOf(HTMLButtonElement);
    });

    it('should return undefined when target not found', () => {
      const div = document.createElement('div');
      div.textContent = 'No button or link';

      const result = wrapTextNodeInSpan(div);

      expect(result).toBeUndefined();
    });

    it('should return the found element from container', () => {
      const container = document.createElement('div');
      const button = document.createElement('button');
      button.textContent = 'Button';
      container.appendChild(button);

      const result = wrapTextNodeInSpan(container);

      expect(result).toBe(button);
      expect(result).not.toBe(container);
    });
  });
});