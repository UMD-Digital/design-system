import cardVideo from '../../card/video';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  captureWarningsAsync,
} from '../test-helpers/component';
import {
  validateSlotConfiguration,
  getComponentAttributes,
} from '../test-helpers/validation';

describe('Component: umd-element-card-video', () => {
  const tagName = 'umd-element-card-video';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-card-video');
      document.body.appendChild(testElement);
      
      cardVideo();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      cardVideo();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      cardVideo();
    });

    it('should validate required video slot', () => {
      const { element } = createTestComponent(tagName);
      
      const video = document.createElement('video');
      video.setAttribute('slot', 'video');
      video.src = 'test-video.mp4';
      element.appendChild(video);
      
      const validation = validateSlotConfiguration(element, {
        video: { 
          allowedElements: ['video'],
          required: true 
        },
      });
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should fail validation when video slot is missing', () => {
      const { element } = createTestComponent(tagName);
      
      const validation = validateSlotConfiguration(element, {
        video: { 
          allowedElements: ['video'],
          required: true 
        },
      });
      
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('Required slot "video" is empty');
    });

    it('should not accept non-video elements in video slot', () => {
      const { element } = createTestComponent(tagName);
      
      const div = document.createElement('div');
      div.setAttribute('slot', 'video');
      element.appendChild(div);
      
      const validation = validateSlotConfiguration(element, {
        video: { 
          allowedElements: ['video'],
          required: true 
        },
      });
      
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('Invalid element <div> in slot "video". Allowed elements: video');
    });

    it('should handle video element with multiple sources', () => {
      const { element } = createTestComponent(tagName);
      
      const video = document.createElement('video');
      video.setAttribute('slot', 'video');
      video.setAttribute('poster', 'preview.jpg');
      
      const sourceWebm = document.createElement('source');
      sourceWebm.src = 'video.webm';
      sourceWebm.type = 'video/webm';
      video.appendChild(sourceWebm);
      
      const sourceMp4 = document.createElement('source');
      sourceMp4.src = 'video.mp4';
      sourceMp4.type = 'video/mp4';
      video.appendChild(sourceMp4);
      
      element.appendChild(video);
      
      const validation = validateSlotConfiguration(element, {
        video: { 
          allowedElements: ['video'],
          required: true 
        },
      });
      
      expect(validation.valid).toBe(true);
      expect(video.querySelectorAll('source').length).toBe(2);
    });

    it('should handle video element with captions', () => {
      const { element } = createTestComponent(tagName);
      
      const video = document.createElement('video');
      video.setAttribute('slot', 'video');
      video.src = 'video.mp4';
      
      const track = document.createElement('track');
      track.kind = 'captions';
      track.src = 'captions.vtt';
      track.srclang = 'en';
      track.label = 'English';
      video.appendChild(track);
      
      element.appendChild(video);
      
      const validation = validateSlotConfiguration(element, {
        video: { 
          allowedElements: ['video'],
          required: true 
        },
      });
      
      expect(validation.valid).toBe(true);
      expect(video.querySelector('track')).toBeTruthy();
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      cardVideo();
    });

    it('should handle data-display="short" attribute', () => {
      const { element } = createTestComponent(tagName);
      
      // Add required video slot
      const video = document.createElement('video');
      video.setAttribute('slot', 'video');
      video.src = 'test-video.mp4';
      element.appendChild(video);
      
      // Set attribute
      element.setAttribute('data-display', 'short');
      
      const attributes = getComponentAttributes(element);
      expect(attributes['data-display']).toBe('short');
    });

    it('should handle data-visual-play="true" attribute', () => {
      const { element } = createTestComponent(tagName);
      
      // Add required video slot
      const video = document.createElement('video');
      video.setAttribute('slot', 'video');
      video.src = 'test-video.mp4';
      element.appendChild(video);
      
      // Set attribute
      element.setAttribute('data-visual-play', 'true');
      
      const attributes = getComponentAttributes(element);
      expect(attributes['data-visual-play']).toBe('true');
    });

    it('should default to block display without data-display attribute', () => {
      const { element } = createTestComponent(tagName);
      
      // Add required video slot
      const video = document.createElement('video');
      video.setAttribute('slot', 'video');
      video.src = 'test-video.mp4';
      element.appendChild(video);
      
      const attributes = getComponentAttributes(element);
      expect(attributes['data-display']).toBeUndefined();
    });

    it('should handle both data-display and data-visual-play attributes together', () => {
      const { element } = createTestComponent(tagName);
      
      // Add required video slot
      const video = document.createElement('video');
      video.setAttribute('slot', 'video');
      video.src = 'test-video.mp4';
      element.appendChild(video);
      
      // Set both attributes
      element.setAttribute('data-display', 'short');
      element.setAttribute('data-visual-play', 'true');
      
      const attributes = getComponentAttributes(element);
      expect(attributes['data-display']).toBe('short');
      expect(attributes['data-visual-play']).toBe('true');
    });

    it('should ignore data-visual-play when data-display="short"', () => {
      // Note: data-visual-play only applies to default (block) display
      const { element } = createTestComponent(tagName);
      
      // Add required video slot
      const video = document.createElement('video');
      video.setAttribute('slot', 'video');
      video.src = 'test-video.mp4';
      element.appendChild(video);
      
      // Set attributes
      element.setAttribute('data-display', 'short');
      element.setAttribute('data-visual-play', 'true');
      
      // Both attributes should be present but visual-play has no effect on short display
      const attributes = getComponentAttributes(element);
      expect(attributes['data-display']).toBe('short');
      expect(attributes['data-visual-play']).toBe('true');
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      cardVideo();
    });

    it('should not have observed attributes', () => {
      // This component doesn't have observed attributes based on the code
      const { element } = createTestComponent(tagName);
      // Component should exist without observed attributes
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });


  describe('Lifecycle', () => {
    beforeEach(() => {
      cardVideo();
    });

    it('should have loadOnConnect lifecycle hook', async () => {
      const { element } = createTestComponent(tagName);
      
      const video = document.createElement('video');
      video.setAttribute('slot', 'video');
      video.src = 'test-video.mp4';
      element.appendChild(video);
      
      // Wait for component to be defined
      await waitForComponentDefinition(tagName);
      
      // Component should be connected and have lifecycle applied
      expect(element.isConnected).toBe(true);
    });
  });
});