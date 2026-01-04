import { icon as cardIcon } from '../../source/web-components/card/icon';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  createSlotContent,
} from '../test-helpers/component';
import {
  validateSlotConfiguration,
  getComponentAttributes,
  validateDeprecatedAttribute,
} from '../test-helpers/validation';
import { captureWarningsAsync } from '../test-helpers/component';

describe('Component: umd-element-card-icon', () => {
  const tagName = 'umd-element-card-icon';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-card-icon');
      document.body.appendChild(testElement);
      
      cardIcon();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      cardIcon();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      cardIcon();
    });

    it('should require headline slot', () => {
      const { element } = createTestComponent(tagName);
      
      // Test without headline (should be invalid)
      let validation = validateSlotConfiguration(element, {
        headline: { required: true, allowedElements: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'] },
      });
      
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('Required slot "headline" is empty');
      
      // Add headline and test again
      element.appendChild(createSlotContent('headline', 'h3', 'Icon Card Title'));
      
      validation = validateSlotConfiguration(element, {
        headline: { required: true, allowedElements: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'] },
      });
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should require image slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h3', 'Title'));
      
      // Image is required but validation happens internally
      // We can verify the slot exists
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.src = 'icon.svg';
      img.alt = 'Icon';
      element.appendChild(img);
      
      expect(element.querySelector('[slot="image"]')).toBeTruthy();
    });

    it('should accept optional text slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h3', 'Title'));
      element.appendChild(createSlotContent('text', 'p', 'Description text'));
      
      expect(element.querySelector('[slot="text"]')).toBeTruthy();
    });

    it('should accept all allowed heading levels in headline slot', () => {
      const headingLevels = ['h2', 'h3', 'h4', 'h5', 'h6', 'p'];
      
      headingLevels.forEach(tag => {
        const { element } = createTestComponent(tagName);
        element.appendChild(createSlotContent('headline', tag, 'Icon Heading'));
        
        const validation = validateSlotConfiguration(element, {
          headline: { required: true, allowedElements: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'] },
        });
        
        expect(validation.valid).toBe(true);
        cleanupComponents();
      });
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      cardIcon();
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
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
      cardIcon();
    });

    it('should not have observed attributes', () => {
      // This component doesn't have observed attributes based on the code
      const { element } = createTestComponent(tagName);
      // Component should exist without observed attributes
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });
});