import { Composite } from '../../../index';
import type { HeroLogoProps } from '../../hero/_types';
import {
  createElement,
  createImageElement,
  createVideoElement,
  validateElementStructure,
} from '../test-helpers/element';
import '../test-helpers/setup';

// Mock the internal dependencies that the hero logo uses
jest.mock('../../../atomic', () => ({
  assets: {
    image: {
      background: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-image-background',
      }),
    },
  },
  textLockup: {
    large: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-text-lockup-large',
    }),
  },
}));

jest.mock('../../../model', () => ({
  ElementModel: {
    createDiv: jest.fn().mockImplementation((props) => ({
      element: document.createElement('div'),
      styles: props?.className ? `.${props.className} {}` : '',
    })),
    headline: {
      campaignLarge: jest.fn().mockReturnValue({
        element: document.createElement('h1'),
        styles: '.mock-headline-campaign-large',
      }),
    },
    layout: {
      spaceHorizontalSmall: jest.fn().mockImplementation((props) => ({
        element: props?.element || document.createElement('div'),
        styles: '.mock-layout-space-horizontal-small',
      })),
    },
  },
}));

describe('Hero Logo Component', () => {
  const { assets, textLockup } = require('../../../atomic');
  const { ElementModel } = require('../../../model');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Structure', () => {
    it('should create a logo hero with minimal props', () => {
      const props: HeroLogoProps = {
        isThemeDark: true,
        isThemeMaryland: false,
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
      expect(typeof result.styles).toBe('string');
      validateElementStructure(result, { hasElement: true, hasStyles: true });
      expect(textLockup.large).toHaveBeenCalled();
    });

    it('should create logo hero with all content props', () => {
      const props: HeroLogoProps = {
        headline: createElement('h1', 'Logo Hero'),
        text: createElement('p', 'With UMD branding'),
        eyebrow: createElement('span', 'University'),
        actions: createElement('div', 'Apply Now'),
        isThemeDark: false,
        isThemeMaryland: true,
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(ElementModel.headline.campaignLarge).toHaveBeenCalledWith(
        expect.objectContaining({
          element: props.headline,
        }),
      );
      expect(textLockup.large).toHaveBeenCalledWith(
        expect.objectContaining({
          ribbon: props.eyebrow,
          textLargest: props.text,
          actions: props.actions,
        }),
      );
    });
  });

  describe('Asset Properties', () => {
    it('should handle logo element', () => {
      const logoElement = createElement('div', 'UMD');
      logoElement.className = 'university-logo';

      const props: HeroLogoProps = {
        headline: createElement('h1', 'With Custom Logo'),
        logo: logoElement,
        isThemeDark: true,
        isThemeMaryland: false,
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
    });

    it('should handle image asset with logo', () => {
      const props: HeroLogoProps = {
        headline: createElement('h1', 'Logo with Image'),
        image: createImageElement('campus-bg.jpg', 'Campus background'),
        isThemeDark: false,
        isThemeMaryland: true,
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
    });

    it('should handle video asset with logo', () => {
      const props: HeroLogoProps = {
        headline: createElement('h1', 'Logo with Video'),
        video: createVideoElement('campus-tour.mp4'),
        isThemeDark: true,
        isThemeMaryland: false,
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
    });
  });

  describe('Animation Properties', () => {
    it('should handle includesAnimation flag', () => {
      const props: HeroLogoProps = {
        headline: createElement('h1', 'Animated Logo Hero'),
        includesAnimation: true,
        isThemeDark: false,
        isThemeMaryland: true,
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
    });

    it('should handle logo without animation', () => {
      const props: HeroLogoProps = {
        headline: createElement('h1', 'Static Logo'),
        includesAnimation: false,
        isThemeDark: true,
        isThemeMaryland: false,
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
    });
  });

  describe('Theme Variations', () => {
    it('should handle light theme', () => {
      const props: HeroLogoProps = {
        headline: createElement('h1', 'Light Theme Logo'),
        isThemeLight: true,
        isThemeDark: false,
        isThemeMaryland: false,
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
    });

    it('should handle all theme properties together', () => {
      const props: HeroLogoProps = {
        headline: createElement('h1', 'All Themes'),
        isThemeDark: true,
        isThemeLight: false,
        isThemeMaryland: true,
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
    });
  });

  describe('Logo-Specific Properties', () => {
    it('should handle custom logo element', () => {
      const customLogo = createElement('svg');
      customLogo.innerHTML = '<path d="M0 0h100v100H0z"/>';

      const props: HeroLogoProps = {
        headline: createElement('h1', 'Custom Logo'),
        logo: customLogo,
        isThemeDark: false,
        isThemeMaryland: true,
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
    });

    it('should work without any content', () => {
      const props: HeroLogoProps = {
        // Only theme properties, all content is optional
        isThemeDark: true,
        isThemeMaryland: false,
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
    });

    it('should handle all content properties', () => {
      const props: HeroLogoProps = {
        headline: createElement('h1', 'Full Content'),
        eyebrow: createElement('span', 'University'),
        text: createElement('p', 'Description'),
        actions: createElement('button', 'Apply'),
        logo: createElement('div', 'Logo'),
        image: createImageElement('hero.jpg', 'Hero'),
        video: createVideoElement('hero.mp4'),
        isThemeDark: false,
        isThemeMaryland: true,
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
    });
  });

  describe('Theme Properties', () => {
    it('should handle dark theme', () => {
      const props: HeroLogoProps = {
        headline: createElement('h1', 'Dark Logo'),
        isThemeDark: true,
        isThemeMaryland: false,
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
    });

    it('should handle Maryland theme', () => {
      const props: HeroLogoProps = {
        headline: createElement('h1', 'Maryland Theme'),
        isThemeDark: false,
        isThemeMaryland: true,
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
    });

    it('should handle both dark and Maryland themes', () => {
      const props: HeroLogoProps = {
        headline: createElement('h1', 'Dark Maryland'),
        isThemeDark: true,
        isThemeMaryland: true,
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
    });
  });

  describe('Logo Integration', () => {
    it('should handle default UMD logo when no custom logo provided', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML =
        '<div class="logo-hero"><svg class="umd-logo"></svg></div>';

      const props: HeroLogoProps = {
        headline: createElement('h1', 'Default Logo'),
        isThemeDark: false,
        isThemeMaryland: true,
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
    });

    it('should handle custom logo element', () => {
      const mockElement = document.createElement('div');
      const customLogo = createElement('img');
      customLogo.setAttribute('src', 'custom-logo.svg');
      customLogo.setAttribute('alt', 'Custom Logo');

      mockElement.appendChild(customLogo);

      const props: HeroLogoProps = {
        headline: createElement('h1', 'Custom Logo'),
        logo: customLogo,
        isThemeDark: true,
        isThemeMaryland: false,
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
    });
  });

  describe('Complete Configuration', () => {
    it('should handle all properties together', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML =
        '<div class="hero-logo"><h1>Complete Logo</h1></div>';

      const customLogo = createElement('div', 'UMD');
      customLogo.className = 'custom-umd-logo';

      const props: HeroLogoProps = {
        // Content
        headline: createElement('h1', 'Complete Logo'),
        text: createElement('p', 'Full featured logo hero'),
        eyebrow: createElement('span', 'University of Maryland'),
        actions: createElement('div', 'Visit Campus'),

        // Logo
        logo: customLogo,

        // Assets
        image: createImageElement('campus.jpg', 'Campus'),
        video: createVideoElement('campus-tour.mp4'),

        // Animation
        includesAnimation: true,

        // Theme
        isThemeDark: true,
        isThemeLight: false,
        isThemeMaryland: true,
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
      expect(ElementModel.headline.campaignLarge).toHaveBeenCalledWith(
        expect.objectContaining({
          element: props.headline,
        }),
      );
    });
  });

  describe('Type Safety', () => {
    it('should accept optional theme properties', () => {
      // All theme properties are optional
      const props: HeroLogoProps = {
        isThemeDark: true,
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
    });

    it('should accept all optional content', () => {
      // Minimal with only required themes
      const props: HeroLogoProps = {
        isThemeDark: false,
        isThemeMaryland: true,
        // All content is optional
        headline: undefined,
        text: undefined,
        eyebrow: undefined,
        actions: undefined,
        logo: undefined,
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
    });

    it('should handle logo-specific configurations', () => {
      // Logo hero with branding focus
      const props: HeroLogoProps = {
        isThemeDark: false,
        isThemeMaryland: true,
        logo: createElement('div', 'Maryland'),
        headline: createElement('h1', 'Go Terps!'),
      };

      const result = Composite.hero.logo(props);

      expect(result).toBeDefined();
    });
  });
});
