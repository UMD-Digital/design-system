import { createTextWithLink } from '../../source/elements/createTextWithLink';

describe('createTextWithLink', () => {
  describe('happy path - default paragraph wrapper', () => {
    it('should create a paragraph element by default', () => {
      const element = createTextWithLink({
        text: 'Read more',
        url: 'https://example.com',
      });

      expect(element?.tagName).toBe('P');
    });

    it('should contain an anchor link', () => {
      const element = createTextWithLink({
        text: 'Read more',
        url: 'https://example.com',
      });

      const link = element?.querySelector('a');
      expect(link).not.toBeNull();
      expect(link?.tagName).toBe('A');
    });

    it('should set link href', () => {
      const element = createTextWithLink({
        text: 'Read more',
        url: 'https://example.com/article',
      });

      const link = element?.querySelector('a');
      expect(link?.getAttribute('href')).toBe('https://example.com/article');
    });

    it('should set link text content by default', () => {
      const element = createTextWithLink({
        text: 'Read the full story',
        url: 'https://example.com',
      });

      const link = element?.querySelector('a');
      expect(link?.textContent).toBe('Read the full story');
    });

    it('should open in new tab by default with security attributes', () => {
      const element = createTextWithLink({
        text: 'Read more',
        url: 'https://example.com',
      });

      const link = element?.querySelector('a');
      expect(link?.getAttribute('target')).toBe('_blank');
      expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  describe('custom container tags', () => {
    it('should create h1 container when specified', () => {
      const element = createTextWithLink({
        text: 'Article Title',
        url: '/articles/123',
        containerTag: 'h1',
      });

      expect(element?.tagName).toBe('H1');
      expect(element?.querySelector('a')).not.toBeNull();
    });

    it('should create h2 container when specified', () => {
      const element = createTextWithLink({
        text: 'Section Title',
        url: '/section',
        containerTag: 'h2',
      });

      expect(element?.tagName).toBe('H2');
    });

    it('should create div container when specified', () => {
      const element = createTextWithLink({
        text: 'Link text',
        url: '/page',
        containerTag: 'div',
      });

      expect(element?.tagName).toBe('DIV');
    });

    it('should create span container when specified', () => {
      const element = createTextWithLink({
        text: 'Inline link',
        url: '/page',
        containerTag: 'span',
      });

      expect(element?.tagName).toBe('SPAN');
    });
  });

  describe('link behavior options', () => {
    it('should not open in new tab when openInNewTab is false', () => {
      const element = createTextWithLink({
        text: 'Internal link',
        url: '/about',
        openInNewTab: false,
      });

      const link = element?.querySelector('a');
      expect(link?.hasAttribute('target')).toBe(false);
      expect(link?.hasAttribute('rel')).toBe(false);
    });

    it('should open in new tab when openInNewTab is true', () => {
      const element = createTextWithLink({
        text: 'External link',
        url: 'https://example.com',
        openInNewTab: true,
      });

      const link = element?.querySelector('a');
      expect(link?.getAttribute('target')).toBe('_blank');
      expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  describe('accessibility', () => {
    it('should set aria-label when provided', () => {
      const element = createTextWithLink({
        text: 'Learn more',
        url: '/about',
        ariaLabel: 'Learn more about our mission and values',
      });

      const link = element?.querySelector('a');
      expect(link?.getAttribute('aria-label')).toBe(
        'Learn more about our mission and values'
      );
    });

    it('should not set aria-label when not provided', () => {
      const element = createTextWithLink({
        text: 'Learn more',
        url: '/about',
      });

      const link = element?.querySelector('a');
      expect(link?.hasAttribute('aria-label')).toBe(false);
    });
  });

  describe('HTML content handling', () => {
    it('should use innerHTML when allowHTML is true', () => {
      const element = createTextWithLink({
        text: '<strong>Bold</strong> text',
        url: '/page',
        allowHTML: true,
      });

      const link = element?.querySelector('a');
      expect(link?.innerHTML).toBe('<strong>Bold</strong> text');
      expect(link?.querySelector('strong')?.textContent).toBe('Bold');
    });

    it('should escape HTML by default', () => {
      const element = createTextWithLink({
        text: '<strong>Bold</strong> text',
        url: '/page',
      });

      const link = element?.querySelector('a');
      expect(link?.textContent).toBe('<strong>Bold</strong> text');
      expect(link?.querySelector('strong')).toBeNull();
    });
  });

  describe('validation', () => {
    it('should return null when text is empty', () => {
      const element = createTextWithLink({
        text: '',
        url: 'https://example.com',
      });

      expect(element).toBeNull();
    });

    it('should return null when url is empty', () => {
      const element = createTextWithLink({
        text: 'Read more',
        url: '',
      });

      expect(element).toBeNull();
    });

    it('should return null when both are empty', () => {
      const element = createTextWithLink({
        text: '',
        url: '',
      });

      expect(element).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('should handle special characters in text', () => {
      const element = createTextWithLink({
        text: 'Test & <Special> "Characters"',
        url: '/page',
      });

      const link = element?.querySelector('a');
      expect(link?.textContent).toBe('Test & <Special> "Characters"');
    });

    it('should handle unicode in text', () => {
      const element = createTextWithLink({
        text: 'Über uns',
        url: '/about',
      });

      const link = element?.querySelector('a');
      expect(link?.textContent).toBe('Über uns');
    });

    it('should handle emoji in text', () => {
      const element = createTextWithLink({
        text: 'Read more 👉',
        url: '/article',
      });

      const link = element?.querySelector('a');
      expect(link?.textContent).toBe('Read more 👉');
    });

    it('should handle relative URLs', () => {
      const element = createTextWithLink({
        text: 'Internal page',
        url: '/path/to/page',
      });

      const link = element?.querySelector('a');
      expect(link?.getAttribute('href')).toBe('/path/to/page');
    });

    it('should handle absolute URLs', () => {
      const element = createTextWithLink({
        text: 'External site',
        url: 'https://example.com/page',
      });

      const link = element?.querySelector('a');
      expect(link?.getAttribute('href')).toBe('https://example.com/page');
    });

    it('should handle fragment URLs', () => {
      const element = createTextWithLink({
        text: 'Jump to section',
        url: '#section',
      });

      const link = element?.querySelector('a');
      expect(link?.getAttribute('href')).toBe('#section');
    });
  });

  describe('structure', () => {
    it('should have exactly one child (the link)', () => {
      const element = createTextWithLink({
        text: 'Read more',
        url: '/page',
      });

      expect(element?.children.length).toBe(1);
      expect(element?.children[0].tagName).toBe('A');
    });

    it('should properly nest link within container', () => {
      const element = createTextWithLink({
        text: 'Read more',
        url: '/page',
      });

      const link = element?.querySelector('a');
      expect(link?.parentElement).toBe(element);
    });
  });

  describe('integration', () => {
    it('should be appendable to DOM', () => {
      const container = document.createElement('div');
      const element = createTextWithLink({
        text: 'Read more',
        url: 'https://example.com',
      });

      if (element) {
        container.appendChild(element);
      }

      expect(container.querySelector('p')).toBe(element);
      expect(container.querySelector('a')).not.toBeNull();
    });

    it('should work with different container tags in DOM', () => {
      const container = document.createElement('article');
      const element = createTextWithLink({
        text: 'Article Title',
        url: '/article',
        containerTag: 'h1',
      });

      if (element) {
        container.appendChild(element);
      }

      expect(container.querySelector('h1')).toBe(element);
      expect(container.querySelector('h1 > a')).not.toBeNull();
    });
  });

  describe('security', () => {
    it('should include security attributes for external links by default', () => {
      const element = createTextWithLink({
        text: 'External link',
        url: 'https://external.com',
      });

      const link = element?.querySelector('a');
      expect(link?.rel).toContain('noopener');
      expect(link?.rel).toContain('noreferrer');
    });

    it('should not include security attributes when opening in same tab', () => {
      const element = createTextWithLink({
        text: 'Internal link',
        url: '/internal',
        openInNewTab: false,
      });

      const link = element?.querySelector('a');
      expect(link?.hasAttribute('rel')).toBe(false);
    });
  });
});
