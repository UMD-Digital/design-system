/**
 * @file compose.test.ts
 * @description Smoke tests for composition helper functions
 */

import { textLockup, card, hero, list, grid, compose } from '../factories/compose';

describe('Compose - Smoke Tests', () => {
  describe('textLockup', () => {
    test('should create text lockup with required props', () => {
      const model = textLockup({
        headline: 'Test Headline'
      }).build();

      expect(model.element).toBeInstanceOf(HTMLElement);
      expect(model.styles).toBeTruthy();
      expect(model.element.classList.contains('umd-text-lockup')).toBe(true);
    });

    test('should create text lockup with all props', () => {
      const model = textLockup({
        eyebrow: 'Eyebrow',
        headline: 'Headline',
        text: 'Body text',
        theme: 'dark',
        headlineSize: 'large'
      }).build();

      expect(model.element).toBeInstanceOf(HTMLElement);
      expect(model.styles).toBeTruthy();
    });

    test('should create text lockup with different headline sizes', () => {
      const sizes: Array<'large' | 'medium' | 'small' | 'min'> = ['large', 'medium', 'small', 'min'];

      sizes.forEach(size => {
        const model = textLockup({
          headline: 'Test',
          headlineSize: size
        }).build();

        expect(model.element).toBeInstanceOf(HTMLElement);
      });
    });
  });

  describe('card', () => {
    test('should create card with required props', () => {
      const model = card({
        headline: 'Card Title'
      }).build();

      expect(model.element).toBeInstanceOf(HTMLElement);
      expect(model.styles).toBeTruthy();
      expect(model.element.classList.contains('umd-card')).toBe(true);
    });

    test('should create card with all props', () => {
      const model = card({
        image: '/test.jpg',
        imageAlt: 'Test image',
        eyebrow: 'Featured',
        headline: 'Card Title',
        text: 'Card description',
        action: {
          text: 'Learn More',
          href: '/learn',
          type: 'secondary'
        },
        theme: 'light'
      }).build();

      expect(model.element).toBeInstanceOf(HTMLElement);
      expect(model.styles).toBeTruthy();
    });

    test('should create card with different action types', () => {
      const types: Array<'primary' | 'secondary' | 'outline'> = ['primary', 'secondary', 'outline'];

      types.forEach(type => {
        const model = card({
          headline: 'Test',
          action: {
            text: 'Action',
            href: '/test',
            type
          }
        }).build();

        expect(model.element).toBeInstanceOf(HTMLElement);
      });
    });
  });

  describe('hero', () => {
    test('should create hero with required props', () => {
      const model = hero({
        headline: 'Hero Title'
      }).build();

      expect(model.element).toBeInstanceOf(HTMLElement);
      expect(model.styles).toBeTruthy();
      expect(model.element.classList.contains('umd-hero')).toBe(true);
    });

    test('should create hero with all props', () => {
      const model = hero({
        image: '/hero.jpg',
        imageAlt: 'Hero image',
        eyebrow: 'Welcome',
        headline: 'Hero Title',
        text: 'Hero description',
        actions: [
          { text: 'Primary', href: '/primary', type: 'primary' },
          { text: 'Secondary', href: '/secondary', type: 'secondary' }
        ],
        theme: 'dark'
      }).build();

      expect(model.element).toBeInstanceOf(HTMLElement);
      expect(model.styles).toBeTruthy();
    });

    test('should create hero with multiple actions', () => {
      const model = hero({
        headline: 'Test',
        actions: [
          { text: 'Action 1', href: '/1', type: 'primary' },
          { text: 'Action 2', href: '/2', type: 'secondary' },
          { text: 'Action 3', href: '/3', type: 'outline' }
        ]
      }).build();

      expect(model.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('list', () => {
    test('should create unordered list', () => {
      const items = ['Item 1', 'Item 2', 'Item 3'];

      const model = list({
        items,
        mapper: (item) => {
          const li = document.createElement('li');
          li.textContent = item;
          return li;
        }
      }).build();

      expect(model.element).toBeInstanceOf(HTMLElement);
      expect(model.styles).toBeTruthy();
    });

    test('should create ordered list', () => {
      const items = [1, 2, 3];

      const model = list({
        items,
        mapper: (item) => {
          const li = document.createElement('li');
          li.textContent = String(item);
          return li;
        },
        ordered: true
      }).build();

      expect(model.element).toBeInstanceOf(HTMLElement);
    });

    test('should handle empty array', () => {
      const model = list({
        items: [],
        mapper: () => document.createElement('li')
      }).build();

      expect(model.element).toBeInstanceOf(HTMLElement);
    });

    test('should apply custom class name', () => {
      const model = list({
        items: ['Test'],
        mapper: () => document.createElement('li'),
        className: 'custom-list'
      }).build();

      expect(model.element.classList.contains('custom-list')).toBe(true);
    });
  });

  describe('grid', () => {
    test('should create grid with default 3 columns', () => {
      const items = [1, 2, 3, 4, 5, 6];

      const model = grid({
        items,
        mapper: (item) => {
          const div = document.createElement('div');
          div.textContent = String(item);
          return div;
        }
      }).build();

      expect(model.element).toBeInstanceOf(HTMLElement);
      expect(model.styles).toBeTruthy();
    });

    test('should create grid with 2 columns', () => {
      const items = [1, 2];

      const model = grid({
        items,
        mapper: () => document.createElement('div'),
        columns: 2
      }).build();

      expect(model.element).toBeInstanceOf(HTMLElement);
    });

    test('should create grid with 4 columns', () => {
      const items = [1, 2, 3, 4];

      const model = grid({
        items,
        mapper: () => document.createElement('div'),
        columns: 4
      }).build();

      expect(model.element).toBeInstanceOf(HTMLElement);
    });

    test('should create grid without gap', () => {
      const items = [1, 2, 3];

      const model = grid({
        items,
        mapper: () => document.createElement('div'),
        withGap: false
      }).build();

      expect(model.element).toBeInstanceOf(HTMLElement);
    });

    test('should handle empty array', () => {
      const model = grid({
        items: [],
        mapper: () => document.createElement('div')
      }).build();

      expect(model.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('compose object', () => {
    test('should export all composition functions', () => {
      expect(compose).toHaveProperty('textLockup');
      expect(compose).toHaveProperty('card');
      expect(compose).toHaveProperty('hero');
      expect(compose).toHaveProperty('list');
      expect(compose).toHaveProperty('grid');
    });

    test('should have all functions as callable', () => {
      expect(typeof compose.textLockup).toBe('function');
      expect(typeof compose.card).toBe('function');
      expect(typeof compose.hero).toBe('function');
      expect(typeof compose.list).toBe('function');
      expect(typeof compose.grid).toBe('function');
    });
  });

  describe('Integration - Complex compositions', () => {
    test('should compose card within grid', () => {
      const cards = grid({
        items: [
          { title: 'Card 1', text: 'Description 1' },
          { title: 'Card 2', text: 'Description 2' }
        ],
        mapper: (item) => card({
          headline: item.title,
          text: item.text
        }),
        columns: 2
      }).build();

      expect(cards.element).toBeInstanceOf(HTMLElement);
      expect(cards.styles).toBeTruthy();
    });

    test('should compose textLockup within card', () => {
      const complexCard = card({
        headline: 'Main Title',
        text: 'Main description',
        action: {
          text: 'Read More',
          href: '/read',
          type: 'secondary'
        }
      }).build();

      expect(complexCard.element).toBeInstanceOf(HTMLElement);
    });
  });
});
