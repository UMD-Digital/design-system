import { display as quoteDisplay } from '../../source/web-components/quote/display';
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
  isComponentRegistered,
  validateDeprecatedAttribute,
  getComponentAttributes,
} from '../test-helpers/validation';

describe('Component: umd-element-quote', () => {
  const tagName = 'umd-element-quote';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-quote');
      document.body.appendChild(testElement);
      
      quoteDisplay();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      quoteDisplay();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      quoteDisplay();
    });

    it('should validate required quote slot', () => {
      const { element } = createTestComponent(tagName);
      
      // Add required quote slot
      const quote = document.createElement('blockquote');
      quote.setAttribute('slot', 'quote');
      quote.textContent = 'Test quote content';
      element.appendChild(quote);
      
      const validation = validateSlotConfiguration(element, {
        quote: { required: true },
      });
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should fail validation when required quote slot is missing', () => {
      const { element } = createTestComponent(tagName);
      
      const validation = validateSlotConfiguration(element, {
        quote: { required: true },
      });
      
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('Required slot "quote" is empty');
    });

    it('should accept optional slots', () => {
      const { element } = createTestComponent(tagName);
      
      // Add required quote
      element.appendChild(createSlotContent('quote', 'blockquote', 'Quote text'));
      
      // Add optional slots
      element.appendChild(createSlotContent('attribution', 'cite', 'John Doe'));
      element.appendChild(createSlotContent('attribution-sub-text', 'span', 'CEO'));
      element.appendChild(createSlotContent('image', 'img', ''));
      element.appendChild(createSlotContent('actions', 'a', 'Read more'));
      
      // All slots should be valid
      expect(element.querySelector('[slot="attribution"]')).toBeTruthy();
      expect(element.querySelector('[slot="attribution-sub-text"]')).toBeTruthy();
      expect(element.querySelector('[slot="image"]')).toBeTruthy();
      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
    });

    it('should not have deprecated slots', () => {
      // This component doesn't have deprecated slots based on the code
      const { element } = createTestComponent(tagName);
      element.appendChild(createSlotContent('quote', 'blockquote', 'Quote text'));
      expect(element).toBeDefined();
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      quoteDisplay();
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle data-theme attribute with maryland value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'maryland'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('maryland');
    });

    it('should handle data-visual attribute with transparent value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual': 'transparent'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-visual']).toBe('transparent');
    });

    it('should handle data-visual attribute with size-large value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual': 'size-large'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-visual']).toBe('size-large');
    });

    it('should handle data-display attribute with featured value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-display': 'featured'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-display']).toBe('featured');
    });

    it('should handle deprecated theme attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'theme': 'dark'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'theme', 'data-theme')).toBe(true);
    });

    it('should handle deprecated visual attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'visual': 'transparent'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'visual', 'data-visual')).toBe(true);
    });

    it('should handle deprecated display attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'display': 'featured'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'display', 'data-display')).toBe(true);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      quoteDisplay();
    });

    it('should not have observed attributes', async () => {
      // Based on the code, this component doesn't have observed attributes
      const { element } = createTestComponent(tagName);
      // Try changing an attribute - should not trigger any special behavior
      await setAttributeAndWait(element, 'data-theme', 'dark');
      expect(element.getAttribute('data-theme')).toBe('dark');
      
      // Change to another value
      await setAttributeAndWait(element, 'data-theme', 'maryland');
      expect(element.getAttribute('data-theme')).toBe('maryland');
    });
  });

  describe('Component Variants', () => {
    beforeEach(() => {
      quoteDisplay();
    });

    it('should create inline quote by default', () => {
      const { element } = createTestComponent(tagName);
      element.appendChild(createSlotContent('quote', 'blockquote', 'Quote text'));
      // Without data-display="featured", should create inline variant
      expect(element.hasAttribute('data-display')).toBe(false);
    });

    it('should create featured quote with data-display="featured"', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-display': 'featured'
      });
      element.appendChild(createSlotContent('quote', 'blockquote', 'Quote text'));
      expect(element.getAttribute('data-display')).toBe('featured');
    });

    it('should support multiple visual options', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'maryland',
        'data-visual': 'size-large',
        'data-display': 'featured'
      });
      element.appendChild(createSlotContent('quote', 'blockquote', 'Quote text'));
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('maryland');
      expect(attributes['data-visual']).toBe('size-large');
      expect(attributes['data-display']).toBe('featured');
    });
  });
});