import { asset } from '../index';

describe('Asset Elements', () => {
  describe('standard', () => {
    test('creates an image element with correct attributes', () => {
      const images = [
        {
          url: 'https://example.com/image.jpg',
          altText: 'Example image',
        },
      ];

      const element = asset.standard({ images });

      expect(element).toBeInstanceOf(HTMLImageElement);
      const imageElement = element as HTMLImageElement;
      expect(imageElement.src).toBe('https://example.com/image.jpg');
      expect(imageElement.alt).toBe('Example image');
    });

    test('creates a link element with image when URL is provided', () => {
      const images = [
        {
          url: 'https://example.com/image.jpg',
          altText: 'Example image',
        },
      ];
      const url = 'https://example.com/article';

      const linkElement = asset.standard({ images, url });

      expect(linkElement).toBeInstanceOf(HTMLAnchorElement);
      expect(linkElement.getAttribute('href')).toBe(url);
      expect(linkElement.getAttribute('target')).toBe('_blank');
      expect(linkElement.getAttribute('aria-label')).toBe(
        'Maryland Today Article with image Example image',
      );

      const imageElement = linkElement.querySelector('img');
      expect(imageElement).toBeDefined();
      expect(imageElement?.src).toBe('https://example.com/image.jpg');
      expect(imageElement?.alt).toBe('Example image');
    });

    test('uses first image from array', () => {
      const images = [
        {
          url: 'https://example.com/image1.jpg',
          altText: 'First image',
        },
        {
          url: 'https://example.com/image2.jpg',
          altText: 'Second image',
        },
      ];

      const element = asset.standard({ images });

      expect(element).toBeInstanceOf(HTMLImageElement);
      const imageElement = element as HTMLImageElement;
      expect(imageElement.src).toBe('https://example.com/image1.jpg');
      expect(imageElement.alt).toBe('First image');
    });
  });
});
