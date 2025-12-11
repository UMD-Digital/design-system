/**
 * Type compilation tests
 * These tests verify that the TypeScript interfaces compile correctly
 * and follow the explicit typing pattern we've established
 */

import type {
  CardBlockProps,
  CardListProps,
  CardOverlayProps,
} from '../../../source/composite/card/_types';

import type {
  HeroStandardProps,
  HeroMinimalProps,
  HeroOverlayProps,
  HeroStackedProps,
  HeroLogoProps,
} from '../../../source/composite/hero/_types';

describe('Type Compilation Tests', () => {
  describe('Card Types', () => {
    it('CardBlockProps should compile with valid properties', () => {
      const validBlock: CardBlockProps = {
        headline: document.createElement('h3'),
        text: document.createElement('p'),
        eyebrow: document.createElement('span'),
        actions: document.createElement('div'),
        date: document.createElement('time'),
        newsId: 'news-123',
        hasBorder: true,
        hasEyebrowRibbon: true,
        isTransparent: false,
        isThemeDark: true,
      };
      
      expect(validBlock.headline).toBeDefined();
    });

    it('CardListProps should compile with valid properties', () => {
      const validList: CardListProps = {
        headline: document.createElement('h3'),
        date: document.createElement('time'),
        eyebrow: document.createElement('span'),
        actions: document.createElement('div'),
        isThemeDark: true,
      };
      
      expect(validList.date).toBeDefined();
    });

    it('CardOverlayProps should compile with valid properties', () => {
      const validOverlay: CardOverlayProps = {
        headline: document.createElement('h3'),
        text: document.createElement('p'),
        eyebrow: document.createElement('span'),
        actions: document.createElement('div'),
        date: document.createElement('time'),
        ctaIcon: document.createElement('span'),
        isQuote: true,
        isThemeDark: true,
        isThemeLight: false,
      };
      
      expect(validOverlay.headline).toBeDefined();
    });
  });

  describe('Hero Types', () => {
    it('HeroStandardProps should compile with valid properties', () => {
      const validStandard: HeroStandardProps = {
        headline: document.createElement('h1'),
        eyebrow: document.createElement('span'),
        text: document.createElement('p'),
        actions: document.createElement('div'),
        isThemeDark: true,
      };
      
      expect(validStandard).toBeDefined();
    });

    it('HeroMinimalProps should compile with valid properties', () => {
      const validMinimal: HeroMinimalProps = {
        headline: document.createElement('h1'),
        eyebrow: document.createElement('span'),
        text: document.createElement('p'),
        actions: document.createElement('div'),
        isThemeDark: true,
      };
      
      expect(validMinimal).toBeDefined();
    });

    it('HeroOverlayProps should compile with valid properties', () => {
      const validOverlay: HeroOverlayProps = {
        headline: document.createElement('h1'),
        eyebrow: document.createElement('span'),
        text: document.createElement('p'),
        actions: document.createElement('div'),
        isThemeDark: true,
      };
      
      expect(validOverlay).toBeDefined();
    });

    it('HeroStackedProps should compile with valid properties', () => {
      const validStacked: HeroStackedProps = {
        headline: document.createElement('h1'),
        eyebrow: document.createElement('span'),
        text: document.createElement('p'),
        actions: document.createElement('div'),
        isThemeDark: true,
      };
      
      expect(validStacked).toBeDefined();
    });

    it('HeroLogoProps should compile with valid properties', () => {
      const validLogo: HeroLogoProps = {
        headline: document.createElement('h1'),
        eyebrow: document.createElement('span'),
        text: document.createElement('p'),
        actions: document.createElement('div'),
        logo: document.createElement('div'),
        isThemeDark: true,
        isThemeMaryland: false,
      };
      
      expect(validLogo).toBeDefined();
    });
  });

  describe('Explicit Typing Pattern', () => {
    it('should demonstrate explicit property selection', () => {
      // Card types are explicit about theme needs
      type CardBlockTheme = Pick<CardBlockProps, 'isThemeDark'>;
      type CardOverlayTheme = Pick<CardOverlayProps, 'isThemeDark' | 'isThemeLight'>;
      
      const blockTheme: CardBlockTheme = { isThemeDark: true };
      const overlayTheme: CardOverlayTheme = { isThemeDark: true, isThemeLight: false };
      
      expect(blockTheme).toBeDefined();
      expect(overlayTheme).toBeDefined();
    });

    it('should show required vs optional properties', () => {
      // List cards require both headline and date
      type RequiredListProps = Pick<CardListProps, 'headline' | 'date'>;
      const required: RequiredListProps = {
        headline: document.createElement('h3'),
        date: document.createElement('time'),
      };
      
      // Block cards only require headline
      type RequiredBlockProps = Pick<CardBlockProps, 'headline'>;
      const requiredBlock: RequiredBlockProps = {
        headline: document.createElement('h3'),
      };
      
      expect(required).toBeDefined();
      expect(requiredBlock).toBeDefined();
    });
  });
});