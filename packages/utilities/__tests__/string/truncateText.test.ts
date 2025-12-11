import { truncateText } from '../../source/string/truncateText';

describe('truncateText', () => {
  describe('happy path', () => {
    it('should truncate plain text', () => {
      const text = 'This is a long text that needs to be truncated';

      const result = truncateText({ text, maxTextSize: 20 });

      expect(result.length).toBeLessThanOrEqual(25); // 20 + ' ...'
      expect(result).toContain('...');
    });

    it('should preserve HTML structure', () => {
      const text = '<p>This is a <strong>long</strong> text</p>';

      const result = truncateText({ text, maxTextSize: 15 });

      expect(result).toContain('<p>');
      expect(result).toContain('<strong>');
      expect(result).toContain('</strong>');
      expect(result).toContain('</p>');
    });

    it('should add ellipsis when text exceeds max size', () => {
      const text = '<p>This is a very long text</p>';

      const result = truncateText({ text, maxTextSize: 10 });

      expect(result).toContain('...');
    });

    it('should not add ellipsis when text is shorter than max', () => {
      const text = '<p>Short</p>';

      const result = truncateText({ text, maxTextSize: 100 });

      expect(result).not.toContain('...');
    });

    it('should truncate at character level', () => {
      const text = '<p>Hello World</p>';

      const result = truncateText({ text, maxTextSize: 5 });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');
      const textContent = tempDiv.textContent || '';

      expect(textContent.length).toBeLessThanOrEqual(5);
    });

    it('should handle nested HTML elements', () => {
      const text = '<div><p>Text <em>with <strong>nested</strong> elements</em></p></div>';

      const result = truncateText({ text, maxTextSize: 20 });

      expect(result).toContain('<div>');
      expect(result).toContain('</div>');
      expect(result).toContain('...');
    });

    it('should clean up whitespace', () => {
      const text = '<p>  Text   with   extra   spaces  </p>';

      const result = truncateText({ text, maxTextSize: 50 });

      expect(result).not.toContain('  '); // No double spaces
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      const result = truncateText({ text: '', maxTextSize: 10 });

      expect(result).toBe('');
    });

    it('should handle text with only HTML tags', () => {
      const text = '<p></p>';

      const result = truncateText({ text, maxTextSize: 10 });

      expect(result).toContain('<p>');
    });

    it('should handle zero maxTextSize', () => {
      const text = '<p>Text</p>';

      const result = truncateText({ text, maxTextSize: 0 });

      expect(result).toContain('...');
    });

    it('should handle maxTextSize of 1', () => {
      const text = '<p>Hello</p>';

      const result = truncateText({ text, maxTextSize: 1 });

      expect(result).toContain('...');
    });

    it('should handle text without HTML wrapper', () => {
      const text = 'Just plain text without tags';

      const result = truncateText({ text, maxTextSize: 10 });

      expect(result).toContain('...');
    });

    it('should handle text with newlines and tabs', () => {
      const text = '<p>\n\tText\n\twith\n\tformatting\t\n</p>';

      const result = truncateText({ text, maxTextSize: 50 });

      expect(result).not.toContain('\n');
      expect(result).not.toContain('\t');
    });

    it('should handle text with multiple spaces between tags', () => {
      const text = '<p>Text</p>    <p>More text</p>';

      const result = truncateText({ text, maxTextSize: 50 });

      expect(result).not.toMatch(/>\s{2,}</);
    });

    it('should handle very long text', () => {
      const longText = '<p>' + 'a'.repeat(1000) + '</p>';

      const result = truncateText({ text: longText, maxTextSize: 100 });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');
      const textContent = tempDiv.textContent || '';

      expect(textContent.length).toBeLessThanOrEqual(100);
    });

    it('should handle text exactly at max size', () => {
      const text = '<p>Exact</p>'; // 5 characters

      const result = truncateText({ text, maxTextSize: 5 });

      expect(result).not.toContain('...');
    });

    it('should append ellipsis to last child element when present', () => {
      const text = '<p>Text</p><span>More</span>';

      const result = truncateText({ text, maxTextSize: 5 });

      expect(result).toContain('...');
      expect(result).toContain('</span>');
    });

    it('should handle text with special HTML entities', () => {
      const text = '<p>&amp; &lt; &gt; &quot;</p>';

      const result = truncateText({ text, maxTextSize: 50 });

      expect(result).toContain('&amp;');
    });

    it('should handle self-closing tags', () => {
      const text = '<p>Text <br/> more text</p>';

      const result = truncateText({ text, maxTextSize: 20 });

      expect(result).toContain('<p>');
    });

    it('should handle Unicode characters', () => {
      const text = '<p>Hello 世界 🌍</p>';

      const result = truncateText({ text, maxTextSize: 10 });

      expect(result).toContain('...');
    });
  });

  describe('error conditions', () => {
    it('should handle null text', () => {
      expect(() => truncateText({ text: null as any, maxTextSize: 10 })).toThrow();
    });

    it('should handle undefined text', () => {
      expect(() => truncateText({ text: undefined as any, maxTextSize: 10 })).toThrow();
    });

    it('should handle negative maxTextSize', () => {
      const text = '<p>Text</p>';

      const result = truncateText({ text, maxTextSize: -10 });

      expect(result).toContain('...');
    });

    it('should handle malformed HTML', () => {
      const text = '<p>Unclosed paragraph';

      expect(() => truncateText({ text, maxTextSize: 10 })).not.toThrow();
    });
  });

  describe('DOM manipulation', () => {
    it('should use temporary div for processing', () => {
      const text = '<p>Text</p>';

      const result = truncateText({ text, maxTextSize: 10 });

      // Should return string, not DOM element
      expect(typeof result).toBe('string');
    });

    it('should not leave elements in the document', () => {
      const initialChildren = document.body.children.length;

      truncateText({ text: '<p>Text</p>', maxTextSize: 10 });

      expect(document.body.children.length).toBe(initialChildren);
    });
  });

  describe('ellipsis placement', () => {
    it('should add ellipsis to innerHTML of last child', () => {
      const text = '<p>First</p><span>Second</span>';

      const result = truncateText({ text, maxTextSize: 5 });

      expect(result).toMatch(/<span>.*\.\.\.<\/span>/);
    });

    it('should add ellipsis to wrapper when no children', () => {
      const text = 'Plain text';

      const result = truncateText({ text, maxTextSize: 5 });

      expect(result).toContain(' ...');
    });

    it('should not add ellipsis multiple times', () => {
      const text = '<p>Text</p>';

      const result = truncateText({ text, maxTextSize: 2 });

      const ellipsisCount = (result.match(/\.\.\./g) || []).length;
      expect(ellipsisCount).toBe(1);
    });
  });

  describe('text extraction', () => {
    it('should use textContent for measuring', () => {
      const text = '<p>Text <span>with</span> elements</p>';

      const result = truncateText({ text, maxTextSize: 15 });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');

      expect((tempDiv.textContent || '').length).toBeLessThanOrEqual(15);
    });

    it('should fall back to innerText if textContent is empty', () => {
      const text = '<p>Text</p>';

      const result = truncateText({ text, maxTextSize: 10 });

      expect(result).toBeTruthy();
    });
  });
});