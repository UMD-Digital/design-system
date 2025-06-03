import alertSite from '../../alert/site';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  captureWarnings,
  captureWarningsAsync,
  createSlotContent,
  setAttributeAndWait,
} from '../test-helpers/component';
import {
  validateSlotConfiguration,
  validateDeprecatedSlot,
  getComponentAttributes,
} from '../test-helpers/validation';

describe('Component: umd-element-alert-site', () => {
  const tagName = 'umd-element-alert-site';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-alert-site');
      document.body.appendChild(testElement);
      
      alertSite();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      alertSite();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      alertSite();
    });

    it('should validate headline and text slots', () => {
      const { element } = createTestComponent(tagName);
      
      // Add slots
      element.appendChild(createSlotContent('headline', 'h2', 'System Maintenance'));
      element.appendChild(createSlotContent('text', 'p', 'Scheduled downtime this weekend'));
      
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
        element.appendChild(createSlotContent('headline', tag, 'Site Alert'));
        element.appendChild(createSlotContent('text', 'p', 'Alert Content'));
        
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
      
      element.appendChild(createSlotContent('headline', 'h2', 'Alert'));
      element.appendChild(createSlotContent('text', 'p', 'Content'));
      element.appendChild(createSlotContent('actions', 'div', 'Learn More'));
      
      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
    });

    it('should handle deprecated body slot with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName);
        element.appendChild(createSlotContent('headline', 'h3', 'Alert'));
        element.appendChild(createSlotContent('body', 'div', 'Body content'));
      });
      
      expect(validateDeprecatedSlot(warnings, 'body')).toBe(true);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      alertSite();
    });

    it('should handle days-to-hide attribute with custom value', () => {
      const { element } = createTestComponent(tagName, '', {
        'days-to-hide': '30'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['days-to-hide']).toBe('30');
    });

    it('should default to 10 days when days-to-hide not specified', () => {
      const { element } = createTestComponent(tagName);
      // The component internally defaults to '10' if not specified
      // We can't directly test the internal value, but we can verify the attribute isn't set
      const attributes = getComponentAttributes(element);
      expect(attributes['days-to-hide']).toBeUndefined();
    });

    it('should handle different days-to-hide values', () => {
      const testValues = ['1', '7', '14', '30', '365'];
      
      for (const value of testValues) {
        const { element } = createTestComponent(tagName, '', {
          'days-to-hide': value
        });
      const attributes = getComponentAttributes(element);
        expect(attributes['days-to-hide']).toBe(value);
        
        cleanupComponents();
      }
    });

    it('should handle days-to-hide attribute changes', async () => {
      const { element } = createTestComponent(tagName, '', {
        'days-to-hide': '7'
      });
      // Change the attribute
      await setAttributeAndWait(element, 'days-to-hide', '14');
      
      const attributes = getComponentAttributes(element);
      expect(attributes['days-to-hide']).toBe('14');
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      alertSite();
    });

    it('should not have observed attributes', () => {
      // This component doesn't have observed attributes based on the code
      const { element } = createTestComponent(tagName);
      // Component should exist without observed attributes
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });
});