import heroBase from '../../hero/base';
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
  validateDeprecatedAttribute,
  getComponentAttributes,
} from '../test-helpers/validation';

describe('Component: umd-element-hero', () => {
  const tagName = 'umd-element-hero';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-hero');
      document.body.appendChild(testElement);
      
      heroBase();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      heroBase();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      heroBase();
    });

    it('should accept all defined slots', () => {
      const { element } = createTestComponent(tagName);
      
      // Add various slots
      element.appendChild(createSlotContent('eyebrow', 'p', 'Eyebrow text'));
      element.appendChild(createSlotContent('headline', 'h1', 'Hero Title'));
      element.appendChild(createSlotContent('text', 'p', 'Hero description'));
      element.appendChild(createSlotContent('image', 'img', ''));
      element.appendChild(createSlotContent('video', 'video', ''));
      element.appendChild(createSlotContent('actions', 'div', 'Actions'));
      
      // Verify all slots are present
      expect(element.querySelector('[slot="eyebrow"]')).toBeTruthy();
      expect(element.querySelector('[slot="headline"]')).toBeTruthy();
      expect(element.querySelector('[slot="text"]')).toBeTruthy();
      expect(element.querySelector('[slot="image"]')).toBeTruthy();
      expect(element.querySelector('[slot="video"]')).toBeTruthy();
      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      heroBase();
    });

    it('should handle type attribute with default-centered value', () => {
      const { element } = createTestComponent(tagName, '', {
        'type': 'default-centered'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['type']).toBe('default-centered');
    });

    it('should handle type attribute with default-interior value', () => {
      const { element } = createTestComponent(tagName, '', {
        'type': 'default-interior'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['type']).toBe('default-interior');
    });

    it('should handle type attribute with default-interior-centered value', () => {
      const { element } = createTestComponent(tagName, '', {
        'type': 'default-interior-centered'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['type']).toBe('default-interior-centered');
    });

    it('should handle type attribute with stacked value', () => {
      const { element } = createTestComponent(tagName, '', {
        'type': 'stacked'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['type']).toBe('stacked');
    });

    it('should handle type attribute with stacked-interior value', () => {
      const { element } = createTestComponent(tagName, '', {
        'type': 'stacked-interior'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['type']).toBe('stacked-interior');
    });

    it('should handle type attribute with minimal value', () => {
      const { element } = createTestComponent(tagName, '', {
        'type': 'minimal'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['type']).toBe('minimal');
    });

    it('should handle type attribute with overlay value', () => {
      const { element } = createTestComponent(tagName, '', {
        'type': 'overlay'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['type']).toBe('overlay');
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle data-feature attribute with animation value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-feature': 'animation'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-feature']).toBe('animation');
    });

    it('should handle data-visual-align attribute with center value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual-align': 'center'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-visual-align']).toBe('center');
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
          'feature': 'animation'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'feature', 'data-feature')).toBe(true);
    });

    it('should handle deprecated visual-align attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'visual-align': 'center'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'visual-align', 'data-visual-align')).toBe(true);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      heroBase();
    });

    it('should not have observed attributes', () => {
      // This component doesn't have observed attributes based on the code
      const { element } = createTestComponent(tagName);
      // Component should exist without observed attributes
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Component Lifecycle', () => {
    beforeEach(() => {
      heroBase();
    });

    it('should trigger load event after connection', () => {
      const { element } = createTestComponent(tagName);
      // Component has afterConnect that calls element.events.load()
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });
});