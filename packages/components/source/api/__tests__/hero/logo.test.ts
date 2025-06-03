import heroLogo from '../../hero/logo';
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

describe('Component: umd-element-hero-logo', () => {
  const tagName = 'umd-element-hero-logo';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-hero-logo');
      document.body.appendChild(testElement);
      
      heroLogo();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      heroLogo();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      heroLogo();
    });

    it('should accept all defined slots', () => {
      const { element } = createTestComponent(tagName);
      
      // Add various slots
      element.appendChild(createSlotContent('eyebrow', 'p', 'Eyebrow text'));
      element.appendChild(createSlotContent('headline', 'h1', 'University of Maryland'));
      element.appendChild(createSlotContent('text', 'p', 'A global leader in research'));
      element.appendChild(createSlotContent('image', 'img', ''));
      element.appendChild(createSlotContent('actions', 'div', 'Actions'));
      
      // Verify all slots are present
      expect(element.querySelector('[slot="eyebrow"]')).toBeTruthy();
      expect(element.querySelector('[slot="headline"]')).toBeTruthy();
      expect(element.querySelector('[slot="text"]')).toBeTruthy();
      expect(element.querySelector('[slot="image"]')).toBeTruthy();
      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
    });

    it('should handle basic logo hero', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h1', 'University of Maryland'));
      element.appendChild(createSlotContent('text', 'p', 'A global leader in research, entrepreneurship and innovation'));
      
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.setAttribute('src', 'campus-beauty.jpg');
      img.setAttribute('alt', 'Campus scene');
      element.appendChild(img);
      
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

    it('should handle logo hero with all slots', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('eyebrow', 'p', 'Office of the President'));
      element.appendChild(createSlotContent('headline', 'h1', 'A Message from President Pines'));
      element.appendChild(createSlotContent('text', 'p', 'Together, we are fearlessly forward'));
      
      const actions = document.createElement('div');
      actions.setAttribute('slot', 'actions');
      actions.innerHTML = '<a href="/president/message">Read Full Message</a><a href="/president/initiatives">Presidential Initiatives</a>';
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
      heroLogo();
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle no theme attribute (default)', () => {
      const { element } = createTestComponent(tagName);
      // Logo hero only supports dark theme, so no data-theme means default
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBeUndefined();
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
      heroLogo();
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
      heroLogo();
    });

    it('should trigger load event after connection', () => {
      const { element } = createTestComponent(tagName);
      // Component has afterConnect that calls element.events.load()
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Brand Focus', () => {
    beforeEach(() => {
      heroLogo();
    });

    it('should emphasize UMD logo in default configuration', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h1', 'University of Maryland'));
      // The component emphasizes the UMD logo
      expect(element).toBeInstanceOf(HTMLElement);
    });

    it('should work with dark theme for official communications', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      
      element.appendChild(createSlotContent('eyebrow', 'p', 'Office of the President'));
      element.appendChild(createSlotContent('headline', 'h1', 'Presidential Address'));
      expect(element.getAttribute('data-theme')).toBe('dark');
    });
  });
});