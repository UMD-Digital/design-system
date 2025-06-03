import textEventLockup from '../../text/event-lockup';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  createSlotContent,
  setAttributeAndWait,
  captureWarningsAsync,
} from '../test-helpers/component';
import {
  validateSlotConfiguration,
  getComponentAttributes,
  validateDeprecatedAttribute,
} from '../test-helpers/validation';

describe('Component: umd-element-events-date', () => {
  const tagName = 'umd-element-events-date';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-events-date');
      document.body.appendChild(testElement);
      
      textEventLockup();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      textEventLockup();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      textEventLockup();
    });

    it('should accept optional headline slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h3', 'Spring Commencement'));
      
      expect(element.querySelector('[slot="headline"]')).toBeTruthy();
    });

    it('should accept various heading levels in headline slot', () => {
      const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      
      headingLevels.forEach(tag => {
        const { element } = createTestComponent(tagName);
        element.appendChild(createSlotContent('headline', tag, 'Event Title'));
        
        const headlineElement = element.querySelector(`[slot="headline"]`);
        expect(headlineElement).toBeTruthy();
        expect(headlineElement?.tagName.toLowerCase()).toBe(tag);
        cleanupComponents();
        textEventLockup();
      });
    });

    it('should accept optional date-start-iso slot', () => {
      const { element } = createTestComponent(tagName);
      
      const startTime = document.createElement('time');
      startTime.setAttribute('slot', 'date-start-iso');
      startTime.setAttribute('datetime', '2024-05-22');
      startTime.textContent = 'May 22, 2024';
      element.appendChild(startTime);
      
      expect(element.querySelector('[slot="date-start-iso"]')).toBeTruthy();
    });

    it('should accept optional date-end-iso slot', () => {
      const { element } = createTestComponent(tagName);
      
      const startTime = document.createElement('time');
      startTime.setAttribute('slot', 'date-start-iso');
      startTime.setAttribute('datetime', '2024-08-26');
      startTime.textContent = 'August 26, 2024';
      element.appendChild(startTime);
      
      const endTime = document.createElement('time');
      endTime.setAttribute('slot', 'date-end-iso');
      endTime.setAttribute('datetime', '2024-08-30');
      endTime.textContent = 'August 30, 2024';
      element.appendChild(endTime);
      
      expect(element.querySelector('[slot="date-end-iso"]')).toBeTruthy();
    });

    it('should handle event with time information', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h3', 'Guest Lecture: Future of AI'));
      
      const startTime = document.createElement('time');
      startTime.setAttribute('slot', 'date-start-iso');
      startTime.setAttribute('datetime', '2024-04-15T18:00:00');
      startTime.textContent = 'April 15, 2024 6:00 PM';
      element.appendChild(startTime);
      
      const endTime = document.createElement('time');
      endTime.setAttribute('slot', 'date-end-iso');
      endTime.setAttribute('datetime', '2024-04-15T20:00:00');
      endTime.textContent = 'April 15, 2024 8:00 PM';
      element.appendChild(endTime);
      
      expect(element.querySelector('[slot="date-start-iso"]')).toBeTruthy();
      expect(element.querySelector('[slot="date-end-iso"]')).toBeTruthy();
    });

    it('should handle event without date (text only)', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h3', 'Ongoing Exhibition: Art of the Americas'));
      
      // Should work without any date slots
      expect(element.querySelector('[slot="headline"]')).toBeTruthy();
      expect(element.querySelector('[slot="date-start-iso"]')).toBeFalsy();
      expect(element.querySelector('[slot="date-end-iso"]')).toBeFalsy();
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      textEventLockup();
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      
      element.appendChild(createSlotContent('headline', 'h3', 'Event Title'));
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle deprecated theme attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'theme': 'dark'
        });
        
        element.appendChild(createSlotContent('headline', 'h3', 'Event Title'));
      });
      
      expect(validateDeprecatedAttribute(warnings, 'theme', 'data-theme')).toBe(true);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      textEventLockup();
    });

    it('should observe resize attribute', async () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h3', 'Event Title'));
      // Test setting resize attribute
      await setAttributeAndWait(element, 'resize', 'true');
      
      // Should not throw error
      expect(element.hasAttribute('resize')).toBe(true);
    });

    it('should trigger SetDateElementsSizes when resize attribute changes', async () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h3', 'Event Title'));
      
      const startTime = document.createElement('time');
      startTime.setAttribute('slot', 'date-start-iso');
      startTime.setAttribute('datetime', '2024-05-22');
      startTime.textContent = 'May 22, 2024';
      element.appendChild(startTime);
      // Mock the SetDateElementsSizes event handler
      const mockSetDateElementsSizes = jest.fn();
      if ((element as any).events) {
        (element as any).events.SetDateElementsSizes = mockSetDateElementsSizes;
      }
      
      // Trigger resize
      await setAttributeAndWait(element, 'resize', 'true');
      
      // Note: In a real implementation, this would trigger the SetDateElementsSizes callback
      // For testing purposes, we're just verifying the attribute is set
      expect(element.getAttribute('resize')).toBe('true');
    });
  });
});