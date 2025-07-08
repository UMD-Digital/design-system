import { Composite } from '@universityofmaryland/web-elements-library';
import type { HeroMinimalProps } from '../../hero/_types';
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

describe('Hero Minimal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Structure', () => {
    it('should create a minimal hero with minimal props', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-minimal'
      };
      (Composite.hero.minimal as jest.Mock).mockReturnValue(mockResult);

      const props: HeroMinimalProps = {
        isThemeDark: true
      };
      
      const result = Composite.hero.minimal(props);
      
      expect(Composite.hero.minimal).toHaveBeenCalledWith(props);
      expect(result).toBe(mockResult);
      validateElementStructure(result, { hasElement: true, hasStyles: true });
    });

    it('should create minimal hero with all content props', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h1>Complete Minimal</h1><p>With description</p>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-minimal'
      };
      (Composite.hero.minimal as jest.Mock).mockReturnValue(mockResult);

      const props: HeroMinimalProps = {
        headline: createElement('h1', 'Complete Minimal'),
        text: createElement('p', 'With description'),
        eyebrow: createElement('span', 'Category'),
        actions: createElement('div', 'Learn More'),
        isThemeDark: false
      };
      
      const result = Composite.hero.minimal(props);
      
      expect(Composite.hero.minimal).toHaveBeenCalledWith(props);
      expect(containsText(result.element, 'Complete Minimal')).toBe(true);
      expect(containsText(result.element, 'With description')).toBe(true);
    });
  });

  describe('Asset Properties', () => {
    it('should handle image asset', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-minimal'
      };
      (Composite.hero.minimal as jest.Mock).mockReturnValue(mockResult);

      const props: HeroMinimalProps = {
        headline: createElement('h1', 'Minimal with Image'),
        image: createImageElement('minimal-hero.jpg', 'Minimal hero image'),
        isThemeDark: true
      };
      
      const result = Composite.hero.minimal(props);
      
      expect(Composite.hero.minimal).toHaveBeenCalledWith(props);
    });

    it('should handle video asset', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-minimal'
      };
      (Composite.hero.minimal as jest.Mock).mockReturnValue(mockResult);

      const props: HeroMinimalProps = {
        headline: createElement('h1', 'Minimal with Video'),
        video: createVideoElement('minimal-hero.mp4'),
        isThemeDark: false
      };
      
      const result = Composite.hero.minimal(props);
      
      expect(Composite.hero.minimal).toHaveBeenCalledWith(props);
    });

    it('should handle both image and video assets', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-minimal'
      };
      (Composite.hero.minimal as jest.Mock).mockReturnValue(mockResult);

      const props: HeroMinimalProps = {
        headline: createElement('h1', 'Minimal with Assets'),
        image: createImageElement('minimal-fg.jpg', 'Foreground'),
        video: createVideoElement('minimal-video.mp4'),
        isThemeDark: true
      };
      
      const result = Composite.hero.minimal(props);
      
      expect(Composite.hero.minimal).toHaveBeenCalledWith(props);
    });
  });

  describe('Theme Variations', () => {
    it('should handle light theme', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-minimal'
      };
      (Composite.hero.minimal as jest.Mock).mockReturnValue(mockResult);

      const props: HeroMinimalProps = {
        headline: createElement('h1', 'Light Theme Hero'),
        isThemeLight: true,
        isThemeDark: false
      };
      
      const result = Composite.hero.minimal(props);
      
      expect(Composite.hero.minimal).toHaveBeenCalledWith(props);
    });

    it('should handle Maryland theme', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-minimal'
      };
      (Composite.hero.minimal as jest.Mock).mockReturnValue(mockResult);

      const props: HeroMinimalProps = {
        headline: createElement('h1', 'Maryland Theme Hero'),
        isThemeMaryland: true
      };
      
      const result = Composite.hero.minimal(props);
      
      expect(Composite.hero.minimal).toHaveBeenCalledWith(props);
    });
  });

  describe('Content Properties', () => {
    it('should handle headline content', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-minimal'
      };
      (Composite.hero.minimal as jest.Mock).mockReturnValue(mockResult);

      const props: HeroMinimalProps = {
        headline: createElement('h1', 'Main Headline'),
        isThemeDark: false
      };
      
      const result = Composite.hero.minimal(props);
      
      expect(Composite.hero.minimal).toHaveBeenCalledWith(props);
    });

    it('should handle eyebrow content', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-minimal'
      };
      (Composite.hero.minimal as jest.Mock).mockReturnValue(mockResult);

      const props: HeroMinimalProps = {
        eyebrow: createElement('span', 'Category'),
        headline: createElement('h1', 'With Eyebrow'),
        isThemeDark: true
      };
      
      const result = Composite.hero.minimal(props);
      
      expect(Composite.hero.minimal).toHaveBeenCalledWith(props);
    });

    it('should handle actions content', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-minimal'
      };
      (Composite.hero.minimal as jest.Mock).mockReturnValue(mockResult);

      const props: HeroMinimalProps = {
        headline: createElement('h1', 'With Actions'),
        actions: createElement('button', 'Click Me'),
        isThemeDark: false
      };
      
      const result = Composite.hero.minimal(props);
      
      expect(Composite.hero.minimal).toHaveBeenCalledWith(props);
    });
  });



  describe('Complete Configuration', () => {
    it('should handle all properties together', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h1>Full Minimal</h1><p>Everything</p>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-minimal-complete'
      };
      (Composite.hero.minimal as jest.Mock).mockReturnValue(mockResult);

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
        isThemeMaryland: true
      };
      
      const result = Composite.hero.minimal(props);
      
      expect(Composite.hero.minimal).toHaveBeenCalledWith(props);
      expect(containsText(result.element, 'Full Minimal')).toBe(true);
      expect(containsText(result.element, 'Everything')).toBe(true);
    });
  });

  describe('Type Safety', () => {
    it('should accept all optional properties', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-minimal'
      };
      (Composite.hero.minimal as jest.Mock).mockReturnValue(mockResult);

      // All properties are optional
      const props: HeroMinimalProps = {
        isThemeDark: true
      };
      
      const result = Composite.hero.minimal(props);
      
      expect(result).toBeDefined();
    });

    it('should accept minimal configuration', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-minimal'
      };
      (Composite.hero.minimal as jest.Mock).mockReturnValue(mockResult);

      // Minimal valid configuration with just a theme
      const props: HeroMinimalProps = {
        isThemeLight: true
      };
      
      const result = Composite.hero.minimal(props);
      
      expect(result).toBeDefined();
    });

    it('should handle all theme variations', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-minimal'
      };
      (Composite.hero.minimal as jest.Mock).mockReturnValue(mockResult);

      // Test different theme combinations
      const themeConfigs: HeroMinimalProps[] = [
        { isThemeDark: true },
        { isThemeLight: true },
        { isThemeMaryland: true },
        { isThemeDark: true, isThemeMaryland: true },
        { isThemeLight: true, isThemeMaryland: false }
      ];
      
      themeConfigs.forEach(config => {
        const result = Composite.hero.minimal(config);
        expect(result).toBeDefined();
      });
    });
  });
});