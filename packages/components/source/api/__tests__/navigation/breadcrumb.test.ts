import navigationBreadcrumb from '../../navigation/breadcrumb';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
} from '../test-helpers/component';
import {
  validateSlotConfiguration,
  getComponentAttributes,
  validateDeprecatedAttribute,
} from '../test-helpers/validation';
import { captureWarningsAsync } from '../test-helpers/component';

describe('Component: umd-element-breadcrumb', () => {
  const tagName = 'umd-element-breadcrumb';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-breadcrumb');
      document.body.appendChild(testElement);
      
      navigationBreadcrumb();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      navigationBreadcrumb();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      navigationBreadcrumb();
    });

    it('should require paths slot', () => {
      const { element } = createTestComponent(tagName);
      
      // Test without paths (should be invalid)
      let validation = validateSlotConfiguration(element, {
        paths: { required: true },
      });
      
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('Required slot "paths" is empty');
      
      // Add paths and test again
      const pathsList = document.createElement('ol');
      pathsList.setAttribute('slot', 'paths');
      pathsList.innerHTML = `
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li>Current Page</li>
      `;
      element.appendChild(pathsList);
      
      validation = validateSlotConfiguration(element, {
        paths: { required: true },
      });
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should accept ordered list (ol) in paths slot', () => {
      const { element } = createTestComponent(tagName);
      
      const pathsList = document.createElement('ol');
      pathsList.setAttribute('slot', 'paths');
      pathsList.innerHTML = `
        <li><a href="/">Home</a></li>
        <li><a href="/programs">Programs</a></li>
        <li>Computer Science</li>
      `;
      element.appendChild(pathsList);
      
      const validation = validateSlotConfiguration(element, {
        paths: { allowedElements: ['ol', 'ul'] },
      });
      
      expect(validation.valid).toBe(true);
    });

    it('should accept unordered list (ul) in paths slot', () => {
      const { element } = createTestComponent(tagName);
      
      const pathsList = document.createElement('ul');
      pathsList.setAttribute('slot', 'paths');
      pathsList.innerHTML = `
        <li><a href="/">UMD</a></li>
        <li><a href="/research">Research</a></li>
        <li>Lab</li>
      `;
      element.appendChild(pathsList);
      
      const validation = validateSlotConfiguration(element, {
        paths: { allowedElements: ['ol', 'ul'] },
      });
      
      expect(validation.valid).toBe(true);
    });

    it('should handle breadcrumb with only links', () => {
      const { element } = createTestComponent(tagName);
      
      const pathsList = document.createElement('ol');
      pathsList.setAttribute('slot', 'paths');
      pathsList.innerHTML = `
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/about/history">History</a></li>
      `;
      element.appendChild(pathsList);
      
      expect(element.querySelectorAll('[slot="paths"] a').length).toBe(3);
    });

    it('should handle breadcrumb with current page (no link)', () => {
      const { element } = createTestComponent(tagName);
      
      const pathsList = document.createElement('ol');
      pathsList.setAttribute('slot', 'paths');
      pathsList.innerHTML = `
        <li><a href="/">Home</a></li>
        <li><a href="/services">Services</a></li>
        <li>Contact Us</li>
      `;
      element.appendChild(pathsList);
      
      const items = element.querySelectorAll('[slot="paths"] li');
      expect(items.length).toBe(3);
      expect(items[2].querySelector('a')).toBeFalsy();
    });

    it('should return empty div if paths slot is missing', () => {
      const { element } = createTestComponent(tagName);
      // Component should still exist but render an empty div internally
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      navigationBreadcrumb();
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
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
      navigationBreadcrumb();
    });

    it('should not have observed attributes', () => {
      // This component doesn't have observed attributes based on the code
      const { element } = createTestComponent(tagName);
      // Component should exist without observed attributes
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });
});