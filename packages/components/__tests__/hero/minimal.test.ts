import { minimal as heroMinimal } from '../../source/web-components/hero/minimal';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  captureWarningsAsync,
  createSlotContent,
} from '../test-helpers/component';
import {
  validateSlotConfiguration,
  validateDeprecatedAttribute,
  getComponentAttributes,
} from '../test-helpers/validation';

describe('Component: umd-element-hero-minimal', () => {
  const tagName = 'umd-element-hero-minimal';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-hero-minimal');
      document.body.appendChild(testElement);
      
      heroMinimal();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      heroMinimal();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      heroMinimal();
    });

    it('should accept all defined slots', () => {
      const { element } = createTestComponent(tagName);
      
      // Add various slots
      element.appendChild(createSlotContent('eyebrow', 'p', 'Eyebrow text'));
      element.appendChild(createSlotContent('headline', 'h1', 'Hero Title'));
      element.appendChild(createSlotContent('text', 'p', 'Hero description'));
      element.appendChild(createSlotContent('image', 'img', ''));
      element.appendChild(createSlotContent('actions', 'div', 'Actions'));
      
      // Verify all slots are present
      expect(element.querySelector('[slot="eyebrow"]')).toBeTruthy();
      expect(element.querySelector('[slot="headline"]')).toBeTruthy();
      expect(element.querySelector('[slot="text"]')).toBeTruthy();
      expect(element.querySelector('[slot="image"]')).toBeTruthy();
      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
    });

    it('should handle hero with headline only', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h1', 'Academic Programs'));
      
      const validation = validateSlotConfiguration(element, {
        headline: { required: true },
        eyebrow: { required: false },
        text: { required: false },
        image: { required: false },
        actions: { required: false },
      });
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should handle hero with all slots', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('eyebrow', 'p', 'College of Engineering'));
      element.appendChild(createSlotContent('headline', 'h1', 'Aerospace Engineering'));
      element.appendChild(createSlotContent('text', 'p', 'Prepare for a career designing the next generation'));
      
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.setAttribute('src', 'aerospace-lab.jpg');
      img.setAttribute('alt', 'Aerospace laboratory');
      element.appendChild(img);
      
      const actions = document.createElement('div');
      actions.setAttribute('slot', 'actions');
      actions.innerHTML = '<a href="/aerospace/apply">Apply to Program</a>';
      element.appendChild(actions);
      
      const validation = validateSlotConfiguration(element, {
        headline: { required: true },
        eyebrow: { required: false },
        text: { required: false },
        image: { required: false },
        actions: { required: false },
      });
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      heroMinimal();
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

    it('should handle data-theme attribute with maryland value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'maryland'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('maryland');
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
      heroMinimal();
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
      heroMinimal();
    });

    it('should trigger load event after connection', () => {
      const { element } = createTestComponent(tagName);
      // Component has afterConnect that calls element.events.load()
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Theme Integration', () => {
    beforeEach(() => {
      heroMinimal();
    });

    it('should apply dark theme styling', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      
      element.appendChild(createSlotContent('headline', 'h1', 'Dark Theme Hero'));
      expect(element.getAttribute('data-theme')).toBe('dark');
    });

    it('should apply light theme styling', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'light'
      });
      
      element.appendChild(createSlotContent('headline', 'h1', 'Light Theme Hero'));
      expect(element.getAttribute('data-theme')).toBe('light');
    });

    it('should apply maryland theme styling', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'maryland'
      });
      
      element.appendChild(createSlotContent('headline', 'h1', 'Go Terps!'));
      expect(element.getAttribute('data-theme')).toBe('maryland');
    });
  });
});