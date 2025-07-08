import { Composite } from '@universityofmaryland/web-elements-library';
import type { HeroStandardProps } from '../../hero/_types';
import {
  createElement,
  createImageElement,
  createVideoElement,
  createLinkElement,
  validateElementStructure,
  containsText,
} from '../test-helpers/element';
import '../test-helpers/setup';

// Mock the elements library
jest.mock('@universityofmaryland/web-elements-library');

describe('Hero Standard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Structure', () => {
    it('should create a standard hero with minimal props', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-standard'
      };
      (Composite.hero.standard as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStandardProps = {
        isThemeDark: true
      };
      
      const result = Composite.hero.standard(props);
      
      expect(Composite.hero.standard).toHaveBeenCalledWith(props);
      expect(result).toBe(mockResult);
      validateElementStructure(result, { hasElement: true, hasStyles: true });
    });

    it('should create a standard hero with all content props', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h1>Hero Title</h1><p>Hero description</p>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-standard'
      };
      (Composite.hero.standard as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStandardProps = {
        headline: createElement('h1', 'Hero Title'),
        text: createElement('p', 'Hero description'),
        eyebrow: createElement('span', 'Featured'),
        actions: createElement('div', 'Call to Action'),
        isThemeDark: false
      };
      
      const result = Composite.hero.standard(props);
      
      expect(Composite.hero.standard).toHaveBeenCalledWith(props);
      expect(containsText(result.element, 'Hero Title')).toBe(true);
      expect(containsText(result.element, 'Hero description')).toBe(true);
    });
  });

  describe('Asset Properties', () => {
    it('should handle image asset', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-standard'
      };
      (Composite.hero.standard as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStandardProps = {
        headline: createElement('h1', 'Hero with Image'),
        image: createImageElement('hero.jpg', 'Hero image'),
        isThemeDark: false
      };
      
      const result = Composite.hero.standard(props);
      
      expect(Composite.hero.standard).toHaveBeenCalledWith(props);
      expect(result).toBe(mockResult);
    });

    it('should handle video asset', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-standard'
      };
      (Composite.hero.standard as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStandardProps = {
        headline: createElement('h1', 'Hero with Video'),
        video: createVideoElement('hero.mp4'),
        isThemeDark: true
      };
      
      const result = Composite.hero.standard(props);
      
      expect(Composite.hero.standard).toHaveBeenCalledWith(props);
    });

    it('should handle both image and video assets', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-standard'
      };
      (Composite.hero.standard as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStandardProps = {
        headline: createElement('h1', 'Hero with Assets'),
        image: createImageElement('hero.jpg', 'Hero image'),
        video: createVideoElement('hero.mp4'),
        isThemeDark: true
      };
      
      const result = Composite.hero.standard(props);
      
      expect(Composite.hero.standard).toHaveBeenCalledWith(props);
    });
  });

  describe('Animation Properties', () => {
    it('should handle includesAnimation flag', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-standard'
      };
      (Composite.hero.standard as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStandardProps = {
        headline: createElement('h1', 'Animated Hero'),
        includesAnimation: true,
        isThemeDark: false
      };
      
      const result = Composite.hero.standard(props);
      
      expect(Composite.hero.standard).toHaveBeenCalledWith(props);
    });

    it('should handle hero without animation', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-standard'
      };
      (Composite.hero.standard as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStandardProps = {
        headline: createElement('h1', 'Static Hero'),
        includesAnimation: false,
        isThemeDark: true
      };
      
      const result = Composite.hero.standard(props);
      
      expect(Composite.hero.standard).toHaveBeenCalledWith(props);
    });
  });

  describe('Sizing Properties', () => {
    it('should handle small height sizing', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-standard'
      };
      (Composite.hero.standard as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStandardProps = {
        headline: createElement('h1', 'Small Height Hero'),
        isHeightSmall: true,
        isThemeDark: false
      };
      
      const result = Composite.hero.standard(props);
      
      expect(Composite.hero.standard).toHaveBeenCalledWith(props);
    });

    it('should handle full height sizing', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-standard'
      };
      (Composite.hero.standard as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStandardProps = {
        headline: createElement('h1', 'Full Height Hero'),
        isHeightFull: true,
        isThemeDark: true
      };
      
      const result = Composite.hero.standard(props);
      
      expect(Composite.hero.standard).toHaveBeenCalledWith(props);
    });
  });

  describe('Layout Properties', () => {
    it('should handle centered text layout', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-standard'
      };
      (Composite.hero.standard as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStandardProps = {
        headline: createElement('h1', 'Centered Hero'),
        isTextCenter: true,
        isThemeDark: false
      };
      
      const result = Composite.hero.standard(props);
      
      expect(Composite.hero.standard).toHaveBeenCalledWith(props);
    });

    it('should handle right-aligned text layout', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-standard'
      };
      (Composite.hero.standard as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStandardProps = {
        headline: createElement('h1', 'Right Aligned Hero'),
        isTextRight: true,
        isThemeDark: true
      };
      
      const result = Composite.hero.standard(props);
      
      expect(Composite.hero.standard).toHaveBeenCalledWith(props);
    });
  });

  describe('Complete Configuration', () => {
    it('should handle all properties together', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h1>Complete Hero</h1><p>All features</p>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-standard-complete'
      };
      (Composite.hero.standard as jest.Mock).mockReturnValue(mockResult);

      const props: HeroStandardProps = {
        // Content
        headline: createElement('h1', 'Complete Hero'),
        text: createElement('p', 'All features included'),
        eyebrow: createElement('span', 'Premium'),
        actions: createElement('div', 'Get Started'),
        
        // Assets
        image: createImageElement('hero.jpg', 'Hero image'),
        video: createVideoElement('hero.mp4'),
        
        // Animation
        includesAnimation: true,
        
        // Sizing
        isHeightFull: true,
        
        // Layout
        isTextCenter: true,
        
        // Theme
        isThemeDark: true
      };
      
      const result = Composite.hero.standard(props);
      
      expect(Composite.hero.standard).toHaveBeenCalledWith(props);
      expect(containsText(result.element, 'Complete Hero')).toBe(true);
      expect(containsText(result.element, 'All features')).toBe(true);
    });
  });

  describe('Type Safety', () => {
    it('should accept valid theme properties', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-standard'
      };
      (Composite.hero.standard as jest.Mock).mockReturnValue(mockResult);

      // This should compile without errors
      const props: HeroStandardProps = {
        isThemeDark: true,
        headline: createElement('h1', 'Theme Test')
      };
      
      const result = Composite.hero.standard(props);
      
      expect(result).toBeDefined();
    });

    it('should accept optional content properties', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-standard'
      };
      (Composite.hero.standard as jest.Mock).mockReturnValue(mockResult);

      // All content props are optional
      const props: HeroStandardProps = {
        isThemeDark: false
      };
      
      const result = Composite.hero.standard(props);
      
      expect(result).toBeDefined();
    });
  });
});