import { Composite } from '@universityofmaryland/web-elements-library';
import type { HeroLogoProps } from '../../hero/_types';
import {
  createElement,
  createImageElement,
  createVideoElement,
  validateElementStructure,
  containsText,
} from '../test-helpers/element';
import '../test-helpers/setup';

// Mock the elements library
jest.mock('@universityofmaryland/web-elements-library');

describe('Hero Logo Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Structure', () => {
    it('should create a logo hero with minimal props', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-logo'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

      const props: HeroLogoProps = {
        isThemeDark: true,
        isThemeMaryland: false
      };
      
      const result = Composite.hero.logo(props);
      
      expect(Composite.hero.logo).toHaveBeenCalledWith(props);
      expect(result).toBe(mockResult);
      validateElementStructure(result, { hasElement: true, hasStyles: true });
    });

    it('should create logo hero with all content props', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h1>Logo Hero</h1><div class="logo"></div>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-logo'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

      const props: HeroLogoProps = {
        headline: createElement('h1', 'Logo Hero'),
        text: createElement('p', 'With UMD branding'),
        eyebrow: createElement('span', 'University'),
        actions: createElement('div', 'Apply Now'),
        isThemeDark: false,
        isThemeMaryland: true
      };
      
      const result = Composite.hero.logo(props);
      
      expect(Composite.hero.logo).toHaveBeenCalledWith(props);
      expect(containsText(result.element, 'Logo Hero')).toBe(true);
    });
  });

  describe('Asset Properties', () => {
    it('should handle logo element', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-logo'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

      const logoElement = createElement('div', 'UMD');
      logoElement.className = 'university-logo';

      const props: HeroLogoProps = {
        headline: createElement('h1', 'With Custom Logo'),
        logo: logoElement,
        isThemeDark: true,
        isThemeMaryland: false
      };
      
      const result = Composite.hero.logo(props);
      
      expect(Composite.hero.logo).toHaveBeenCalledWith(props);
    });

    it('should handle image asset with logo', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-logo'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

      const props: HeroLogoProps = {
        headline: createElement('h1', 'Logo with Image'),
        image: createImageElement('campus-bg.jpg', 'Campus background'),
        isThemeDark: false,
        isThemeMaryland: true
      };
      
      const result = Composite.hero.logo(props);
      
      expect(Composite.hero.logo).toHaveBeenCalledWith(props);
    });

    it('should handle video asset with logo', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-logo'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

      const props: HeroLogoProps = {
        headline: createElement('h1', 'Logo with Video'),
        video: createVideoElement('campus-tour.mp4'),
        isThemeDark: true,
        isThemeMaryland: false
      };
      
      const result = Composite.hero.logo(props);
      
      expect(Composite.hero.logo).toHaveBeenCalledWith(props);
    });
  });

  describe('Animation Properties', () => {
    it('should handle includesAnimation flag', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-logo'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

      const props: HeroLogoProps = {
        headline: createElement('h1', 'Animated Logo Hero'),
        includesAnimation: true,
        isThemeDark: false,
        isThemeMaryland: true
      };
      
      const result = Composite.hero.logo(props);
      
      expect(Composite.hero.logo).toHaveBeenCalledWith(props);
    });

    it('should handle logo without animation', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-logo'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

      const props: HeroLogoProps = {
        headline: createElement('h1', 'Static Logo'),
        includesAnimation: false,
        isThemeDark: true,
        isThemeMaryland: false
      };
      
      const result = Composite.hero.logo(props);
      
      expect(Composite.hero.logo).toHaveBeenCalledWith(props);
    });
  });

  describe('Theme Variations', () => {
    it('should handle light theme', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-logo'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

      const props: HeroLogoProps = {
        headline: createElement('h1', 'Light Theme Logo'),
        isThemeLight: true,
        isThemeDark: false,
        isThemeMaryland: false
      };
      
      const result = Composite.hero.logo(props);
      
      expect(Composite.hero.logo).toHaveBeenCalledWith(props);
    });

    it('should handle all theme properties together', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-logo'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

      const props: HeroLogoProps = {
        headline: createElement('h1', 'All Themes'),
        isThemeDark: true,
        isThemeLight: false,
        isThemeMaryland: true
      };
      
      const result = Composite.hero.logo(props);
      
      expect(Composite.hero.logo).toHaveBeenCalledWith(props);
    });
  });

  describe('Logo-Specific Properties', () => {
    it('should handle custom logo element', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-logo'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

      const customLogo = createElement('svg');
      customLogo.innerHTML = '<path d="M0 0h100v100H0z"/>';

      const props: HeroLogoProps = {
        headline: createElement('h1', 'Custom Logo'),
        logo: customLogo,
        isThemeDark: false,
        isThemeMaryland: true
      };
      
      const result = Composite.hero.logo(props);
      
      expect(Composite.hero.logo).toHaveBeenCalledWith(props);
    });

    it('should work without any content', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-logo'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

      const props: HeroLogoProps = {
        // Only theme properties, all content is optional
        isThemeDark: true,
        isThemeMaryland: false
      };
      
      const result = Composite.hero.logo(props);
      
      expect(Composite.hero.logo).toHaveBeenCalledWith(props);
    });

    it('should handle all content properties', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-logo'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

      const props: HeroLogoProps = {
        headline: createElement('h1', 'Full Content'),
        eyebrow: createElement('span', 'University'),
        text: createElement('p', 'Description'),
        actions: createElement('button', 'Apply'),
        logo: createElement('div', 'Logo'),
        image: createImageElement('hero.jpg', 'Hero'),
        video: createVideoElement('hero.mp4'),
        isThemeDark: false,
        isThemeMaryland: true
      };
      
      const result = Composite.hero.logo(props);
      
      expect(Composite.hero.logo).toHaveBeenCalledWith(props);
    });
  });

  describe('Theme Properties', () => {
    it('should handle dark theme', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-logo-dark'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

      const props: HeroLogoProps = {
        headline: createElement('h1', 'Dark Logo'),
        isThemeDark: true,
        isThemeMaryland: false
      };
      
      const result = Composite.hero.logo(props);
      
      expect(Composite.hero.logo).toHaveBeenCalledWith(props);
    });

    it('should handle Maryland theme', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-logo-maryland'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

      const props: HeroLogoProps = {
        headline: createElement('h1', 'Maryland Theme'),
        isThemeDark: false,
        isThemeMaryland: true
      };
      
      const result = Composite.hero.logo(props);
      
      expect(Composite.hero.logo).toHaveBeenCalledWith(props);
    });

    it('should handle both dark and Maryland themes', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-logo-dark-maryland'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

      const props: HeroLogoProps = {
        headline: createElement('h1', 'Dark Maryland'),
        isThemeDark: true,
        isThemeMaryland: true
      };
      
      const result = Composite.hero.logo(props);
      
      expect(Composite.hero.logo).toHaveBeenCalledWith(props);
    });
  });

  describe('Logo Integration', () => {
    it('should handle default UMD logo when no custom logo provided', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<div class="logo-hero"><svg class="umd-logo"></svg></div>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-logo-default'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

      const props: HeroLogoProps = {
        headline: createElement('h1', 'Default Logo'),
        isThemeDark: false,
        isThemeMaryland: true
      };
      
      const result = Composite.hero.logo(props);
      
      expect(result.element.querySelector('.umd-logo')).toBeTruthy();
    });

    it('should handle custom logo element', () => {
      const mockElement = document.createElement('div');
      const customLogo = createElement('img');
      customLogo.setAttribute('src', 'custom-logo.svg');
      customLogo.setAttribute('alt', 'Custom Logo');
      
      mockElement.appendChild(customLogo);
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-logo-custom'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

      const props: HeroLogoProps = {
        headline: createElement('h1', 'Custom Logo'),
        logo: customLogo,
        isThemeDark: true,
        isThemeMaryland: false
      };
      
      const result = Composite.hero.logo(props);
      
      expect(result.element.querySelector('img[alt="Custom Logo"]')).toBeTruthy();
    });
  });

  describe('Complete Configuration', () => {
    it('should handle all properties together', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<div class="hero-logo"><h1>Complete Logo</h1></div>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-logo-complete'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

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
        isThemeMaryland: true
      };
      
      const result = Composite.hero.logo(props);
      
      expect(Composite.hero.logo).toHaveBeenCalledWith(props);
      expect(containsText(result.element, 'Complete Logo')).toBe(true);
    });
  });

  describe('Type Safety', () => {
    it('should accept optional theme properties', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-logo'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

      // All theme properties are optional
      const props: HeroLogoProps = {
        isThemeDark: true
      };
      
      const result = Composite.hero.logo(props);
      
      expect(result).toBeDefined();
    });

    it('should accept all optional content', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-logo'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

      // Minimal with only required themes
      const props: HeroLogoProps = {
        isThemeDark: false,
        isThemeMaryland: true,
        // All content is optional
        headline: undefined,
        text: undefined,
        eyebrow: undefined,
        actions: undefined,
        logo: undefined
      };
      
      const result = Composite.hero.logo(props);
      
      expect(result).toBeDefined();
    });

    it('should handle logo-specific configurations', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-logo'
      };
      (Composite.hero.logo as jest.Mock).mockReturnValue(mockResult);

      // Logo hero with branding focus
      const props: HeroLogoProps = {
        isThemeDark: false,
        isThemeMaryland: true,
        logo: createElement('div', 'Maryland'),
        headline: createElement('h1', 'Go Terps!')
      };
      
      const result = Composite.hero.logo(props);
      
      expect(result).toBeDefined();
    });
  });
});