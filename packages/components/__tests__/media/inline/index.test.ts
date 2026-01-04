import { inline as mediaInline } from '../../../source/web-components/media/inline/index';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  createSlotContent,
  captureWarningsAsync,
} from '../../test-helpers/component';
import {
  validateSlotConfiguration,
  getComponentAttributes,
  validateDeprecatedAttribute,
  validateDeprecatedSlot,
} from '../../test-helpers/validation';

describe('Component: umd-element-media-inline', () => {
  const tagName = 'umd-element-media-inline';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-media-inline');
      document.body.appendChild(testElement);
      
      mediaInline();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      mediaInline();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      mediaInline();
    });

    it('should require image slot', () => {
      const { element } = createTestComponent(tagName);
      
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.src = 'campus.jpg';
      img.alt = 'Campus view';
      element.appendChild(img);
      
      const validation = validateSlotConfiguration(element, {
        image: { required: true, allowedElements: ['img'] },
      });
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should accept optional caption slot with div element', () => {
      const { element } = createTestComponent(tagName);
      
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.src = 'test.jpg';
      img.alt = 'Test';
      element.appendChild(img);
      
      const caption = document.createElement('div');
      caption.setAttribute('slot', 'caption');
      caption.textContent = 'Image caption';
      element.appendChild(caption);
      
      expect(element.querySelector('[slot="caption"]')).toBeTruthy();
    });

    it('should accept optional caption slot with p element', () => {
      const { element } = createTestComponent(tagName);
      
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.src = 'test.jpg';
      img.alt = 'Test';
      element.appendChild(img);
      
      element.appendChild(createSlotContent('caption', 'p', 'State-of-the-art research facility opened in 2023'));
      
      expect(element.querySelector('[slot="caption"]')).toBeTruthy();
    });

    it('should accept optional text slot with div element', () => {
      const { element } = createTestComponent(tagName);
      
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.src = 'test.jpg';
      img.alt = 'Test';
      element.appendChild(img);
      
      const text = document.createElement('div');
      text.setAttribute('slot', 'text');
      text.innerHTML = '<p>Our distinguished faculty members...</p>';
      element.appendChild(text);
      
      expect(element.querySelector('[slot="text"]')).toBeTruthy();
    });

    it('should accept optional text slot with p element', () => {
      const { element } = createTestComponent(tagName);
      
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.src = 'test.jpg';
      img.alt = 'Test';
      element.appendChild(img);
      
      element.appendChild(createSlotContent('text', 'p', 'Text content that wraps around the image'));
      
      expect(element.querySelector('[slot="text"]')).toBeTruthy();
    });

    it('should accept deprecated wrapping-text slot with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        mediaInline();
        const { element } = createTestComponent(tagName);
        
        const img = document.createElement('img');
        img.setAttribute('slot', 'image');
        img.src = 'test.jpg';
        img.alt = 'Test';
        element.appendChild(img);
        
        const wrappingText = document.createElement('div');
        wrappingText.setAttribute('slot', 'wrapping-text');
        wrappingText.textContent = 'Old wrapping text';
        element.appendChild(wrappingText)
      });
      
      expect(validateDeprecatedSlot(warnings, 'wrapping-text')).toBe(true);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      mediaInline();
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.src = 'test.jpg';
      img.alt = 'Test';
      element.appendChild(img)
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle data-align attribute with right value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-align': 'right'
      });
      
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.src = 'test.jpg';
      img.alt = 'Test';
      element.appendChild(img)
      const attributes = getComponentAttributes(element);
      expect(attributes['data-align']).toBe('right');
    });

    it('should handle deprecated theme attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'theme': 'dark'
        });
        
        const img = document.createElement('img');
        img.setAttribute('slot', 'image');
        img.src = 'test.jpg';
        img.alt = 'Test';
        element.appendChild(img)
      });
      
      expect(validateDeprecatedAttribute(warnings, 'theme', 'data-theme')).toBe(true);
    });

    it('should handle deprecated align attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'align': 'right'
        });
        
        const img = document.createElement('img');
        img.setAttribute('slot', 'image');
        img.src = 'test.jpg';
        img.alt = 'Test';
        element.appendChild(img)
      });
      
      expect(validateDeprecatedAttribute(warnings, 'align', 'data-align')).toBe(true);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      mediaInline();
    });

    it('should not have observed attributes', () => {
      // This component doesn't have observed attributes based on the code
      const { element } = createTestComponent(tagName);
      
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.src = 'test.jpg';
      img.alt = 'Test';
      element.appendChild(img);
      // Component should exist without observed attributes
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });
});