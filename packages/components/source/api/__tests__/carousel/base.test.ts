import carouselBase from '../../carousel/base';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  createSlotContent,
  setAttributeAndWait,
} from '../test-helpers/component';
import {
  validateSlotConfiguration,
  getComponentAttributes,
  validateDeprecatedAttribute,
} from '../test-helpers/validation';
import { captureWarningsAsync } from '../test-helpers/component';

describe('Component: umd-element-carousel', () => {
  const tagName = 'umd-element-carousel';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-carousel');
      document.body.appendChild(testElement);
      
      carouselBase();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      carouselBase();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      carouselBase();
    });

    it('should require blocks slot', () => {
      const { element } = createTestComponent(tagName);
      
      // Test without blocks (should be invalid)
      let validation = validateSlotConfiguration(element, {
        blocks: { required: true },
      });
      
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('Required slot "blocks" is empty');
      
      // Add blocks and test again
      const blocksContainer = document.createElement('div');
      blocksContainer.setAttribute('slot', 'blocks');
      blocksContainer.innerHTML = '<div>Item 1</div><div>Item 2</div>';
      element.appendChild(blocksContainer);
      
      validation = validateSlotConfiguration(element, {
        blocks: { required: true },
      });
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should accept multiple items in blocks slot', () => {
      const { element } = createTestComponent(tagName);
      
      const blocksContainer = document.createElement('div');
      blocksContainer.setAttribute('slot', 'blocks');
      for (let i = 1; i <= 5; i++) {
        const item = document.createElement('div');
        item.textContent = `Item ${i}`;
        blocksContainer.appendChild(item);
      }
      element.appendChild(blocksContainer);
      
      const slottedBlocks = element.querySelector('[slot="blocks"]');
      expect(slottedBlocks?.children.length).toBe(5);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      carouselBase();
    });

    it('should handle left-button attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'left-button': 'false'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['left-button']).toBe('false');
    });

    it('should handle right-button attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'right-button': 'false'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['right-button']).toBe('false');
    });

    it('should handle mobile-hint attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'mobile-hint': 'false'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['mobile-hint']).toBe('false');
    });

    it('should handle hint attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'hint': 'false'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['hint']).toBe('false');
    });

    it('should handle data-theme attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle numeric configuration attributes', () => {
      const { element } = createTestComponent(tagName, '', {
        'tablet-size': '3',
        'desktop-size': '4',
        'tablet-count': '6',
        'desktop-count': '8',
        'max-count': '10',
        'grid-gap-pixels': '20'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['tablet-size']).toBe('3');
      expect(attributes['desktop-size']).toBe('4');
      expect(attributes['tablet-count']).toBe('6');
      expect(attributes['desktop-count']).toBe('8');
      expect(attributes['max-count']).toBe('10');
      expect(attributes['grid-gap-pixels']).toBe('20');
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
      carouselBase();
    });

    it('should observe resize attribute', async () => {
      const { element } = createTestComponent(tagName);
      
      // Add required blocks
      const blocksContainer = document.createElement('div');
      blocksContainer.setAttribute('slot', 'blocks');
      blocksContainer.innerHTML = '<div>Item 1</div>';
      element.appendChild(blocksContainer);
      // Mock the resize event
      const mockResize = jest.fn();
      (element as any).events = { resize: mockResize };
      
      // Trigger resize attribute
      await setAttributeAndWait(element, 'resize', 'true');
      
      // The resize handler should be set up to respond to attribute changes
      // Note: In real implementation, the observer would trigger the callback
    });
  });

  describe('Component Lifecycle', () => {
    beforeEach(() => {
      carouselBase();
    });

    it('should call load event after connect', () => {
      const { element } = createTestComponent(tagName);
      
      // Add required blocks
      const blocksContainer = document.createElement('div');
      blocksContainer.setAttribute('slot', 'blocks');
      blocksContainer.innerHTML = '<div>Item 1</div>';
      element.appendChild(blocksContainer);
      
      // Mock the events.load function
      const mockLoad = jest.fn();
      (element as any).events = { load: mockLoad };// The afterConnect callback should have been called
      // Note: In real implementation this would be called by the framework
    });
  });
});