/**
 * Type interface tests for Card components
 * These tests verify that the TypeScript interfaces are properly defined
 */

import type {
  CardBlockProps,
  CardListProps,
  CardOverlayProps,
  CardMediaProps,
  CardEventProps,
} from '../../card/_types';
import type { ContentElement, ImageElement, LinkElement, ThemeProps } from '../../../_types';

describe('Card Type Interfaces', () => {
  describe('CardBlockProps', () => {
    it('should accept required headline property', () => {
      const validProps: CardBlockProps = {
        headline: document.createElement('h3'),
      };
      
      expect(validProps).toBeDefined();
    });

    it('should accept all optional properties', () => {
      const fullProps: CardBlockProps = {
        // Required
        headline: document.createElement('h3'),
        
        // Optional content
        text: document.createElement('p'),
        actions: document.createElement('div'),
        eyebrow: document.createElement('span'),
        date: document.createElement('time'),
        newsId: 'news-123',
        
        // Media properties
        image: document.createElement('img') as ImageElement,
        isAligned: true,
        
        // Event properties
        eventMeta: {
          element: document.createElement('div'),
          styles: '',
        },
        dateSign: {
          element: document.createElement('div'),
          styles: '',
        },
        
        // Style properties
        hasBorder: true,
        hasEyebrowRibbon: true,
        isTransparent: false,
        
        // Theme
        isThemeDark: true,
      };
      
      expect(fullProps.headline).toBeDefined();
      expect(fullProps.isThemeDark).toBe(true);
    });

    it('should only include isThemeDark from ThemeProps', () => {
      const props: CardBlockProps = {
        headline: document.createElement('h3'),
        isThemeDark: true,
        // @ts-expect-error - isThemeGold should not be available
        isThemeGold: true,
      };
      
      expect(props).toBeDefined();
    });
  });

  describe('CardListProps', () => {
    it('should accept required properties', () => {
      const validProps: CardListProps = {
        headline: document.createElement('h3'),
        date: document.createElement('time'),
      };
      
      expect(validProps).toBeDefined();
    });

    it('should accept all properties', () => {
      const fullProps: CardListProps = {
        // Required
        headline: document.createElement('h3'),
        date: document.createElement('time'),
        
        // Optional content
        eyebrow: document.createElement('span'),
        actions: document.createElement('div'),
        
        // Media
        image: document.createElement('img') as ImageElement,
        isAligned: false,
        
        // Event
        eventMeta: {
          element: document.createElement('div'),
          styles: '',
        },
        dateSign: {
          element: document.createElement('div'),
          styles: '',
        },
        
        // Theme
        isThemeDark: true,
      };
      
      expect(fullProps.headline).toBeDefined();
      expect(fullProps.date).toBeDefined();
    });

    it('should accept text property', () => {
      const props: CardListProps = {
        headline: document.createElement('h3'),
        date: document.createElement('time'),
        text: document.createElement('p'),
      };
      
      expect(props).toBeDefined();
      expect(props.text).toBeDefined();
    });
  });

  describe('CardOverlayProps', () => {
    it('should accept minimal properties', () => {
      const validProps: CardOverlayProps = {
        headline: document.createElement('h3'),
      };
      
      expect(validProps).toBeDefined();
    });

    it('should accept all overlay-specific properties', () => {
      const fullProps: CardOverlayProps = {
        // Required
        headline: document.createElement('h3'),
        
        // Optional content
        text: document.createElement('p'),
        eyebrow: document.createElement('span'),
        actions: document.createElement('div'),
        date: document.createElement('time'),
        
        // Overlay-specific
        backgroundImage: document.createElement('img') as ImageElement,
        ctaIcon: document.createElement('span'),
        isQuote: true,
        
        // Event
        eventMeta: {
          element: document.createElement('div'),
          styles: '',
        },
        dateSign: {
          element: document.createElement('div'),
          styles: '',
        },
        
        // Theme
        isThemeDark: true,
        isThemeLight: false,
      };
      
      expect(fullProps.isQuote).toBe(true);
      expect(fullProps.backgroundImage).toBeDefined();
    });

    it('should have both theme properties', () => {
      const props: CardOverlayProps = {
        headline: document.createElement('h3'),
        isThemeDark: true,
        isThemeLight: true,
      };
      
      expect(props.isThemeDark).toBe(true);
      expect(props.isThemeLight).toBe(true);
    });
  });

  describe('Shared Interfaces', () => {
    it('CardMediaProps should define image properties', () => {
      const mediaProps: CardMediaProps = {
        image: document.createElement('img') as ImageElement,
        isAligned: true,
      };
      
      expect(mediaProps.image).toBeDefined();
      expect(mediaProps.isAligned).toBe(true);
    });

    it('CardEventProps should define event properties', () => {
      const eventProps: CardEventProps = {
        eventMeta: {
          element: document.createElement('div'),
          styles: '.event-styles',
        },
        dateSign: {
          element: document.createElement('div'),
          styles: '.date-styles',
        },
      };
      
      expect(eventProps.eventMeta).toBeDefined();
      expect(eventProps.dateSign).toBeDefined();
    });
  });

  describe('Type Compatibility', () => {
    it('should ensure card types are distinct', () => {
      // Block card with optional text
      const blockCard: CardBlockProps = {
        headline: document.createElement('h3'),
        text: document.createElement('p'),
      };
      
      // List card requires date
      const listCard: CardListProps = {
        headline: document.createElement('h3'),
        date: document.createElement('time'),
      };
      
      // Overlay card with quote variant
      const overlayCard: CardOverlayProps = {
        headline: document.createElement('h3'),
        isQuote: true,
      };
      
      expect(blockCard).toBeDefined();
      expect(listCard).toBeDefined();
      expect(overlayCard).toBeDefined();
    });

    it('should ensure theme properties are correctly typed', () => {
      // Block only has isThemeDark
      const block: Pick<CardBlockProps, 'isThemeDark'> = {
        isThemeDark: true,
      };
      
      // List only has isThemeDark
      const list: Pick<CardListProps, 'isThemeDark'> = {
        isThemeDark: false,
      };
      
      // Overlay has both dark and light
      const overlay: Pick<CardOverlayProps, 'isThemeDark' | 'isThemeLight'> = {
        isThemeDark: true,
        isThemeLight: false,
      };
      
      expect(block.isThemeDark).toBe(true);
      expect(list.isThemeDark).toBe(false);
      expect(overlay.isThemeLight).toBe(false);
    });
  });
});