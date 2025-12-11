import cardArticle from '../../source/api/card/article';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  createSlotContent,
} from '../../test-helpers/component';
import {
  validateSlotConfiguration,
  getComponentAttributes,
  validateDeprecatedAttribute,
} from '../../test-helpers/validation';
import { captureWarningsAsync } from '../../test-helpers/component';

describe('Component: umd-element-article', () => {
  const tagName = 'umd-element-article';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-article');
      document.body.appendChild(testElement);
      
      cardArticle();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      cardArticle();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      cardArticle();
    });

    it('should validate headline slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h3', 'Article Title'));
      
      const validation = validateSlotConfiguration(element, {
        headline: { allowedElements: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'] },
      });
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should accept all allowed heading levels in headline slot', () => {
      const headingLevels = ['h2', 'h3', 'h4', 'h5', 'h6', 'p'];
      
      headingLevels.forEach(tag => {
        const { element } = createTestComponent(tagName);
        element.appendChild(createSlotContent('headline', tag, 'Article Heading'));
        
        const validation = validateSlotConfiguration(element, {
          headline: { allowedElements: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'] },
        });
        
        expect(validation.valid).toBe(true);
        cleanupComponents();
      });
    });

    it('should accept optional text slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h3', 'Title'));
      element.appendChild(createSlotContent('text', 'p', 'Article excerpt'));
      
      expect(element.querySelector('[slot="text"]')).toBeTruthy();
    });

    it('should accept optional eyebrow slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('eyebrow', 'p', 'Faculty Research'));
      element.appendChild(createSlotContent('headline', 'h3', 'Title'));
      
      expect(element.querySelector('[slot="eyebrow"]')).toBeTruthy();
    });

    it('should accept optional image slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h3', 'Title'));
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.src = 'test.jpg';
      img.alt = 'Test image';
      element.appendChild(img);
      
      expect(element.querySelector('[slot="image"]')).toBeTruthy();
    });

    it('should accept optional actions slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h3', 'Title'));
      element.appendChild(createSlotContent('actions', 'div', 'Read More'));
      
      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
    });

    it('should accept optional date slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h3', 'Title'));
      element.appendChild(createSlotContent('date', 'p', 'December 10, 2023'));
      
      expect(element.querySelector('[slot="date"]')).toBeTruthy();
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      cardArticle();
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle data-theme attribute with light value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'light'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('light');
    });

    it('should handle data-visual attribute with transparent value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual': 'transparent'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-visual']).toBe('transparent');
    });

    it('should handle data-visual attribute with aligned value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual': 'aligned'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-visual']).toBe('aligned');
    });

    it('should handle data-visual attribute with bordered value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual': 'bordered'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-visual']).toBe('bordered');
    });

    it('should handle data-visual attribute with list value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual': 'list'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-visual']).toBe('list');
    });

    it('should handle deprecated theme attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'theme': 'dark'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'theme', 'data-theme')).toBe(true);
    });

    it('should handle deprecated visual attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'visual': 'list'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'visual', 'data-visual')).toBe(true);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      cardArticle();
    });

    it('should not have observed attributes', () => {
      // This component doesn't have observed attributes based on the code
      const { element } = createTestComponent(tagName);
      // Component should exist without observed attributes
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });
});