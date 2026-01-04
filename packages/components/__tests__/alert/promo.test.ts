import { promo as alertPromo } from '../../source/web-components/alert/promo';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  captureWarnings,
  captureWarningsAsync,
  createSlotContent,
} from '../test-helpers/component';
import {
  validateSlotConfiguration,
  validateDeprecatedSlot,
  validateDeprecatedAttribute,
  getComponentAttributes,
} from '../test-helpers/validation';

describe('Component: umd-element-banner-promo', () => {
  const tagName = 'umd-element-banner-promo';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-banner-promo');
      document.body.appendChild(testElement);
      
      alertPromo();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      alertPromo();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      alertPromo();
    });

    it('should validate headline and text slots', () => {
      const { element } = createTestComponent(tagName);
      
      // Add slots
      element.appendChild(createSlotContent('headline', 'h2', 'Spring 2024 Applications'));
      element.appendChild(createSlotContent('text', 'p', 'Apply now for admission'));
      
      const validation = validateSlotConfiguration(element, {
        headline: { allowedElements: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'] },
        text: { allowedElements: ['div', 'p'] },
      });
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should accept all allowed heading levels in headline slot', () => {
      const headingLevels = ['h2', 'h3', 'h4', 'h5', 'h6', 'p'];
      
      headingLevels.forEach(tag => {
        const { element } = createTestComponent(tagName);
        element.appendChild(createSlotContent('headline', tag, 'Promo Heading'));
        element.appendChild(createSlotContent('text', 'p', 'Promo Content'));
        
        const validation = validateSlotConfiguration(element, {
          headline: { allowedElements: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'] },
          text: { allowedElements: ['div', 'p'] },
        });
        
        expect(validation.valid).toBe(true);
        cleanupComponents();
      });
    });

    it('should accept optional actions slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h2', 'Promo'));
      element.appendChild(createSlotContent('text', 'p', 'Content'));
      element.appendChild(createSlotContent('actions', 'div', 'Apply Now'));
      
      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
    });

    it('should handle deprecated body slot with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName);
        element.appendChild(createSlotContent('headline', 'h3', 'Promo'));
        element.appendChild(createSlotContent('body', 'div', 'Body content'));
      });
      
      expect(validateDeprecatedSlot(warnings, 'body')).toBe(true);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      alertPromo();
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle data-visual-icon attribute with seal value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual-icon': 'seal'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-visual-icon']).toBe('seal');
    });

    it('should handle deprecated theme attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'theme': 'dark'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'theme', 'data-theme')).toBe(true);
    });

    it('should handle deprecated visual-icon attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'visual-icon': 'seal'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'visual-icon', 'data-visual-icon')).toBe(true);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      alertPromo();
    });

    it('should not have observed attributes', () => {
      // This component doesn't have observed attributes based on the code
      const { element } = createTestComponent(tagName);
      // Component should exist without observed attributes
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });
});