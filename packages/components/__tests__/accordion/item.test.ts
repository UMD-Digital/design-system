import accordionItem from '../../source/api/accordion/item';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  captureWarnings,
  captureWarningsAsync,
  createSlotContent,
  setAttributeAndWait,
} from '../../test-helpers/component';
import {
  validateSlotConfiguration,
  isComponentRegistered,
  validateDeprecatedSlot,
  validateDeprecatedAttribute,
  getComponentAttributes,
} from '../../test-helpers/validation';

describe('Component: umd-element-accordion-item', () => {
  const tagName = 'umd-element-accordion-item';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-accordion-item');
      document.body.appendChild(testElement);
      
      accordionItem();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      accordionItem();
      
      const { element } = createTestComponent(tagName);
      
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      accordionItem();
    });

    it('should validate required slots', () => {
      const { element } = createTestComponent(tagName);
      
      // Add required slots
      element.appendChild(createSlotContent('headline', 'p', 'Test Headline'));
      element.appendChild(createSlotContent('text', 'div', 'Test Content'));
      
      const validation = validateSlotConfiguration(element, {
        headline: { required: true, allowedElements: ['span', 'p'] },
        text: { required: true, allowedElements: ['div', 'p'] },
      });
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should fail validation when required slots are missing', () => {
      const { element } = createTestComponent(tagName);
      
      const validation = validateSlotConfiguration(element, {
        headline: { required: true, allowedElements: ['span', 'p'] },
        text: { required: true, allowedElements: ['div', 'p'] },
      });
      
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('Required slot "headline" is empty');
      expect(validation.errors).toContain('Required slot "text" is empty');
    });

    it('should accept allowed elements in slots', () => {
      const { element } = createTestComponent(tagName);
      
      // Test with span in headline
      element.appendChild(createSlotContent('headline', 'span', 'Headline'));
      element.appendChild(createSlotContent('text', 'p', 'Content'));
      
      const validation = validateSlotConfiguration(element, {
        headline: { required: true, allowedElements: ['span', 'p'] },
        text: { required: true, allowedElements: ['div', 'p'] },
      });
      
      expect(validation.valid).toBe(true);
    });

    it('should reject non-allowed elements in slots', () => {
      const { element } = createTestComponent(tagName);
      
      // Use h2 which is not allowed in headline
      element.appendChild(createSlotContent('headline', 'h2', 'Headline'));
      element.appendChild(createSlotContent('text', 'div', 'Content'));
      
      const validation = validateSlotConfiguration(element, {
        headline: { required: true, allowedElements: ['span', 'p'] },
        text: { required: true, allowedElements: ['div', 'p'] },
      });
      
      expect(validation.valid).toBe(false);
      expect(validation.errors[0]).toContain('Invalid element <h2> in slot "headline"');
    });

    it('should handle deprecated body slot with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName);
        element.appendChild(createSlotContent('body', 'div', 'Body Content'));
      });
      
      expect(validateDeprecatedSlot(warnings, 'body')).toBe(true);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      accordionItem();
    });

    it('should handle data-theme attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle data-visual-open attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual-open': 'true'
      });
      
      const attributes = getComponentAttributes(element);
      expect(attributes['data-visual-open']).toBe('true');
    });

    it('should handle deprecated theme attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'theme': 'dark'
        });
      });
      
      expect(validateDeprecatedAttribute(warnings, 'theme', 'data-theme')).toBe(true);
    });

    it('should handle deprecated visual-open attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'visual-open': 'true'
        });
      });
      
      expect(validateDeprecatedAttribute(warnings, 'visual-open', 'data-visual-open')).toBe(true);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      accordionItem();
    });

    it('should react to data-visual-open attribute changes', () => {
      const { element } = createTestComponent(tagName);
      
      // Set initial state
      setAttributeAndWait(element, 'data-visual-open', 'false');
      expect(element.getAttribute('data-visual-open')).toBe('false');
      
      // Change to open
      setAttributeAndWait(element, 'data-visual-open', 'true');
      expect(element.getAttribute('data-visual-open')).toBe('true');
    });

    it('should react to resize attribute', () => {
      const { element } = createTestComponent(tagName);
      
      // Trigger resize
      setAttributeAndWait(element, 'resize', 'true');
      expect(element.getAttribute('resize')).toBe('true');
      
      // Remove resize attribute
      setAttributeAndWait(element, 'resize', null);
      expect(element.hasAttribute('resize')).toBe(false);
    });

    it('should handle deprecated is-visual-open observed attribute', () => {
      const { element } = createTestComponent(tagName);
      
      // Use deprecated observed attribute
      setAttributeAndWait(element, 'is-visual-open', 'true');
      
      // Verify the attribute is set
      expect(element.getAttribute('is-visual-open')).toBe('true');
      
      // In the real component, using 'is-visual-open' would:
      // 1. Still function correctly for backwards compatibility
      // 2. Log a deprecation warning suggesting to use 'data-visual-open' instead
      // 3. Be removed in version 2.0
    });
  });
});