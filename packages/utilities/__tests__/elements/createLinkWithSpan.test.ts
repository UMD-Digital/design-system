import { createLinkWithSpan } from '../../source/elements/createLinkWithSpan';

describe('createLinkWithSpan', () => {
  describe('happy path', () => {
    it('should create an anchor element', () => {
      const link = createLinkWithSpan('https://example.com', 'Example');
      expect(link.tagName).toBe('A');
    });

    it('should set href attribute', () => {
      const link = createLinkWithSpan('https://example.com', 'Example');
      expect(link.getAttribute('href')).toBe('https://example.com');
    });

    it('should set target to _blank', () => {
      const link = createLinkWithSpan('https://example.com', 'Example');
      expect(link.getAttribute('target')).toBe('_blank');
    });

    it('should set rel to noopener noreferrer for security', () => {
      const link = createLinkWithSpan('https://example.com', 'Example');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('should wrap title text in span element', () => {
      const link = createLinkWithSpan('https://example.com', 'Example Title');
      const span = link.querySelector('span');

      expect(span).not.toBeNull();
      expect(span?.textContent).toBe('Example Title');
    });

    it('should set aria-label when provided', () => {
      const link = createLinkWithSpan(
        'https://example.com',
        'Example',
        'Opens in new window'
      );
      expect(link.getAttribute('aria-label')).toBe('Opens in new window');
    });

    it('should not set aria-label when not provided', () => {
      const link = createLinkWithSpan('https://example.com', 'Example');
      expect(link.hasAttribute('aria-label')).toBe(false);
    });

    it('should work with relative URLs', () => {
      const link = createLinkWithSpan('/path/to/page', 'Page');
      expect(link.getAttribute('href')).toBe('/path/to/page');
    });
  });

  describe('edge cases', () => {
    it('should handle empty URL', () => {
      const link = createLinkWithSpan('', 'Empty URL');
      expect(link.getAttribute('href')).toBe('');
    });

    it('should handle empty title', () => {
      const link = createLinkWithSpan('https://example.com', '');
      const span = link.querySelector('span');
      expect(span?.textContent).toBe('');
    });

    it('should set aria-label even when empty string', () => {
      const link = createLinkWithSpan('https://example.com', 'Example', '');
      // Empty string still sets the attribute
      expect(link.hasAttribute('aria-label')).toBe(true);
      expect(link.getAttribute('aria-label')).toBe('');
    });

    it('should handle special characters in title', () => {
      const link = createLinkWithSpan('https://example.com', 'Test & <Special>');
      const span = link.querySelector('span');
      expect(span?.textContent).toBe('Test & <Special>');
    });

    it('should handle unicode in title', () => {
      const link = createLinkWithSpan('https://example.com', 'Über uns');
      const span = link.querySelector('span');
      expect(span?.textContent).toBe('Über uns');
    });

    it('should handle emoji in title', () => {
      const link = createLinkWithSpan('https://example.com', 'Hello 😀');
      const span = link.querySelector('span');
      expect(span?.textContent).toBe('Hello 😀');
    });
  });

  describe('structure', () => {
    it('should have exactly one child element (the span)', () => {
      const link = createLinkWithSpan('https://example.com', 'Example');
      expect(link.children.length).toBe(1);
      expect(link.children[0].tagName).toBe('SPAN');
    });

    it('should not have text nodes as direct children', () => {
      const link = createLinkWithSpan('https://example.com', 'Example');
      const textNodes = Array.from(link.childNodes).filter(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
      );
      expect(textNodes.length).toBe(0);
    });
  });

  describe('integration', () => {
    it('should be appendable to DOM', () => {
      const container = document.createElement('div');
      const link = createLinkWithSpan('https://example.com', 'Example');

      container.appendChild(link);

      expect(container.querySelector('a')).toBe(link);
      expect(container.innerHTML).toContain('https://example.com');
      expect(container.innerHTML).toContain('Example');
    });
  });

  describe('accessibility', () => {
    it('should provide security attributes for external links', () => {
      const link = createLinkWithSpan('https://example.com', 'Example');

      // noopener prevents the new page from accessing window.opener
      // noreferrer prevents sending referrer information
      expect(link.rel).toContain('noopener');
      expect(link.rel).toContain('noreferrer');
    });

    it('should support custom aria-label for context', () => {
      const link = createLinkWithSpan(
        'https://docs.example.com/api',
        'API Documentation',
        'View API Documentation - Opens in new window'
      );

      expect(link.getAttribute('aria-label')).toBe(
        'View API Documentation - Opens in new window'
      );
    });
  });
});