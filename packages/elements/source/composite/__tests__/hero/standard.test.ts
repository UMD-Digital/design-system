import { Composite } from '../../../index';
import type { HeroStandardProps } from '../../hero/_types';
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
describe('Hero Standard Component', () => {
  const { assets, textLockup } = require('../../../atomic');
  const { ElementModel } = require('../../../model');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Structure', () => {
    it('should create a standard hero with minimal props', () => {
      const props: HeroStandardProps = {
        isThemeDark: true,
      };

      const result = Composite.hero.standard(props);
      validateElementStructure(result, { hasElement: true, hasStyles: true });
    });

    it('should create a standard hero with all content props', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h1>Hero Title</h1><p>Hero description</p>';

      const props: HeroStandardProps = {
        headline: createElement('h1', 'Hero Title'),
        text: createElement('p', 'Hero description'),
        eyebrow: createElement('span', 'Featured'),
        actions: createElement('div', 'Call to Action'),
        isThemeDark: false,
      };

      const result = Composite.hero.standard(props);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Asset Properties', () => {
    it('should handle image asset', () => {
      const props: HeroStandardProps = {
        headline: createElement('h1', 'Hero with Image'),
        image: createImageElement('hero.jpg', 'Hero image'),
        isThemeDark: false,
      };

      const result = Composite.hero.standard(props);
    });

    it('should handle video asset', () => {
      const props: HeroStandardProps = {
        headline: createElement('h1', 'Hero with Video'),
        video: createVideoElement('hero.mp4'),
        isThemeDark: true,
      };

      const result = Composite.hero.standard(props);
    });

    it('should handle both image and video assets', () => {
      const props: HeroStandardProps = {
        headline: createElement('h1', 'Hero with Assets'),
        image: createImageElement('hero.jpg', 'Hero image'),
        video: createVideoElement('hero.mp4'),
        isThemeDark: true,
      };

      const result = Composite.hero.standard(props);
    });
  });

  describe('Animation Properties', () => {
    it('should handle includesAnimation flag', () => {
      const props: HeroStandardProps = {
        headline: createElement('h1', 'Animated Hero'),
        includesAnimation: true,
        isThemeDark: false,
      };

      const result = Composite.hero.standard(props);
    });

    it('should handle hero without animation', () => {
      const props: HeroStandardProps = {
        headline: createElement('h1', 'Static Hero'),
        includesAnimation: false,
        isThemeDark: true,
      };

      const result = Composite.hero.standard(props);
    });
  });

  describe('Sizing Properties', () => {
    it('should handle small height sizing', () => {
      const props: HeroStandardProps = {
        headline: createElement('h1', 'Small Height Hero'),
        isHeightSmall: true,
        isThemeDark: false,
      };

      const result = Composite.hero.standard(props);
    });

    it('should handle full height sizing', () => {
      const props: HeroStandardProps = {
        headline: createElement('h1', 'Full Height Hero'),
        isHeightFull: true,
        isThemeDark: true,
      };

      const result = Composite.hero.standard(props);
    });
  });

  describe('Layout Properties', () => {
    it('should handle centered text layout', () => {
      const props: HeroStandardProps = {
        headline: createElement('h1', 'Centered Hero'),
        isTextCenter: true,
        isThemeDark: false,
      };

      const result = Composite.hero.standard(props);
    });

    it('should handle right-aligned text layout', () => {
      const props: HeroStandardProps = {
        headline: createElement('h1', 'Right Aligned Hero'),
        isTextRight: true,
        isThemeDark: true,
      };

      const result = Composite.hero.standard(props);
    });
  });

  describe('Complete Configuration', () => {
    it('should handle all properties together', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h1>Complete Hero</h1><p>All features</p>';

      const props: HeroStandardProps = {
        headline: createElement('h1', 'Complete Hero'),
        text: createElement('p', 'All features included'),
        eyebrow: createElement('span', 'Premium'),
        actions: createElement('div', 'Get Started'),
        image: createImageElement('hero.jpg', 'Hero image'),
        video: createVideoElement('hero.mp4'),
        includesAnimation: true,
        isHeightFull: true,
        isTextCenter: true,
        isThemeDark: true,
      };

      const result = Composite.hero.standard(props);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Type Safety', () => {
    it('should accept valid theme properties', () => {
      // This should compile without errors
      const props: HeroStandardProps = {
        isThemeDark: true,
        headline: createElement('h1', 'Theme Test'),
      };

      const result = Composite.hero.standard(props);

      expect(result).toBeDefined();
    });

    it('should accept optional content properties', () => {
      // All content props are optional
      const props: HeroStandardProps = {
        isThemeDark: false,
      };

      const result = Composite.hero.standard(props);

      expect(result).toBeDefined();
    });
  });
});
