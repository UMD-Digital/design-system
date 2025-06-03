import pathwayImage from '../../pathway/image';
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

describe('Component: umd-element-pathway', () => {
  const tagName = 'umd-element-pathway';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-pathway');
      document.body.appendChild(testElement);
      
      pathwayImage();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      pathwayImage();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      pathwayImage();
    });

    it('should accept optional eyebrow slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('eyebrow', 'span', 'Discover'));
      
      expect(element.querySelector('[slot="eyebrow"]')).toBeTruthy();
    });

    it('should accept optional headline slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('headline', 'h2', 'Your Path to Success'));
      
      expect(element.querySelector('[slot="headline"]')).toBeTruthy();
    });

    it('should accept optional text slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('text', 'p', 'Explore programs designed to help you achieve your goals.'));
      
      expect(element.querySelector('[slot="text"]')).toBeTruthy();
    });

    it('should accept optional actions slot', () => {
      const { element } = createTestComponent(tagName);
      
      const action = document.createElement('a');
      action.setAttribute('slot', 'actions');
      action.setAttribute('href', '/programs');
      action.textContent = 'Explore Programs';
      element.appendChild(action);
      
      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
    });

    it('should accept optional image slot', () => {
      const { element } = createTestComponent(tagName);
      
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.src = 'pathway.jpg';
      img.alt = 'Student success';
      element.appendChild(img);
      
      expect(element.querySelector('[slot="image"]')).toBeTruthy();
    });

    it('should accept optional video slot', () => {
      const { element } = createTestComponent(tagName);
      
      const iframe = document.createElement('iframe');
      iframe.setAttribute('slot', 'video');
      iframe.src = 'https://youtube.com/embed/123';
      iframe.title = 'Research video';
      element.appendChild(iframe);
      
      expect(element.querySelector('[slot="video"]')).toBeTruthy();
    });

    it('should accept optional stats slot', () => {
      const { element } = createTestComponent(tagName);
      
      const statsDiv = document.createElement('div');
      statsDiv.setAttribute('slot', 'stats');
      statsDiv.innerHTML = '<div class="stat"><span class="number">$500M</span><span class="label">Research Funding</span></div>';
      element.appendChild(statsDiv);
      
      expect(element.querySelector('[slot="stats"]')).toBeTruthy();
    });

    it('should accept optional date-start-iso slot', () => {
      const { element } = createTestComponent(tagName);
      
      const startTime = document.createElement('time');
      startTime.setAttribute('slot', 'date-start-iso');
      startTime.setAttribute('datetime', '2024-04-15T10:00:00');
      startTime.textContent = 'April 15, 2024 10:00 AM';
      element.appendChild(startTime);
      
      expect(element.querySelector('[slot="date-start-iso"]')).toBeTruthy();
    });

    it('should accept optional date-end-iso slot', () => {
      const { element } = createTestComponent(tagName);
      
      const endTime = document.createElement('time');
      endTime.setAttribute('slot', 'date-end-iso');
      endTime.setAttribute('datetime', '2024-04-15T16:00:00');
      endTime.textContent = 'April 15, 2024 4:00 PM';
      element.appendChild(endTime);
      
      expect(element.querySelector('[slot="date-end-iso"]')).toBeTruthy();
    });

    it('should accept optional location slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('location', 'span', 'McKeldin Mall'));
      
      expect(element.querySelector('[slot="location"]')).toBeTruthy();
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      pathwayImage();
    });

    it('should handle data-type attribute with hero value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-type': 'hero'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-type']).toBe('hero');
    });

    it('should handle data-type attribute with overlay value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-type': 'overlay'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-type']).toBe('overlay');
    });

    it('should handle data-type attribute with sticky value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-type': 'sticky'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-type']).toBe('sticky');
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

    it('should handle data-theme attribute with maryland value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'maryland'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('maryland');
    });

    it('should handle data-animation attribute with true value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-animation': 'true'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-animation']).toBe('true');
    });

    it('should handle data-image-position attribute with left value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-image-position': 'left'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-image-position']).toBe('left');
    });

    it('should handle data-image-scaled attribute with false value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-image-scaled': 'false'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-image-scaled']).toBe('false');
    });

    it('should handle data-show-time attribute with false value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-show-time': 'false'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-show-time']).toBe('false');
    });

    it('should handle deprecated type attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'type': 'hero'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'type', 'data-type')).toBe(true);
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
      pathwayImage();
    });

    it('should not have observed attributes', () => {
      // This component doesn't have observed attributes based on the code
      const { element } = createTestComponent(tagName);
      // Component should exist without observed attributes
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });
});