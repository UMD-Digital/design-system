import { Composite } from '../../../index';
import type { HeroOverlayProps } from '../../hero/_types';
import {
  createElement,
  createImageElement,
  createVideoElement,
  validateElementStructure,
} from '../test-helpers/element';
import '../test-helpers/setup';

// Mock the internal dependencies
jest.mock('../../../atomic', () => ({
  assets: {
    image: {
      background: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-image-background',
      }),
      placeholder: {
        fearlessForward: jest.fn().mockReturnValue({
          element: document.createElement('div'),
          styles: '.mock-placeholder-fearless-forward',
        }),
      },
    },
    video: {
      observedAutoPlay: jest.fn().mockReturnValue({
        element: document.createElement('video'),
        styles: '.mock-video-auto-play',
      }),
    },
  },
  textLockup: {
    large: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-text-lockup-large',
    }),
    medium: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-text-lockup-medium',
    }),
    small: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-text-lockup-small',
    }),
    smallScaling: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-text-lockup-small',
    }),
  },
  animations: {
    scroll: {
      scrollDownIcon: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-scroll-down-icon',
      }),
    },
  },
}));

jest.mock('../../../model', () => ({
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
      campaignLarge: jest.fn().mockReturnValue({
        element: document.createElement('h1'),
        styles: '.mock-headline-campaign-large',
      }),
      displayMedium: jest.fn().mockReturnValue({
        element: document.createElement('h2'),
        styles: '.mock-headline-display-medium',
      }),
      displayLarge: jest.fn().mockReturnValue({
        element: document.createElement('h1'),
        styles: '.mock-headline-display-large',
      }),
      displayExtraLarge: jest.fn().mockReturnValue({
        element: document.createElement('h1'),
        styles: '.mock-headline-display-extra-large',
      }),
      campaignExtraLarge: jest.fn().mockReturnValue({
        element: document.createElement('h1'),
        styles: '.mock-headline-campaign-extra-large',
      }),
    },
    composite: {
      card: {
        block: jest.fn().mockReturnValue({
          element: document.createElement('div'),
          styles: '.mock-card-block',
        }),
      },
    },
    layout: {
      spaceHorizontal: jest.fn().mockImplementation((props) => ({
        element: props?.element || document.createElement('div'),
        styles: '.mock-layout-space-horizontal',
      })),
      spaceHorizontalSmall: jest.fn().mockImplementation((props) => ({
        element: props?.element || document.createElement('div'),
        styles: '.mock-layout-space-horizontal-small',
      })),
      spaceHorizontalLarger: jest.fn().mockImplementation((props) => ({
        element: props?.element || document.createElement('div'),
        styles: '.mock-layout-space-horizontal-larger',
      })),
      overlayModal: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-overlay-modal',
      }),
      spaceHorizontalMax: jest.fn().mockImplementation((props) => ({
        element: props?.element || document.createElement('div'),
        styles: '.mock-layout-space-horizontal-max',
      })),
    },
  },
}));
// Mock the elements library
describe('Hero Overlay Component', () => {
  const { assets, textLockup } = require('../../../atomic');
  const { ElementModel } = require('../../../model');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Structure', () => {
    it('should create an overlay hero with minimal props', () => {
      const props: HeroOverlayProps = {
        isThemeDark: true,
      };

      const result = Composite.hero.overlay(props);
      validateElementStructure(result, { hasElement: true, hasStyles: true });
    });

    it('should create overlay hero with all content props', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h1>Overlay Hero</h1><p>With overlay effect</p>';

      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Overlay Hero'),
        text: createElement('p', 'With overlay effect'),
        eyebrow: createElement('span', 'Featured'),
        actions: createElement('div', 'Discover More'),
        isThemeDark: false,
      };

      const result = Composite.hero.overlay(props);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Asset Properties', () => {
    it('should handle image with overlay', () => {
      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Image Overlay'),
        image: createImageElement('overlay-bg.jpg', 'Overlay background'),
        isThemeDark: true,
      };

      const result = Composite.hero.overlay(props);
    });

    it('should handle video with overlay', () => {
      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Video Overlay'),
        video: createVideoElement('overlay-bg.mp4'),
        isThemeDark: false,
      };

      const result = Composite.hero.overlay(props);
    });

    it('should handle both image and video', () => {
      const props: HeroOverlayProps = {
        headline: createElement('h1', 'With Both Assets'),
        image: createImageElement('hero-image.jpg', 'Hero image'),
        video: createVideoElement('hero-video.mp4'),
        isThemeDark: true,
      };

      const result = Composite.hero.overlay(props);
    });

    it('should handle video asset', () => {
      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Video Hero'),
        video: createVideoElement('hero-video.mp4'),
        isThemeDark: false,
      };

      const result = Composite.hero.overlay(props);
    });
  });

  describe('Animation Properties', () => {
    it('should handle animation flag', () => {
      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Animated Overlay'),
        includesAnimation: true,
        isThemeDark: true,
      };

      const result = Composite.hero.overlay(props);
    });

    it('should handle no animation', () => {
      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Static Overlay'),
        includesAnimation: false,
        isThemeDark: false,
      };

      const result = Composite.hero.overlay(props);
    });
  });

  describe('Styling Properties', () => {
    it('should handle border property', () => {
      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Bordered Overlay'),
        hasBorder: true,
        isThemeDark: true,
      };

      const result = Composite.hero.overlay(props);
    });

    it('should handle transparent property', () => {
      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Transparent Overlay'),
        isTransparent: true,
        isThemeDark: false,
      };

      const result = Composite.hero.overlay(props);
    });

    it('should handle sticky property', () => {
      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Sticky Overlay'),
        isSticky: true,
        isThemeDark: true,
      };

      const result = Composite.hero.overlay(props);
    });
  });

  describe('Layout Properties', () => {
    it('should handle centered text layout', () => {
      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Centered Overlay'),
        isTextCenter: true,
        isThemeDark: true,
      };

      const result = Composite.hero.overlay(props);
    });

    it('should handle right-aligned text layout', () => {
      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Right-Aligned Overlay'),
        isTextRight: true,
        isThemeDark: false,
      };

      const result = Composite.hero.overlay(props);
    });

    it('should handle default text alignment', () => {
      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Default Alignment'),
        isTextCenter: false,
        isTextRight: false,
        isThemeDark: true,
      };

      const result = Composite.hero.overlay(props);
    });
  });

  describe('Theme Properties', () => {
    it('should handle dark theme with overlay', () => {
      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Dark Overlay'),
        isThemeDark: true,
      };

      const result = Composite.hero.overlay(props);
    });

    it('should handle light theme with overlay', () => {
      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Light Overlay'),
        isThemeDark: false,
      };

      const result = Composite.hero.overlay(props);
    });
  });

  describe('Overlay Effects', () => {
    it('should handle overlay with image and content', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML =
        '<div class="overlay"><h1>Overlay Content</h1></div>';

      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Overlay Content'),
        text: createElement('p', 'Above the background'),
        image: createImageElement('dramatic-bg.jpg', 'Dramatic background'),
        isThemeDark: true,
      };

      const result = Composite.hero.overlay(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should handle video overlay with content', () => {
      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Video Overlay'),
        text: createElement('p', 'Content over video'),
        video: createVideoElement('ambient.mp4'),
        isThemeDark: true,
      };

      const result = Composite.hero.overlay(props);
    });
  });

  describe('Complete Configuration', () => {
    it('should handle all properties together', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML =
        '<div class="hero-overlay"><h1>Complete Overlay</h1></div>';

      const props: HeroOverlayProps = {
        // Content
        headline: createElement('h1', 'Complete Overlay'),
        text: createElement('p', 'Full featured overlay hero'),
        eyebrow: createElement('span', 'Premium'),
        actions: createElement('div', 'Explore Now'),

        // Assets
        image: createImageElement('hero-image.jpg', 'Hero image'),
        video: createVideoElement('hero-video.mp4'),

        // Animation
        includesAnimation: true,

        // Layout
        isTextCenter: true,
        isTextRight: false,

        // Styling
        hasBorder: true,
        isTransparent: false,
        isSticky: true,

        // Theme
        isThemeDark: true,
      };

      const result = Composite.hero.overlay(props);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Type Safety', () => {
    it('should accept minimal valid configuration', () => {
      // Minimal configuration - only theme required
      const props: HeroOverlayProps = {
        isThemeDark: false,
      };

      const result = Composite.hero.overlay(props);

      expect(result).toBeDefined();
    });

    it('should handle all optional properties', () => {
      // All content properties are optional
      const props: HeroOverlayProps = {
        isThemeDark: true,
        // Optional content
        headline: undefined,
        text: undefined,
        eyebrow: undefined,
        actions: undefined,
      };

      const result = Composite.hero.overlay(props);

      expect(result).toBeDefined();
    });

    it('should handle overlay-specific configurations', () => {
      // Test overlay with multiple properties
      const props: HeroOverlayProps = {
        isThemeDark: true,
        headline: createElement('h1', 'Overlay Hero'),
        image: createImageElement('hero.jpg', 'Hero image'),
        video: createVideoElement('hero.mp4'),
        isTextCenter: true,
        hasBorder: true,
        isTransparent: true,
        isSticky: false,
        includesAnimation: true,
      };

      const result = Composite.hero.overlay(props);

      expect(result).toBeDefined();
    });
  });
});
