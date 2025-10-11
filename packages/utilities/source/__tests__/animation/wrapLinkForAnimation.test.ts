import { wrapLinkForAnimation } from '../../animation/wrapLinkForAnimation';

describe('wrapLinkForAnimation', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('happy path', () => {
    it('should wrap link content in span when not already wrapped', () => {
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = 'Click me';
      element.appendChild(link);

      wrapLinkForAnimation({ element });

      const span = link.querySelector('span');
      expect(span).not.toBeNull();
      expect(span?.textContent).toBe('Click me');
    });

    it('should work when element is the link itself', () => {
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = 'Click me';

      wrapLinkForAnimation({ element: link });

      const span = link.querySelector('span');
      expect(span).not.toBeNull();
      expect(span?.textContent).toBe('Click me');
    });

    it('should preserve link innerHTML in span', () => {
      const link = document.createElement('a');
      link.href = '#';
      link.innerHTML = '<strong>Bold</strong> text';
      element.appendChild(link);

      wrapLinkForAnimation({ element });

      const span = link.querySelector('span');
      expect(span).not.toBeNull();
      expect(span?.innerHTML).toBe('<strong>Bold</strong> text');
    });

    it('should preserve existing attributes on link', () => {
      const link = document.createElement('a');
      link.href = '#test';
      link.setAttribute('data-id', '123');
      link.textContent = 'Click me';
      element.appendChild(link);

      wrapLinkForAnimation({ element });

      expect(link.href).toContain('#test');
      expect(link.getAttribute('data-id')).toBe('123');
    });
  });

  describe('edge cases', () => {
    it('should not wrap when span already exists', () => {
      const link = document.createElement('a');
      link.href = '#';
      const existingSpan = document.createElement('span');
      existingSpan.textContent = 'Click me';
      link.appendChild(existingSpan);
      element.appendChild(link);

      wrapLinkForAnimation({ element });

      const spans = link.querySelectorAll('span');
      expect(spans.length).toBe(1);
      expect(spans[0]).toBe(existingSpan);
    });

    it('should return early if element contains slot', () => {
      const slot = document.createElement('slot');
      element.appendChild(slot);

      const link = document.createElement('a');
      link.href = '#';
      link.textContent = 'Click me';
      element.appendChild(link);

      wrapLinkForAnimation({ element });

      const span = link.querySelector('span');
      expect(span).toBeNull();
    });

    it('should return early if element is a slot', () => {
      const slot = document.createElement('slot') as any;

      wrapLinkForAnimation({ element: slot });

      // Should not throw or do anything
      expect(slot.querySelector).toBeDefined();
    });

    it('should return early if no link found', () => {
      const div = document.createElement('div');
      div.textContent = 'No link here';
      element.appendChild(div);

      expect(() => wrapLinkForAnimation({ element })).not.toThrow();
    });

    it('should handle empty link', () => {
      const link = document.createElement('a');
      link.href = '#';
      element.appendChild(link);

      wrapLinkForAnimation({ element });

      const span = link.querySelector('span');
      expect(span).not.toBeNull();
      expect(span?.textContent).toBe('');
    });

    it('should handle link with only whitespace', () => {
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = '   ';
      element.appendChild(link);

      wrapLinkForAnimation({ element });

      const span = link.querySelector('span');
      expect(span).not.toBeNull();
      expect(span?.textContent).toBe('   ');
    });

    it('should handle nested elements in link', () => {
      const link = document.createElement('a');
      link.href = '#';
      link.innerHTML = '<em>Italic</em> and <strong>Bold</strong>';
      element.appendChild(link);

      wrapLinkForAnimation({ element });

      const span = link.querySelector('span');
      expect(span).not.toBeNull();
      expect(span?.querySelector('em')).not.toBeNull();
      expect(span?.querySelector('strong')).not.toBeNull();
    });

    it('should handle multiple links in container', () => {
      const link1 = document.createElement('a');
      link1.href = '#1';
      link1.textContent = 'Link 1';
      element.appendChild(link1);

      const link2 = document.createElement('a');
      link2.href = '#2';
      link2.textContent = 'Link 2';
      element.appendChild(link2);

      wrapLinkForAnimation({ element });

      // Only the first link should be processed
      const span1 = link1.querySelector('span');
      expect(span1).not.toBeNull();

      const span2 = link2.querySelector('span');
      expect(span2).toBeNull();
    });
  });

  describe('error conditions', () => {
    it('should handle null element', () => {
      expect(() => wrapLinkForAnimation({ element: null as any })).toThrow();
    });

    it('should handle undefined element', () => {
      expect(() => wrapLinkForAnimation({ element: undefined as any })).toThrow();
    });

    it('should handle element not in DOM', () => {
      const detachedDiv = document.createElement('div');
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = 'Click me';
      detachedDiv.appendChild(link);

      expect(() => wrapLinkForAnimation({ element: detachedDiv })).not.toThrow();
    });
  });
});
