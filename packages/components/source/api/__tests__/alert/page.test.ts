import alertPage from '../../alert/page';
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

describe('Component: umd-element-alert-page', () => {
  const tagName = 'umd-element-alert-page';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-alert-page');
      document.body.appendChild(testElement);
      
      alertPage();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      alertPage();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      alertPage();
    });

    it('should validate headline and text slots', () => {
      const { element } = createTestComponent(tagName);
      
      // Add slots
      element.appendChild(createSlotContent('headline', 'h3', 'Alert Title'));
      element.appendChild(createSlotContent('text', 'p', 'Alert content'));
      
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
        element.appendChild(createSlotContent('headline', tag, 'Heading'));
        element.appendChild(createSlotContent('text', 'p', 'Content'));
        
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
      
      element.appendChild(createSlotContent('headline', 'h3', 'Alert'));
      element.appendChild(createSlotContent('text', 'p', 'Content'));
      element.appendChild(createSlotContent('actions', 'div', 'Actions'));
      
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
      alertPage();
    });

    it('should handle data-theme attribute with light value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'light'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('light');
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle data-visual-icon attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual-icon': 'show'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-visual-icon']).toBe('show');
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
          'visual-icon': 'show'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'visual-icon', 'data-visual-icon')).toBe(true);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      alertPage();
    });

    it('should not have observed attributes', () => {
      // This component doesn't have observed attributes based on the code
      const { element } = createTestComponent(tagName);
      // Component should exist without observed attributes
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });
});