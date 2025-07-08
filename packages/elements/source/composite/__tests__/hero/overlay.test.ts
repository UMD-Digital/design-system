import { Composite } from '@universityofmaryland/web-elements-library';
import type { HeroOverlayProps } from '../../hero/_types';
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

describe('Hero Overlay Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Structure', () => {
    it('should create an overlay hero with minimal props', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-overlay'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

      const props: HeroOverlayProps = {
        isThemeDark: true
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(Composite.hero.overlay).toHaveBeenCalledWith(props);
      expect(result).toBe(mockResult);
      validateElementStructure(result, { hasElement: true, hasStyles: true });
    });

    it('should create overlay hero with all content props', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h1>Overlay Hero</h1><p>With overlay effect</p>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-overlay'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Overlay Hero'),
        text: createElement('p', 'With overlay effect'),
        eyebrow: createElement('span', 'Featured'),
        actions: createElement('div', 'Discover More'),
        isThemeDark: false
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(Composite.hero.overlay).toHaveBeenCalledWith(props);
      expect(containsText(result.element, 'Overlay Hero')).toBe(true);
      expect(containsText(result.element, 'With overlay effect')).toBe(true);
    });
  });

  describe('Asset Properties', () => {
    it('should handle image with overlay', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-overlay'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Image Overlay'),
        image: createImageElement('overlay-bg.jpg', 'Overlay background'),
        isThemeDark: true
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(Composite.hero.overlay).toHaveBeenCalledWith(props);
    });

    it('should handle video with overlay', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-overlay'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Video Overlay'),
        video: createVideoElement('overlay-bg.mp4'),
        isThemeDark: false
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(Composite.hero.overlay).toHaveBeenCalledWith(props);
    });

    it('should handle both image and video', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-overlay'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

      const props: HeroOverlayProps = {
        headline: createElement('h1', 'With Both Assets'),
        image: createImageElement('hero-image.jpg', 'Hero image'),
        video: createVideoElement('hero-video.mp4'),
        isThemeDark: true
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(Composite.hero.overlay).toHaveBeenCalledWith(props);
    });

    it('should handle video asset', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-overlay'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Video Hero'),
        video: createVideoElement('hero-video.mp4'),
        isThemeDark: false
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(Composite.hero.overlay).toHaveBeenCalledWith(props);
    });
  });

  describe('Animation Properties', () => {
    it('should handle animation flag', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-overlay'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Animated Overlay'),
        includesAnimation: true,
        isThemeDark: true
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(Composite.hero.overlay).toHaveBeenCalledWith(props);
    });

    it('should handle no animation', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-overlay'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Static Overlay'),
        includesAnimation: false,
        isThemeDark: false
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(Composite.hero.overlay).toHaveBeenCalledWith(props);
    });
  });

  describe('Styling Properties', () => {
    it('should handle border property', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-overlay'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Bordered Overlay'),
        hasBorder: true,
        isThemeDark: true
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(Composite.hero.overlay).toHaveBeenCalledWith(props);
    });

    it('should handle transparent property', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-overlay'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Transparent Overlay'),
        isTransparent: true,
        isThemeDark: false
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(Composite.hero.overlay).toHaveBeenCalledWith(props);
    });

    it('should handle sticky property', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-overlay'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Sticky Overlay'),
        isSticky: true,
        isThemeDark: true
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(Composite.hero.overlay).toHaveBeenCalledWith(props);
    });
  });

  describe('Layout Properties', () => {
    it('should handle centered text layout', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-overlay'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Centered Overlay'),
        isTextCenter: true,
        isThemeDark: true
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(Composite.hero.overlay).toHaveBeenCalledWith(props);
    });

    it('should handle right-aligned text layout', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-overlay'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Right-Aligned Overlay'),
        isTextRight: true,
        isThemeDark: false
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(Composite.hero.overlay).toHaveBeenCalledWith(props);
    });

    it('should handle default text alignment', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-overlay'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Default Alignment'),
        isTextCenter: false,
        isTextRight: false,
        isThemeDark: true
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(Composite.hero.overlay).toHaveBeenCalledWith(props);
    });
  });

  describe('Theme Properties', () => {
    it('should handle dark theme with overlay', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-overlay-dark'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Dark Overlay'),
        isThemeDark: true
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(Composite.hero.overlay).toHaveBeenCalledWith(props);
    });

    it('should handle light theme with overlay', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-overlay-light'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Light Overlay'),
        isThemeDark: false
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(Composite.hero.overlay).toHaveBeenCalledWith(props);
    });
  });

  describe('Overlay Effects', () => {
    it('should handle overlay with image and content', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<div class="overlay"><h1>Overlay Content</h1></div>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-overlay-effect'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Overlay Content'),
        text: createElement('p', 'Above the background'),
        image: createImageElement('dramatic-bg.jpg', 'Dramatic background'),
        isThemeDark: true
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(containsText(result.element, 'Overlay Content')).toBe(true);
    });

    it('should handle video overlay with content', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-overlay-video'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

      const props: HeroOverlayProps = {
        headline: createElement('h1', 'Video Overlay'),
        text: createElement('p', 'Content over video'),
        video: createVideoElement('ambient.mp4'),
        isThemeDark: true
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(Composite.hero.overlay).toHaveBeenCalledWith(props);
    });
  });

  describe('Complete Configuration', () => {
    it('should handle all properties together', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<div class="hero-overlay"><h1>Complete Overlay</h1></div>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-overlay-complete'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

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
        isThemeDark: true
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(Composite.hero.overlay).toHaveBeenCalledWith(props);
      expect(containsText(result.element, 'Complete Overlay')).toBe(true);
    });
  });

  describe('Type Safety', () => {
    it('should accept minimal valid configuration', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-overlay'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

      // Minimal configuration - only theme required
      const props: HeroOverlayProps = {
        isThemeDark: false
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(result).toBeDefined();
    });

    it('should handle all optional properties', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-overlay'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

      // All content properties are optional
      const props: HeroOverlayProps = {
        isThemeDark: true,
        // Optional content
        headline: undefined,
        text: undefined,
        eyebrow: undefined,
        actions: undefined
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(result).toBeDefined();
    });

    it('should handle overlay-specific configurations', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-overlay'
      };
      (Composite.hero.overlay as jest.Mock).mockReturnValue(mockResult);

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
        includesAnimation: true
      };
      
      const result = Composite.hero.overlay(props);
      
      expect(result).toBeDefined();
    });
  });
});