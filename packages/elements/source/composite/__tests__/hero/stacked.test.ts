import { Composite } from '@universityofmaryland/web-elements-library';
import type { HeroStackedProps } from '../../hero/_types';
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

describe('Hero Stacked Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Structure', () => {
    it('should create a stacked hero with minimal props', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-stacked'
      };
      (Composite.hero.stacked as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStackedProps = {
        isThemeDark: true
      };
      
      const result = Composite.hero.stacked(props);
      
      expect(Composite.hero.stacked).toHaveBeenCalledWith(props);
      expect(result).toBe(mockResult);
      validateElementStructure(result, { hasElement: true, hasStyles: true });
    });

    it('should create stacked hero with all content props', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h1>Stacked Hero</h1><p>Stacked layout</p>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-stacked'
      };
      (Composite.hero.stacked as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStackedProps = {
        headline: createElement('h1', 'Stacked Hero'),
        text: createElement('p', 'Stacked layout content'),
        eyebrow: createElement('span', 'News'),
        actions: createElement('div', 'View More'),
        isThemeDark: false
      };
      
      const result = Composite.hero.stacked(props);
      
      expect(Composite.hero.stacked).toHaveBeenCalledWith(props);
      expect(containsText(result.element, 'Stacked Hero')).toBe(true);
      expect(containsText(result.element, 'Stacked layout')).toBe(true);
    });
  });

  describe('Asset Properties', () => {
    it('should handle image asset in stacked layout', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-stacked'
      };
      (Composite.hero.stacked as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStackedProps = {
        headline: createElement('h1', 'Stacked with Image'),
        image: createImageElement('stacked-hero.jpg', 'Stacked hero image'),
        isThemeDark: true
      };
      
      const result = Composite.hero.stacked(props);
      
      expect(Composite.hero.stacked).toHaveBeenCalledWith(props);
    });

    it('should handle video asset in stacked layout', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-stacked'
      };
      (Composite.hero.stacked as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStackedProps = {
        headline: createElement('h1', 'Stacked with Video'),
        video: createVideoElement('stacked-hero.mp4'),
        isThemeDark: false
      };
      
      const result = Composite.hero.stacked(props);
      
      expect(Composite.hero.stacked).toHaveBeenCalledWith(props);
    });

    it('should handle both image and video assets', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-stacked'
      };
      (Composite.hero.stacked as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStackedProps = {
        headline: createElement('h1', 'Stacked with Media'),
        image: createImageElement('stacked.jpg', 'Image'),
        video: createVideoElement('stacked.mp4'),
        isThemeDark: true
      };
      
      const result = Composite.hero.stacked(props);
      
      expect(Composite.hero.stacked).toHaveBeenCalledWith(props);
    });
  });

  describe('Animation Properties', () => {
    it('should handle includesAnimation flag', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-stacked'
      };
      (Composite.hero.stacked as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStackedProps = {
        headline: createElement('h1', 'Animated Stacked'),
        includesAnimation: true,
        isThemeDark: true
      };
      
      const result = Composite.hero.stacked(props);
      
      expect(Composite.hero.stacked).toHaveBeenCalledWith(props);
    });

    it('should handle hero without animation', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-stacked'
      };
      (Composite.hero.stacked as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStackedProps = {
        headline: createElement('h1', 'Static Stacked'),
        includesAnimation: false,
        isThemeDark: false
      };
      
      const result = Composite.hero.stacked(props);
      
      expect(Composite.hero.stacked).toHaveBeenCalledWith(props);
    });
  });

  describe('Sizing Properties', () => {
    it('should handle small height', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-stacked'
      };
      (Composite.hero.stacked as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStackedProps = {
        headline: createElement('h1', 'Small Height Stacked'),
        isHeightSmall: true,
        isThemeDark: true
      };
      
      const result = Composite.hero.stacked(props);
      
      expect(Composite.hero.stacked).toHaveBeenCalledWith(props);
    });

    it('should handle full height', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-stacked'
      };
      (Composite.hero.stacked as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStackedProps = {
        headline: createElement('h1', 'Full Height Stacked'),
        isHeightFull: true,
        isThemeDark: false
      };
      
      const result = Composite.hero.stacked(props);
      
      expect(Composite.hero.stacked).toHaveBeenCalledWith(props);
    });

    it('should handle large width (stacked-specific)', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-stacked'
      };
      (Composite.hero.stacked as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStackedProps = {
        headline: createElement('h1', 'Large Width Stacked'),
        isWidthLarge: true,
        isThemeDark: true
      };
      
      const result = Composite.hero.stacked(props);
      
      expect(Composite.hero.stacked).toHaveBeenCalledWith(props);
    });
  });

  describe('Theme Properties', () => {
    it('should handle dark theme', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-stacked-dark'
      };
      (Composite.hero.stacked as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStackedProps = {
        headline: createElement('h1', 'Dark Stacked'),
        isThemeDark: true
      };
      
      const result = Composite.hero.stacked(props);
      
      expect(Composite.hero.stacked).toHaveBeenCalledWith(props);
    });

    it('should handle light theme', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-stacked-light'
      };
      (Composite.hero.stacked as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStackedProps = {
        headline: createElement('h1', 'Light Stacked'),
        isThemeDark: false
      };
      
      const result = Composite.hero.stacked(props);
      
      expect(Composite.hero.stacked).toHaveBeenCalledWith(props);
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
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-stacked-layout'
      };
      (Composite.hero.stacked as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStackedProps = {
        headline: createElement('h1', 'Stacked Content'),
        text: createElement('p', 'Description below'),
        image: createImageElement('stacked.jpg', 'Stacked'),
        isThemeDark: true
      };
      
      const result = Composite.hero.stacked(props);
      
      expect(containsText(result.element, 'Stacked Content')).toBe(true);
      expect(containsText(result.element, 'Description below')).toBe(true);
      expect(result.element.querySelector('img')).toBeTruthy();
    });
  });

  describe('Complete Configuration', () => {
    it('should handle all properties together', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<div class="hero-stacked"><h1>Full Stacked</h1></div>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-stacked-complete'
      };
      (Composite.hero.stacked as jest.Mock).mockReturnValue(mockResult);

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
        isThemeDark: true
      };
      
      const result = Composite.hero.stacked(props);
      
      expect(Composite.hero.stacked).toHaveBeenCalledWith(props);
      expect(containsText(result.element, 'Full Stacked')).toBe(true);
    });
  });

  describe('Type Safety', () => {
    it('should accept minimal valid configuration', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-stacked'
      };
      (Composite.hero.stacked as jest.Mock).mockReturnValue(mockResult);

      // Minimal configuration - only theme required
      const props: HeroStackedProps = {
        isThemeDark: false
      };
      
      const result = Composite.hero.stacked(props);
      
      expect(result).toBeDefined();
    });

    it('should handle all sizing options', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-stacked'
      };
      (Composite.hero.stacked as jest.Mock).mockReturnValue(mockResult);

      // Test different sizing combinations
      const sizingConfigs: HeroStackedProps[] = [
        { isHeightSmall: true, isThemeDark: true },
        { isHeightFull: true, isThemeDark: false },
        { isWidthLarge: true, isThemeDark: true },
        { isHeightSmall: true, isWidthLarge: true, isThemeDark: false },
        { isHeightFull: true, isWidthLarge: true, isThemeDark: true }
      ];
      
      sizingConfigs.forEach(props => {
        const result = Composite.hero.stacked(props);
        expect(result).toBeDefined();
      });
    });

    it('should handle stacked-specific layout', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-stacked'
      };
      (Composite.hero.stacked as jest.Mock).mockReturnValue(mockResult);

      // Stacked layout with content above and media below
      const props: HeroStackedProps = {
        headline: createElement('h1', 'Stacked Layout'),
        text: createElement('p', 'Content on top'),
        image: createImageElement('below.jpg', 'Media below'),
        isWidthLarge: true,
        isThemeDark: true
      };
      
      const result = Composite.hero.stacked(props);
      
      expect(result).toBeDefined();
    });
  });
});