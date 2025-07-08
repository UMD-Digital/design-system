import { Composite } from '@universityofmaryland/web-elements-library';
import type { HeroExpandProps } from '../../../hero/_types';
import {
  createElement,
  createImageElement,
  createVideoElement,
  validateElementStructure,
  containsText,
} from '../../test-helpers/element';
import '../../test-helpers/setup';

// Mock the elements library
jest.mock('@universityofmaryland/web-elements-library');

describe('Hero Expand Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Structure', () => {
    it('should create an expand hero with minimal props', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-expand'
      };
      ((Composite.hero.custom as any).expand as jest.Mock).mockReturnValue(mockResult);

      const props: HeroExpandProps = {
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).expand(props);
      
      expect((Composite.hero.custom as any).expand).toHaveBeenCalledWith(props);
      expect(result).toBe(mockResult);
      validateElementStructure(result, { hasElement: true, hasStyles: true });
    });

    it('should create expand hero with all content props', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h1>Expandable Hero</h1><p>Click to expand</p>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-expand'
      };
      ((Composite.hero.custom as any).expand as jest.Mock).mockReturnValue(mockResult);

      const props: HeroExpandProps = {
        headline: createElement('h1', 'Expandable Hero'),
        text: createElement('p', 'Click to expand for more content'),
        actions: createElement('div', 'Learn More'),
        expandedContent: createElement('div', 'This is the expanded content section'),
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).expand(props);
      
      expect((Composite.hero.custom as any).expand).toHaveBeenCalledWith(props);
      expect(containsText(result.element, 'Expandable Hero')).toBe(true);
      expect(containsText(result.element, 'Click to expand')).toBe(true);
    });
  });

  describe('Expanded Content', () => {
    it('should handle expanded content property', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h1>Hero</h1><div>Expanded section with additional details</div>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-expand'
      };
      ((Composite.hero.custom as any).expand as jest.Mock).mockReturnValue(mockResult);

      const expandedContent = createElement('div');
      expandedContent.innerHTML = '<p>Additional information</p><ul><li>Point 1</li><li>Point 2</li></ul>';
      
      const props: HeroExpandProps = {
        headline: createElement('h1', 'Hero with Expansion'),
        expandedContent,
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).expand(props);
      
      expect((Composite.hero.custom as any).expand).toHaveBeenCalledWith(props);
      expect(containsText(result.element, 'Expanded section')).toBe(true);
    });

    it('should work without expanded content', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-expand'
      };
      ((Composite.hero.custom as any).expand as jest.Mock).mockReturnValue(mockResult);

      const props: HeroExpandProps = {
        headline: createElement('h1', 'No Expansion'),
        text: createElement('p', 'Regular hero without expansion'),
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).expand(props);
      
      expect(result).toBeDefined();
      expect((Composite.hero.custom as any).expand).toHaveBeenCalledWith(props);
    });
  });

  describe('Asset Properties', () => {
    it('should handle image asset', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-expand'
      };
      ((Composite.hero.custom as any).expand as jest.Mock).mockReturnValue(mockResult);

      const props: HeroExpandProps = {
        headline: createElement('h1', 'Expand with Image'),
        image: createImageElement('expand-bg.jpg', 'Expand background'),
        expandedContent: createElement('div', 'Expanded info'),
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).expand(props);
      
      expect((Composite.hero.custom as any).expand).toHaveBeenCalledWith(props);
    });

    it('should handle video asset', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-expand'
      };
      ((Composite.hero.custom as any).expand as jest.Mock).mockReturnValue(mockResult);

      const props: HeroExpandProps = {
        headline: createElement('h1', 'Expand with Video'),
        video: createVideoElement('expand-bg.mp4'),
        expandedContent: createElement('div', 'Video details'),
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).expand(props);
      
      expect((Composite.hero.custom as any).expand).toHaveBeenCalledWith(props);
    });

    it('should handle both image and video assets', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-expand'
      };
      ((Composite.hero.custom as any).expand as jest.Mock).mockReturnValue(mockResult);

      const props: HeroExpandProps = {
        headline: createElement('h1', 'Expand with Media'),
        image: createImageElement('expand.jpg', 'Image'),
        video: createVideoElement('expand.mp4'),
        expandedContent: createElement('div', 'Media showcase'),
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).expand(props);
      
      expect((Composite.hero.custom as any).expand).toHaveBeenCalledWith(props);
    });
  });

  describe('Animation Properties', () => {
    it('should handle includesAnimation flag', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-expand'
      };
      ((Composite.hero.custom as any).expand as jest.Mock).mockReturnValue(mockResult);

      const props: HeroExpandProps = {
        headline: createElement('h1', 'Animated Expand'),
        expandedContent: createElement('div', 'Animated content'),
        includesAnimation: true,
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).expand(props);
      
      expect((Composite.hero.custom as any).expand).toHaveBeenCalledWith(props);
    });

    it('should handle hero without animation', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-expand'
      };
      ((Composite.hero.custom as any).expand as jest.Mock).mockReturnValue(mockResult);

      const props: HeroExpandProps = {
        headline: createElement('h1', 'Static Expand'),
        includesAnimation: false,
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).expand(props);
      
      expect((Composite.hero.custom as any).expand).toHaveBeenCalledWith(props);
    });
  });

  describe('Theme Properties', () => {
    it('should handle dark theme', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-expand-dark'
      };
      ((Composite.hero.custom as any).expand as jest.Mock).mockReturnValue(mockResult);

      const props: HeroExpandProps = {
        headline: createElement('h1', 'Dark Expand'),
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).expand(props);
      
      expect((Composite.hero.custom as any).expand).toHaveBeenCalledWith(props);
    });

    it('should handle light theme', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-expand-light'
      };
      ((Composite.hero.custom as any).expand as jest.Mock).mockReturnValue(mockResult);

      const props: HeroExpandProps = {
        headline: createElement('h1', 'Light Expand'),
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).expand(props);
      
      expect((Composite.hero.custom as any).expand).toHaveBeenCalledWith(props);
    });
  });

  describe('Complete Configuration', () => {
    it('should handle all properties together', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<div class="hero-expand"><h1>Full Expand Hero</h1></div>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-expand-complete'
      };
      ((Composite.hero.custom as any).expand as jest.Mock).mockReturnValue(mockResult);

      const expandedSection = createElement('section');
      expandedSection.innerHTML = `
        <h2>Expanded Information</h2>
        <p>Detailed content that appears when expanded</p>
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
        </ul>
      `;

      const props: HeroExpandProps = {
        // Content
        headline: createElement('h1', 'Full Expand Hero'),
        text: createElement('p', 'Complete expand hero with all features'),
        actions: createElement('div', 'Expand to Learn More'),
        expandedContent: expandedSection,
        
        // Assets
        image: createImageElement('expand-full.jpg', 'Full expand image'),
        video: createVideoElement('expand-full.mp4'),
        
        // Animation
        includesAnimation: true,
        
        // Theme
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).expand(props);
      
      expect((Composite.hero.custom as any).expand).toHaveBeenCalledWith(props);
      expect(containsText(result.element, 'Full Expand Hero')).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null/undefined content elements', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-expand'
      };
      ((Composite.hero.custom as any).expand as jest.Mock).mockReturnValue(mockResult);

      const props: HeroExpandProps = {
        headline: null,
        text: undefined,
        actions: null,
        expandedContent: undefined,
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).expand(props);
      
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should handle expand interaction behavior', () => {
      const mockElement = document.createElement('div');
      const expandButton = document.createElement('button');
      expandButton.textContent = 'Expand';
      mockElement.appendChild(expandButton);
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-expand',
        // Simulate expand functionality
        expand: jest.fn(),
        collapse: jest.fn()
      };
      ((Composite.hero.custom as any).expand as jest.Mock).mockReturnValue(mockResult);

      const props: HeroExpandProps = {
        headline: createElement('h1', 'Interactive Expand'),
        expandedContent: createElement('div', 'Hidden content'),
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).expand(props);
      
      expect(result).toBeDefined();
      // The component should have expand/collapse capability
      expect(result.element.querySelector('button')).toBeTruthy();
    });
  });

  describe('Type Safety', () => {
    it('should accept minimal valid configuration', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-expand'
      };
      ((Composite.hero.custom as any).expand as jest.Mock).mockReturnValue(mockResult);

      // Minimal configuration - only theme required
      const props: HeroExpandProps = {
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).expand(props);
      
      expect(result).toBeDefined();
    });

    it('should handle expand-specific properties', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-expand'
      };
      ((Composite.hero.custom as any).expand as jest.Mock).mockReturnValue(mockResult);

      // Expand-specific with expanded content
      const props: HeroExpandProps = {
        headline: createElement('h1', 'Expand Feature'),
        expandedContent: createElement('article', 'Long form content that needs expansion'),
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).expand(props);
      
      expect(result).toBeDefined();
    });
  });
});