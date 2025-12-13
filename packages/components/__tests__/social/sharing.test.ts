import socialSharing from '../../source/api/social/sharing';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  captureWarningsAsync,
} from '../test-helpers/component';
import {
  getComponentAttributes,
  validateDeprecatedAttribute,
} from '../test-helpers/validation';

describe('Component: umd-element-social-sharing', () => {
  const tagName = 'umd-element-social-sharing';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-social-sharing');
      document.body.appendChild(testElement);
      
      socialSharing();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      socialSharing();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      socialSharing();
    });

    it('should handle data-fixed attribute with true value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-fixed': 'true'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-fixed']).toBe('true');
    });

    it('should handle data-title attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-title': 'Check out this amazing research from UMD!'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-title']).toBe('Check out this amazing research from UMD!');
    });

    it('should handle data-url attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-url': 'https://umd.edu/research/quantum-breakthrough'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-url']).toBe('https://umd.edu/research/quantum-breakthrough');
    });

    it('should handle data-facebook attribute with true value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-facebook': 'true'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-facebook']).toBe('true');
    });

    it('should handle data-twitter attribute with true value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-twitter': 'true'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-twitter']).toBe('true');
    });

    it('should handle data-print attribute with true value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-print': 'true'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-print']).toBe('true');
    });

    it('should handle data-email attribute with true value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-email': 'true'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-email']).toBe('true');
    });

    it('should handle multiple share options', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-facebook': 'true',
        'data-twitter': 'true',
        'data-email': 'true',
        'data-print': 'true'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-facebook']).toBe('true');
      expect(attributes['data-twitter']).toBe('true');
      expect(attributes['data-email']).toBe('true');
      expect(attributes['data-print']).toBe('true');
    });

    it('should handle deprecated fixed attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'fixed': 'true'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'fixed', 'data-fixed')).toBe(true);
    });

    it('should handle deprecated title attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'title': 'Share this'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'title', 'data-title')).toBe(true);
    });

    it('should handle deprecated url attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'url': 'https://umd.edu'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'url', 'data-url')).toBe(true);
    });

    it('should handle deprecated facebook attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'facebook': 'true'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'facebook', 'data-facebook')).toBe(true);
    });

    it('should handle deprecated twitter attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'twitter': 'true'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'twitter', 'data-twitter')).toBe(true);
    });

    it('should handle deprecated print attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'print': 'true'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'print', 'data-print')).toBe(true);
    });

    it('should handle deprecated email attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'email': 'true'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'email', 'data-email')).toBe(true);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      socialSharing();
    });

    it('should not have observed attributes', () => {
      // This component doesn't have observed attributes based on the code
      const { element } = createTestComponent(tagName);
      // Component should exist without observed attributes
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });
});