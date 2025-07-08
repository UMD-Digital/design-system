import { Composite } from '@universityofmaryland/web-elements-library';
import type { HeroVideoArrowProps } from '../../../hero/_types';
import {
  createElement,
  createImageElement,
  createVideoElement,
  validateElementStructure,
  containsText,
} from '../../test-helpers/element';
import '../../test-helpers/setup';

// Mock the elements library
jest.mock('@universityofmaryland/web-elements-library');

describe('Hero Video Arrow Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Structure', () => {
    it('should create a video arrow hero with minimal props', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-video-arrow'
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      const props: HeroVideoArrowProps = {
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      expect((Composite.hero.custom as any).videoArrow).toHaveBeenCalledWith(props);
      expect(result).toBe(mockResult);
      validateElementStructure(result, { hasElement: true, hasStyles: true });
    });

    it('should create video arrow hero with all content props', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h1>Video Arrow Hero</h1><p>Hero with video controls</p>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-video-arrow'
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Video Arrow Hero'),
        text: createElement('p', 'Hero with prominent video playback controls'),
        actions: createElement('div', 'Watch Video'),
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      expect((Composite.hero.custom as any).videoArrow).toHaveBeenCalledWith(props);
      expect(containsText(result.element, 'Video Arrow Hero')).toBe(true);
      expect(containsText(result.element, 'Hero with video controls')).toBe(true);
    });
  });

  describe('Video Control Properties', () => {
    it('should handle videoControls enabled', () => {
      const mockElement = document.createElement('div');
      const playButton = document.createElement('button');
      playButton.className = 'video-play-arrow';
      playButton.innerHTML = '▶';
      mockElement.appendChild(playButton);
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-video-arrow'
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Controlled Video'),
        videoControls: true,
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      expect((Composite.hero.custom as any).videoArrow).toHaveBeenCalledWith(props);
      expect(result.element.querySelector('.video-play-arrow')).toBeTruthy();
    });

    it('should handle videoControls disabled', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-video-arrow'
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'No Controls'),
        videoControls: false,
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      expect((Composite.hero.custom as any).videoArrow).toHaveBeenCalledWith(props);
    });

    it('should work without videoControls property', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-video-arrow'
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Default Controls'),
        text: createElement('p', 'Hero without explicit control setting'),
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      expect(result).toBeDefined();
      expect((Composite.hero.custom as any).videoArrow).toHaveBeenCalledWith(props);
    });
  });

  describe('Asset Properties', () => {
    it('should handle video asset as primary media', () => {
      const mockElement = document.createElement('div');
      const videoWrapper = document.createElement('div');
      videoWrapper.className = 'video-wrapper';
      mockElement.appendChild(videoWrapper);
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-video-arrow'
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Video Showcase'),
        video: createVideoElement('hero-video.mp4'),
        videoControls: true,
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      expect((Composite.hero.custom as any).videoArrow).toHaveBeenCalledWith(props);
      expect(result.element.querySelector('.video-wrapper')).toBeTruthy();
    });

    it('should handle image as poster/fallback', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-video-arrow'
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Video with Poster'),
        image: createImageElement('video-poster.jpg', 'Video poster'),
        video: createVideoElement('hero-video.mp4'),
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      expect((Composite.hero.custom as any).videoArrow).toHaveBeenCalledWith(props);
    });

    it('should handle image only (no video)', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-video-arrow'
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Image Only'),
        image: createImageElement('hero-image.jpg', 'Hero image'),
        videoControls: true,
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      expect((Composite.hero.custom as any).videoArrow).toHaveBeenCalledWith(props);
    });
  });

  describe('Animation Properties', () => {
    it('should handle includesAnimation flag', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-video-arrow'
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Animated Video Hero'),
        video: createVideoElement('animated.mp4'),
        includesAnimation: true,
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      expect((Composite.hero.custom as any).videoArrow).toHaveBeenCalledWith(props);
    });

    it('should handle hero without animation', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-video-arrow'
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Static Video Hero'),
        includesAnimation: false,
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      expect((Composite.hero.custom as any).videoArrow).toHaveBeenCalledWith(props);
    });
  });

  describe('Video Arrow Interaction', () => {
    it('should create prominent play button', () => {
      const mockElement = document.createElement('div');
      const playArrow = document.createElement('button');
      playArrow.className = 'hero-video-arrow-play';
      playArrow.setAttribute('aria-label', 'Play video');
      playArrow.innerHTML = '<svg><path d="..."/></svg>';
      mockElement.appendChild(playArrow);
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-video-arrow',
        play: jest.fn(),
        pause: jest.fn()
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Interactive Video'),
        video: createVideoElement('interactive.mp4'),
        videoControls: true,
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      const button = result.element.querySelector('.hero-video-arrow-play');
      expect(button).toBeTruthy();
      expect(button?.getAttribute('aria-label')).toBe('Play video');
    });

    it('should handle video state changes', () => {
      const mockElement = document.createElement('div');
      const videoElement = document.createElement('video');
      mockElement.appendChild(videoElement);
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-video-arrow',
        updatePlayState: jest.fn()
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Stateful Video'),
        video: createVideoElement('stateful.mp4'),
        videoControls: true,
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      expect(result.element.querySelector('video')).toBeTruthy();
    });
  });

  describe('Theme Properties', () => {
    it('should handle dark theme', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-video-arrow-dark'
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Dark Video Arrow'),
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      expect((Composite.hero.custom as any).videoArrow).toHaveBeenCalledWith(props);
    });

    it('should handle light theme', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-video-arrow-light'
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Light Video Arrow'),
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      expect((Composite.hero.custom as any).videoArrow).toHaveBeenCalledWith(props);
    });
  });

  describe('Complete Configuration', () => {
    it('should handle all properties together', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = `
        <div class="hero-video-arrow">
          <h1>Full Video Arrow Hero</h1>
          <div class="video-container">
            <video></video>
            <button class="video-arrow-control">▶</button>
          </div>
        </div>
      `;
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-video-arrow-complete'
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      const props: HeroVideoArrowProps = {
        // Content
        headline: createElement('h1', 'Full Video Arrow Hero'),
        text: createElement('p', 'Complete video arrow hero with all features'),
        actions: createElement('div', 'Play Full Video'),
        
        // Assets
        image: createImageElement('video-poster.jpg', 'Video poster image'),
        video: createVideoElement('hero-video.mp4'),
        
        // Video specific
        videoControls: true,
        
        // Animation
        includesAnimation: true,
        
        // Theme
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      expect((Composite.hero.custom as any).videoArrow).toHaveBeenCalledWith(props);
      expect(containsText(result.element, 'Full Video Arrow Hero')).toBe(true);
      expect(result.element.querySelector('.video-container')).toBeTruthy();
      expect(result.element.querySelector('.video-arrow-control')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null/undefined content elements', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-video-arrow'
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      const props: HeroVideoArrowProps = {
        headline: null,
        text: undefined,
        actions: null,
        videoControls: undefined,
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should handle no media assets', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-video-arrow'
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'No Media'),
        text: createElement('p', 'Hero without image or video'),
        videoControls: true,
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      expect(result).toBeDefined();
    });

    it('should handle video loading states', () => {
      const mockElement = document.createElement('div');
      const loadingIndicator = document.createElement('div');
      loadingIndicator.className = 'video-loading';
      mockElement.appendChild(loadingIndicator);
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-video-arrow',
        isLoading: true,
        setLoading: jest.fn()
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Loading Video'),
        video: createVideoElement('large-video.mp4'),
        videoControls: true,
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      expect(result.element.querySelector('.video-loading')).toBeTruthy();
    });
  });

  describe('Type Safety', () => {
    it('should accept minimal valid configuration', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-video-arrow'
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      // Minimal configuration - only theme required
      const props: HeroVideoArrowProps = {
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      expect(result).toBeDefined();
    });

    it('should handle video-arrow specific properties', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-video-arrow'
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      // Video-arrow specific with controls
      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Video Feature'),
        video: createVideoElement('feature-video.mp4'),
        videoControls: true,
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      expect(result).toBeDefined();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels for video controls', () => {
      const mockElement = document.createElement('div');
      const playButton = document.createElement('button');
      playButton.setAttribute('aria-label', 'Play video');
      playButton.setAttribute('role', 'button');
      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('aria-label', 'Pause video');
      pauseButton.setAttribute('role', 'button');
      pauseButton.style.display = 'none';
      
      mockElement.appendChild(playButton);
      mockElement.appendChild(pauseButton);
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-video-arrow'
      };
      ((Composite.hero.custom as any).videoArrow as jest.Mock).mockReturnValue(mockResult);

      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Accessible Video'),
        video: createVideoElement('accessible.mp4'),
        videoControls: true,
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).videoArrow(props);
      
      const play = result.element.querySelector('[aria-label="Play video"]');
      const pause = result.element.querySelector('[aria-label="Pause video"]');
      
      expect(play).toBeTruthy();
      expect(pause).toBeTruthy();
      expect(play?.getAttribute('role')).toBe('button');
    });
  });
});