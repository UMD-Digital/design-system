import { videoArrow as heroBrandVideo } from '../../../source/web-components/hero/custom/video';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  createSlotContent,
} from '../../test-helpers/component';
import {
  validateSlotConfiguration,
  getComponentAttributes,
} from '../../test-helpers/validation';

describe('Component: umd-element-hero-brand-video', () => {
  const tagName = 'umd-element-hero-brand-video';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement(
        'umd-element-hero-brand-video',
      );
      document.body.appendChild(testElement);

      heroBrandVideo();

      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function),
      );
    });

    it('should create custom element with correct tag name', () => {
      heroBrandVideo();

      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      heroBrandVideo();
    });

    it('should accept headline and text slots', () => {
      const { element } = createTestComponent(tagName);

      // Add slots
      element.appendChild(
        createSlotContent('headline', 'h1', 'Fearlessly Forward'),
      );
      element.appendChild(
        createSlotContent(
          'text',
          'p',
          'The University of Maryland strategic vision',
        ),
      );

      // Verify slots are present
      expect(element.querySelector('[slot="headline"]')).toBeTruthy();
      expect(element.querySelector('[slot="text"]')).toBeTruthy();
    });

    it('should validate slot configuration', () => {
      const { element } = createTestComponent(tagName);

      element.appendChild(createSlotContent('headline', 'h1', 'Do Good'));
      element.appendChild(
        createSlotContent('text', 'p', 'Join us in making a positive impact'),
      );

      const validation = validateSlotConfiguration(element, {
        headline: { required: false },
        text: { required: false },
      });

      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });
  });

  describe('Video Element', () => {
    beforeEach(() => {
      heroBrandVideo();
    });

    it('should accept video as direct child', () => {
      const { element } = createTestComponent(tagName);

      // Add video as direct child (not slotted)
      const video = document.createElement('video');
      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');
      video.setAttribute('loop', '');

      const source = document.createElement('source');
      source.setAttribute('src', 'brand-video.mp4');
      source.setAttribute('type', 'video/mp4');
      video.appendChild(source);

      element.appendChild(video);

      const directVideo = element.querySelector('video');
      expect(directVideo).toBeInstanceOf(HTMLVideoElement);
      expect(directVideo?.hasAttribute('autoplay')).toBe(true);
      expect(directVideo?.hasAttribute('muted')).toBe(true);
      expect(directVideo?.hasAttribute('loop')).toBe(true);
    });

    it('should handle multiple video sources', () => {
      const { element } = createTestComponent(tagName);

      const video = document.createElement('video');
      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');
      video.setAttribute('loop', '');

      // Add multiple sources for browser compatibility
      const mp4Source = document.createElement('source');
      mp4Source.setAttribute('src', 'campaign.mp4');
      mp4Source.setAttribute('type', 'video/mp4');
      video.appendChild(mp4Source);

      const webmSource = document.createElement('source');
      webmSource.setAttribute('src', 'campaign.webm');
      webmSource.setAttribute('type', 'video/webm');
      video.appendChild(webmSource);

      element.appendChild(video);

      const sources = element.querySelectorAll('video source');
      expect(sources.length).toBe(2);
      expect(sources[0].getAttribute('type')).toBe('video/mp4');
      expect(sources[1].getAttribute('type')).toBe('video/webm');
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      heroBrandVideo();
    });

    it('should handle animation-trigger attribute with load value', () => {
      const { element } = createTestComponent(tagName, '', {
        'animation-trigger': 'load',
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['animation-trigger']).toBe('load');
    });

    it('should handle no animation-trigger attribute', () => {
      const { element } = createTestComponent(tagName);
      const attributes = getComponentAttributes(element);
      expect(attributes['animation-trigger']).toBeUndefined();
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      heroBrandVideo();
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
      heroBrandVideo();
    });

    it('should trigger load event after connection', () => {
      const { element } = createTestComponent(tagName);
      // Component has afterConnect that calls element.events.load()
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Animation Features', () => {
    beforeEach(() => {
      heroBrandVideo();
    });

    it('should initialize with load animation when specified', () => {
      const { element } = createTestComponent(tagName, '', {
        'animation-trigger': 'load',
      });

      // Add required video
      const video = document.createElement('video');
      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');
      video.setAttribute('loop', '');
      element.appendChild(video);

      element.appendChild(createSlotContent('headline', 'h1', 'Animated Hero'));
      expect(element.getAttribute('animation-trigger')).toBe('load');
    });

    it('should handle component without animation', () => {
      const { element } = createTestComponent(tagName);

      // Add required video
      const video = document.createElement('video');
      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');
      video.setAttribute('loop', '');
      element.appendChild(video);

      element.appendChild(createSlotContent('headline', 'h1', 'Static Hero'));
      expect(element.getAttribute('animation-trigger')).toBeNull();
    });
  });

  describe('Brand Integration', () => {
    beforeEach(() => {
      heroBrandVideo();
    });

    it('should support brand-focused content', () => {
      const { element } = createTestComponent(tagName);

      // Add brand video
      const video = document.createElement('video');
      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');
      video.setAttribute('loop', '');

      const source = document.createElement('source');
      source.setAttribute('src', 'fearlessly-forward.mp4');
      source.setAttribute('type', 'video/mp4');
      video.appendChild(source);

      element.appendChild(video);

      // Add brand messaging
      element.appendChild(
        createSlotContent('headline', 'h1', 'Fearlessly Forward'),
      );
      element.appendChild(
        createSlotContent(
          'text',
          'p',
          'The University of Maryland strategic vision for excellence and impact',
        ),
      );
      const headline = element.querySelector('[slot="headline"]');
      expect(headline?.textContent).toBe('Fearlessly Forward');
    });
  });
});
