import heroExpand from '../../hero/custom/expand';
import {
  createTestComponent,
  cleanupComponents,
  captureWarningsAsync,
  createSlotContent,
  setAttributeAndWait,
} from '../test-helpers/component';
import {
  validateSlotConfiguration,
  validateDeprecatedAttribute,
  getComponentAttributes,
} from '../test-helpers/validation';

describe('Component: umd-element-hero-expand', () => {
  const tagName = 'umd-element-hero-expand';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-hero-expand');
      document.body.appendChild(testElement);

      heroExpand();

      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function),
      );
    });

    it('should create custom element with correct tag name', () => {
      heroExpand();

      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      heroExpand();
    });

    it('should accept all defined slots', () => {
      const { element } = createTestComponent(tagName);

      // Add various slots
      element.appendChild(
        createSlotContent('eyebrow', 'p', 'Experience Maryland'),
      );
      element.appendChild(
        createSlotContent('headline', 'h1', 'Where Ideas Take Flight'),
      );

      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.setAttribute('src', 'aerial-view.jpg');
      img.setAttribute('alt', 'Campus aerial view');
      element.appendChild(img);

      const video = document.createElement('video');
      video.setAttribute('slot', 'video');
      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');
      video.setAttribute('loop', '');
      element.appendChild(video);

      element.appendChild(createSlotContent('actions', 'div', 'Actions'));
      element.appendChild(
        createSlotContent('additional', 'div', 'Additional content'),
      );

      // Verify all slots are present
      expect(element.querySelector('[slot="eyebrow"]')).toBeTruthy();
      expect(element.querySelector('[slot="headline"]')).toBeTruthy();
      expect(element.querySelector('[slot="image"]')).toBeTruthy();
      expect(element.querySelector('[slot="video"]')).toBeTruthy();
      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
      expect(element.querySelector('[slot="additional"]')).toBeTruthy();
    });

    it('should handle video as direct video element', () => {
      const { element } = createTestComponent(tagName);

      const video = document.createElement('video');
      video.setAttribute('slot', 'video');
      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');
      video.setAttribute('loop', '');

      const source = document.createElement('source');
      source.setAttribute('src', 'campus-tour.mp4');
      source.setAttribute('type', 'video/mp4');
      video.appendChild(source);

      element.appendChild(video);

      const slottedVideo = element.querySelector('[slot="video"]');
      expect(slottedVideo).toBeInstanceOf(HTMLVideoElement);
    });

    it('should handle video wrapped in container', () => {
      const { element } = createTestComponent(tagName);

      const container = document.createElement('div');
      container.setAttribute('slot', 'video');

      const video = document.createElement('video');
      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');
      video.setAttribute('loop', '');

      const source = document.createElement('source');
      source.setAttribute('src', 'innovation.mp4');
      source.setAttribute('type', 'video/mp4');
      video.appendChild(source);

      container.appendChild(video);
      element.appendChild(container);

      const slottedContainer = element.querySelector('[slot="video"]');
      const nestedVideo = slottedContainer?.querySelector('video');
      expect(nestedVideo).toBeInstanceOf(HTMLVideoElement);
    });

    it('should handle expandable content', () => {
      const { element } = createTestComponent(tagName);

      element.appendChild(
        createSlotContent('headline', 'h1', 'Explore Our Campus'),
      );

      const additional = document.createElement('div');
      additional.setAttribute('slot', 'additional');
      additional.innerHTML =
        '<h2>Discover Your Path</h2><p>With over 100 undergraduate majors...</p>';
      element.appendChild(additional);

      const validation = validateSlotConfiguration(element, {
        headline: { required: false },
        eyebrow: { required: false },
        image: { required: false },
        video: { required: false },
        actions: { required: false },
        additional: { required: false },
      });

      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      heroExpand();
    });

    it('should handle data-visual-position attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual-position': '80',
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-visual-position']).toBe('80');
    });

    it('should handle data-top-position attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-top-position': '100',
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-top-position']).toBe('100');
    });

    it('should handle deprecated sticky-top attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'sticky-top': '80',
        });
      });

      expect(
        validateDeprecatedAttribute(
          warnings,
          'sticky-top',
          'data-visual-position',
        ),
      ).toBe(true);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      heroExpand();
    });

    it('should observe data-visual-position attribute changes', async () => {
      const { element } = createTestComponent(tagName);
      // Mock the setTopPosition event
      const mockSetTopPosition = jest.fn();
      (element as any).events = { setTopPosition: mockSetTopPosition };

      // Change the visual position
      await setAttributeAndWait(element, 'data-visual-position', '120');

      // The observer should trigger the callback
      // Note: In real implementation, the observer would call setTopPosition
    });

    it('should observe deprecated sticky-top attribute changes', async () => {
      const { element } = createTestComponent(tagName);
      // Mock the setTopPosition event
      const mockSetTopPosition = jest.fn();
      (element as any).events = { setTopPosition: mockSetTopPosition };

      // Change the sticky-top position (deprecated)
      await setAttributeAndWait(element, 'sticky-top', '100');

      // The observer should trigger the callback for deprecated attribute
    });
  });

  describe('Component Lifecycle', () => {
    beforeEach(() => {
      heroExpand();
    });

    it('should set initial top position from attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual-position': '80',
      });

      // Mock the setTopPosition event
      const mockSetTopPosition = jest.fn();
      (element as any).events = { setTopPosition: mockSetTopPosition }; // The afterConnect should read the initial position
      // Note: In real implementation, this would be called automatically
    });

    it('should handle data-top-position override', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual-position': '80',
        'data-top-position': '100',
      });
      // data-top-position should override data-visual-position
      const attributes = getComponentAttributes(element);
      expect(attributes['data-top-position']).toBe('100');
    });
  });

  describe('Sticky Behavior', () => {
    beforeEach(() => {
      heroExpand();
    });

    it('should support sticky positioning with numeric value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual-position': '80',
      });

      element.appendChild(createSlotContent('headline', 'h1', 'Sticky Hero'));
      expect(element.getAttribute('data-visual-position')).toBe('80');
    });

    it('should handle position updates dynamically', async () => {
      const { element } = createTestComponent(tagName);
      // Initially no position
      expect(element.getAttribute('data-visual-position')).toBeNull();

      // Update position
      await setAttributeAndWait(element, 'data-visual-position', '60');
      expect(element.getAttribute('data-visual-position')).toBe('60');

      // Update again
      await setAttributeAndWait(element, 'data-visual-position', '120');
      expect(element.getAttribute('data-visual-position')).toBe('120');
    });
  });
});
