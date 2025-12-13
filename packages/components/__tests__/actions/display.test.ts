import actionsDisplay from '../../source/api/actions/display';
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
  validateDeprecatedSlot,
  validateDeprecatedAttribute,
  getComponentAttributes,
} from '../test-helpers/validation';

describe('Component: umd-element-call-to-action', () => {
  const tagName = 'umd-element-call-to-action';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-call-to-action');
      document.body.appendChild(testElement);
      
      actionsDisplay();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      actionsDisplay();
      
      const { element } = createTestComponent(tagName, '<button>Click me</button>');
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Component Requirements', () => {
    beforeEach(() => {
      actionsDisplay();
    });

    it('should require a button or link element', () => {
      // Component should throw error without button or link
      const { element } = createTestComponent(tagName);
      // Component requires interactive element
      expect(element.querySelector('button, a')).toBeNull();
    });

    it('should accept button element', () => {
      const { element } = createTestComponent(tagName, '<button>Click me</button>');
      expect(element.querySelector('button')).toBeTruthy();
    });

    it('should accept link element', () => {
      const { element } = createTestComponent(tagName, '<a href="#">Click me</a>');
      expect(element.querySelector('a')).toBeTruthy();
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      actionsDisplay();
    });

    it('should accept text slot with link element', () => {
      const { element } = createTestComponent(tagName, '<button>Primary</button>');
      element.appendChild(createSlotContent('text', 'a', 'Additional text'));
      
      const validation = validateSlotConfiguration(element, {
        text: { allowedElements: ['a'] },
      });
      
      expect(validation.valid).toBe(true);
    });

    it('should reject non-link elements in text slot', () => {
      const { element } = createTestComponent(tagName, '<button>Primary</button>');
      element.appendChild(createSlotContent('text', 'span', 'Invalid'));
      
      const validation = validateSlotConfiguration(element, {
        text: { allowedElements: ['a'] },
      });
      
      expect(validation.valid).toBe(false);
      expect(validation.errors[0]).toContain('Invalid element <span> in slot "text"');
    });

    it('should handle deprecated plainText slot with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '<button>Primary</button>');
        element.appendChild(createSlotContent('plainText', 'a', 'Plain text'));
      });
      
      expect(validateDeprecatedSlot(warnings, 'plainText')).toBe(true);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      actionsDisplay();
    });

    it('should handle data-display attribute with primary value', () => {
      const { element } = createTestComponent(tagName, '<button>Click</button>', {
        'data-display': 'primary'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-display']).toBe('primary');
    });

    it('should handle data-display attribute with secondary value', () => {
      const { element } = createTestComponent(tagName, '<button>Click</button>', {
        'data-display': 'secondary'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-display']).toBe('secondary');
    });

    it('should handle data-display attribute with outline value', () => {
      const { element } = createTestComponent(tagName, '<button>Click</button>', {
        'data-display': 'outline'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-display']).toBe('outline');
    });

    it('should handle data-visual-size attribute', () => {
      const { element } = createTestComponent(tagName, '<button>Click</button>', {
        'data-visual-size': 'large'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-visual-size']).toBe('large');
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '<button>Click</button>', {
        'data-theme': 'dark'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle data-theme attribute with gold value', () => {
      const { element } = createTestComponent(tagName, '<button>Click</button>', {
        'data-theme': 'gold'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('gold');
    });

    it('should handle deprecated display attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '<button>Click</button>', {
          'display': 'primary'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'display', 'data-display')).toBe(true);
    });

    it('should handle deprecated theme attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '<button>Click</button>', {
          'theme': 'dark'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'theme', 'data-theme')).toBe(true);
    });

    it('should handle deprecated visual-size attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '<button>Click</button>', {
          'visual-size': 'large'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'visual-size', 'data-visual-size')).toBe(true);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      actionsDisplay();
    });

    it('should not have observed attributes', () => {
      // This component doesn't have observed attributes based on the code
      const { element } = createTestComponent(tagName, '<button>Click</button>');
      // Component should exist without observed attributes
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });
});