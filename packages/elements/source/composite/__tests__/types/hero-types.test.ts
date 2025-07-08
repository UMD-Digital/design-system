/**
 * Type interface tests for Hero components
 * These tests verify that the TypeScript interfaces are properly defined
 */

import type {
  HeroStandardProps,
  HeroMinimalProps,
  HeroOverlayProps,
  HeroStackedProps,
  HeroLogoProps,
  HeroExpandProps,
  HeroAssetProps,
  HeroAnimationProps,
  HeroSizingProps,
  HeroLayoutProps,
} from '../../hero/_types';
import type { ContentElement, ImageElement, VideoElement, ThemeProps } from '../../../_types';

describe('Hero Type Interfaces', () => {
  describe('HeroStandardProps', () => {
    it('should accept minimal properties', () => {
      const validProps: HeroStandardProps = {
        isThemeDark: true,
      };
      
      expect(validProps).toBeDefined();
    });

    it('should accept all standard hero properties', () => {
      const fullProps: HeroStandardProps = {
        // Content
        headline: document.createElement('h1'),
        eyebrow: document.createElement('span'),
        text: document.createElement('p'),
        actions: document.createElement('div'),
        
        // Assets
        image: document.createElement('img') as ImageElement,
        video: document.createElement('video') as VideoElement,
        
        // Animation
        includesAnimation: true,
        
        // Sizing
        isHeightSmall: true,
        isHeightFull: false,
        
        // Layout
        isTextCenter: true,
        isTextRight: false,
        
        // Theme
        isThemeDark: true,
      };
      
      expect(fullProps.includesAnimation).toBe(true);
      expect(fullProps.isTextCenter).toBe(true);
    });

    it('should only include isThemeDark from ThemeProps', () => {
      const props: HeroStandardProps = {
        isThemeDark: true,
        // @ts-expect-error - isThemeMaryland should not be available
        isThemeMaryland: true,
      };
      
      expect(props).toBeDefined();
    });
  });

  describe('HeroMinimalProps', () => {
    it('should accept optional headline and theme variations', () => {
      const validProps: HeroMinimalProps = {
        headline: document.createElement('h1'),
        isThemeDark: false,
      };
      
      expect(validProps.headline).toBeDefined();
    });

    it('should accept all theme variations', () => {
      const darkProps: HeroMinimalProps = {
        isThemeDark: true,
      };
      
      const lightProps: HeroMinimalProps = {
        isThemeLight: true,
      };
      
      const marylandProps: HeroMinimalProps = {
        isThemeMaryland: true,
      };
      
      expect(darkProps).toBeDefined();
      expect(lightProps).toBeDefined();
      expect(marylandProps).toBeDefined();
    });

    it('should accept content properties', () => {
      const props: HeroMinimalProps = {
        headline: document.createElement('h1'),
        eyebrow: document.createElement('span'),
        text: document.createElement('p'),
        actions: document.createElement('div'),
        image: document.createElement('img') as ImageElement,
        video: document.createElement('video') as VideoElement,
        isThemeDark: true,
      };
      
      expect(props).toBeDefined();
    });
  });

  describe('HeroOverlayProps', () => {
    it('should accept minimal overlay configuration', () => {
      const validProps: HeroOverlayProps = {
        isThemeDark: true,
      };
      
      expect(validProps).toBeDefined();
    });

    it('should support overlay with media and content', () => {
      const props: HeroOverlayProps = {
        headline: document.createElement('h1'),
        text: document.createElement('p'),
        image: document.createElement('img') as ImageElement,
        video: document.createElement('video') as VideoElement,
        isThemeDark: true,
      };
      
      expect(props.image).toBeDefined();
      expect(props.video).toBeDefined();
    });

    it('should accept overlay-specific properties', () => {
      const props: HeroOverlayProps = {
        includesAnimation: true,
        isTextCenter: true,
        isTextRight: false,
        hasBorder: true,
        isTransparent: false,
        isSticky: true,
        isThemeDark: false,
      };
      
      expect(props.hasBorder).toBe(true);
      expect(props.isSticky).toBe(true);
    });
  });

  describe('HeroStackedProps', () => {
    it('should accept stacked-specific sizing', () => {
      const props: HeroStackedProps = {
        isHeightSmall: true,
        isHeightFull: false,
        isWidthLarge: true,
        isThemeDark: true,
      };
      
      expect(props.isWidthLarge).toBe(true);
    });

    it('should support stacked layout configuration', () => {
      const props: HeroStackedProps = {
        headline: document.createElement('h1'),
        text: document.createElement('p'),
        image: document.createElement('img') as ImageElement,
        includesAnimation: true,
        isThemeDark: false,
      };
      
      expect(props.includesAnimation).toBe(true);
    });
  });

  describe('HeroLogoProps', () => {
    it('should accept optional theme properties', () => {
      const validProps: HeroLogoProps = {
        isThemeDark: true,
      };
      
      expect(validProps).toBeDefined();
    });

    it('should accept logo element', () => {
      const props: HeroLogoProps = {
        logo: document.createElement('div'),
        headline: document.createElement('h1'),
        isThemeDark: false,
        isThemeMaryland: true,
      };
      
      expect(props.logo).toBeDefined();
    });

    it('should support all theme variations', () => {
      const props: HeroLogoProps = {
        isThemeDark: true,
        isThemeLight: false,
        isThemeMaryland: true,
        includesAnimation: true,
      };
      
      expect(props.isThemeMaryland).toBe(true);
    });
  });

  describe('HeroExpandProps', () => {
    it('should accept expand-specific properties', () => {
      const props: HeroExpandProps = {
        // Base properties
        headline: document.createElement('h1'),
        text: document.createElement('p'),
        actions: document.createElement('div'),
        isThemeDark: true,
        
        // Expand-specific properties
        expandedContent: document.createElement('div'),
        
        // From HeroAssetProps
        image: document.createElement('img') as ImageElement,
        
        // From HeroAnimationProps
        includesAnimation: true,
      };
      
      expect(props.headline).toBeDefined();
      expect(props.expandedContent).toBeDefined();
      expect(props.isThemeDark).toBe(true);
    });
  });

  describe('Shared Hero Interfaces', () => {
    it('HeroAssetProps should define media properties', () => {
      const assetProps: HeroAssetProps = {
        image: document.createElement('img') as ImageElement,
        video: document.createElement('video') as VideoElement,
      };
      
      expect(assetProps.image).toBeDefined();
      expect(assetProps.video).toBeDefined();
    });

    it('HeroAnimationProps should define animation flag', () => {
      const animationProps: HeroAnimationProps = {
        includesAnimation: true,
      };
      
      expect(animationProps.includesAnimation).toBe(true);
    });

    it('HeroSizingProps should define size options', () => {
      const sizingProps: HeroSizingProps = {
        isHeightSmall: true,
        isHeightFull: false,
      };
      
      expect(sizingProps.isHeightSmall).toBe(true);
      expect(sizingProps.isHeightFull).toBe(false);
    });

    it('HeroLayoutProps should define layout options', () => {
      const layoutProps: HeroLayoutProps = {
        isTextCenter: true,
        isTextRight: false,
      };
      
      expect(layoutProps.isTextCenter).toBe(true);
      expect(layoutProps.isTextRight).toBe(false);
    });
  });

  describe('Type Compatibility', () => {
    it('should ensure hero types are distinct', () => {
      // Standard with optional content
      const standard: HeroStandardProps = {
        headline: document.createElement('h1'),
        isThemeDark: true,
      };
      
      // Minimal with theme variations
      const minimal: HeroMinimalProps = {
        headline: document.createElement('h1'),
        isThemeDark: false,
        isThemeLight: true,
      };
      
      // Logo with multiple themes
      const logo: HeroLogoProps = {
        isThemeDark: true,
        isThemeMaryland: true,
      };
      
      expect(standard).toBeDefined();
      expect(minimal).toBeDefined();
      expect(logo).toBeDefined();
    });

    it('should ensure proper interface composition', () => {
      // HeroStandardProps should have animation and sizing from shared interfaces
      const standardWithShared: HeroStandardProps = {
        includesAnimation: true,
        isHeightFull: true,
        isTextCenter: true,
        isThemeDark: false,
      };
      
      // HeroOverlayProps should have unique properties
      const overlayUnique: HeroOverlayProps = {
        hasBorder: true,
        isTransparent: false,
        isSticky: true,
        isThemeDark: true,
      };
      
      // HeroStackedProps should have width option
      const stackedWithWidth: HeroStackedProps = {
        isWidthLarge: true,
        isHeightSmall: false,
        isThemeDark: false,
      };
      
      expect(standardWithShared).toBeDefined();
      expect(overlayUnique).toBeDefined();
      expect(stackedWithWidth).toBeDefined();
    });
  });
});