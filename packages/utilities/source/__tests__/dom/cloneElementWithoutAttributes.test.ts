import { cloneElementWithoutAttributes } from '../../dom/cloneElementWithoutAttributes';

describe('cloneElementWithoutAttributes', () => {
  describe('happy path', () => {
    it('should preserve href attribute', () => {
      const link = document.createElement('a');
      link.href = 'https://example.com';
      link.className = 'link-class';
      link.id = 'link-id';

      const result = cloneElementWithoutAttributes({ element: link });

      expect(result.getAttribute('href')).toBe('https://example.com');
      expect(result.getAttribute('class')).toBeNull();
      expect(result.getAttribute('id')).toBeNull();
    });

    it('should remove all attributes except href', () => {
      const element = document.createElement('div');
      element.className = 'test-class';
      element.id = 'test-id';
      element.setAttribute('data-test', 'value');
      element.setAttribute('aria-label', 'label');

      const result = cloneElementWithoutAttributes({ element });

      expect(result.getAttribute('class')).toBeNull();
      expect(result.getAttribute('id')).toBeNull();
      expect(result.getAttribute('data-test')).toBeNull();
      expect(result.getAttribute('aria-label')).toBeNull();
    });

    it('should clone the element (not modify original)', () => {
      const element = document.createElement('div');
      element.className = 'test-class';
      element.id = 'test-id';

      const result = cloneElementWithoutAttributes({ element });

      expect(result).not.toBe(element);
      expect(element.className).toBe('test-class');
      expect(element.id).toBe('test-id');
    });

    it('should deep clone element with children', () => {
      const parent = document.createElement('div');
      parent.className = 'parent';
      const child = document.createElement('span');
      child.className = 'child';
      child.textContent = 'Child text';
      parent.appendChild(child);

      const result = cloneElementWithoutAttributes({ element: parent });

      expect(result.children.length).toBe(1);
      expect(result.querySelector('span')).not.toBeNull();
      expect(result.textContent).toBe('Child text');
      expect(result.getAttribute('class')).toBeNull();
    });

    it('should preserve href on anchor elements', () => {
      const anchor = document.createElement('a');
      anchor.href = 'https://example.com/page';
      anchor.target = '_blank';
      anchor.rel = 'noopener';

      const result = cloneElementWithoutAttributes({ element: anchor });

      expect(result.getAttribute('href')).toBe('https://example.com/page');
      expect(result.getAttribute('target')).toBeNull();
      expect(result.getAttribute('rel')).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('should handle element with no attributes', () => {
      const element = document.createElement('div');

      const result = cloneElementWithoutAttributes({ element });

      expect(result.attributes.length).toBe(0);
      expect(result).not.toBe(element);
    });

    it('should handle element with only href attribute', () => {
      const link = document.createElement('a');
      link.href = 'https://example.com';

      const result = cloneElementWithoutAttributes({ element: link });

      expect(result.attributes.length).toBe(1);
      expect(result.getAttribute('href')).toBe('https://example.com');
    });

    it('should handle element without href attribute', () => {
      const div = document.createElement('div');
      div.className = 'test';

      const result = cloneElementWithoutAttributes({ element: div });

      expect(result.attributes.length).toBe(0);
      expect(result.getAttribute('class')).toBeNull();
    });

    it('should handle empty href attribute', () => {
      const link = document.createElement('a');
      link.href = '';
      link.className = 'link';

      const result = cloneElementWithoutAttributes({ element: link });

      expect(result.getAttribute('href')).toBe('');
      expect(result.getAttribute('class')).toBeNull();
    });

    it('should handle multiple custom data attributes', () => {
      const element = document.createElement('div');
      element.setAttribute('data-id', '123');
      element.setAttribute('data-name', 'test');
      element.setAttribute('data-value', 'value');

      const result = cloneElementWithoutAttributes({ element });

      expect(result.getAttribute('data-id')).toBeNull();
      expect(result.getAttribute('data-name')).toBeNull();
      expect(result.getAttribute('data-value')).toBeNull();
    });

    it('should handle style attribute removal', () => {
      const element = document.createElement('div');
      element.style.color = 'red';
      element.style.fontSize = '16px';

      const result = cloneElementWithoutAttributes({ element });

      expect(result.getAttribute('style')).toBeNull();
    });

    it('should handle nested elements with attributes', () => {
      const parent = document.createElement('div');
      parent.id = 'parent';
      const child = document.createElement('a');
      child.href = 'https://example.com';
      child.className = 'child-link';
      parent.appendChild(child);

      const result = cloneElementWithoutAttributes({ element: parent });

      expect(result.getAttribute('id')).toBeNull();
      // Note: cloneElementWithoutAttributes only cleans the top-level element, not children
      const childLink = result.querySelector('a');
      expect(childLink?.getAttribute('href')).toBe('https://example.com');
      expect(childLink?.getAttribute('class')).toBe('child-link');
    });

    it('should handle boolean attributes', () => {
      const button = document.createElement('button');
      button.disabled = true;
      button.setAttribute('aria-pressed', 'true');

      const result = cloneElementWithoutAttributes({ element: button });

      expect(result.hasAttribute('disabled')).toBe(false);
      expect(result.hasAttribute('aria-pressed')).toBe(false);
    });

    it('should handle elements with event listeners', () => {
      const button = document.createElement('button');
      button.onclick = () => console.log('clicked');
      button.className = 'btn';

      const result = cloneElementWithoutAttributes({ element: button });

      // Event listeners are not cloned with cloneNode(true) by default
      expect(result.onclick).toBeNull();
      expect(result.getAttribute('class')).toBeNull();
    });

    it('should handle special character in href', () => {
      const link = document.createElement('a');
      link.href = 'https://example.com/path?query=value&other=123#hash';
      link.className = 'link';

      const result = cloneElementWithoutAttributes({ element: link });

      expect(result.getAttribute('href')).toContain('query=value');
      expect(result.getAttribute('class')).toBeNull();
    });
  });

  describe('different element types', () => {
    it('should work with div elements', () => {
      const div = document.createElement('div');
      div.className = 'container';
      div.textContent = 'Content';

      const result = cloneElementWithoutAttributes({ element: div });

      expect(result.tagName).toBe('DIV');
      expect(result.textContent).toBe('Content');
      expect(result.getAttribute('class')).toBeNull();
    });

    it('should work with button elements', () => {
      const button = document.createElement('button');
      button.type = 'submit';
      button.name = 'submit-btn';

      const result = cloneElementWithoutAttributes({ element: button });

      expect(result.tagName).toBe('BUTTON');
      expect(result.getAttribute('type')).toBeNull();
      expect(result.getAttribute('name')).toBeNull();
    });

    it('should work with input elements', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.name = 'username';
      input.value = 'test';

      const result = cloneElementWithoutAttributes({ element: input });

      expect(result.tagName).toBe('INPUT');
      expect(result.getAttribute('type')).toBeNull();
      expect(result.getAttribute('name')).toBeNull();
    });

    it('should work with span elements', () => {
      const span = document.createElement('span');
      span.className = 'highlight';
      span.textContent = 'Text';

      const result = cloneElementWithoutAttributes({ element: span });

      expect(result.tagName).toBe('SPAN');
      expect(result.textContent).toBe('Text');
      expect(result.getAttribute('class')).toBeNull();
    });
  });

  describe('error conditions', () => {
    it('should handle null element', () => {
      expect(() => cloneElementWithoutAttributes({ element: null as any })).toThrow();
    });

    it('should handle undefined element', () => {
      expect(() => cloneElementWithoutAttributes({ element: undefined as any })).toThrow();
    });
  });

  describe('clone verification', () => {
    it('should create a completely separate clone', () => {
      const element = document.createElement('div');
      element.className = 'original';
      element.textContent = 'Original text';

      const result = cloneElementWithoutAttributes({ element });

      result.textContent = 'Modified text';
      element.className = 'changed';

      expect(element.className).toBe('changed');
      expect(element.textContent).toBe('Original text');
      expect(result.textContent).toBe('Modified text');
      expect(result.getAttribute('class')).toBeNull();
    });

    it('should not share child references', () => {
      const parent = document.createElement('div');
      const child = document.createElement('span');
      child.textContent = 'Child';
      parent.appendChild(child);

      const result = cloneElementWithoutAttributes({ element: parent });

      const originalChild = parent.querySelector('span');
      const clonedChild = result.querySelector('span');

      expect(originalChild).not.toBe(clonedChild);
      expect(clonedChild?.textContent).toBe('Child');
    });
  });
});
