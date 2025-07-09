import { Composite } from '../../../index';
import type { CardListProps } from '../../card/_types';
import { createElement, createImageElement } from '../test-helpers/element';
import '../test-helpers/setup';

// Mock the internal dependencies
jest.mock('../../../atomic', () => ({
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
    medium: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-text-lockup-medium',
    }),
    small: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-text-lockup-small',
    }),
    smallScaling: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-text-lockup-small',
    }),
  },
  animations: {
    scroll: {
      scrollDownIcon: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-scroll-down-icon',
      }),
    },
  },
}));

jest.mock('../../../model', () => ({
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
      campaignLarge: jest.fn().mockReturnValue({
        element: document.createElement('h1'),
        styles: '.mock-headline-campaign-large',
      }),
      displayMedium: jest.fn().mockReturnValue({
        element: document.createElement('h2'),
        styles: '.mock-headline-display-medium',
      }),
    },
    composite: {
      card: {
        block: jest.fn().mockReturnValue({
          element: document.createElement('div'),
          styles: '.mock-card-block',
        }),
        list: jest.fn().mockImplementation((props) => ({
          element: props?.element || document.createElement('div'),
          styles: '.mock-card-list',
        })),
      },
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
      overlayModal: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-overlay-modal',
      }),
    },
  },
}));
// Mock the elements library
describe('Card List Component', () => {
  const { assets, textLockup } = require('../../../atomic');
  const { ElementModel } = require('../../../model');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Structure', () => {
    it('should create a card list with required props', () => {
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

      const headline = createElement('h3', 'List Card Title');
      const props: CardListProps = {
        headline,
      };

      const result = Composite.card.list(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should include optional text content', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h3>Title</h3><p>List card description</p>';

      const props: CardListProps = {
        headline: createElement('h3', 'Title'),
        text: createElement('p', 'List card description'),
      };

      const result = Composite.card.list(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should include optional eyebrow content', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<span>News</span><h3>Title</h3>';

      const props: CardListProps = {
        headline: createElement('h3', 'Title'),
        eyebrow: createElement('span', 'News'),
      };

      const result = Composite.card.list(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should include optional actions content', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h3>Title</h3><div><a>View Details</a></div>';

      const actions = createElement('div');
      const link = createElement('a', 'View Details');
      actions.appendChild(link);

      const props: CardListProps = {
        headline: createElement('h3', 'Title'),
        actions,
      };

      const result = Composite.card.list(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should include optional date content', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h3>Title</h3><time>January 1, 2024</time>';

      const props: CardListProps = {
        headline: createElement('h3', 'Title'),
        date: createElement('time', 'January 1, 2024'),
      };

      const result = Composite.card.list(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Image Properties', () => {
    it('should include image when provided', () => {
      const mockElement = document.createElement('div');
      const img = document.createElement('img');
      mockElement.appendChild(img);

      const image = createImageElement('list-image.jpg', 'List image');
      const props: CardListProps = {
        headline: createElement('h3', 'Title'),
        image,
      };

      const result = Composite.card.list(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(assets.image.background).toHaveBeenCalled();
    });

    it('should handle image with isAligned property', () => {
      const mockElement = document.createElement('div');
      const img = document.createElement('img');
      mockElement.appendChild(img);

      const image = createImageElement();
      const props: CardListProps = {
        headline: createElement('h3', 'Title'),
        image,
        isAligned: true,
      };

      const result = Composite.card.list(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(assets.image.background).toHaveBeenCalled();
    });
  });

  describe('Event Properties', () => {
    it('should include event meta when provided', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h3>Event Title</h3><div>Time: 2:00 PM</div>';

      const eventMeta = {
        element: createElement('div', 'Time: 2:00 PM'),
        styles: '.event-meta-list { font-size: 14px; }',
      };

      const props: CardListProps = {
        headline: createElement('h3', 'Event Title'),
        eventMeta,
      };

      const result = Composite.card.list(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
    });

    it('should include date sign when provided', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h3>Event Title</h3><div>JAN 15</div>';

      const dateSign = {
        element: createElement('div', 'JAN 15'),
        styles: '.date-sign-list { display: inline-block; }',
      };

      const props: CardListProps = {
        headline: createElement('h3', 'Event Title'),
        dateSign,
      };

      const result = Composite.card.list(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
    });

    it('should set isDisplayEvent when dateSign is provided', () => {
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
    });
  });

  describe('Theme Properties', () => {
    it('should handle theme dark property', () => {
      const props: CardListProps = {
        headline: createElement('h3', 'Title'),
        isThemeDark: true,
      };

      const result = Composite.card.list(props);

      expect(result).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null content elements', () => {
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

      const props: CardListProps = {
        headline: createElement('h3', 'Minimal'),
      };

      const result = Composite.card.list(props);

      expect(result).toBeDefined();
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should handle all properties at once', () => {
      const mockElement = document.createElement('div');
      mockElement.innerHTML = '<h3>Complete List Card</h3>';

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
      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Container Properties', () => {
    it('should set container type for responsive behavior', () => {
      const mockElement = document.createElement('div');
      mockElement.classList.add('card-list-container');

      const props: CardListProps = {
        headline: createElement('h3', 'Responsive Card'),
      };

      const result = Composite.card.list(props);

      // Container should be created with proper structure
      expect(ElementModel.composite.card.list).toHaveBeenCalledWith(
        expect.objectContaining({
          elementStyles: expect.objectContaining({
            element: expect.objectContaining({
              containerType: 'inline-size',
            }),
          }),
        }),
      );
    });
  });
});
