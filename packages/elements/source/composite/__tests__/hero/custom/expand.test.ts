import { Composite } from '../../../../index';
import type { HeroExpandProps } from '../../../hero/_types';
import {
  createElement,
  createImageElement,
  createVideoElement,
  validateElementStructure,
} from '../../test-helpers/element';
import '../../test-helpers/setup';

// Mock the internal dependencies
jest.mock('../../../../atomic', () => ({
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
  },
  animations: {
    actions: {
      expandToggle: jest.fn().mockReturnValue({
        element: document.createElement('button'),
        styles: '.mock-expand-toggle',
      }),
    },
  },
}));

jest.mock('../../../../model', () => ({
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
      displayLarge: jest.fn().mockReturnValue({
        element: document.createElement('h1'),
        styles: '.mock-headline-display-large',
      }),
      campaignMaximum: jest.fn().mockReturnValue({
        element: document.createElement('h1'),
        styles: '.mock-headline-campaign-maximum',
      }),
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
    },
  },
}));
// Mock the elements library
describe('Hero Expand Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Structure', () => {
    it('should create an expand hero with minimal props', () => {
      const props: HeroExpandProps = {
        isThemeDark: true,
      };

      const result = (Composite.hero.custom as any).expand(props);
      validateElementStructure(result, { hasElement: true, hasStyles: true });
    });

    it('should create expand hero with all content props', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h1>Expandable Hero</h1><p>Click to expand</p>';

      const props: HeroExpandProps = {
        headline: createElement('h1', 'Expandable Hero'),
        text: createElement('p', 'Click to expand for more content'),
        actions: createElement('div', 'Learn More'),
        expandedContent: createElement(
          'div',
          'This is the expanded content section',
        ),
        isThemeDark: false,
      };

      const result = (Composite.hero.custom as any).expand(props);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Expanded Content', () => {
    it('should handle expanded content property', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML =
        '<h1>Hero</h1><div>Expanded section with additional details</div>';

      const expandedContent = createElement('div');
      expandedContent.innerHTML =
        '<p>Additional information</p><ul><li>Point 1</li><li>Point 2</li></ul>';

      const props: HeroExpandProps = {
        headline: createElement('h1', 'Hero with Expansion'),
        expandedContent,
        isThemeDark: true,
      };

      const result = (Composite.hero.custom as any).expand(props);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should work without expanded content', () => {
      const props: HeroExpandProps = {
        headline: createElement('h1', 'No Expansion'),
        text: createElement('p', 'Regular hero without expansion'),
        isThemeDark: false,
      };

      const result = (Composite.hero.custom as any).expand(props);

      expect(result).toBeDefined();
    });
  });

  describe('Asset Properties', () => {
    it('should handle image asset', () => {
      const props: HeroExpandProps = {
        headline: createElement('h1', 'Expand with Image'),
        image: createImageElement('expand-bg.jpg', 'Expand background'),
        expandedContent: createElement('div', 'Expanded info'),
        isThemeDark: true,
      };

      const result = (Composite.hero.custom as any).expand(props);
    });

    it('should handle video asset', () => {
      const props: HeroExpandProps = {
        headline: createElement('h1', 'Expand with Video'),
        video: createVideoElement('expand-bg.mp4'),
        expandedContent: createElement('div', 'Video details'),
        isThemeDark: false,
      };

      const result = (Composite.hero.custom as any).expand(props);
    });

    it('should handle both image and video assets', () => {
      const props: HeroExpandProps = {
        headline: createElement('h1', 'Expand with Media'),
        image: createImageElement('expand.jpg', 'Image'),
        video: createVideoElement('expand.mp4'),
        expandedContent: createElement('div', 'Media showcase'),
        isThemeDark: true,
      };

      const result = (Composite.hero.custom as any).expand(props);
    });
  });

  describe('Animation Properties', () => {
    it('should handle includesAnimation flag', () => {
      const props: HeroExpandProps = {
        headline: createElement('h1', 'Animated Expand'),
        expandedContent: createElement('div', 'Animated content'),
        includesAnimation: true,
        isThemeDark: true,
      };

      const result = (Composite.hero.custom as any).expand(props);
    });

    it('should handle hero without animation', () => {
      const props: HeroExpandProps = {
        headline: createElement('h1', 'Static Expand'),
        includesAnimation: false,
        isThemeDark: false,
      };

      const result = (Composite.hero.custom as any).expand(props);
    });
  });

  describe('Theme Properties', () => {
    it('should handle dark theme', () => {
      const props: HeroExpandProps = {
        headline: createElement('h1', 'Dark Expand'),
        isThemeDark: true,
      };

      const result = (Composite.hero.custom as any).expand(props);
    });

    it('should handle light theme', () => {
      const props: HeroExpandProps = {
        headline: createElement('h1', 'Light Expand'),
        isThemeDark: false,
      };

      const result = (Composite.hero.custom as any).expand(props);
    });
  });

  describe('Complete Configuration', () => {
    it('should handle all properties together', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML =
        '<div class="hero-expand"><h1>Full Expand Hero</h1></div>';

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
        headline: createElement('h1', 'Full Expand Hero'),
        text: createElement('p', 'Complete expand hero with all features'),
        actions: createElement('div', 'Expand to Learn More'),
        expandedContent: expandedSection,
        image: createImageElement('expand-full.jpg', 'Full expand image'),
        video: createVideoElement('expand-full.mp4'),
        includesAnimation: true,
        isThemeDark: true,
      };

      const result = (Composite.hero.custom as any).expand(props);
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null/undefined content elements', () => {
      const props: HeroExpandProps = {
        headline: null,
        text: undefined,
        actions: null,
        expandedContent: undefined,
        isThemeDark: true,
      };

      const result = (Composite.hero.custom as any).expand(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Type Safety', () => {
    // Minimal configuration - only theme required
    it('should accept minimal valid configuration', () => {
      const props: HeroExpandProps = {
        isThemeDark: false,
      };

      const result = (Composite.hero.custom as any).expand(props);

      expect(result).toBeDefined();
    });

    // Expand-specific with expanded content
    it('should handle expand-specific properties', () => {
      const props: HeroExpandProps = {
        headline: createElement('h1', 'Expand Feature'),
        expandedContent: createElement(
          'article',
          'Long form content that needs expansion',
        ),
        isThemeDark: true,
      };

      const result = (Composite.hero.custom as any).expand(props);

      expect(result).toBeDefined();
    });
  });
});
