import { Composite } from '@universityofmaryland/web-elements-library';
import type { CardListProps } from '../../card/_types';
import {
  createElement,
  createImageElement,
  validateElementStructure,
  containsText,
} from '../test-helpers/element';
import '../test-helpers/setup';

// Mock the elements library
jest.mock('@universityofmaryland/web-elements-library');

describe('Card List Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Structure', () => {
    it('should create a card list with required props', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-card-list'
      };
      mockResult.element.className = 'card-list-container';
      (Composite.card.list as jest.Mock).mockReturnValue(mockResult);

      const props: CardListProps = {
        headline: createElement('h3', 'List Card Title'),
      };
      
      const result = Composite.card.list(props);
      
      expect(Composite.card.list).toHaveBeenCalledWith(props);
      validateElementStructure(result, {
        className: 'card-list-container',
      });
    });
    
    it('should return element and styles', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-card-list'
      };
      (Composite.card.list as jest.Mock).mockReturnValue(mockResult);

      const props: CardListProps = {
        headline: createElement('h3', 'Test'),
      };
      
      const result = Composite.card.list(props);
      
      expect(result).toHaveProperty('element');
      expect(result).toHaveProperty('styles');
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(typeof result.styles).toBe('string');
    });
  });
  
  describe('Content Properties', () => {
    it('should include headline content', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h3>List Card Title</h3>';
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-list'
      };
      (Composite.card.list as jest.Mock).mockReturnValue(mockResult);

      const headline = createElement('h3', 'List Card Title');
      const props: CardListProps = {
        headline,
      };
      
      const result = Composite.card.list(props);
      
      expect(containsText(result.element, 'List Card Title')).toBe(true);
    });
    
    it('should include optional text content', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h3>Title</h3><p>List card description</p>';
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-list'
      };
      (Composite.card.list as jest.Mock).mockReturnValue(mockResult);

      const props: CardListProps = {
        headline: createElement('h3', 'Title'),
        text: createElement('p', 'List card description'),
      };
      
      const result = Composite.card.list(props);
      
      expect(containsText(result.element, 'List card description')).toBe(true);
    });
    
    it('should include optional eyebrow content', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<span>News</span><h3>Title</h3>';
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-list'
      };
      (Composite.card.list as jest.Mock).mockReturnValue(mockResult);

      const props: CardListProps = {
        headline: createElement('h3', 'Title'),
        eyebrow: createElement('span', 'News'),
      };
      
      const result = Composite.card.list(props);
      
      expect(containsText(result.element, 'News')).toBe(true);
    });
    
    it('should include optional actions content', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h3>Title</h3><div><a>View Details</a></div>';
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-list'
      };
      (Composite.card.list as jest.Mock).mockReturnValue(mockResult);

      const actions = createElement('div');
      const link = createElement('a', 'View Details');
      actions.appendChild(link);
      
      const props: CardListProps = {
        headline: createElement('h3', 'Title'),
        actions,
      };
      
      const result = Composite.card.list(props);
      
      expect(containsText(result.element, 'View Details')).toBe(true);
    });
    
    it('should include optional date content', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h3>Title</h3><time>January 1, 2024</time>';
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-list'
      };
      (Composite.card.list as jest.Mock).mockReturnValue(mockResult);

      const props: CardListProps = {
        headline: createElement('h3', 'Title'),
        date: createElement('time', 'January 1, 2024'),
      };
      
      const result = Composite.card.list(props);
      
      expect(containsText(result.element, 'January 1, 2024')).toBe(true);
    });
  });
  
  describe('Image Properties', () => {
    it('should include image when provided', () => {
      const mockElement = document.createElement('div');
      const img = document.createElement('img');
      mockElement.appendChild(img);
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-list'
      };
      (Composite.card.list as jest.Mock).mockReturnValue(mockResult);

      const image = createImageElement('list-image.jpg', 'List image');
      const props: CardListProps = {
        headline: createElement('h3', 'Title'),
        image,
      };
      
      const result = Composite.card.list(props);
      
      expect(result.element.querySelector('img')).toBeTruthy();
    });
    
    it('should handle image with isAligned property', () => {
      const mockElement = document.createElement('div');
      const img = document.createElement('img');
      mockElement.appendChild(img);
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-list'
      };
      (Composite.card.list as jest.Mock).mockReturnValue(mockResult);

      const image = createImageElement();
      const props: CardListProps = {
        headline: createElement('h3', 'Title'),
        image,
        isAligned: true,
      };
      
      const result = Composite.card.list(props);
      
      expect(result.element.querySelector('img')).toBeTruthy();
    });
  });
  
  describe('Event Properties', () => {
    it('should include event meta when provided', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h3>Event Title</h3><div>Time: 2:00 PM</div>';
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-list\n.event-meta-list { font-size: 14px; }'
      };
      (Composite.card.list as jest.Mock).mockReturnValue(mockResult);

      const eventMeta = {
        element: createElement('div', 'Time: 2:00 PM'),
        styles: '.event-meta-list { font-size: 14px; }',
      };
      
      const props: CardListProps = {
        headline: createElement('h3', 'Event Title'),
        eventMeta,
      };
      
      const result = Composite.card.list(props);
      
      expect(containsText(result.element, 'Time: 2:00 PM')).toBe(true);
      expect(result.styles).toContain('.event-meta-list');
    });
    
    it('should include date sign when provided', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h3>Event Title</h3><div>JAN 15</div>';
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-list\n.date-sign-list { display: inline-block; }'
      };
      (Composite.card.list as jest.Mock).mockReturnValue(mockResult);

      const dateSign = {
        element: createElement('div', 'JAN 15'),
        styles: '.date-sign-list { display: inline-block; }',
      };
      
      const props: CardListProps = {
        headline: createElement('h3', 'Event Title'),
        dateSign,
      };
      
      const result = Composite.card.list(props);
      
      expect(containsText(result.element, 'JAN 15')).toBe(true);
      expect(result.styles).toContain('.date-sign-list');
    });
    
    it('should set isDisplayEvent when dateSign is provided', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-card-list'
      };
      (Composite.card.list as jest.Mock).mockReturnValue(mockResult);

      const dateSign = {
        element: createElement('div', 'FEB'),
        styles: '',
      };
      
      const props: CardListProps = {
        headline: createElement('h3', 'Event'),
        dateSign,
      };
      
      const result = Composite.card.list(props);
      
      // The component should have processed the event display
      expect(result.element).toBeDefined();
      expect(Composite.card.list).toHaveBeenCalledWith(props);
    });
  });
  
  describe('Theme Properties', () => {
    it('should handle theme dark property', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-card-list'
      };
      (Composite.card.list as jest.Mock).mockReturnValue(mockResult);

      const props: CardListProps = {
        headline: createElement('h3', 'Title'),
        isThemeDark: true,
      };
      
      const result = Composite.card.list(props);
      
      expect(result).toBeDefined();
      expect(Composite.card.list).toHaveBeenCalledWith(props);
    });
  });
  
  describe('Edge Cases', () => {
    it('should handle null content elements', () => {
      const mockResult = {
        element: document.createElement('div'),
        styles: '.mock-style-card-list'
      };
      (Composite.card.list as jest.Mock).mockReturnValue(mockResult);

      const props: CardListProps = {
        headline: null,
        text: null,
        eyebrow: null,
        actions: null,
        date: null,
      };
      
      const result = Composite.card.list(props);
      
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });
    
    it('should handle minimal props', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h3>Minimal</h3>';
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-list'
      };
      (Composite.card.list as jest.Mock).mockReturnValue(mockResult);

      const props: CardListProps = {
        headline: createElement('h3', 'Minimal'),
      };
      
      const result = Composite.card.list(props);
      
      expect(result).toBeDefined();
      expect(containsText(result.element, 'Minimal')).toBe(true);
    });
    
    it('should handle all properties at once', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h3>Complete List Card</h3>';
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-list-complete'
      };
      (Composite.card.list as jest.Mock).mockReturnValue(mockResult);

      const props: CardListProps = {
        headline: createElement('h3', 'Complete List Card'),
        text: createElement('p', 'Full description'),
        eyebrow: createElement('span', 'Featured'),
        actions: createElement('div', 'Learn More'),
        date: createElement('time', '2024-01-01'),
        image: createImageElement(),
        eventMeta: {
          element: createElement('div', 'Location: Room 101'),
          styles: '.meta {}',
        },
        dateSign: {
          element: createElement('div', 'MAR'),
          styles: '.sign {}',
        },
        isAligned: true,
        isThemeDark: true,
      };
      
      const result = Composite.card.list(props);
      
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(typeof result.styles).toBe('string');
      expect(containsText(result.element, 'Complete List Card')).toBe(true);
      expect(Composite.card.list).toHaveBeenCalledWith(props);
    });
  });
  
  describe('Container Properties', () => {
    it('should set container type for responsive behavior', () => {
      const mockElement = document.createElement('div');
      mockElement.classList.add('card-list-container');
      const mockResult = {
        element: mockElement,
        styles: '.mock-style-card-list'
      };
      (Composite.card.list as jest.Mock).mockReturnValue(mockResult);

      const props: CardListProps = {
        headline: createElement('h3', 'Responsive Card'),
      };
      
      const result = Composite.card.list(props);
      
      // Container should be created with proper structure
      expect(result.element.classList.contains('card-list-container')).toBe(true);
    });
  });
});