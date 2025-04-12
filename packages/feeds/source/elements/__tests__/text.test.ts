import { text } from '../index';

describe('Text Elements', () => {
  describe('summary', () => {
    test('creates a div with paragraph containing the text', () => {
      const summaryText = 'This is a summary text';
      const element = text.summary({ text: summaryText });

      expect(element).toBeInstanceOf(HTMLDivElement);
      const paragraph = element?.querySelector('p');
      expect(paragraph).toBeDefined();
      expect(paragraph?.innerHTML).toBe(summaryText);
    });

    test('returns null when text is empty', () => {
      const element = text.summary({ text: '' });
      expect(element).toBeNull();
    });
  });

  describe('headline', () => {
    test('creates a paragraph with link containing the headline text', () => {
      const headlineText = 'This is a headline';
      const url = 'https://example.com/article';
      const element = text.headline({ text: headlineText, url });

      expect(element).toBeInstanceOf(HTMLParagraphElement);
      const link = element?.querySelector('a');
      expect(link).toBeDefined();
      expect(link?.innerHTML).toBe(headlineText);
      expect(link?.href).toBe(url);
      expect(link?.target).toBe('_blank');
      expect(link?.rel).toBe('noopener noreferrer');
    });

    test('returns null when either text or url is empty', () => {
      expect(text.headline({ text: 'Headline', url: '' })).toBeNull();
      expect(text.headline({ text: '', url: 'https://example.com' })).toBeNull();
    });
  });

  describe('date', () => {
    test('creates a time element with proper attributes', () => {
      const dateISO = '2023-01-15';
      const dateFormatted = 'January 15, 2023';
      const element = text.date({ date: dateISO, dateFormatted });

      expect(element).toBeInstanceOf(HTMLTimeElement);
      expect(element?.innerHTML).toBe(dateFormatted);
      expect(element?.getAttribute('datetime')).toBe(dateISO);
    });

    test('returns null when either date or dateFormatted is empty', () => {
      expect(text.date({ date: '2023-01-15', dateFormatted: '' })).toBeNull();
      expect(text.date({ date: '', dateFormatted: 'January 15, 2023' })).toBeNull();
    });
  });
});