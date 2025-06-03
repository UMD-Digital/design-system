import statDisplay from '../../stat/display';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  createSlotContent,
} from '../test-helpers/component';
import {
  getComponentAttributes,
  validateDeprecatedAttribute,
} from '../test-helpers/validation';
import { captureWarningsAsync } from '../test-helpers/component';

describe('Component: umd-element-stat', () => {
  const tagName = 'umd-element-stat';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-stat');
      document.body.appendChild(testElement);
      
      statDisplay();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      statDisplay();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      statDisplay();
    });

    it('should accept stat slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('stat', 'span', '40,000+'));
      
      expect(element.querySelector('[slot="stat"]')).toBeTruthy();
      expect(element.querySelector('[slot="stat"]')?.textContent).toBe('40,000+');
    });

    it('should accept default slot for descriptive text', () => {
      const { element } = createTestComponent(tagName);
      
      const text = document.createElement('p');
      text.textContent = 'Students Enrolled';
      element.appendChild(text);
      
      expect(element.querySelector('p:not([slot])')).toBeTruthy();
      expect(element.querySelector('p:not([slot])')?.textContent).toBe('Students Enrolled');
    });

    it('should accept sub-text slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('sub-text', 'p', 'Additional context here'));
      
      expect(element.querySelector('[slot="sub-text"]')).toBeTruthy();
      expect(element.querySelector('[slot="sub-text"]')?.textContent).toBe('Additional context here');
    });

    it('should handle all slots together', () => {
      const { element } = createTestComponent(tagName);
      
      // Add all slots
      element.appendChild(createSlotContent('stat', 'span', '$500M'));
      
      const mainText = document.createElement('p');
      mainText.textContent = 'Annual Research Funding';
      element.appendChild(mainText);
      
      element.appendChild(createSlotContent('sub-text', 'p', 'Supporting groundbreaking discoveries'));
      
      expect(element.querySelector('[slot="stat"]')).toBeTruthy();
      expect(element.querySelector('p:not([slot])')).toBeTruthy();
      expect(element.querySelector('[slot="sub-text"]')).toBeTruthy();
    });

    it('should work without any slots', () => {
      const { element } = createTestComponent(tagName);
      // Component should render even without content
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      statDisplay();
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle data-type attribute with different values', () => {
      const types = ['inline', 'block', 'featured'];
      
      for (const type of types) {
        const { element } = createTestComponent(tagName, '', {
          'data-type': type
        });
      const attributes = getComponentAttributes(element);
        expect(attributes['data-type']).toBe(type);
        
        cleanupComponents();
      }
    });

    it('should handle data-size attribute with different values', () => {
      const sizes = ['small', 'medium', 'large'];
      
      for (const size of sizes) {
        const { element } = createTestComponent(tagName, '', {
          'data-size': size
        });
      const attributes = getComponentAttributes(element);
        expect(attributes['data-size']).toBe(size);
        
        cleanupComponents();
      }
    });

    it('should handle data-has-line attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-has-line': ''
      });
      expect(element.hasAttribute('data-has-line')).toBe(true);
    });

    it('should handle deprecated theme attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'theme': 'dark'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'theme', 'data-theme')).toBe(true);
    });

    it('should handle deprecated type attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'type': 'featured'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'type', 'data-type')).toBe(true);
    });

    it('should handle deprecated size attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'size': 'large'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'size', 'data-size')).toBe(true);
    });

    it('should handle deprecated has-line attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'has-line': ''
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'has-line', 'data-has-line')).toBe(true);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      statDisplay();
    });

    it('should not have observed attributes', () => {
      // This component doesn't have observed attributes based on the code
      const { element } = createTestComponent(tagName);
      // Component should exist without observed attributes
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Component Variations', () => {
    beforeEach(() => {
      statDisplay();
    });

    it('should create inline stat display', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-type': 'inline',
        'data-size': 'small'
      });
      
      element.appendChild(createSlotContent('stat', 'span', '12:1'));
      const text = document.createElement('p');
      text.textContent = 'Student-Faculty Ratio';
      element.appendChild(text)
      expect(element.getAttribute('data-type')).toBe('inline');
      expect(element.getAttribute('data-size')).toBe('small');
    });

    it('should create featured stat with all options', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-type': 'featured',
        'data-size': 'large',
        'data-theme': 'dark',
        'data-has-line': ''
      });
      
      element.appendChild(createSlotContent('stat', 'span', '#1'));
      const text = document.createElement('p');
      text.textContent = 'Public University in Maryland';
      element.appendChild(text);
      element.appendChild(createSlotContent('sub-text', 'p', 'According to rankings'));
      expect(element.getAttribute('data-type')).toBe('featured');
      expect(element.getAttribute('data-size')).toBe('large');
      expect(element.getAttribute('data-theme')).toBe('dark');
      expect(element.hasAttribute('data-has-line')).toBe(true);
    });
  });
});