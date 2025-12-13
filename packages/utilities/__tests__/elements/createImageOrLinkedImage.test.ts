import { createImageOrLinkedImage } from '../../source/elements/createImageOrLinkedImage';

describe('createImageOrLinkedImage', () => {
  describe('happy path - image only', () => {
    it('should create an image element when no link URL provided', () => {
      const image = createImageOrLinkedImage({
        imageUrl: '/images/test.jpg',
        altText: 'Test image',
      });

      expect(image.tagName).toBe('IMG');
    });

    it('should set image src attribute', () => {
      const image = createImageOrLinkedImage({
        imageUrl: '/images/photo.jpg',
        altText: 'Photo',
      });

      expect((image as HTMLImageElement).src).toContain('/images/photo.jpg');
    });

    it('should set image alt attribute', () => {
      const image = createImageOrLinkedImage({
        imageUrl: '/images/photo.jpg',
        altText: 'Team photo from 2024',
      });

      expect((image as HTMLImageElement).alt).toBe('Team photo from 2024');
    });

    it('should handle relative image URLs', () => {
      const image = createImageOrLinkedImage({
        imageUrl: '../images/logo.png',
        altText: 'Logo',
      });

      // Browsers normalize relative URLs to absolute
      expect((image as HTMLImageElement).src).toContain('images/logo.png');
    });

    it('should handle absolute image URLs', () => {
      const image = createImageOrLinkedImage({
        imageUrl: 'https://example.com/images/photo.jpg',
        altText: 'Photo',
      });

      expect((image as HTMLImageElement).src).toBe(
        'https://example.com/images/photo.jpg'
      );
    });
  });

  describe('happy path - linked image', () => {
    it('should create an anchor element when link URL provided', () => {
      const linkedImage = createImageOrLinkedImage({
        imageUrl: '/images/expert.jpg',
        altText: 'Expert headshot',
        linkUrl: '/experts/jane-smith',
      });

      expect(linkedImage.tagName).toBe('A');
    });

    it('should wrap image in anchor element', () => {
      const linkedImage = createImageOrLinkedImage({
        imageUrl: '/images/expert.jpg',
        altText: 'Expert headshot',
        linkUrl: '/experts/jane-smith',
      });

      const img = linkedImage.querySelector('img');
      expect(img).not.toBeNull();
      expect(img?.src).toContain('/images/expert.jpg');
      expect(img?.alt).toBe('Expert headshot');
    });

    it('should set href attribute on link', () => {
      const linkedImage = createImageOrLinkedImage({
        imageUrl: '/images/expert.jpg',
        altText: 'Expert',
        linkUrl: 'https://example.com/profile',
      });

      expect((linkedImage as HTMLAnchorElement).getAttribute('href')).toBe(
        'https://example.com/profile'
      );
    });

    it('should set target to _blank for external links', () => {
      const linkedImage = createImageOrLinkedImage({
        imageUrl: '/images/expert.jpg',
        altText: 'Expert',
        linkUrl: 'https://example.com/profile',
      });

      expect((linkedImage as HTMLAnchorElement).getAttribute('target')).toBe(
        '_blank'
      );
    });

    it('should set rel to noopener noreferrer for security', () => {
      const linkedImage = createImageOrLinkedImage({
        imageUrl: '/images/expert.jpg',
        altText: 'Expert',
        linkUrl: 'https://example.com/profile',
      });

      expect((linkedImage as HTMLAnchorElement).getAttribute('rel')).toBe(
        'noopener noreferrer'
      );
    });

    it('should set aria-label when provided', () => {
      const linkedImage = createImageOrLinkedImage({
        imageUrl: '/images/expert.jpg',
        altText: 'Dr. Jane Smith',
        linkUrl: '/experts/jane-smith',
        linkLabel: 'View Dr. Jane Smith profile',
      });

      expect((linkedImage as HTMLAnchorElement).getAttribute('aria-label')).toBe(
        'View Dr. Jane Smith profile'
      );
    });

    it('should not set aria-label when not provided', () => {
      const linkedImage = createImageOrLinkedImage({
        imageUrl: '/images/expert.jpg',
        altText: 'Expert',
        linkUrl: '/experts/jane-smith',
      });

      expect(
        (linkedImage as HTMLAnchorElement).hasAttribute('aria-label')
      ).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle empty image URL', () => {
      const image = createImageOrLinkedImage({
        imageUrl: '',
        altText: 'Empty URL',
      });

      expect((image as HTMLImageElement).src).toBeTruthy(); // Will be resolved to current URL
    });

    it('should handle empty alt text', () => {
      const image = createImageOrLinkedImage({
        imageUrl: '/images/photo.jpg',
        altText: '',
      });

      expect((image as HTMLImageElement).alt).toBe('');
    });

    it('should handle special characters in alt text', () => {
      const image = createImageOrLinkedImage({
        imageUrl: '/images/photo.jpg',
        altText: 'Test & <Special> "Characters"',
      });

      expect((image as HTMLImageElement).alt).toBe(
        'Test & <Special> "Characters"'
      );
    });

    it('should handle unicode in alt text', () => {
      const image = createImageOrLinkedImage({
        imageUrl: '/images/photo.jpg',
        altText: 'Über uns façade',
      });

      expect((image as HTMLImageElement).alt).toBe('Über uns façade');
    });

    it('should handle emoji in alt text', () => {
      const image = createImageOrLinkedImage({
        imageUrl: '/images/photo.jpg',
        altText: 'Team celebration 🎉',
      });

      expect((image as HTMLImageElement).alt).toBe('Team celebration 🎉');
    });

    it('should return image when link URL is empty string', () => {
      const result = createImageOrLinkedImage({
        imageUrl: '/images/photo.jpg',
        altText: 'Photo',
        linkUrl: '',
      });

      // Empty string is falsy, so no link is created
      expect(result.tagName).toBe('IMG');
    });

    it('should not set aria-label when empty string is provided', () => {
      const linkedImage = createImageOrLinkedImage({
        imageUrl: '/images/photo.jpg',
        altText: 'Photo',
        linkUrl: '/profile',
        linkLabel: '',
      });

      // Empty string is falsy, so aria-label is not set
      expect((linkedImage as HTMLAnchorElement).hasAttribute('aria-label')).toBe(
        false
      );
    });
  });

  describe('structure', () => {
    it('should have exactly one child when linked (the img)', () => {
      const linkedImage = createImageOrLinkedImage({
        imageUrl: '/images/photo.jpg',
        altText: 'Photo',
        linkUrl: '/profile',
      });

      expect((linkedImage as HTMLAnchorElement).children.length).toBe(1);
      expect((linkedImage as HTMLAnchorElement).children[0].tagName).toBe(
        'IMG'
      );
    });

    it('should not have child elements when image only', () => {
      const image = createImageOrLinkedImage({
        imageUrl: '/images/photo.jpg',
        altText: 'Photo',
      });

      expect((image as HTMLImageElement).children.length).toBe(0);
    });

    it('should properly nest image within link', () => {
      const linkedImage = createImageOrLinkedImage({
        imageUrl: '/images/expert.jpg',
        altText: 'Expert',
        linkUrl: '/experts/profile',
      });

      const img = (linkedImage as HTMLAnchorElement).querySelector('img');
      expect(img).not.toBeNull();
      expect(img?.parentElement).toBe(linkedImage);
    });
  });

  describe('integration', () => {
    it('should be appendable to DOM - image only', () => {
      const container = document.createElement('div');
      const image = createImageOrLinkedImage({
        imageUrl: '/images/photo.jpg',
        altText: 'Photo',
      });

      container.appendChild(image);

      expect(container.querySelector('img')).toBe(image);
      expect(container.innerHTML).toContain('/images/photo.jpg');
    });

    it('should be appendable to DOM - linked image', () => {
      const container = document.createElement('div');
      const linkedImage = createImageOrLinkedImage({
        imageUrl: '/images/expert.jpg',
        altText: 'Expert',
        linkUrl: '/experts/profile',
      });

      container.appendChild(linkedImage);

      expect(container.querySelector('a')).toBe(linkedImage);
      expect(container.querySelector('img')).not.toBeNull();
      expect(container.innerHTML).toContain('/experts/profile');
    });
  });

  describe('accessibility', () => {
    it('should always require alt text for images', () => {
      const image = createImageOrLinkedImage({
        imageUrl: '/images/photo.jpg',
        altText: 'Descriptive alt text',
      });

      expect((image as HTMLImageElement).hasAttribute('alt')).toBe(true);
    });

    it('should support empty alt for decorative images', () => {
      const image = createImageOrLinkedImage({
        imageUrl: '/images/decorative.jpg',
        altText: '',
      });

      // Empty alt is valid for decorative images per WCAG
      expect((image as HTMLImageElement).alt).toBe('');
    });

    it('should provide security attributes for external linked images', () => {
      const linkedImage = createImageOrLinkedImage({
        imageUrl: '/images/expert.jpg',
        altText: 'Expert',
        linkUrl: 'https://external.com/profile',
      });

      // noopener prevents the new page from accessing window.opener
      // noreferrer prevents sending referrer information
      expect((linkedImage as HTMLAnchorElement).rel).toContain('noopener');
      expect((linkedImage as HTMLAnchorElement).rel).toContain('noreferrer');
    });

    it('should support custom aria-label for linked images', () => {
      const linkedImage = createImageOrLinkedImage({
        imageUrl: '/images/expert.jpg',
        altText: 'Dr. Jane Smith headshot',
        linkUrl: '/experts/jane-smith',
        linkLabel: 'View full profile for Dr. Jane Smith, Professor of Biology',
      });

      expect((linkedImage as HTMLAnchorElement).getAttribute('aria-label')).toBe(
        'View full profile for Dr. Jane Smith, Professor of Biology'
      );
    });
  });

  describe('return type differentiation', () => {
    it('should return HTMLImageElement when no link', () => {
      const result = createImageOrLinkedImage({
        imageUrl: '/images/photo.jpg',
        altText: 'Photo',
      });

      expect(result instanceof HTMLImageElement).toBe(true);
      expect(result instanceof HTMLAnchorElement).toBe(false);
    });

    it('should return HTMLAnchorElement when link provided', () => {
      const result = createImageOrLinkedImage({
        imageUrl: '/images/photo.jpg',
        altText: 'Photo',
        linkUrl: '/profile',
      });

      expect(result instanceof HTMLAnchorElement).toBe(true);
      expect(result instanceof HTMLImageElement).toBe(false);
    });
  });
});
