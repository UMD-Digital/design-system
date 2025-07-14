import { Composite } from '../../../index';
import type { HeroMinimalProps } from '../../hero/_types';
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
describe('Hero Minimal Component', () => {
  const { assets, textLockup } = require('../../../atomic');
  const { ElementModel } = require('../../../model');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Structure', () => {
    it('should create a minimal hero with minimal props', () => {
      const props: HeroMinimalProps = {
        isThemeDark: true,
      };

      const result = Composite.hero.minimal(props);
      validateElementStructure(result, { hasElement: true, hasStyles: true });
    });

    it('should create minimal hero with all content props', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML =
        '<h1>Complete Minimal</h1><p>With description</p>';

      const props: HeroMinimalProps = {
        headline: createElement('h1', 'Complete Minimal'),
        text: createElement('p', 'With description'),
        eyebrow: createElement('span', 'Category'),
        actions: createElement('div', 'Learn More'),
        isThemeDark: false,
      };

      const result = Composite.hero.minimal(props);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Asset Properties', () => {
    it('should handle image asset', () => {
      const props: HeroMinimalProps = {
        headline: createElement('h1', 'Minimal with Image'),
        image: createImageElement('minimal-hero.jpg', 'Minimal hero image'),
        isThemeDark: true,
      };

      const result = Composite.hero.minimal(props);
    });

    it('should handle video asset', () => {
      const props: HeroMinimalProps = {
        headline: createElement('h1', 'Minimal with Video'),
        video: createVideoElement('minimal-hero.mp4'),
        isThemeDark: false,
      };

      const result = Composite.hero.minimal(props);
    });

    it('should handle both image and video assets', () => {
      const props: HeroMinimalProps = {
        headline: createElement('h1', 'Minimal with Assets'),
        image: createImageElement('minimal-fg.jpg', 'Foreground'),
        video: createVideoElement('minimal-video.mp4'),
        isThemeDark: true,
      };

      const result = Composite.hero.minimal(props);
    });
  });

  describe('Theme Variations', () => {
    it('should handle light theme', () => {
      const props: HeroMinimalProps = {
        headline: createElement('h1', 'Light Theme Hero'),
        isThemeLight: true,
        isThemeDark: false,
      };

      const result = Composite.hero.minimal(props);
    });

    it('should handle Maryland theme', () => {
      const props: HeroMinimalProps = {
        headline: createElement('h1', 'Maryland Theme Hero'),
        isThemeMaryland: true,
      };

      const result = Composite.hero.minimal(props);
    });
  });

  describe('Content Properties', () => {
    it('should handle headline content', () => {
      const props: HeroMinimalProps = {
        headline: createElement('h1', 'Main Headline'),
        isThemeDark: false,
      };

      const result = Composite.hero.minimal(props);
    });

    it('should handle eyebrow content', () => {
      const props: HeroMinimalProps = {
        eyebrow: createElement('span', 'Category'),
        headline: createElement('h1', 'With Eyebrow'),
        isThemeDark: true,
      };

      const result = Composite.hero.minimal(props);
    });

    it('should handle actions content', () => {
      const props: HeroMinimalProps = {
        headline: createElement('h1', 'With Actions'),
        actions: createElement('button', 'Click Me'),
        isThemeDark: false,
      };

      const result = Composite.hero.minimal(props);
    });
  });

  describe('Complete Configuration', () => {
    it('should handle all properties together', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h1>Full Minimal</h1><p>Everything</p>';

      const props: HeroMinimalProps = {
        // Content
        headline: createElement('h1', 'Full Minimal'),
        text: createElement('p', 'Everything included'),
        eyebrow: createElement('span', 'Special'),
        actions: createElement('div', 'Take Action'),

        // Assets
        image: createImageElement('minimal.jpg', 'Minimal image'),
        video: createVideoElement('minimal.mp4'),

        // Theme - all variations can be used
        isThemeDark: true,
        isThemeLight: false,
        isThemeMaryland: true,
      };

      const result = Composite.hero.minimal(props);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Type Safety', () => {
    it('should accept all optional properties', () => {
      // All properties are optional
      const props: HeroMinimalProps = {
        isThemeDark: true,
      };

      const result = Composite.hero.minimal(props);

      expect(result).toBeDefined();
    });

    it('should accept minimal configuration', () => {
      // Minimal valid configuration with just a theme
      const props: HeroMinimalProps = {
        isThemeLight: true,
      };

      const result = Composite.hero.minimal(props);

      expect(result).toBeDefined();
    });

    it('should handle all theme variations', () => {
      // Test different theme combinations
      const themeConfigs: HeroMinimalProps[] = [
        { isThemeDark: true },
        { isThemeLight: true },
        { isThemeMaryland: true },
        { isThemeDark: true, isThemeMaryland: true },
        { isThemeLight: true, isThemeMaryland: false },
      ];

      themeConfigs.forEach((config) => {
        const result = Composite.hero.minimal(config);
        expect(result).toBeDefined();
      });
    });
  });
});
