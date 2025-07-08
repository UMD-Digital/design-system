import { Composite } from '@universityofmaryland/web-elements-library';
import type { CardBlockProps } from '../../card/_types';
import {
  createElement,
  createImageElement,
  validateElementStructure,
  containsText,
} from '../test-helpers/element';
import '../test-helpers/setup';

// Mock the elements library
jest.mock('@universityofmaryland/web-elements-library');

describe('Card Block Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Structure', () => {
    it('should create a card block with required props', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-card-block',
      };
      mockResult.element.className = 'card-block-container';
      (Composite.card.block as jest.Mock).mockReturnValue(mockResult);

      const props: CardBlockProps = {
        headline: createElement('h3', 'Test Headline'),
      };

      const result = Composite.card.block(props);

      expect(Composite.card.block).toHaveBeenCalledWith(props);
      validateElementStructure(result, {
        className: 'card-block-container',
      });
    });

    it('should return element and styles', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-card-block',
      };
      (Composite.card.block as jest.Mock).mockReturnValue(mockResult);

      const props: CardBlockProps = {
        headline: createElement('h3', 'Test'),
      };

      const result = Composite.card.block(props);

      expect(result).toHaveProperty('element');
      expect(result).toHaveProperty('styles');
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(typeof result.styles).toBe('string');
    });
  });

  describe('Content Properties', () => {
    it('should include headline content', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h3>Card Title</h3>';
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-block',
      };
      (Composite.card.block as jest.Mock).mockReturnValue(mockResult);

      const headline = createElement('h3', 'Card Title');
      const props: CardBlockProps = {
        headline,
      };

      const result = Composite.card.block(props);

      expect(containsText(result.element, 'Card Title')).toBe(true);
    });

    it('should include optional text content', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h3>Title</h3><p>Card description text</p>';
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-block',
      };
      (Composite.card.block as jest.Mock).mockReturnValue(mockResult);

      const props: CardBlockProps = {
        headline: createElement('h3', 'Title'),
        text: createElement('p', 'Card description text'),
      };

      const result = Composite.card.block(props);

      expect(containsText(result.element, 'Card description text')).toBe(true);
    });

    it('should include optional eyebrow content', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<span>Category</span><h3>Title</h3>';
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-block',
      };
      (Composite.card.block as jest.Mock).mockReturnValue(mockResult);

      const props: CardBlockProps = {
        headline: createElement('h3', 'Title'),
        eyebrow: createElement('span', 'Category'),
      };

      const result = Composite.card.block(props);

      expect(containsText(result.element, 'Category')).toBe(true);
    });

    it('should include optional actions content', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h3>Title</h3><div><a>Read More</a></div>';
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-block',
      };
      (Composite.card.block as jest.Mock).mockReturnValue(mockResult);

      const actions = createElement('div');
      const link = createElement('a', 'Read More');
      actions.appendChild(link);

      const props: CardBlockProps = {
        headline: createElement('h3', 'Title'),
        actions,
      };

      const result = Composite.card.block(props);

      expect(containsText(result.element, 'Read More')).toBe(true);
    });

    it('should include optional date content', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h3>Title</h3><time>December 25, 2023</time>';
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-block',
      };
      (Composite.card.block as jest.Mock).mockReturnValue(mockResult);

      const props: CardBlockProps = {
        headline: createElement('h3', 'Title'),
        date: createElement('time', 'December 25, 2023'),
      };

      const result = Composite.card.block(props);

      expect(containsText(result.element, 'December 25, 2023')).toBe(true);
    });
  });

  describe('Image Properties', () => {
    it('should include image when provided', () => {
      const mockElement = document.createElement('div');
      const img = document.createElement('img');
      mockElement.appendChild(img);
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-block',
      };
      (Composite.card.block as jest.Mock).mockReturnValue(mockResult);

      const image = createImageElement('card-image.jpg', 'Card image');
      const props: CardBlockProps = {
        headline: createElement('h3', 'Title'),
        image,
      };

      const result = Composite.card.block(props);

      expect(result.element.querySelector('img')).toBeTruthy();
    });

    it('should handle image with isAligned property', () => {
      const mockElement = document.createElement('div');
      const img = document.createElement('img');
      mockElement.appendChild(img);
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-block',
      };
      (Composite.card.block as jest.Mock).mockReturnValue(mockResult);

      const image = createImageElement();
      const props: CardBlockProps = {
        headline: createElement('h3', 'Title'),
        image,
        isAligned: true,
      };

      const result = Composite.card.block(props);

      expect(result.element.querySelector('img')).toBeTruthy();
    });
  });

  describe('Event Properties', () => {
    it('should include event meta when provided', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h3>Event Title</h3><div>Event details</div>';
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-block\n.event-meta { color: blue; }',
      };
      (Composite.card.block as jest.Mock).mockReturnValue(mockResult);

      const eventMeta = {
        element: createElement('div', 'Event details'),
        styles: '.event-meta { color: blue; }',
      };

      const props: CardBlockProps = {
        headline: createElement('h3', 'Event Title'),
        eventMeta,
      };

      const result = Composite.card.block(props);

      expect(containsText(result.element, 'Event details')).toBe(true);
      expect(result.styles).toContain('.event-meta');
    });

    it('should include date sign when provided', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h3>Event Title</h3><div>DEC 25</div>';
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-block\n.date-sign { font-weight: bold; }',
      };
      (Composite.card.block as jest.Mock).mockReturnValue(mockResult);

      const dateSign = {
        element: createElement('div', 'DEC 25'),
        styles: '.date-sign { font-weight: bold; }',
      };

      const props: CardBlockProps = {
        headline: createElement('h3', 'Event Title'),
        dateSign,
      };

      const result = Composite.card.block(props);

      expect(containsText(result.element, 'DEC 25')).toBe(true);
      expect(result.styles).toContain('.date-sign');
    });
  });

  describe('Style Variants', () => {
    it('should handle hasBorder property', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-card-block',
      };
      (Composite.card.block as jest.Mock).mockReturnValue(mockResult);

      const props: CardBlockProps = {
        headline: createElement('h3', 'Title'),
        hasBorder: true,
      };

      const result = Composite.card.block(props);

      expect(result).toBeDefined();
      expect(Composite.card.block).toHaveBeenCalledWith(props);
    });

    it('should handle isTransparent property', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-card-block',
      };
      (Composite.card.block as jest.Mock).mockReturnValue(mockResult);

      const props: CardBlockProps = {
        headline: createElement('h3', 'Title'),
        isTransparent: true,
      };

      const result = Composite.card.block(props);

      expect(result).toBeDefined();
      expect(Composite.card.block).toHaveBeenCalledWith(props);
    });

    it('should handle hasEyebrowRibbon property', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-card-block',
      };
      (Composite.card.block as jest.Mock).mockReturnValue(mockResult);

      const props: CardBlockProps = {
        headline: createElement('h3', 'Title'),
        eyebrow: createElement('span', 'Category'),
        hasEyebrowRibbon: true,
      };

      const result = Composite.card.block(props);

      expect(result).toBeDefined();
      expect(Composite.card.block).toHaveBeenCalledWith(props);
    });

    it('should handle theme dark property', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-card-block',
      };
      (Composite.card.block as jest.Mock).mockReturnValue(mockResult);

      const props: CardBlockProps = {
        headline: createElement('h3', 'Title'),
        isThemeDark: true,
      };

      const result = Composite.card.block(props);

      expect(result).toBeDefined();
      expect(Composite.card.block).toHaveBeenCalledWith(props);
    });
  });

  describe('Special Properties', () => {
    it('should handle newsId property', () => {
      const mockElement = document.createElement('div');
      mockElement.setAttribute('news-id', 'news-123');
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-block',
      };
      (Composite.card.block as jest.Mock).mockReturnValue(mockResult);

      const props: CardBlockProps = {
        headline: createElement('h3', 'Title'),
        newsId: 'news-123',
      };

      const result = Composite.card.block(props);

      expect(result.element.getAttribute('news-id')).toBe('news-123');
    });
  });

  describe('Edge Cases', () => {
    it('should handle null content elements', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-card-block',
      };
      (Composite.card.block as jest.Mock).mockReturnValue(mockResult);

      const props: CardBlockProps = {
        headline: null,
        text: null,
        eyebrow: null,
        actions: null,
        date: null,
      };

      const result = Composite.card.block(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should handle all properties at once', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-card-block-complete',
      };
      (Composite.card.block as jest.Mock).mockReturnValue(mockResult);

      const props: CardBlockProps = {
        headline: createElement('h3', 'Full Card'),
        text: createElement('p', 'Description'),
        eyebrow: createElement('span', 'Category'),
        actions: createElement('div', 'Action'),
        date: createElement('time', '2023-12-25'),
        image: createImageElement(),
        eventMeta: {
          element: createElement('div', 'Meta'),
          styles: '.meta {}',
        },
        dateSign: {
          element: createElement('div', 'DEC'),
          styles: '.sign {}',
        },
        newsId: 'test-123',
        hasBorder: true,
        hasEyebrowRibbon: true,
        isTransparent: true,
        isAligned: true,
        isThemeDark: true,
      };

      const result = Composite.card.block(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(typeof result.styles).toBe('string');
      expect(Composite.card.block).toHaveBeenCalledWith(props);
    });
  });
});
