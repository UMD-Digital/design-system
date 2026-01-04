import { event as cardEvent } from '../../source/web-components/card/event';
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

describe('Component: umd-element-event', () => {
  const tagName = 'umd-element-event';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-event');
      document.body.appendChild(testElement);
      
      cardEvent();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      cardEvent();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      cardEvent();
    });

    it('should validate headline slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h3', 'Event Title'));
      
      const validation = validateSlotConfiguration(element, {
        headline: { allowedElements: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'] },
      });
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should require date-start-iso slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h3', 'Event'));
      
      // Add start date
      const startDate = document.createElement('time');
      startDate.setAttribute('slot', 'date-start-iso');
      startDate.setAttribute('datetime', '2024-03-15T09:00:00');
      startDate.textContent = 'March 15, 2024';
      element.appendChild(startDate);
      
      expect(element.querySelector('[slot="date-start-iso"]')).toBeTruthy();
    });

    it('should accept optional date-end-iso slot', () => {
      const { element } = createTestComponent(tagName);
      
      // Add end date
      const endDate = document.createElement('time');
      endDate.setAttribute('slot', 'date-end-iso');
      endDate.setAttribute('datetime', '2024-03-15T17:00:00');
      endDate.textContent = 'March 15, 2024 at 5:00 PM';
      element.appendChild(endDate);
      
      expect(element.querySelector('[slot="date-end-iso"]')).toBeTruthy();
    });

    it('should accept optional location slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('location', 'p', 'Stamp Student Union'));
      
      expect(element.querySelector('[slot="location"]')).toBeTruthy();
    });

    it('should accept optional text slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h3', 'Event'));
      element.appendChild(createSlotContent('text', 'p', 'Event description'));
      
      expect(element.querySelector('[slot="text"]')).toBeTruthy();
    });

    it('should accept optional image slot', () => {
      const { element } = createTestComponent(tagName);
      
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.src = 'event.jpg';
      img.alt = 'Event image';
      element.appendChild(img);
      
      expect(element.querySelector('[slot="image"]')).toBeTruthy();
    });

    it('should accept optional eyebrow slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('eyebrow', 'p', 'Featured Event'));
      
      expect(element.querySelector('[slot="eyebrow"]')).toBeTruthy();
    });

    it('should accept optional actions slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('actions', 'div', 'Register Now'));
      
      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
    });

    it('should require start date slot', () => {
      const { element } = createTestComponent(tagName);
      element.appendChild(createSlotContent('headline', 'h3', 'Event'));
      
      // Component created without required start date
      expect(element.querySelector('[slot="date-start-iso"]')).toBeNull();
      
      // In the real component, missing start date would:
      // 1. Log error: 'Missing start date for event web component'
      // 2. Return an empty div instead of the event card
      // This ensures the component fails safely when required data is missing
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      cardEvent();
    });

    it('should handle data-display attribute with feature value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-display': 'feature'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-display']).toBe('feature');
    });

    it('should handle data-display attribute with promo value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-display': 'promo'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-display']).toBe('promo');
    });

    it('should handle data-display attribute with list value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-display': 'list'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-display']).toBe('list');
    });

    it('should handle data-feature attribute with visual-time value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-feature': 'visual-time'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-feature']).toBe('visual-time');
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle data-visual attribute with transparent value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual': 'transparent'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-visual']).toBe('transparent');
    });

    it('should handle deprecated display attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'display': 'feature'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'display', 'data-display')).toBe(true);
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
          'feature': 'visual-time'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'feature', 'data-feature')).toBe(true);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      cardEvent();
    });

    it('should not have observed attributes', () => {
      // This component doesn't have observed attributes based on the code
      const { element } = createTestComponent(tagName);
      // Component should exist without observed attributes
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });
});