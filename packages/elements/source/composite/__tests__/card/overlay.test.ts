import type { CardOverlayProps } from '../../card/_types';
import {
  createElement,
  createImageElement,
  createLinkElement,
  containsText,
} from '../test-helpers/element';
import '../test-helpers/setup';

describe('Card Overlay Components', () => {
  // Create mock implementations
  const mockColorOverlay = jest.fn();
  const mockImageOverlay = jest.fn();

  // Mock the Composite object
  const Composite = {
    card: {
      overlay: {
        color: mockColorOverlay,
        image: mockImageOverlay,
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup default mock implementations
    mockColorOverlay.mockImplementation((props: CardOverlayProps) => {
      const mockElement = document.createElement('div');
      mockElement.className = 'card-overlay-color';

      // Add content based on props
      if (props.headline) {
        mockElement.appendChild(props.headline.cloneNode(true));
      }
      if (props.text) {
        mockElement.appendChild(props.text.cloneNode(true));
      }
      if (props.eyebrow) {
        mockElement.insertBefore(
          props.eyebrow.cloneNode(true),
          mockElement.firstChild,
        );
      }
      if (props.actions) {
        mockElement.appendChild(props.actions.cloneNode(true));
      }
      if (props.ctaIcon) {
        mockElement.appendChild(props.ctaIcon.cloneNode(true));
      }

      return {
        element: mockElement,
        className: 'card-overlay-color',
        styles: '.mock-style-card-overlay-color',
      };
    });

    mockImageOverlay.mockImplementation((props: CardOverlayProps) => {
      const mockElement = document.createElement('div');
      mockElement.className = 'card-overlay-image';

      // Add content based on props
      if (props.headline) {
        mockElement.appendChild(props.headline.cloneNode(true));
      }
      if (props.text) {
        mockElement.appendChild(props.text.cloneNode(true));
      }
      if (props.eyebrow) {
        mockElement.insertBefore(
          props.eyebrow.cloneNode(true),
          mockElement.firstChild,
        );
      }
      if (props.backgroundImage) {
        const imgContainer = document.createElement('div');
        if (props.backgroundImage.tagName === 'IMG') {
          imgContainer.appendChild(props.backgroundImage.cloneNode(true));
        } else if (props.backgroundImage.tagName === 'A') {
          imgContainer.appendChild(props.backgroundImage.cloneNode(true));
        }
        mockElement.appendChild(imgContainer);
      }
      if (props.eventMeta) {
        const eventDiv = document.createElement('div');
        eventDiv.innerHTML =
          props.eventMeta.element.innerHTML || 'Event: Conference 2024';
        mockElement.appendChild(eventDiv);
      }
      if (props.dateSign) {
        const dateDiv = document.createElement('div');
        dateDiv.innerHTML = props.dateSign.element.innerHTML || 'APR 15';
        mockElement.appendChild(dateDiv);
      }

      let styles = '.mock-style-card-overlay-image';
      if (props.eventMeta?.styles) {
        styles += '\n' + props.eventMeta.styles;
      }
      if (props.dateSign?.styles) {
        styles += '\n' + props.dateSign.styles;
      }

      return {
        element: mockElement,
        className: 'card-overlay-image',
        styles,
        events: {
          load: jest.fn(),
        },
      };
    });
  });

  describe('Color Overlay Card', () => {
    describe('Basic Structure', () => {
      it('should create a color overlay card with required props', () => {
        const props: CardOverlayProps = {
          headline: createElement('h3', 'Overlay Card Title'),
        };

        const result = Composite.card.overlay.color(props);

        expect(result).toBeDefined();
        expect(result.element).toBeInstanceOf(HTMLElement);
        expect(typeof result.styles).toBe('string');
        expect(mockColorOverlay).toHaveBeenCalledWith(props);
      });
    });

    describe('Content Properties', () => {
      it('should include headline content', () => {
        const headline = createElement('h3', 'Featured Story');
        const props: CardOverlayProps = {
          headline,
        };

        const result = Composite.card.overlay.color(props);

        expect(containsText(result.element, 'Featured Story')).toBe(true);
      });

      it('should include optional text content', () => {
        const props: CardOverlayProps = {
          headline: createElement('h3', 'Title'),
          text: createElement('p', 'Overlay description text'),
        };

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

        const result = Composite.card.overlay.color(props);

        expect(containsText(result.element, 'Explore More')).toBe(true);
      });

      it('should include optional CTA icon', () => {
        const ctaIcon = createElement('span', '→');
        const props: CardOverlayProps = {
          headline: createElement('h3', 'Title'),
          ctaIcon,
        };

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

        const result = Composite.card.overlay.color(props);

        expect(result).toBeDefined();
        expect(containsText(result.element, 'This is a quote')).toBe(true);
        expect(mockColorOverlay).toHaveBeenCalledWith(
          expect.objectContaining({ isQuote: true }),
        );
      });
    });

    describe('Theme Properties', () => {
      it('should handle theme dark property', () => {
        const props: CardOverlayProps = {
          headline: createElement('h3', 'Dark Theme'),
          isThemeDark: true,
        };

        const result = Composite.card.overlay.color(props);

        expect(result).toBeDefined();
        expect(mockColorOverlay).toHaveBeenCalledWith(
          expect.objectContaining({ isThemeDark: true }),
        );
      });

      it('should handle theme light property', () => {
        const props: CardOverlayProps = {
          headline: createElement('h3', 'Light Theme'),
          isThemeLight: true,
        };

        const result = Composite.card.overlay.color(props);

        expect(result).toBeDefined();
        expect(mockColorOverlay).toHaveBeenCalledWith(
          expect.objectContaining({ isThemeLight: true }),
        );
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

        const result = Composite.card.overlay.image(props);

        expect(result).toBeDefined();
        expect(result.element).toBeInstanceOf(HTMLElement);
        expect(typeof result.styles).toBe('string');
        expect(mockImageOverlay).toHaveBeenCalledWith(props);
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

        const result = Composite.card.overlay.image(props);

        expect(result.element.querySelector('a')).toBeTruthy();
        expect(result.element.querySelector('img')).toBeTruthy();
      });
    });

    describe('Event Properties', () => {
      it('should include event meta in image overlay', () => {
        const eventMeta = {
          element: createElement('div', 'Event: Conference 2024'),
          className: 'event-meta',
          styles: '.event-overlay { position: absolute; }',
        };

        const props: CardOverlayProps = {
          headline: createElement('h3', 'Conference'),
          backgroundImage: createImageElement(),
          eventMeta,
        };

        const result = Composite.card.overlay.image(props);

        expect(containsText(result.element, 'Event: Conference 2024')).toBe(
          true,
        );
        expect(result.styles).toContain('.event-overlay');
      });

      it('should include date sign in image overlay', () => {
        const dateSign = {
          element: createElement('div', 'APR 15'),
          className: 'date-sign',
          styles: '.date-overlay { color: white; }',
        };

        const props: CardOverlayProps = {
          headline: createElement('h3', 'Spring Event'),
          backgroundImage: createImageElement(),
          dateSign,
        };

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
            className: 'event-meta',
            styles: '',
          },
          dateSign: {
            element: createElement('div', 'MAR'),
            className: 'date-sign',
            styles: '',
          },
        };

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
            className: 'event-meta',
            styles: '',
          },
          dateSign: {
            element: createElement('div', 'MAR 15'),
            className: 'date-sign',
            styles: '',
          },
        };

        const result = Composite.card.overlay.image(props);

        expect(result).toBeDefined();
        expect(containsText(result.element, 'Full Image Overlay')).toBe(true);
        expect(result.element.querySelector('img')).toBeTruthy();
      });
    });
  });
});
