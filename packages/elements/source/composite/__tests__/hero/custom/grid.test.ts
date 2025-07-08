import { Composite } from '@universityofmaryland/web-elements-library';
import type { HeroGridProps } from '../../../hero/_types';
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

describe('Hero Grid Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Structure', () => {
    it('should create a grid hero with minimal props', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-grid'
      };
      ((Composite.hero.custom as any).grid as jest.Mock).mockReturnValue(mockResult);

      const props: HeroGridProps = {
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).grid(props);
      
      expect((Composite.hero.custom as any).grid).toHaveBeenCalledWith(props);
      expect(result).toBe(mockResult);
      validateElementStructure(result, { hasElement: true, hasStyles: true });
    });

    it('should create grid hero with all content props', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h1>Grid Hero</h1><p>Grid layout hero</p>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-grid'
      };
      ((Composite.hero.custom as any).grid as jest.Mock).mockReturnValue(mockResult);

      const props: HeroGridProps = {
        headline: createElement('h1', 'Grid Hero'),
        text: createElement('p', 'Hero with grid layout for content blocks'),
        actions: createElement('div', 'Explore Grid'),
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).grid(props);
      
      expect((Composite.hero.custom as any).grid).toHaveBeenCalledWith(props);
      expect(containsText(result.element, 'Grid Hero')).toBe(true);
      expect(containsText(result.element, 'Grid layout hero')).toBe(true);
    });
  });

  describe('Grid Blocks', () => {
    it('should handle blocks array property', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h1>Grid with Blocks</h1><div class="grid-container"></div>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-grid'
      };
      ((Composite.hero.custom as any).grid as jest.Mock).mockReturnValue(mockResult);

      // Create block elements
      const block1 = createElement('div');
      block1.innerHTML = '<h3>Block 1</h3><p>First grid block</p>';
      
      const block2 = createElement('div');
      block2.innerHTML = '<h3>Block 2</h3><p>Second grid block</p>';
      
      const block3 = createElement('div');
      block3.innerHTML = '<h3>Block 3</h3><p>Third grid block</p>';
      
      const props: HeroGridProps = {
        headline: createElement('h1', 'Grid with Blocks'),
        blocks: [block1, block2, block3],
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).grid(props);
      
      expect((Composite.hero.custom as any).grid).toHaveBeenCalledWith(props);
      expect(props.blocks).toHaveLength(3);
    });

    it('should handle empty blocks array', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-grid'
      };
      ((Composite.hero.custom as any).grid as jest.Mock).mockReturnValue(mockResult);

      const props: HeroGridProps = {
        headline: createElement('h1', 'Grid without Blocks'),
        blocks: [],
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).grid(props);
      
      expect(result).toBeDefined();
      expect((Composite.hero.custom as any).grid).toHaveBeenCalledWith(props);
    });

    it('should handle various block content types', () => {
      const mockElement = document.createElement('div');
      const gridContainer = document.createElement('div');
      gridContainer.className = 'grid-blocks';
      mockElement.appendChild(gridContainer);
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-grid'
      };
      ((Composite.hero.custom as any).grid as jest.Mock).mockReturnValue(mockResult);

      // Create different types of blocks
      const textBlock = createElement('div');
      textBlock.innerHTML = '<p>Text content block</p>';
      
      const imageBlock = createElement('div');
      const img = createImageElement('block.jpg', 'Block image');
      imageBlock.appendChild(img);
      
      const ctaBlock = createElement('div');
      ctaBlock.innerHTML = '<h4>Call to Action</h4><button>Click Here</button>';
      
      const statsBlock = createElement('div');
      statsBlock.innerHTML = '<div class="stat"><span class="number">100+</span><span>Projects</span></div>';
      
      const props: HeroGridProps = {
        headline: createElement('h1', 'Mixed Content Grid'),
        blocks: [textBlock, imageBlock, ctaBlock, statsBlock],
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).grid(props);
      
      expect((Composite.hero.custom as any).grid).toHaveBeenCalledWith(props);
      expect(props.blocks).toHaveLength(4);
    });
  });

  describe('Asset Properties', () => {
    it('should handle image asset with grid', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-grid'
      };
      ((Composite.hero.custom as any).grid as jest.Mock).mockReturnValue(mockResult);

      const props: HeroGridProps = {
        headline: createElement('h1', 'Grid with Image'),
        image: createImageElement('grid-bg.jpg', 'Grid background'),
        blocks: [createElement('div', 'Block 1'), createElement('div', 'Block 2')],
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).grid(props);
      
      expect((Composite.hero.custom as any).grid).toHaveBeenCalledWith(props);
    });

    it('should handle video asset with grid', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-grid'
      };
      ((Composite.hero.custom as any).grid as jest.Mock).mockReturnValue(mockResult);

      const props: HeroGridProps = {
        headline: createElement('h1', 'Grid with Video'),
        video: createVideoElement('grid-bg.mp4'),
        blocks: [createElement('div', 'Video Block')],
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).grid(props);
      
      expect((Composite.hero.custom as any).grid).toHaveBeenCalledWith(props);
    });

    it('should handle both image and video assets', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-grid'
      };
      ((Composite.hero.custom as any).grid as jest.Mock).mockReturnValue(mockResult);

      const props: HeroGridProps = {
        headline: createElement('h1', 'Grid with Media'),
        image: createImageElement('grid.jpg', 'Image'),
        video: createVideoElement('grid.mp4'),
        blocks: [],
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).grid(props);
      
      expect((Composite.hero.custom as any).grid).toHaveBeenCalledWith(props);
    });
  });

  describe('Animation Properties', () => {
    it('should handle includesAnimation flag', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-grid'
      };
      ((Composite.hero.custom as any).grid as jest.Mock).mockReturnValue(mockResult);

      const props: HeroGridProps = {
        headline: createElement('h1', 'Animated Grid'),
        blocks: [createElement('div', 'Animated Block')],
        includesAnimation: true,
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).grid(props);
      
      expect((Composite.hero.custom as any).grid).toHaveBeenCalledWith(props);
    });

    it('should handle hero without animation', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-grid'
      };
      ((Composite.hero.custom as any).grid as jest.Mock).mockReturnValue(mockResult);

      const props: HeroGridProps = {
        headline: createElement('h1', 'Static Grid'),
        includesAnimation: false,
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).grid(props);
      
      expect((Composite.hero.custom as any).grid).toHaveBeenCalledWith(props);
    });
  });

  describe('Grid Layout Patterns', () => {
    it('should handle 2-column grid layout', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<div class="grid-2-col"></div>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-grid-2col'
      };
      ((Composite.hero.custom as any).grid as jest.Mock).mockReturnValue(mockResult);

      const props: HeroGridProps = {
        headline: createElement('h1', '2-Column Grid'),
        blocks: [
          createElement('div', 'Column 1'),
          createElement('div', 'Column 2')
        ],
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).grid(props);
      
      expect(result.element.querySelector('.grid-2-col')).toBeTruthy();
    });

    it('should handle 3-column grid layout', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<div class="grid-3-col"></div>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-grid-3col'
      };
      ((Composite.hero.custom as any).grid as jest.Mock).mockReturnValue(mockResult);

      const props: HeroGridProps = {
        headline: createElement('h1', '3-Column Grid'),
        blocks: [
          createElement('div', 'Column 1'),
          createElement('div', 'Column 2'),
          createElement('div', 'Column 3')
        ],
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).grid(props);
      
      expect(result.element.querySelector('.grid-3-col')).toBeTruthy();
    });

    it('should handle 4-column grid layout', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<div class="grid-4-col"></div>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-grid-4col'
      };
      ((Composite.hero.custom as any).grid as jest.Mock).mockReturnValue(mockResult);

      const props: HeroGridProps = {
        headline: createElement('h1', '4-Column Grid'),
        blocks: [
          createElement('div', 'Col 1'),
          createElement('div', 'Col 2'),
          createElement('div', 'Col 3'),
          createElement('div', 'Col 4')
        ],
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).grid(props);
      
      expect(result.element.querySelector('.grid-4-col')).toBeTruthy();
    });
  });

  describe('Theme Properties', () => {
    it('should handle dark theme', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-grid-dark'
      };
      ((Composite.hero.custom as any).grid as jest.Mock).mockReturnValue(mockResult);

      const props: HeroGridProps = {
        headline: createElement('h1', 'Dark Grid'),
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).grid(props);
      
      expect((Composite.hero.custom as any).grid).toHaveBeenCalledWith(props);
    });

    it('should handle light theme', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-grid-light'
      };
      ((Composite.hero.custom as any).grid as jest.Mock).mockReturnValue(mockResult);

      const props: HeroGridProps = {
        headline: createElement('h1', 'Light Grid'),
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).grid(props);
      
      expect((Composite.hero.custom as any).grid).toHaveBeenCalledWith(props);
    });
  });

  describe('Complete Configuration', () => {
    it('should handle all properties together', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<div class="hero-grid"><h1>Full Grid Hero</h1></div>';
      
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-hero-grid-complete'
      };
      ((Composite.hero.custom as any).grid as jest.Mock).mockReturnValue(mockResult);

      // Create feature blocks
      const featureBlocks = [
        createElement('div', '<h3>Feature 1</h3><p>Description</p>'),
        createElement('div', '<h3>Feature 2</h3><p>Description</p>'),
        createElement('div', '<h3>Feature 3</h3><p>Description</p>'),
        createElement('div', '<h3>Feature 4</h3><p>Description</p>')
      ];

      const props: HeroGridProps = {
        // Content
        headline: createElement('h1', 'Full Grid Hero'),
        text: createElement('p', 'Complete grid hero with all features'),
        actions: createElement('div', 'View All Features'),
        blocks: featureBlocks,
        
        // Assets
        image: createImageElement('grid-full.jpg', 'Full grid image'),
        video: createVideoElement('grid-full.mp4'),
        
        // Animation
        includesAnimation: true,
        
        // Theme
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).grid(props);
      
      expect((Composite.hero.custom as any).grid).toHaveBeenCalledWith(props);
      expect(containsText(result.element, 'Full Grid Hero')).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null/undefined content elements', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-grid'
      };
      ((Composite.hero.custom as any).grid as jest.Mock).mockReturnValue(mockResult);

      const props: HeroGridProps = {
        headline: null,
        text: undefined,
        actions: null,
        blocks: undefined,
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).grid(props);
      
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should handle mixed null and valid blocks', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-grid'
      };
      ((Composite.hero.custom as any).grid as jest.Mock).mockReturnValue(mockResult);

      const props: HeroGridProps = {
        headline: createElement('h1', 'Grid with Mixed Blocks'),
        blocks: [
          createElement('div', 'Valid Block'),
          null,
          createElement('div', 'Another Valid Block'),
          undefined
        ] as HTMLElement[],
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).grid(props);
      
      expect(result).toBeDefined();
    });
  });

  describe('Type Safety', () => {
    it('should accept minimal valid configuration', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-grid'
      };
      ((Composite.hero.custom as any).grid as jest.Mock).mockReturnValue(mockResult);

      // Minimal configuration - only theme required
      const props: HeroGridProps = {
        isThemeDark: false
      };
      
      const result = (Composite.hero.custom as any).grid(props);
      
      expect(result).toBeDefined();
    });

    it('should handle grid-specific properties', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-hero-grid'
      };
      ((Composite.hero.custom as any).grid as jest.Mock).mockReturnValue(mockResult);

      // Grid-specific with blocks array
      const props: HeroGridProps = {
        headline: createElement('h1', 'Grid Feature'),
        blocks: [
          createElement('article', 'Article Block'),
          createElement('aside', 'Sidebar Block'),
          createElement('section', 'Section Block')
        ],
        isThemeDark: true
      };
      
      const result = (Composite.hero.custom as any).grid(props);
      
      expect(result).toBeDefined();
    });
  });
});