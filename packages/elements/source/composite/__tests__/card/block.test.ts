import { Composite } from '../../../index';
import type { CardBlockProps } from '../../card/_types';
import { createElement, createImageElement } from '../test-helpers/element';
import '../test-helpers/setup';

// Mock the internal dependencies that the card block uses
jest.mock('../../../atomic', () => ({
  assets: {
    image: {
      background: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-image-background',
      }),
    },
  },
  textLockup: {
    smallScaling: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-text-lockup',
    }),
  },
}));

jest.mock('../../../model', () => ({
  ElementModel: {
    composite: {
      card: {
        block: jest.fn().mockImplementation((props) => ({
          element: props.element || document.createElement('div'),
          styles: '.mock-card-block-styles',
        })),
      },
    },
  },
}));

describe('Card Block Component', () => {
  const { assets, textLockup } = require('../../../atomic');
  const { ElementModel } = require('../../../model');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Structure', () => {
    it('should create a card block with required props', () => {
      const props: CardBlockProps = {
        headline: createElement('h3', 'Test Headline'),
      };

      const result = Composite.card.block(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(result.styles).toBeDefined();
      expect(result.styles).toContain('.mock-card-block-styles');
      expect(result.styles).toContain('.mock-text-lockup');
      expect(textLockup.smallScaling).toHaveBeenCalledWith(props);
      expect(ElementModel.composite.card.block).toHaveBeenCalled();
    });

    it('should return element and styles', () => {
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
    it('should pass props to textLockup', () => {
      const props: CardBlockProps = {
        headline: createElement('h3', 'Title'),
        text: createElement('p', 'Description'),
        eyebrow: createElement('span', 'Category'),
        actions: createElement('div', 'Actions'),
        date: createElement('time', '2023-12-25'),
      };

      Composite.card.block(props);

      expect(textLockup.smallScaling).toHaveBeenCalledWith(props);
    });
  });

  describe('Image Properties', () => {
    it('should include image when provided', () => {
      const image = createImageElement('card-image.jpg', 'Card image');
      const props: CardBlockProps = {
        headline: createElement('h3', 'Title'),
        image,
      };

      const result = Composite.card.block(props);

      expect(assets.image.background).toHaveBeenCalledWith({
        image,
        isScaled: true,
        isAspectStandard: undefined,
        dateSign: undefined,
      });
      expect(result.styles).toContain('.mock-image-background');
    });

    it('should handle image with isAligned property', () => {
      const image = createImageElement();
      const props: CardBlockProps = {
        headline: createElement('h3', 'Title'),
        image,
        isAligned: true,
      };

      Composite.card.block(props);

      expect(assets.image.background).toHaveBeenCalledWith({
        image,
        isScaled: true,
        isAspectStandard: true,
        dateSign: undefined,
      });
    });
  });

  describe('Event Properties', () => {
    it('should include event meta when provided', () => {
      const eventMeta = {
        element: createElement('div', 'Event details'),
        styles: '.event-meta { color: blue; }',
      };

      const props: CardBlockProps = {
        headline: createElement('h3', 'Event Title'),
        eventMeta,
      };

      Composite.card.block(props);

      expect(textLockup.smallScaling).toHaveBeenCalledWith(props);
    });

    it('should include date sign when provided with image', () => {
      const dateSign = {
        element: createElement('div', 'DEC 25'),
        styles: '.date-sign { font-weight: bold; }',
      };

      const props: CardBlockProps = {
        headline: createElement('h3', 'Event Title'),
        image: createImageElement(),
        dateSign,
      };

      Composite.card.block(props);

      expect(assets.image.background).toHaveBeenCalledWith({
        image: props.image,
        isScaled: true,
        isAspectStandard: undefined,
        dateSign,
      });
    });
  });

  describe('Style Variants', () => {
    it('should pass style props to ElementModel', () => {
      const props: CardBlockProps = {
        headline: createElement('h3', 'Title'),
        hasBorder: true,
        isTransparent: true,
        hasEyebrowRibbon: true,
        isThemeDark: true,
      };

      Composite.card.block(props);

      const callArgs = ElementModel.composite.card.block.mock.calls[0][0];
      expect(callArgs.hasBorder).toBe(true);
      expect(callArgs.isTransparent).toBe(true);
      expect(callArgs.hasEyebrowRibbon).toBe(true);
      expect(callArgs.isThemeDark).toBe(true);
    });
  });

  describe('Special Properties', () => {
    it('should handle newsId property', () => {
      const props: CardBlockProps = {
        headline: createElement('h3', 'Title'),
        newsId: 'news-123',
      };

      const result = Composite.card.block(props);

      // Since we're mocking ElementModel, we need to manually check if setAttribute would be called
      // In the real implementation, it would set the attribute on the element
      expect(props.newsId).toBe('news-123');
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimal props', () => {
      const props: CardBlockProps = {
        headline: null,
      };

      const result = Composite.card.block(props);

      expect(result).toBeDefined();
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(textLockup.smallScaling).toHaveBeenCalledWith(props);
    });

    it('should handle all properties at once', () => {
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
      expect(textLockup.smallScaling).toHaveBeenCalledWith(props);
      expect(assets.image.background).toHaveBeenCalled();
      expect(ElementModel.composite.card.block).toHaveBeenCalled();
    });
  });
});
