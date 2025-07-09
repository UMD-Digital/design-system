import { Composite } from '../../../../index';
import type { HeroVideoArrowProps } from '../../../hero/_types';
import {
  createElement,
  createImageElement,
  createVideoElement,
  validateElementStructure,
} from '../../test-helpers/element';
import '../../test-helpers/setup';

// Mock the internal dependencies
jest.mock('../../../../atomic', () => ({
  assets: {
    video: {
      observedAutoPlay: jest.fn().mockReturnValue({
        element: document.createElement('video'),
        styles: '.mock-video-auto-play',
      }),
    },
  },
  buttons: {
    fullscreen: jest.fn().mockReturnValue({
      element: document.createElement('button'),
      styles: '.mock-fullscreen-button',
    }),
    videoState: jest.fn().mockReturnValue({
      element: document.createElement('button'),
      styles: '.mock-video-state-button',
    }),
  },
  textLockup: {
    large: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-text-lockup-large',
    }),
  },
  animations: {
    actions: {
      scrollToClick: jest.fn().mockReturnValue({
        element: document.createElement('button'),
        styles: '.mock-scroll-to-click',
      }),
    },
    brand: {
      chevronFlow: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-chevron-flow',
      }),
    },
  },
}));

jest.mock('../../../../model', () => ({
  ElementModel: {
    createDiv: jest.fn().mockImplementation((props) => ({
      element: document.createElement('div'),
      styles: props?.className ? `.${props.className} {}` : '',
    })),
    create: jest.fn().mockImplementation((props) => ({
      element: props?.element || document.createElement('div'),
      styles: props?.className ? `.${props.className} {}` : '',
    })),
    headline: {
      displayLarge: jest.fn().mockReturnValue({
        element: document.createElement('h1'),
        styles: '.mock-headline-display-large',
      }),
      campaignExtraLarge: jest.fn().mockReturnValue({
        element: document.createElement('h1'),
        styles: '.mock-headline-campaign-extra-large',
      }),
    },
    layout: {
      spaceHorizontalSmallest: jest.fn().mockImplementation((props) => ({
        element: props?.element || document.createElement('div'),
        styles: '.mock-layout-space-horizontal-smallest',
      })),
    },
    richText: {
      simpleLargest: jest.fn().mockImplementation((props) => ({
        element: props?.element || document.createElement('div'),
        styles: '.mock-richtext-simple-largest',
      })),
    },
  },
}));
// Mock the elements library
describe('Hero Video Arrow Component', () => {
  const { assets, buttons } = require('../../../../atomic');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Structure', () => {
    it('should create a video arrow hero with minimal props', () => {
      const props: HeroVideoArrowProps = {
        isThemeDark: true,
      };

      const result = (Composite.hero.custom as any).videoArrow(props);
      validateElementStructure(result, { hasElement: true, hasStyles: true });
    });

    it('should create video arrow hero with all content props', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML =
        '<h1>Video Arrow Hero</h1><p>Hero with video controls</p>';

      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Video Arrow Hero'),
        text: createElement('p', 'Hero with prominent video playback controls'),
        actions: createElement('div', 'Watch Video'),
        isThemeDark: false,
      };

      const result = (Composite.hero.custom as any).videoArrow(props);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Asset Properties', () => {
    it('should handle image as poster/fallback', () => {
      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Video with Poster'),
        image: createImageElement('video-poster.jpg', 'Video poster'),
        video: createVideoElement('hero-video.mp4'),
        isThemeDark: false,
      };

      const result = (Composite.hero.custom as any).videoArrow(props);
    });

    it('should handle image only (no video)', () => {
      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Image Only'),
        image: createImageElement('hero-image.jpg', 'Hero image'),
        videoControls: true,
        isThemeDark: true,
      };

      const result = (Composite.hero.custom as any).videoArrow(props);
    });
  });

  describe('Theme Properties', () => {
    it('should handle dark theme', () => {
      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Dark Video Arrow'),
        isThemeDark: true,
      };

      const result = (Composite.hero.custom as any).videoArrow(props);
    });

    it('should handle light theme', () => {
      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Light Video Arrow'),
        isThemeDark: false,
      };

      const result = (Composite.hero.custom as any).videoArrow(props);
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

      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'Full Video Arrow Hero'),
        text: createElement('p', 'Complete video arrow hero with all features'),
        actions: createElement('div', 'Play Full Video'),
        image: createImageElement('video-poster.jpg', 'Video poster image'),
        video: createVideoElement('hero-video.mp4'),
        videoControls: true,
        includesAnimation: true,
        isThemeDark: true,
      };

      const result = (Composite.hero.custom as any).videoArrow(props);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null/undefined content elements', () => {
      const props: HeroVideoArrowProps = {
        headline: null,
        text: undefined,
        actions: null,
        videoControls: undefined,
        isThemeDark: true,
      };

      const result = (Composite.hero.custom as any).videoArrow(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should handle no media assets', () => {
      const props: HeroVideoArrowProps = {
        headline: createElement('h1', 'No Media'),
        text: createElement('p', 'Hero without image or video'),
        videoControls: true,
        isThemeDark: false,
      };

      const result = (Composite.hero.custom as any).videoArrow(props);

      expect(result).toBeDefined();
    });
  });

  describe('Type Safety', () => {
    // Minimal configuration - only theme required
    it('should accept minimal valid configuration', () => {
      const props: HeroVideoArrowProps = {
        isThemeDark: false,
      };

      const result = (Composite.hero.custom as any).videoArrow(props);

      expect(result).toBeDefined();
    });
  });
});
