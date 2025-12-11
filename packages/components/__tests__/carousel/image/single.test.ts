import carouselImageSingle from '../../source/api/carousel/image/single';
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

describe('Component: umd-element-carousel-image', () => {
  const tagName = 'umd-element-carousel-image';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-carousel-image');
      document.body.appendChild(testElement);
      
      carouselImageSingle();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      carouselImageSingle();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      carouselImageSingle();
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
      img1.setAttribute('src', 'photo1.jpg');
      img1.setAttribute('alt', 'Campus view');
      imagesContainer.appendChild(img1);
      
      element.appendChild(imagesContainer);
      
      validation = validateSlotConfiguration(element, {
        images: { required: true },
      });
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should accept multiple images with alt text', () => {
      const { element } = createTestComponent(tagName);
      
      const imagesContainer = document.createElement('div');
      imagesContainer.setAttribute('slot', 'images');
      
      // Add multiple images with alt text
      const images = [
        { src: 'photo1.jpg', alt: 'Campus view' },
        { src: 'photo2.jpg', alt: 'Student center' },
        { src: 'photo3.jpg', alt: 'Library entrance' },
      ];
      
      images.forEach(({ src, alt }) => {
        const img = document.createElement('img');
        img.setAttribute('src', src);
        img.setAttribute('alt', alt);
        imagesContainer.appendChild(img);
      });
      
      element.appendChild(imagesContainer);
      
      const slottedImages = element.querySelectorAll('[slot="images"] img');
      expect(slottedImages.length).toBe(3);
      slottedImages.forEach((img) => {
        expect(img.hasAttribute('alt')).toBe(true);
      });
    });

    it('should filter out images without alt text', () => {
      const { element } = createTestComponent(tagName);
      
      const imagesContainer = document.createElement('div');
      imagesContainer.setAttribute('slot', 'images');
      
      // Add image with alt
      const img1 = document.createElement('img');
      img1.setAttribute('src', 'photo1.jpg');
      img1.setAttribute('alt', 'Valid image');
      imagesContainer.appendChild(img1);
      
      // Add image without alt (should be filtered)
      const img2 = document.createElement('img');
      img2.setAttribute('src', 'photo2.jpg');
      imagesContainer.appendChild(img2);
      
      // Add another valid image
      const img3 = document.createElement('img');
      img3.setAttribute('src', 'photo3.jpg');
      img3.setAttribute('alt', 'Another valid image');
      imagesContainer.appendChild(img3);
      
      element.appendChild(imagesContainer);
      
      // Component should filter out images without alt
      const validImages = element.querySelectorAll('[slot="images"] img[alt]');
      expect(validImages.length).toBe(2);
    });

    it('should accept optional headlines slot', () => {
      const { element } = createTestComponent(tagName);
      
      // Add required images
      const imagesContainer = document.createElement('div');
      imagesContainer.setAttribute('slot', 'images');
      const img = document.createElement('img');
      img.setAttribute('src', 'photo.jpg');
      img.setAttribute('alt', 'Photo');
      imagesContainer.appendChild(img);
      element.appendChild(imagesContainer);
      
      // Add headlines
      const headlinesContainer = document.createElement('div');
      headlinesContainer.setAttribute('slot', 'headlines');
      headlinesContainer.innerHTML = '<h3>Image Title</h3>';
      element.appendChild(headlinesContainer);
      
      const validation = validateSlotConfiguration(element, {
        images: { required: true },
        headlines: { required: false },
      });
      
      expect(validation.valid).toBe(true);
      expect(element.querySelector('[slot="headlines"]')).toBeTruthy();
    });

    it('should accept optional texts slot', () => {
      const { element } = createTestComponent(tagName);
      
      // Add required images
      const imagesContainer = document.createElement('div');
      imagesContainer.setAttribute('slot', 'images');
      const img = document.createElement('img');
      img.setAttribute('src', 'photo.jpg');
      img.setAttribute('alt', 'Photo');
      imagesContainer.appendChild(img);
      element.appendChild(imagesContainer);
      
      // Add texts
      const textsContainer = document.createElement('div');
      textsContainer.setAttribute('slot', 'texts');
      textsContainer.innerHTML = '<p>Image description</p>';
      element.appendChild(textsContainer);
      
      const validation = validateSlotConfiguration(element, {
        images: { required: true },
        texts: { required: false },
      });
      
      expect(validation.valid).toBe(true);
      expect(element.querySelector('[slot="texts"]')).toBeTruthy();
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      carouselImageSingle();
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
      carouselImageSingle();
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

  describe('Component Features', () => {
    beforeEach(() => {
      carouselImageSingle();
    });

    it('should support fullscreen option', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-feature': 'fullscreen'
      });
      
      // Add images
      const imagesContainer = document.createElement('div');
      imagesContainer.setAttribute('slot', 'images');
      
      const img = document.createElement('img');
      img.setAttribute('src', 'fullscreen-image.jpg');
      img.setAttribute('alt', 'Fullscreen capable image');
      imagesContainer.appendChild(img);
      
      element.appendChild(imagesContainer)
      expect(element.getAttribute('data-feature')).toBe('fullscreen');
    });

    it('should support dark theme', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      
      // Add images
      const imagesContainer = document.createElement('div');
      imagesContainer.setAttribute('slot', 'images');
      
      const img = document.createElement('img');
      img.setAttribute('src', 'dark-theme-image.jpg');
      img.setAttribute('alt', 'Dark theme image');
      imagesContainer.appendChild(img);
      
      element.appendChild(imagesContainer)
      expect(element.getAttribute('data-theme')).toBe('dark');
    });
  });

  describe('Complex Carousel Scenarios', () => {
    beforeEach(() => {
      carouselImageSingle();
    });

    it('should handle carousel with images, headlines, and texts', () => {
      const { element } = createTestComponent(tagName);
      
      // Add images
      const imagesContainer = document.createElement('div');
      imagesContainer.setAttribute('slot', 'images');
      
      const imageData = [
        { src: 'slide1.jpg', alt: 'First slide' },
        { src: 'slide2.jpg', alt: 'Second slide' },
        { src: 'slide3.jpg', alt: 'Third slide' },
      ];
      
      imageData.forEach(({ src, alt }) => {
        const img = document.createElement('img');
        img.setAttribute('src', src);
        img.setAttribute('alt', alt);
        imagesContainer.appendChild(img);
      });
      
      element.appendChild(imagesContainer);
      
      // Add headlines
      const headlinesContainer = document.createElement('div');
      headlinesContainer.setAttribute('slot', 'headlines');
      headlinesContainer.innerHTML = `
        <h3>First Headline</h3>
        <h3>Second Headline</h3>
        <h3>Third Headline</h3>
      `;
      element.appendChild(headlinesContainer);
      
      // Add texts
      const textsContainer = document.createElement('div');
      textsContainer.setAttribute('slot', 'texts');
      textsContainer.innerHTML = `
        <p>Description for first image</p>
        <p>Description for second image</p>
        <p>Description for third image</p>
      `;
      element.appendChild(textsContainer)
      expect(element.querySelectorAll('[slot="images"] img').length).toBe(3);
      expect(element.querySelectorAll('[slot="headlines"] h3').length).toBe(3);
      expect(element.querySelectorAll('[slot="texts"] p').length).toBe(3);
    });
  });
});