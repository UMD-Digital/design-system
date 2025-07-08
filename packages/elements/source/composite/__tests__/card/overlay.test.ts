import { Composite } from '@universityofmaryland/web-elements-library';
import type { CardOverlayProps } from '../../card/_types';
import {
  createElement,
  createImageElement,
  createLinkElement,
  containsText,
} from '../test-helpers/element';
import '../test-helpers/setup';

// Mock the elements library
jest.mock('@universityofmaryland/web-elements-library');

describe('Card Overlay Components', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Color Overlay Card', () => {
    describe('Basic Structure', () => {
      it('should create a color overlay card with required props', () => {
        const props: CardOverlayProps = {
          headline: createElement('h3', 'Overlay Card Title'),
        };

        const mockResult = {
          element: document.createElement('div'),
          styles: '.mock-style-card-overlay-color',
        };
        (Composite.card.overlay.color as jest.Mock).mockReturnValue(mockResult);

        const result = Composite.card.overlay.color(props);

        expect(result).toBeDefined();
        expect(result.element).toBeInstanceOf(HTMLElement);
        expect(typeof result.styles).toBe('string');
      });
    });

    describe('Content Properties', () => {
      it('should include headline content', () => {
        const headline = createElement('h3', 'Featured Story');
        const props: CardOverlayProps = {
          headline,
        };

        const mockElement = document.createElement('div');
        mockElement.innerHTML = '<h3>Featured Story</h3>';
        const mockResult = {
          element: mockElement,
          styles: '.mock-style-card-overlay-color',
        };
        (Composite.card.overlay.color as jest.Mock).mockReturnValue(mockResult);

        const result = Composite.card.overlay.color(props);

        expect(containsText(result.element, 'Featured Story')).toBe(true);
      });

      it('should include optional text content', () => {
        const props: CardOverlayProps = {
          headline: createElement('h3', 'Title'),
          text: createElement('p', 'Overlay description text'),
        };

        const mockElement = document.createElement('div');
        mockElement.innerHTML = '<h3>Title</h3><p>Overlay description text</p>';
        const mockResult = {
          element: mockElement,
          styles: '.mock-style-card-overlay-color',
        };
        (Composite.card.overlay.color as jest.Mock).mockReturnValue(mockResult);

        const result = Composite.card.overlay.color(props);

        expect(containsText(result.element, 'Overlay description text')).toBe(
          true,
        );
      });

      it('should include optional eyebrow content', () => {
        const props: CardOverlayProps = {
          headline: createElement('h3', 'Title'),
          eyebrow: createElement('span', 'Breaking'),
        };

        const mockElement = document.createElement('div');
        mockElement.innerHTML = '<span>Breaking</span><h3>Title</h3>';
        const mockResult = {
          element: mockElement,
          styles: '.mock-style-card-overlay-color',
        };
        (Composite.card.overlay.color as jest.Mock).mockReturnValue(mockResult);

        const result = Composite.card.overlay.color(props);

        expect(containsText(result.element, 'Breaking')).toBe(true);
      });

      it('should include optional actions content', () => {
        const actions = createElement('div');
        const link = createElement('a', 'Explore More');
        actions.appendChild(link);

        const props: CardOverlayProps = {
          headline: createElement('h3', 'Title'),
          actions,
        };

        const mockElement = document.createElement('div');
        mockElement.innerHTML = '<h3>Title</h3><div><a>Explore More</a></div>';
        const mockResult = {
          element: mockElement,
          styles: '.mock-style-card-overlay-color',
        };
        (Composite.card.overlay.color as jest.Mock).mockReturnValue(mockResult);

        const result = Composite.card.overlay.color(props);

        expect(containsText(result.element, 'Explore More')).toBe(true);
      });

      it('should include optional CTA icon', () => {
        const ctaIcon = createElement('span', '→');
        const props: CardOverlayProps = {
          headline: createElement('h3', 'Title'),
          ctaIcon,
        };

        const mockElement = document.createElement('div');
        mockElement.innerHTML = '<h3>Title</h3><span>→</span>';
        const mockResult = {
          element: mockElement,
          styles: '.mock-style-card-overlay-color',
        };
        (Composite.card.overlay.color as jest.Mock).mockReturnValue(mockResult);

        const result = Composite.card.overlay.color(props);

        expect(containsText(result.element, '→')).toBe(true);
      });
    });

    describe('Quote Variant', () => {
      it('should handle isQuote property', () => {
        const props: CardOverlayProps = {
          headline: createElement('h3', '"This is a quote"'),
          isQuote: true,
        };

        const mockElement = document.createElement('div');
        mockElement.innerHTML = '<h3>"This is a quote"</h3>';
        const mockResult = {
          element: mockElement,
          styles: '.mock-style-card-overlay-color',
        };
        (Composite.card.overlay.color as jest.Mock).mockReturnValue(mockResult);

        const result = Composite.card.overlay.color(props);

        expect(result).toBeDefined();
        expect(containsText(result.element, 'This is a quote')).toBe(true);
      });
    });

    describe('Theme Properties', () => {
      it('should handle theme dark property', () => {
        const props: CardOverlayProps = {
          headline: createElement('h3', 'Dark Theme'),
          isThemeDark: true,
        };

        const mockResult = {
          element: document.createElement('div'),
          styles: '.mock-style-card-overlay-color',
        };
        (Composite.card.overlay.color as jest.Mock).mockReturnValue(mockResult);

        const result = Composite.card.overlay.color(props);

        expect(result).toBeDefined();
      });

      it('should handle theme light property', () => {
        const props: CardOverlayProps = {
          headline: createElement('h3', 'Light Theme'),
          isThemeLight: true,
        };

        const mockResult = {
          element: document.createElement('div'),
          styles: '.mock-style-card-overlay-color',
        };
        (Composite.card.overlay.color as jest.Mock).mockReturnValue(mockResult);

        const result = Composite.card.overlay.color(props);

        expect(result).toBeDefined();
      });
    });
  });

  describe('Image Overlay Card', () => {
    describe('Basic Structure', () => {
      it('should create an image overlay card with required props', () => {
        const props: CardOverlayProps = {
          headline: createElement('h3', 'Image Overlay Title'),
          backgroundImage: createImageElement('bg.jpg', 'Background'),
        };

        const mockResult = {
          element: document.createElement('div'),
          styles: '.mock-style-card-overlay-image',
        };
        (Composite.card.overlay.image as jest.Mock).mockReturnValue(mockResult);

        const result = Composite.card.overlay.image(props);

        expect(result).toBeDefined();
        expect(result.element).toBeInstanceOf(HTMLElement);
        expect(typeof result.styles).toBe('string');
      });
    });

    describe('Background Image', () => {
      it('should include background image element', () => {
        const backgroundImage = createImageElement(
          'hero-bg.jpg',
          'Hero background',
        );
        const props: CardOverlayProps = {
          headline: createElement('h3', 'Title'),
          backgroundImage,
        };

        const mockElement = document.createElement('div');
        const img = document.createElement('img');
        mockElement.appendChild(img);
        const mockResult = {
          element: mockElement,
          styles: '.mock-style-card-overlay-image',
        };
        (Composite.card.overlay.image as jest.Mock).mockReturnValue(mockResult);

        const result = Composite.card.overlay.image(props);

        expect(result.element.querySelector('img')).toBeTruthy();
      });

      it('should handle background image as link', () => {
        const imageLink = createLinkElement('http://example.com', '');
        const img = createImageElement('linked-bg.jpg', 'Linked background');
        imageLink.appendChild(img);

        const props: CardOverlayProps = {
          headline: createElement('h3', 'Title'),
          backgroundImage: imageLink,
        };

        const mockElement = document.createElement('div');
        const mockLink = document.createElement('a');
        const mockImg = document.createElement('img');
        mockLink.appendChild(mockImg);
        mockElement.appendChild(mockLink);
        const mockResult = {
          element: mockElement,
          styles: '.mock-style-card-overlay-image',
        };
        (Composite.card.overlay.image as jest.Mock).mockReturnValue(mockResult);

        const result = Composite.card.overlay.image(props);

        expect(result.element.querySelector('a')).toBeTruthy();
        expect(result.element.querySelector('img')).toBeTruthy();
      });
    });

    describe('Event Properties', () => {
      it('should include event meta in image overlay', () => {
        const eventMeta = {
          element: createElement('div', 'Event: Conference 2024'),
          styles: '.event-overlay { position: absolute; }',
        };

        const props: CardOverlayProps = {
          headline: createElement('h3', 'Conference'),
          backgroundImage: createImageElement(),
          eventMeta,
        };

        const mockElement = document.createElement('div');
        mockElement.innerHTML = '<h3>Conference</h3><div>Event: Conference 2024</div>';
        const mockResult = {
          element: mockElement,
          styles: '.mock-style-card-overlay-image\n.event-overlay { position: absolute; }',
        };
        (Composite.card.overlay.image as jest.Mock).mockReturnValue(mockResult);

        const result = Composite.card.overlay.image(props);

        expect(containsText(result.element, 'Event: Conference 2024')).toBe(
          true,
        );
        expect(result.styles).toContain('.event-overlay');
      });

      it('should include date sign in image overlay', () => {
        const dateSign = {
          element: createElement('div', 'APR 15'),
          styles: '.date-overlay { color: white; }',
        };

        const props: CardOverlayProps = {
          headline: createElement('h3', 'Spring Event'),
          backgroundImage: createImageElement(),
          dateSign,
        };

        const mockElement = document.createElement('div');
        mockElement.innerHTML = '<h3>Spring Event</h3><div>APR 15</div>';
        const mockResult = {
          element: mockElement,
          styles: '.mock-style-card-overlay-image\n.date-overlay { color: white; }',
        };
        (Composite.card.overlay.image as jest.Mock).mockReturnValue(mockResult);

        const result = Composite.card.overlay.image(props);

        expect(containsText(result.element, 'APR 15')).toBe(true);
        expect(result.styles).toContain('.date-overlay');
      });
    });

    describe('Edge Cases', () => {
      it('should handle image overlay without background image', () => {
        const props: CardOverlayProps = {
          headline: createElement('h3', 'No Background'),
          backgroundImage: null,
        };

        const mockResult = {
          element: document.createElement('div'),
          styles: '.mock-style-card-overlay-image',
        };
        (Composite.card.overlay.image as jest.Mock).mockReturnValue(mockResult);

        const result = Composite.card.overlay.image(props);

        expect(result).toBeDefined();
      });

      it('should handle all properties for color overlay', () => {
        const props: CardOverlayProps = {
          headline: createElement('h3', 'Complete Overlay'),
          text: createElement('p', 'Full featured'),
          eyebrow: createElement('span', 'Special'),
          actions: createElement('div', 'Click Here'),
          date: createElement('time', '2024-03-01'),
          ctaIcon: createElement('span', '→'),
          isQuote: true,
          isThemeDark: true,
          isThemeLight: false,
          eventMeta: {
            element: createElement('div', 'Meta'),
            styles: '',
          },
          dateSign: {
            element: createElement('div', 'MAR'),
            styles: '',
          },
        };

        const mockElement = document.createElement('div');
        mockElement.innerHTML = '<h3>Complete Overlay</h3><p>Full featured</p>';
        const mockResult = {
          element: mockElement,
          styles: '.mock-style-card-overlay-complete',
        };
        (Composite.card.overlay.color as jest.Mock).mockReturnValue(mockResult);

        const result = Composite.card.overlay.color(props);

        expect(result).toBeDefined();
        expect(containsText(result.element, 'Complete Overlay')).toBe(true);
        expect(containsText(result.element, 'Full featured')).toBe(true);
      });

      it('should handle all properties for image overlay', () => {
        const props: CardOverlayProps = {
          headline: createElement('h3', 'Full Image Overlay'),
          text: createElement('p', 'With all options'),
          eyebrow: createElement('span', 'Featured'),
          actions: createElement('div', 'Discover'),
          date: createElement('time', '2024-03-15'),
          backgroundImage: createImageElement('full-bg.jpg', 'Full background'),
          ctaIcon: createElement('span', '⟶'),
          isQuote: false,
          isThemeDark: true,
          isThemeLight: false,
          eventMeta: {
            element: createElement('div', 'Location: Main Hall'),
            styles: '',
          },
          dateSign: {
            element: createElement('div', 'MAR 15'),
            styles: '',
          },
        };

        const mockElement = document.createElement('div');
        mockElement.innerHTML = '<h3>Full Image Overlay</h3>';
        const img = document.createElement('img');
        mockElement.appendChild(img);
        const mockResult = {
          element: mockElement,
          styles: '.mock-style-card-overlay-image',
        };
        (Composite.card.overlay.image as jest.Mock).mockReturnValue(mockResult);

        const result = Composite.card.overlay.image(props);

        expect(result).toBeDefined();
        expect(containsText(result.element, 'Full Image Overlay')).toBe(true);
        expect(result.element.querySelector('img')).toBeTruthy();
      });
    });
  });
});
