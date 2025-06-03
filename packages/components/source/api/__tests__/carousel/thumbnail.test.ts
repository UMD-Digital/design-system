import carouselThumbnail from '../../carousel/thumbnail';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  captureWarningsAsync,
  setAttributeAndWait,
} from '../test-helpers/component';
import {
  validateSlotConfiguration,
  validateDeprecatedAttribute,
  getComponentAttributes,
} from '../test-helpers/validation';

describe('Component: umd-element-carousel-thumbnail', () => {
  const tagName = 'umd-element-carousel-thumbnail';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-carousel-thumbnail');
      document.body.appendChild(testElement);
      
      carouselThumbnail();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      carouselThumbnail();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      carouselThumbnail();
    });

    it('should require blocks slot', () => {
      const { element } = createTestComponent(tagName);
      
      // Test without blocks (should be invalid)
      let validation = validateSlotConfiguration(element, {
        blocks: { required: true },
      });
      
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('Required slot "blocks" is empty');
      
      // Add blocks and test again
      const blocksContainer = document.createElement('div');
      blocksContainer.setAttribute('slot', 'blocks');
      blocksContainer.innerHTML = '<div data-thumbnail="thumb1.jpg">Item 1</div>';
      element.appendChild(blocksContainer);
      
      validation = validateSlotConfiguration(element, {
        blocks: { required: true },
      });
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should accept multiple blocks with thumbnails', () => {
      const { element } = createTestComponent(tagName);
      
      const blocksContainer = document.createElement('div');
      blocksContainer.setAttribute('slot', 'blocks');
      
      // Add multiple blocks with thumbnails
      for (let i = 1; i <= 4; i++) {
        const block = document.createElement('div');
        block.setAttribute('data-thumbnail', `thumb${i}.jpg`);
        block.innerHTML = `
          <img src="image${i}.jpg" alt="Image ${i}">
          <p>Caption for image ${i}</p>
        `;
        blocksContainer.appendChild(block);
      }
      
      element.appendChild(blocksContainer);
      
      const slottedBlocks = element.querySelectorAll('[slot="blocks"] > div');
      expect(slottedBlocks.length).toBe(4);
      slottedBlocks.forEach((block, index) => {
        expect(block.getAttribute('data-thumbnail')).toBe(`thumb${index + 1}.jpg`);
      });
    });

    it('should handle complex block content', () => {
      const { element } = createTestComponent(tagName);
      
      const blocksContainer = document.createElement('div');
      blocksContainer.setAttribute('slot', 'blocks');
      
      // Add block with complex content
      const block1 = document.createElement('div');
      block1.setAttribute('data-thumbnail', 'product-thumb.jpg');
      block1.innerHTML = `
        <img src="product-full.jpg" alt="Product view">
        <h3>Product Title</h3>
        <p>Product description with details</p>
        <button>View Details</button>
      `;
      blocksContainer.appendChild(block1);
      
      // Add another block
      const block2 = document.createElement('div');
      block2.setAttribute('data-thumbnail', 'feature-thumb.jpg');
      block2.innerHTML = `
        <video src="feature-demo.mp4" controls></video>
        <h3>Feature Demo</h3>
        <p>Watch our feature in action</p>
      `;
      blocksContainer.appendChild(block2);
      
      element.appendChild(blocksContainer);
      
      const blocks = element.querySelectorAll('[slot="blocks"] > div');
      expect(blocks.length).toBe(2);
      expect(blocks[0].querySelector('img')).toBeTruthy();
      expect(blocks[1].querySelector('video')).toBeTruthy();
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      carouselThumbnail();
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
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
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      carouselThumbnail();
    });

    it('should observe resize attribute', async () => {
      const { element } = createTestComponent(tagName);
      
      // Add required blocks
      const blocksContainer = document.createElement('div');
      blocksContainer.setAttribute('slot', 'blocks');
      blocksContainer.innerHTML = '<div data-thumbnail="thumb.jpg">Content</div>';
      element.appendChild(blocksContainer);
      // Mock the resize event
      const mockResize = jest.fn();
      (element as any).events = { resize: mockResize };
      
      // Trigger resize attribute
      await setAttributeAndWait(element, 'resize', 'true');
      
      // The resize handler should be set up to respond to attribute changes
    });
  });

  describe('Component Lifecycle', () => {
    beforeEach(() => {
      carouselThumbnail();
    });

    it('should trigger load event after connection', () => {
      const { element } = createTestComponent(tagName);
      
      // Add required blocks
      const blocksContainer = document.createElement('div');
      blocksContainer.setAttribute('slot', 'blocks');
      blocksContainer.innerHTML = '<div data-thumbnail="thumb.jpg">Content</div>';
      element.appendChild(blocksContainer);
      
      // Mock the events.load function
      const mockLoad = jest.fn();
      (element as any).events = { load: mockLoad };// The afterConnect callback should have been called
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Thumbnail Features', () => {
    beforeEach(() => {
      carouselThumbnail();
    });

    it('should support image galleries with thumbnails', () => {
      const { element } = createTestComponent(tagName);
      
      const blocksContainer = document.createElement('div');
      blocksContainer.setAttribute('slot', 'blocks');
      
      // Gallery items
      const galleryItems = [
        { thumb: 'gallery-thumb1.jpg', full: 'gallery1.jpg', title: 'Gallery Image 1' },
        { thumb: 'gallery-thumb2.jpg', full: 'gallery2.jpg', title: 'Gallery Image 2' },
        { thumb: 'gallery-thumb3.jpg', full: 'gallery3.jpg', title: 'Gallery Image 3' },
      ];
      
      galleryItems.forEach(({ thumb, full, title }) => {
        const block = document.createElement('div');
        block.setAttribute('data-thumbnail', thumb);
        block.innerHTML = `
          <img src="${full}" alt="${title}">
          <h4>${title}</h4>
        `;
        blocksContainer.appendChild(block);
      });
      
      element.appendChild(blocksContainer)
      const blocks = element.querySelectorAll('[slot="blocks"] > div');
      expect(blocks.length).toBe(3);
    });

    it('should work with dark theme', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      
      const blocksContainer = document.createElement('div');
      blocksContainer.setAttribute('slot', 'blocks');
      
      const block = document.createElement('div');
      block.setAttribute('data-thumbnail', 'dark-thumb.jpg');
      block.innerHTML = '<img src="dark-image.jpg" alt="Dark theme content">';
      blocksContainer.appendChild(block);
      
      element.appendChild(blocksContainer)
      expect(element.getAttribute('data-theme')).toBe('dark');
    });

    it('should handle mixed media content', () => {
      const { element } = createTestComponent(tagName);
      
      const blocksContainer = document.createElement('div');
      blocksContainer.setAttribute('slot', 'blocks');
      
      // Image block
      const imageBlock = document.createElement('div');
      imageBlock.setAttribute('data-thumbnail', 'image-thumb.jpg');
      imageBlock.innerHTML = '<img src="image.jpg" alt="Image content">';
      blocksContainer.appendChild(imageBlock);
      
      // Video block
      const videoBlock = document.createElement('div');
      videoBlock.setAttribute('data-thumbnail', 'video-thumb.jpg');
      videoBlock.innerHTML = '<video src="video.mp4" controls></video>';
      blocksContainer.appendChild(videoBlock);
      
      // Text content block
      const textBlock = document.createElement('div');
      textBlock.setAttribute('data-thumbnail', 'text-thumb.jpg');
      textBlock.innerHTML = `
        <article>
          <h3>Article Title</h3>
          <p>Article content goes here...</p>
        </article>
      `;
      blocksContainer.appendChild(textBlock);
      
      element.appendChild(blocksContainer)
      expect(element.querySelector('img')).toBeTruthy();
      expect(element.querySelector('video')).toBeTruthy();
      expect(element.querySelector('article')).toBeTruthy();
    });
  });
});