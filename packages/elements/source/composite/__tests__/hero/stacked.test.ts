import { Composite } from '../../../index';
import type { HeroStackedProps } from '../../hero/_types';
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
describe('Hero Stacked Component', () => {
  const { assets, textLockup } = require('../../../atomic');
  const { ElementModel } = require('../../../model');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Structure', () => {
    it('should create a stacked hero with minimal props', () => {
      const props: HeroStackedProps = {
        isThemeDark: true,
      };

      const result = Composite.hero.stacked(props);
      validateElementStructure(result, { hasElement: true, hasStyles: true });
    });

    it('should create stacked hero with all content props', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h1>Stacked Hero</h1><p>Stacked layout</p>';

      const props: HeroStackedProps = {
        headline: createElement('h1', 'Stacked Hero'),
        text: createElement('p', 'Stacked layout content'),
        eyebrow: createElement('span', 'News'),
        actions: createElement('div', 'View More'),
        isThemeDark: false,
      };

      const result = Composite.hero.stacked(props);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Asset Properties', () => {
    it('should handle image asset in stacked layout', () => {
      const props: HeroStackedProps = {
        headline: createElement('h1', 'Stacked with Image'),
        image: createImageElement('stacked-hero.jpg', 'Stacked hero image'),
        isThemeDark: true,
      };

      const result = Composite.hero.stacked(props);
    });

    it('should handle video asset in stacked layout', () => {
      const props: HeroStackedProps = {
        headline: createElement('h1', 'Stacked with Video'),
        video: createVideoElement('stacked-hero.mp4'),
        isThemeDark: false,
      };

      const result = Composite.hero.stacked(props);
    });

    it('should handle both image and video assets', () => {
      const props: HeroStackedProps = {
        headline: createElement('h1', 'Stacked with Media'),
        image: createImageElement('stacked.jpg', 'Image'),
        video: createVideoElement('stacked.mp4'),
        isThemeDark: true,
      };

      const result = Composite.hero.stacked(props);
    });
  });

  describe('Animation Properties', () => {
    it('should handle includesAnimation flag', () => {
      const props: HeroStackedProps = {
        headline: createElement('h1', 'Animated Stacked'),
        includesAnimation: true,
        isThemeDark: true,
      };

      const result = Composite.hero.stacked(props);
    });

    it('should handle hero without animation', () => {
      const props: HeroStackedProps = {
        headline: createElement('h1', 'Static Stacked'),
        includesAnimation: false,
        isThemeDark: false,
      };

      const result = Composite.hero.stacked(props);
    });
  });

  describe('Sizing Properties', () => {
    it('should handle small height', () => {
      const props: HeroStackedProps = {
        headline: createElement('h1', 'Small Height Stacked'),
        isHeightSmall: true,
        isThemeDark: true,
      };

      const result = Composite.hero.stacked(props);
    });

    it('should handle full height', () => {
      const props: HeroStackedProps = {
        headline: createElement('h1', 'Full Height Stacked'),
        isHeightFull: true,
        isThemeDark: false,
      };

      const result = Composite.hero.stacked(props);
    });

    it('should handle large width (stacked-specific)', () => {
      const props: HeroStackedProps = {
        headline: createElement('h1', 'Large Width Stacked'),
        isWidthLarge: true,
        isThemeDark: true,
      };

      const result = Composite.hero.stacked(props);
    });
  });

  describe('Theme Properties', () => {
    it('should handle dark theme', () => {
      const props: HeroStackedProps = {
        headline: createElement('h1', 'Dark Stacked'),
        isThemeDark: true,
      };

      const result = Composite.hero.stacked(props);
    });

    it('should handle light theme', () => {
      const props: HeroStackedProps = {
        headline: createElement('h1', 'Light Stacked'),
        isThemeDark: false,
      };

      const result = Composite.hero.stacked(props);
    });
  });

  describe('Stacked Layout Behavior', () => {
    it('should handle stacked arrangement of content and media', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = `
        <div class="stacked-content">
          <h1>Stacked Content</h1>
          <p>Description below</p>
        </div>
        <div class="stacked-media">
          <img src="stacked.jpg" alt="Stacked">
        </div>
      `;

      const props: HeroStackedProps = {
        headline: createElement('h1', 'Stacked Content'),
        text: createElement('p', 'Description below'),
        image: createImageElement('stacked.jpg', 'Stacked'),
        isThemeDark: true,
      };

      const result = Composite.hero.stacked(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(assets.image.background).toHaveBeenCalled();
    });
  });

  describe('Complete Configuration', () => {
    it('should handle all properties together', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML =
        '<div class="hero-stacked"><h1>Full Stacked</h1></div>';

      const props: HeroStackedProps = {
        // Content
        headline: createElement('h1', 'Full Stacked'),
        text: createElement('p', 'Complete stacked hero'),
        eyebrow: createElement('span', 'Featured'),
        actions: createElement('div', 'Take Action'),

        // Assets
        image: createImageElement('stacked.jpg', 'Stacked image'),
        video: createVideoElement('stacked.mp4'),

        // Animation
        includesAnimation: true,

        // Sizing
        isHeightSmall: false,
        isHeightFull: true,
        isWidthLarge: true,

        // Theme
        isThemeDark: true,
      };

      const result = Composite.hero.stacked(props);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Type Safety', () => {
    it('should accept minimal valid configuration', () => {
      // Minimal configuration - only theme required
      const props: HeroStackedProps = {
        isThemeDark: false,
      };

      const result = Composite.hero.stacked(props);

      expect(result).toBeDefined();
    });

    it('should handle all sizing options', () => {
      // Test different sizing combinations
      const sizingConfigs: HeroStackedProps[] = [
        { isHeightSmall: true, isThemeDark: true },
        { isHeightFull: true, isThemeDark: false },
        { isWidthLarge: true, isThemeDark: true },
        { isHeightSmall: true, isWidthLarge: true, isThemeDark: false },
        { isHeightFull: true, isWidthLarge: true, isThemeDark: true },
      ];

      sizingConfigs.forEach((props) => {
        const result = Composite.hero.stacked(props);
        expect(result).toBeDefined();
      });
    });

    it('should handle stacked-specific layout', () => {
      // Stacked layout with content above and media below
      const props: HeroStackedProps = {
        headline: createElement('h1', 'Stacked Layout'),
        text: createElement('p', 'Content on top'),
        image: createImageElement('below.jpg', 'Media below'),
        isWidthLarge: true,
        isThemeDark: true,
      };

      const result = Composite.hero.stacked(props);

      expect(result).toBeDefined();
    });
  });
});
