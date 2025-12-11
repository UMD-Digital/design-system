import { truncateTextBasedOnSize } from '../../source/string/truncateTextBasedOnSize';

describe('truncateTextBasedOnSize', () => {
  const longText = '<p>' + 'Lorem ipsum dolor sit amet. '.repeat(20) + '</p>';

  describe('happy path', () => {
    it('should use small text size for containers smaller than breakpointLarge', () => {
      const result = truncateTextBasedOnSize({ text: longText, size: 300 });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');
      const textLength = (tempDiv.textContent || '').length;

      expect(textLength).toBeLessThanOrEqual(220);
    });

    it('should use large text size for containers >= breakpointLarge', () => {
      const result = truncateTextBasedOnSize({ text: longText, size: 400 });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');
      const textLength = (tempDiv.textContent || '').length;

      expect(textLength).toBeLessThanOrEqual(260);
    });

    it('should use max text size for containers >= breakpointMax', () => {
      const result = truncateTextBasedOnSize({ text: longText, size: 600 });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');
      const textLength = (tempDiv.textContent || '').length;

      expect(textLength).toBeLessThanOrEqual(280);
    });

    it('should accept custom breakpointLarge', () => {
      const result = truncateTextBasedOnSize({
        text: longText,
        size: 500,
        breakpointLarge: 500,
      });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');
      const textLength = (tempDiv.textContent || '').length;

      expect(textLength).toBeLessThanOrEqual(260);
    });

    it('should accept custom breakpointMax', () => {
      const result = truncateTextBasedOnSize({
        text: longText,
        size: 700,
        breakpointMax: 700,
      });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');
      const textLength = (tempDiv.textContent || '').length;

      expect(textLength).toBeLessThanOrEqual(280);
    });

    it('should accept custom textSizeSmall', () => {
      const result = truncateTextBasedOnSize({
        text: longText,
        size: 300,
        textSizeSmall: 100,
      });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');
      const textLength = (tempDiv.textContent || '').length;

      expect(textLength).toBeLessThanOrEqual(100);
    });

    it('should accept custom textSizeLarge', () => {
      const result = truncateTextBasedOnSize({
        text: longText,
        size: 450,
        textSizeLarge: 150,
      });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');
      const textLength = (tempDiv.textContent || '').length;

      expect(textLength).toBeLessThanOrEqual(150);
    });

    it('should accept custom textSizeMax', () => {
      const result = truncateTextBasedOnSize({
        text: longText,
        size: 700,
        textSizeMax: 200,
      });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');
      const textLength = (tempDiv.textContent || '').length;

      expect(textLength).toBeLessThanOrEqual(200);
    });
  });

  describe('edge cases', () => {
    it('should handle size exactly at breakpointLarge', () => {
      const result = truncateTextBasedOnSize({ text: longText, size: 400 });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');
      const textLength = (tempDiv.textContent || '').length;

      expect(textLength).toBeLessThanOrEqual(260);
    });

    it('should handle size exactly at breakpointMax', () => {
      const result = truncateTextBasedOnSize({ text: longText, size: 600 });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');
      const textLength = (tempDiv.textContent || '').length;

      expect(textLength).toBeLessThanOrEqual(280);
    });

    it('should handle size of 0', () => {
      const result = truncateTextBasedOnSize({ text: longText, size: 0 });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');
      const textLength = (tempDiv.textContent || '').length;

      expect(textLength).toBeLessThanOrEqual(220);
    });

    it('should handle very large size', () => {
      const result = truncateTextBasedOnSize({ text: longText, size: 10000 });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');
      const textLength = (tempDiv.textContent || '').length;

      expect(textLength).toBeLessThanOrEqual(280);
    });

    it('should handle empty text', () => {
      // Empty text now returns empty string gracefully
      const result = truncateTextBasedOnSize({ text: '', size: 500 });
      expect(result).toBe('');
    });

    it('should handle short text that doesnt need truncation', () => {
      const shortText = '<p>Short</p>';

      const result = truncateTextBasedOnSize({ text: shortText, size: 500 });

      expect(result).not.toContain('...');
    });

    it('should handle negative size', () => {
      const result = truncateTextBasedOnSize({ text: longText, size: -100 });

      expect(typeof result).toBe('string');
    });

    it('should handle breakpoints in reverse order', () => {
      const result = truncateTextBasedOnSize({
        text: longText,
        size: 500,
        breakpointLarge: 600,
        breakpointMax: 400,
      });

      expect(typeof result).toBe('string');
    });

    it('should handle fractional sizes', () => {
      const result = truncateTextBasedOnSize({ text: longText, size: 399.9 });

      expect(typeof result).toBe('string');
    });

    it('should handle size just below breakpointLarge', () => {
      const result = truncateTextBasedOnSize({ text: longText, size: 399 });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');
      const textLength = (tempDiv.textContent || '').length;

      expect(textLength).toBeLessThanOrEqual(220);
    });

    it('should handle size just below breakpointMax', () => {
      const result = truncateTextBasedOnSize({ text: longText, size: 599 });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');
      const textLength = (tempDiv.textContent || '').length;

      expect(textLength).toBeLessThanOrEqual(260);
    });
  });

  describe('breakpoint transitions', () => {
    it('should transition from small to large at breakpoint', () => {
      const resultSmall = truncateTextBasedOnSize({ text: longText, size: 399 });
      const resultLarge = truncateTextBasedOnSize({ text: longText, size: 400 });

      expect(resultSmall.length).toBeLessThan(resultLarge.length);
    });

    it('should transition from large to max at breakpoint', () => {
      const resultLarge = truncateTextBasedOnSize({ text: longText, size: 599 });
      const resultMax = truncateTextBasedOnSize({ text: longText, size: 600 });

      expect(resultLarge.length).toBeLessThan(resultMax.length);
    });
  });

  describe('custom parameters', () => {
    it('should use all custom parameters together', () => {
      const result = truncateTextBasedOnSize({
        text: longText,
        size: 800,
        breakpointLarge: 500,
        breakpointMax: 800,
        textSizeSmall: 100,
        textSizeLarge: 150,
        textSizeMax: 200,
      });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');
      const textLength = (tempDiv.textContent || '').length;

      expect(textLength).toBeLessThanOrEqual(200);
    });

    it('should respect custom small text size', () => {
      const result = truncateTextBasedOnSize({
        text: longText,
        size: 200,
        textSizeSmall: 50,
      });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');
      const textLength = (tempDiv.textContent || '').length;

      expect(textLength).toBeLessThanOrEqual(50);
    });

    it('should respect custom large text size', () => {
      const result = truncateTextBasedOnSize({
        text: longText,
        size: 500,
        textSizeLarge: 100,
      });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');
      const textLength = (tempDiv.textContent || '').length;

      expect(textLength).toBeLessThanOrEqual(100);
    });

    it('should respect custom max text size', () => {
      const result = truncateTextBasedOnSize({
        text: longText,
        size: 800,
        textSizeMax: 150,
      });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.replace(' ...', '');
      const textLength = (tempDiv.textContent || '').length;

      expect(textLength).toBeLessThanOrEqual(150);
    });
  });

  describe('error conditions', () => {
    it('should handle null text', () => {
      expect(() =>
        truncateTextBasedOnSize({ text: null as any, size: 500 }),
      ).toThrow();
    });

    it('should handle undefined text', () => {
      expect(() =>
        truncateTextBasedOnSize({ text: undefined as any, size: 500 }),
      ).toThrow();
    });

    it('should handle null size', () => {
      expect(() =>
        truncateTextBasedOnSize({ text: longText, size: null as any }),
      ).not.toThrow();
    });

    it('should handle undefined size', () => {
      expect(() =>
        truncateTextBasedOnSize({ text: longText, size: undefined as any }),
      ).not.toThrow();
    });
  });

  describe('integration with truncateText', () => {
    it('should call truncateText with correct parameters', () => {
      const result = truncateTextBasedOnSize({ text: longText, size: 500 });

      expect(result).toContain('...');
    });

    it('should preserve HTML structure', () => {
      const htmlText = '<p>Text <strong>bold</strong> more</p>'.repeat(10);

      const result = truncateTextBasedOnSize({ text: htmlText, size: 500 });

      expect(result).toContain('<p>');
      expect(result).toContain('</p>');
    });
  });
});