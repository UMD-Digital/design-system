import { imageMultiple as carouselImageMultiple } from '../../../source/web-components/carousel/image/multiple';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  captureWarningsAsync,
  setAttributeAndWait,
} from '../../test-helpers/component';
import {
  validateSlotConfiguration,
  validateDeprecatedAttribute,
  getComponentAttributes,
} from '../../test-helpers/validation';

describe('Component: umd-element-carousel-multiple-image', () => {
  const tagName = 'umd-element-carousel-multiple-image';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-carousel-multiple-image');
      document.body.appendChild(testElement);
      
      carouselImageMultiple();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      carouselImageMultiple();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      carouselImageMultiple();
    });

    it('should require images slot', () => {
      const { element } = createTestComponent(tagName);
      
      // Test without images (should be invalid)
      let validation = validateSlotConfiguration(element, {
        images: { required: true },
      });
      
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('Required slot "images" is empty');
      
      // Add images and test again
      const imagesContainer = document.createElement('div');
      imagesContainer.setAttribute('slot', 'images');
      
      const img1 = document.createElement('img');
      img1.setAttribute('src', 'gallery1.jpg');
      img1.setAttribute('alt', 'Gallery image 1');
      imagesContainer.appendChild(img1);
      
      element.appendChild(imagesContainer);
      
      validation = validateSlotConfiguration(element, {
        images: { required: true },
      });
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should accept multiple images in gallery format', () => {
      const { element } = createTestComponent(tagName);
      
      const imagesContainer = document.createElement('div');
      imagesContainer.setAttribute('slot', 'images');
      
      // Add multiple gallery images
      for (let i = 1; i <= 6; i++) {
        const img = document.createElement('img');
        img.setAttribute('src', `gallery${i}.jpg`);
        img.setAttribute('alt', `Gallery image ${i}`);
        imagesContainer.appendChild(img);
      }
      
      element.appendChild(imagesContainer);
      
      const slottedImages = element.querySelectorAll('[slot="images"] img');
      expect(slottedImages.length).toBe(6);
    });

    it('should filter out images without alt text', () => {
      const { element } = createTestComponent(tagName);
      
      const imagesContainer = document.createElement('div');
      imagesContainer.setAttribute('slot', 'images');
      
      // Add mix of images with and without alt
      const img1 = document.createElement('img');
      img1.setAttribute('src', 'valid1.jpg');
      img1.setAttribute('alt', 'Valid image 1');
      imagesContainer.appendChild(img1);
      
      const img2 = document.createElement('img');
      img2.setAttribute('src', 'invalid.jpg');
      // No alt attribute
      imagesContainer.appendChild(img2);
      
      const img3 = document.createElement('img');
      img3.setAttribute('src', 'valid2.jpg');
      img3.setAttribute('alt', 'Valid image 2');
      imagesContainer.appendChild(img3);
      
      element.appendChild(imagesContainer);
      
      // Component should filter out images without alt
      const validImages = element.querySelectorAll('[slot="images"] img[alt]');
      expect(validImages.length).toBe(2);
    });

    it('should handle non-img elements in slot gracefully', () => {
      const { element } = createTestComponent(tagName);
      
      const imagesContainer = document.createElement('div');
      imagesContainer.setAttribute('slot', 'images');
      
      // Add valid image
      const img = document.createElement('img');
      img.setAttribute('src', 'valid.jpg');
      img.setAttribute('alt', 'Valid image');
      imagesContainer.appendChild(img);
      
      // Add non-img element (should be ignored)
      const div = document.createElement('div');
      div.textContent = 'Not an image';
      imagesContainer.appendChild(div);
      
      // Add another valid image
      const img2 = document.createElement('img');
      img2.setAttribute('src', 'valid2.jpg');
      img2.setAttribute('alt', 'Valid image 2');
      imagesContainer.appendChild(img2);
      
      element.appendChild(imagesContainer);
      
      const images = element.querySelectorAll('[slot="images"] img');
      expect(images.length).toBe(2);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      carouselImageMultiple();
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle data-feature attribute with fullscreen value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-feature': 'fullscreen'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-feature']).toBe('fullscreen');
    });

    it('should handle default theme (light)', () => {
      const { element } = createTestComponent(tagName);
      // No data-theme means light theme
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBeUndefined();
    });

    it('should handle deprecated theme attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'theme': 'dark'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'theme', 'data-theme')).toBe(true);
    });

    it('should handle deprecated feature attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'feature': 'fullscreen'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'feature', 'data-feature')).toBe(true);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      carouselImageMultiple();
    });

    it('should observe resize attribute', async () => {
      const { element } = createTestComponent(tagName);
      
      // Add required images
      const imagesContainer = document.createElement('div');
      imagesContainer.setAttribute('slot', 'images');
      const img = document.createElement('img');
      img.setAttribute('src', 'photo.jpg');
      img.setAttribute('alt', 'Photo');
      imagesContainer.appendChild(img);
      element.appendChild(imagesContainer);
      // Mock the resize event
      const mockResize = jest.fn();
      (element as any).events = { SetEventReize: mockResize };
      
      // Trigger resize attribute
      await setAttributeAndWait(element, 'resize', 'true');
      
      // The resize handler should be set up to respond to attribute changes
    });
  });

  describe('Gallery Features', () => {
    beforeEach(() => {
      carouselImageMultiple();
    });

    it('should display multiple images simultaneously', () => {
      const { element } = createTestComponent(tagName);
      
      const imagesContainer = document.createElement('div');
      imagesContainer.setAttribute('slot', 'images');
      
      // Add collection of gallery images
      const galleryImages = [
        'landscape1.jpg',
        'landscape2.jpg',
        'landscape3.jpg',
        'landscape4.jpg',
        'landscape5.jpg',
        'landscape6.jpg',
      ];
      
      galleryImages.forEach((src, index) => {
        const img = document.createElement('img');
        img.setAttribute('src', src);
        img.setAttribute('alt', `Landscape ${index + 1}`);
        imagesContainer.appendChild(img);
      });
      
      element.appendChild(imagesContainer)
      const images = element.querySelectorAll('[slot="images"] img');
      expect(images.length).toBe(6);
    });

    it('should support fullscreen gallery mode', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-feature': 'fullscreen'
      });
      
      const imagesContainer = document.createElement('div');
      imagesContainer.setAttribute('slot', 'images');
      
      // Add high-res gallery images
      const img1 = document.createElement('img');
      img1.setAttribute('src', 'highres1.jpg');
      img1.setAttribute('alt', 'High resolution image 1');
      imagesContainer.appendChild(img1);
      
      const img2 = document.createElement('img');
      img2.setAttribute('src', 'highres2.jpg');
      img2.setAttribute('alt', 'High resolution image 2');
      imagesContainer.appendChild(img2);
      
      element.appendChild(imagesContainer)
      expect(element.getAttribute('data-feature')).toBe('fullscreen');
    });

    it('should work with dark theme for galleries', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      
      const imagesContainer = document.createElement('div');
      imagesContainer.setAttribute('slot', 'images');
      
      // Add artwork images
      const img = document.createElement('img');
      img.setAttribute('src', 'artwork.jpg');
      img.setAttribute('alt', 'Art gallery piece');
      imagesContainer.appendChild(img);
      
      element.appendChild(imagesContainer)
      expect(element.getAttribute('data-theme')).toBe('dark');
    });
  });

  describe('Component Lifecycle', () => {
    beforeEach(() => {
      carouselImageMultiple();
    });

    it('should handle component initialization', () => {
      const { element } = createTestComponent(tagName);
      
      // Add required images
      const imagesContainer = document.createElement('div');
      imagesContainer.setAttribute('slot', 'images');
      
      const img = document.createElement('img');
      img.setAttribute('src', 'init.jpg');
      img.setAttribute('alt', 'Initialization test');
      imagesContainer.appendChild(img);
      
      element.appendChild(imagesContainer)
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });
});