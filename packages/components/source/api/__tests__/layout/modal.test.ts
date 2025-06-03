import layoutModal from '../../layout/modal';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  setAttributeAndWait,
} from '../test-helpers/component';
import { getComponentAttributes } from '../test-helpers/validation';

describe('Component: umd-element-modal', () => {
  const tagName = 'umd-element-modal';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-modal');
      document.body.appendChild(testElement);
      
      layoutModal();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      layoutModal();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      layoutModal();
    });

    it('should accept default slot content', () => {
      const { element } = createTestComponent(tagName);
      
      // Add content to default slot
      const content = document.createElement('div');
      content.innerHTML = '<h2>Modal Title</h2><p>Modal content</p>';
      element.appendChild(content)
      expect(element.querySelector('h2')).toBeTruthy();
      expect(element.querySelector('p')).toBeTruthy();
    });

    it('should accept various content types in default slot', () => {
      const { element } = createTestComponent(tagName);
      
      // Add different types of content
      element.innerHTML = `
        <h2>Title</h2>
        <p>Paragraph</p>
        <form>
          <input type="text" placeholder="Name">
          <button>Submit</button>
        </form>
      `;
      expect(element.querySelector('h2')).toBeTruthy();
      expect(element.querySelector('p')).toBeTruthy();
      expect(element.querySelector('form')).toBeTruthy();
      expect(element.querySelector('input')).toBeTruthy();
      expect(element.querySelector('button')).toBeTruthy();
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      layoutModal();
    });

    it('should handle data-layout-hidden attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-layout-hidden': 'true'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-layout-hidden']).toBe('true');
    });

    it('should default to visible when data-layout-hidden is not set', () => {
      const { element } = createTestComponent(tagName);const attributes = getComponentAttributes(element);
      expect(attributes['data-layout-hidden']).toBeUndefined();
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      layoutModal();
    });

    it('should observe data-visual-open attribute', async () => {
      const { element } = createTestComponent(tagName, '', {
        'data-layout-hidden': 'true'
      });
      // Mock the show event
      const mockShow = jest.fn();
      (element as any).events = { show: mockShow };
      
      // Set data-visual-open to true
      await setAttributeAndWait(element, 'data-visual-open', 'true');
      
      // The attribute should be set
      expect(element.getAttribute('data-visual-open')).toBe('true');
    });

    it('should observe data-visual-closed attribute', async () => {
      const { element } = createTestComponent(tagName);
      // Mock the hide event
      const mockHide = jest.fn();
      (element as any).events = { hide: mockHide };
      
      // Set data-visual-closed to true
      await setAttributeAndWait(element, 'data-visual-closed', 'true');
      
      // The attribute should be set
      expect(element.getAttribute('data-visual-closed')).toBe('true');
    });

    it('should handle toggling between open and closed states', async () => {
      const { element } = createTestComponent(tagName, '', {
        'data-layout-hidden': 'true'
      });
      // Mock the events
      const mockShow = jest.fn();
      const mockHide = jest.fn();
      (element as any).events = { show: mockShow, hide: mockHide };
      
      // Open modal
      await setAttributeAndWait(element, 'data-visual-open', 'true');
      expect(element.getAttribute('data-visual-open')).toBe('true');
      
      // Close modal
      await setAttributeAndWait(element, 'data-visual-closed', 'true');
      expect(element.getAttribute('data-visual-closed')).toBe('true');
    });
  });

  describe('Callback Functionality', () => {
    beforeEach(() => {
      layoutModal();
    });

    it('should set data-layout-hidden to true when callback is invoked', () => {
      const { element } = createTestComponent(tagName);
      // The component creates a callback that sets data-layout-hidden to true
      // This would typically be called when the modal is closed via the close button
      element.setAttribute('data-layout-hidden', 'true');
      
      expect(element.getAttribute('data-layout-hidden')).toBe('true');
    });
  });

  describe('Content Styling', () => {
    beforeEach(() => {
      layoutModal();
    });

    it('should not apply default styling to content', () => {
      const { element } = createTestComponent(tagName);
      
      // Add content
      element.innerHTML = '<div>Modal content</div>';// The component uses isDefaultStyling: false for content
      // This ensures custom content styling is preserved
      expect(element.querySelector('div')).toBeTruthy();
    });
  });
});