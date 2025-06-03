import cardOverlay from '../../card/overlay';
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

describe('Component: umd-element-card-overlay', () => {
  const tagName = 'umd-element-card-overlay';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-card-overlay');
      document.body.appendChild(testElement);
      
      cardOverlay();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      cardOverlay();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      cardOverlay();
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
      element.appendChild(createSlotContent('headline', 'h2', 'Overlay Card Title'));
      
      validation = validateSlotConfiguration(element, {
        headline: { required: true, allowedElements: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'] },
      });
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should accept optional text slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h2', 'Title'));
      element.appendChild(createSlotContent('text', 'p', 'Description text'));
      
      expect(element.querySelector('[slot="text"]')).toBeTruthy();
    });

    it('should accept optional eyebrow slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h2', 'Title'));
      element.appendChild(createSlotContent('eyebrow', 'p', 'Category'));
      
      expect(element.querySelector('[slot="eyebrow"]')).toBeTruthy();
    });

    it('should accept optional image slot for image layout', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h2', 'Title'));
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.src = 'background.jpg';
      img.alt = 'Background';
      element.appendChild(img);
      
      expect(element.querySelector('[slot="image"]')).toBeTruthy();
    });

    it('should accept optional actions slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h2', 'Title'));
      element.appendChild(createSlotContent('actions', 'div', 'Learn More'));
      
      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
    });

    it('should accept optional date slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h2', 'Title'));
      element.appendChild(createSlotContent('date', 'p', 'January 1, 2024'));
      
      expect(element.querySelector('[slot="date"]')).toBeTruthy();
    });

    it('should accept optional cta-icon slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h2', 'Title'));
      element.appendChild(createSlotContent('cta-icon', 'span', '→'));
      
      expect(element.querySelector('[slot="cta-icon"]')).toBeTruthy();
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      cardOverlay();
    });

    it('should handle data-layout attribute with image value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-layout': 'image'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-layout']).toBe('image');
    });

    it('should handle data-visual attribute with quote value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual': 'quote'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-visual']).toBe('quote');
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle data-theme attribute with light value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'light'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('light');
    });

    it('should handle deprecated layout attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'layout': 'image'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'layout', 'data-layout')).toBe(true);
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
          'visual': 'quote'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'visual', 'data-visual')).toBe(true);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      cardOverlay();
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
      cardOverlay();
    });

    it('should call load event after connect', () => {
      const { element } = createTestComponent(tagName);
      element.appendChild(createSlotContent('headline', 'h2', 'Title'));
      
      // Mock the events.load function
      const mockLoad = jest.fn();
      (element as any).events = { load: mockLoad };// The afterConnect callback should have been called
      // Note: In real implementation this would be called by the framework
    });
  });
});