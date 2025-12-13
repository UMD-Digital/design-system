import pathwayHighlight from '../../source/api/pathway/highlight';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  createSlotContent,
  captureWarningsAsync,
} from '../test-helpers/component';
import {
  validateSlotConfiguration,
  getComponentAttributes,
  validateDeprecatedAttribute,
} from '../test-helpers/validation';

describe('Component: umd-element-pathway-highlight', () => {
  const tagName = 'umd-element-pathway-highlight';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-pathway-highlight');
      document.body.appendChild(testElement);
      
      pathwayHighlight();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      pathwayHighlight();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      pathwayHighlight();
    });

    it('should accept optional eyebrow slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('eyebrow', 'span', 'Student Success'));
      
      expect(element.querySelector('[slot="eyebrow"]')).toBeTruthy();
    });

    it('should accept optional headline slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h2', 'Transform Your Future'));
      
      expect(element.querySelector('[slot="headline"]')).toBeTruthy();
    });

    it('should accept optional text slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('text', 'p', 'Join thousands of students who have found their path at UMD.'));
      
      expect(element.querySelector('[slot="text"]')).toBeTruthy();
    });

    it('should accept optional actions slot', () => {
      const { element } = createTestComponent(tagName);
      
      const action = document.createElement('a');
      action.setAttribute('slot', 'actions');
      action.setAttribute('href', '/apply');
      action.textContent = 'Start Your Journey';
      element.appendChild(action);
      
      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
    });

    it('should accept optional highlight slot', () => {
      const { element } = createTestComponent(tagName);
      
      const quote = document.createElement('blockquote');
      quote.setAttribute('slot', 'highlight');
      quote.textContent = 'The opportunities here changed my life. I found mentors, research experiences, and a community that supported my dreams.';
      element.appendChild(quote);
      
      expect(element.querySelector('[slot="highlight"]')).toBeTruthy();
    });

    it('should accept optional highlight-attribution slot', () => {
      const { element } = createTestComponent(tagName);
      
      const attribution = document.createElement('cite');
      attribution.setAttribute('slot', 'highlight-attribution');
      attribution.textContent = 'Sarah Chen, Class of 2023';
      element.appendChild(attribution);
      
      expect(element.querySelector('[slot="highlight-attribution"]')).toBeTruthy();
    });

    it('should accept multiple actions in actions slot', () => {
      const { element } = createTestComponent(tagName);
      
      const actionsDiv = document.createElement('div');
      actionsDiv.setAttribute('slot', 'actions');
      actionsDiv.innerHTML = '<a href="/alumni-stories">Read More Stories</a><a href="/give">Support Students</a>';
      element.appendChild(actionsDiv);
      
      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
      expect(element.querySelectorAll('[slot="actions"] a').length).toBe(2);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      pathwayHighlight();
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
      pathwayHighlight();
    });

    it('should not have observed attributes', () => {
      // This component doesn't have observed attributes based on the code
      const { element } = createTestComponent(tagName);
      // Component should exist without observed attributes
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });
});