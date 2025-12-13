import { createTextContainer } from '../../source/elements/createTextContainer';

describe('createTextContainer', () => {
  describe('happy path - default div with paragraph', () => {
    it('should create a div element by default', () => {
      const element = createTextContainer({
        text: 'Sample text',
      });

      expect(element?.tagName).toBe('DIV');
    });

    it('should contain a paragraph element by default', () => {
      const element = createTextContainer({
        text: 'Sample text',
      });

      const paragraph = element?.querySelector('p');
      expect(paragraph).not.toBeNull();
      expect(paragraph?.textContent).toBe('Sample text');
    });

    it('should have exactly one child (the paragraph)', () => {
      const element = createTextContainer({
        text: 'Sample text',
      });

      expect(element?.children.length).toBe(1);
      expect(element?.children[0].tagName).toBe('P');
    });
  });

  describe('custom container tags', () => {
    it('should create article container when specified', () => {
      const element = createTextContainer({
        text: 'Article content',
        containerTag: 'article',
      });

      expect(element?.tagName).toBe('ARTICLE');
      expect(element?.querySelector('p')).not.toBeNull();
    });

    it('should create section container when specified', () => {
      const element = createTextContainer({
        text: 'Section content',
        containerTag: 'section',
      });

      expect(element?.tagName).toBe('SECTION');
    });

    it('should create aside container when specified', () => {
      const element = createTextContainer({
        text: 'Sidebar content',
        containerTag: 'aside',
      });

      expect(element?.tagName).toBe('ASIDE');
    });
  });

  describe('custom text tags', () => {
    it('should create span for text when specified', () => {
      const element = createTextContainer({
        text: 'Text content',
        textTag: 'span',
      });

      expect(element?.querySelector('span')).not.toBeNull();
      expect(element?.querySelector('p')).toBeNull();
    });

    it('should create div for text when specified', () => {
      const element = createTextContainer({
        text: 'Text content',
        textTag: 'div',
      });

      expect(element?.querySelector('div')).not.toBeNull();
    });

    it('should create strong for text when specified', () => {
      const element = createTextContainer({
        text: 'Important text',
        textTag: 'strong',
      });

      expect(element?.querySelector('strong')).not.toBeNull();
      expect(element?.querySelector('strong')?.textContent).toBe('Important text');
    });
  });

  describe('no nested element (textTag: null)', () => {
    it('should add text directly to container when textTag is null', () => {
      const element = createTextContainer({
        text: 'Direct text content',
        textTag: null,
      });

      expect(element?.textContent).toBe('Direct text content');
      expect(element?.children.length).toBe(0);
    });

    it('should work with different container tags when textTag is null', () => {
      const element = createTextContainer({
        text: 'Article text',
        containerTag: 'article',
        textTag: null,
      });

      expect(element?.tagName).toBe('ARTICLE');
      expect(element?.textContent).toBe('Article text');
      expect(element?.children.length).toBe(0);
    });
  });

  describe('HTML content handling', () => {
    it('should use innerHTML when allowHTML is true with nested element', () => {
      const element = createTextContainer({
        text: '<strong>Bold</strong> and <em>italic</em> text',
        allowHTML: true,
      });

      const paragraph = element?.querySelector('p');
      expect(paragraph?.innerHTML).toBe('<strong>Bold</strong> and <em>italic</em> text');
      expect(paragraph?.querySelector('strong')?.textContent).toBe('Bold');
      expect(paragraph?.querySelector('em')?.textContent).toBe('italic');
    });

    it('should use innerHTML when allowHTML is true without nested element', () => {
      const element = createTextContainer({
        text: '<strong>Bold</strong> text',
        textTag: null,
        allowHTML: true,
      });

      expect(element?.innerHTML).toBe('<strong>Bold</strong> text');
      expect(element?.querySelector('strong')?.textContent).toBe('Bold');
    });

    it('should escape HTML by default with nested element', () => {
      const element = createTextContainer({
        text: '<strong>Bold</strong> text',
      });

      const paragraph = element?.querySelector('p');
      expect(paragraph?.textContent).toBe('<strong>Bold</strong> text');
      expect(paragraph?.querySelector('strong')).toBeNull();
    });

    it('should escape HTML by default without nested element', () => {
      const element = createTextContainer({
        text: '<strong>Bold</strong> text',
        textTag: null,
      });

      expect(element?.textContent).toBe('<strong>Bold</strong> text');
      expect(element?.querySelector('strong')).toBeNull();
    });
  });

  describe('validation', () => {
    it('should return null when text is empty string', () => {
      const element = createTextContainer({
        text: '',
      });

      expect(element).toBeNull();
    });

    it('should return null when text is empty with custom tags', () => {
      const element = createTextContainer({
        text: '',
        containerTag: 'article',
        textTag: 'div',
      });

      expect(element).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('should handle special characters in text', () => {
      const element = createTextContainer({
        text: 'Test & <Special> "Characters"',
      });

      const paragraph = element?.querySelector('p');
      expect(paragraph?.textContent).toBe('Test & <Special> "Characters"');
    });

    it('should handle unicode in text', () => {
      const element = createTextContainer({
        text: 'Über uns façade',
      });

      const paragraph = element?.querySelector('p');
      expect(paragraph?.textContent).toBe('Über uns façade');
    });

    it('should handle emoji in text', () => {
      const element = createTextContainer({
        text: 'Great work 🎉',
      });

      const paragraph = element?.querySelector('p');
      expect(paragraph?.textContent).toBe('Great work 🎉');
    });

    it('should handle very long text', () => {
      const longText = 'A'.repeat(10000);
      const element = createTextContainer({
        text: longText,
      });

      const paragraph = element?.querySelector('p');
      expect(paragraph?.textContent).toBe(longText);
      expect(paragraph?.textContent?.length).toBe(10000);
    });

    it('should handle newlines in text', () => {
      const element = createTextContainer({
        text: 'Line 1\nLine 2\nLine 3',
      });

      const paragraph = element?.querySelector('p');
      expect(paragraph?.textContent).toBe('Line 1\nLine 2\nLine 3');
    });

    it('should handle whitespace', () => {
      const element = createTextContainer({
        text: '  Spaced  text  ',
      });

      const paragraph = element?.querySelector('p');
      expect(paragraph?.textContent).toBe('  Spaced  text  ');
    });
  });

  describe('combinations', () => {
    it('should work with custom container and custom text tag', () => {
      const element = createTextContainer({
        text: 'Content',
        containerTag: 'article',
        textTag: 'div',
      });

      expect(element?.tagName).toBe('ARTICLE');
      expect(element?.querySelector('div')).not.toBeNull();
      expect(element?.querySelector('div')?.textContent).toBe('Content');
    });

    it('should work with custom container and no text tag', () => {
      const element = createTextContainer({
        text: 'Content',
        containerTag: 'section',
        textTag: null,
      });

      expect(element?.tagName).toBe('SECTION');
      expect(element?.textContent).toBe('Content');
      expect(element?.children.length).toBe(0);
    });

    it('should work with custom text tag and HTML', () => {
      const element = createTextContainer({
        text: '<strong>Bold</strong> content',
        textTag: 'span',
        allowHTML: true,
      });

      expect(element?.querySelector('span')).not.toBeNull();
      expect(element?.querySelector('span strong')?.textContent).toBe('Bold');
    });

    it('should work with no text tag and HTML', () => {
      const element = createTextContainer({
        text: '<strong>Bold</strong> content',
        textTag: null,
        allowHTML: true,
      });

      expect(element?.querySelector('strong')).not.toBeNull();
      expect(element?.innerHTML).toBe('<strong>Bold</strong> content');
    });
  });

  describe('structure', () => {
    it('should properly nest text element within container', () => {
      const element = createTextContainer({
        text: 'Text content',
      });

      const paragraph = element?.querySelector('p');
      expect(paragraph?.parentElement).toBe(element);
    });

    it('should not have nested elements when textTag is null', () => {
      const element = createTextContainer({
        text: 'Text content',
        textTag: null,
      });

      expect(element?.children.length).toBe(0);
      expect(Array.from(element?.childNodes || []).some(
        node => node.nodeType === Node.ELEMENT_NODE
      )).toBe(false);
    });
  });

  describe('integration', () => {
    it('should be appendable to DOM', () => {
      const container = document.createElement('main');
      const element = createTextContainer({
        text: 'Sample content',
      });

      if (element) {
        container.appendChild(element);
      }

      expect(container.querySelector('div')).toBe(element);
      expect(container.querySelector('div > p')).not.toBeNull();
    });

    it('should work in nested DOM structures', () => {
      const parent = document.createElement('section');
      const element = createTextContainer({
        text: 'Article summary',
        containerTag: 'article',
        textTag: 'p',
      });

      if (element) {
        parent.appendChild(element);
      }

      expect(parent.querySelector('article > p')).not.toBeNull();
      expect(parent.textContent).toBe('Article summary');
    });
  });

  describe('use cases', () => {
    it('should create summary block (default)', () => {
      const summary = createTextContainer({
        text: 'This is a summary of the article content.',
      });

      expect(summary?.tagName).toBe('DIV');
      expect(summary?.querySelector('p')?.textContent).toBe(
        'This is a summary of the article content.'
      );
    });

    it('should create direct content block', () => {
      const block = createTextContainer({
        text: 'Direct content without wrapper',
        textTag: null,
      });

      expect(block?.textContent).toBe('Direct content without wrapper');
      expect(block?.children.length).toBe(0);
    });

    it('should create semantic article block', () => {
      const article = createTextContainer({
        text: 'Article content goes here',
        containerTag: 'article',
        textTag: 'div',
      });

      expect(article?.tagName).toBe('ARTICLE');
      expect(article?.querySelector('div')?.textContent).toBe(
        'Article content goes here'
      );
    });
  });
});
