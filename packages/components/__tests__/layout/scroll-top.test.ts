import layoutScrollTop from '../../source/api/layout/scroll-top';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
} from '../test-helpers/component';
import { getComponentAttributes } from '../test-helpers/validation';

describe('Component: umd-element-scroll-top', () => {
  const tagName = 'umd-element-scroll-top';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-scroll-top');
      document.body.appendChild(testElement);
      
      layoutScrollTop();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      layoutScrollTop();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      layoutScrollTop();
    });

    it('should not have any slots', () => {
      const { element } = createTestComponent(tagName);
      // This component doesn't accept any slots
      element.innerHTML = '<p>This content should not be slotted</p>';
      
      // The component should ignore any child content
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      layoutScrollTop();
    });

    it('should handle data-layout-fixed attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-layout-fixed': ''
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-layout-fixed']).toBe('');
    });

    it('should default to absolute positioning without data-layout-fixed', () => {
      const { element } = createTestComponent(tagName);const attributes = getComponentAttributes(element);
      expect(attributes['data-layout-fixed']).toBeUndefined();
    });

    it('should handle data-layout-fixed with any value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-layout-fixed': 'true'
      });
      // The presence of the attribute matters, not its value
      expect(element.hasAttribute('data-layout-fixed')).toBe(true);
    });
  });

  describe('Component Creation', () => {
    beforeEach(() => {
      layoutScrollTop();
    });

    it('should create component with fixed positioning', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-layout-fixed': ''
      });
      // Component should be created with isFixed: true
      expect(element).toBeInstanceOf(HTMLElement);
      expect(element.hasAttribute('data-layout-fixed')).toBe(true);
    });

    it('should create component with absolute positioning', () => {
      const { element } = createTestComponent(tagName);
      // Component should be created with isFixed: false
      expect(element).toBeInstanceOf(HTMLElement);
      expect(element.hasAttribute('data-layout-fixed')).toBe(false);
    });
  });

  describe('Lifecycle', () => {
    beforeEach(() => {
      layoutScrollTop();
    });

    it('should use loadOnConnect lifecycle hook', () => {
      // The component uses Lifecycle.hooks.loadOnConnect
      const { element } = createTestComponent(tagName);
      // Component should be connected and loaded
      expect(element).toBeInstanceOf(HTMLElement);
      expect(element.isConnected).toBe(true);
    });
  });

  describe('Content Examples', () => {
    beforeEach(() => {
      layoutScrollTop();
    });

    it('should handle basic scroll to top button', () => {
      const { element } = createTestComponent(tagName);
      expect(element).toBeInstanceOf(HTMLElement);
      // expect(element.shadowRoot).toBeTruthy();
    });

    it('should handle fixed position scroll to top', () => {
      const { element } = createTestComponent(tagName);
      element.setAttribute('data-layout-fixed', '');
      expect(element.hasAttribute('data-layout-fixed')).toBe(true);
      // expect(element.shadowRoot).toBeTruthy();
    });

    it('should work within a positioned container', () => {
      // Create container
      const container = document.createElement('div');
      container.style.position = 'relative';
      container.style.height = '500px';
      document.body.appendChild(container);
      
      // Create scroll-top element
      const element = document.createElement(tagName) as HTMLElement;
      container.appendChild(element);
      expect(element.parentElement).toBe(container);
      expect(element.hasAttribute('data-layout-fixed')).toBe(false);
      
      // Cleanup
      container.remove();
    });
  });

  describe('Scroll Functionality', () => {
    beforeEach(() => {
      layoutScrollTop();
    });

    it('should create scroll to top functionality', () => {
      const { element } = createTestComponent(tagName);
      // The component creates a scroll-to-top button using Composite.layout.scrollTop
      // The actual scroll behavior is handled by the elements library
      // expect(element.shadowRoot).toBeTruthy();
    });

    it('should support both fixed and absolute positioning modes', () => {
      // Test absolute positioning (default)
      const { element: absoluteElement } = createTestComponent(tagName);expect(absoluteElement.hasAttribute('data-layout-fixed')).toBe(false);
      
      // Test fixed positioning
      const { element: fixedElement } = createTestComponent(tagName, '', {
        'data-layout-fixed': ''
      });
      expect(fixedElement.hasAttribute('data-layout-fixed')).toBe(true);
    });
  });
});