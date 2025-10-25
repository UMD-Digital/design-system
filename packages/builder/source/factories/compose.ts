/**
 * @file compose.ts
 * @description Composition helpers for complex UMD Design System patterns
 *
 * Provides high-level composition functions for common UI patterns
 * like cards, heroes, text lockups, and other composite elements
 */

import { ElementBuilder } from '../core/ElementBuilder';
import { headlines, text, actions, layouts } from './presets';
import type { ElementBuilderInterface } from '../core/types';

/**
 * Props for text lockup composition
 */
export interface TextLockupProps {
  /** Optional eyebrow text */
  eyebrow?: string;
  /** Headline text (required) */
  headline: string;
  /** Body text */
  text?: string;
  /** Theme variant */
  theme?: 'light' | 'dark';
  /** Headline size */
  headlineSize?: 'large' | 'medium' | 'small' | 'min';
}

/**
 * Props for card composition
 */
export interface CardProps {
  /** Optional image source */
  image?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Optional eyebrow text */
  eyebrow?: string;
  /** Headline text (required) */
  headline: string;
  /** Body text */
  text?: string;
  /** Action link */
  action?: {
    text: string;
    href: string;
    type?: 'primary' | 'secondary' | 'outline';
  };
  /** Theme variant */
  theme?: 'light' | 'dark';
}

/**
 * Props for hero composition
 */
export interface HeroProps {
  /** Background image source */
  image?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Optional eyebrow text */
  eyebrow?: string;
  /** Headline text (required) */
  headline: string;
  /** Body text */
  text?: string;
  /** Multiple action links */
  actions?: Array<{
    text: string;
    href: string;
    type?: 'primary' | 'secondary' | 'outline';
  }>;
  /** Theme variant */
  theme?: 'light' | 'dark';
}

/**
 * Props for list composition
 */
export interface ListProps<T> {
  /** Array of items to render */
  items: T[];
  /** Function to map each item to a builder */
  mapper: (item: T, index: number) => ElementBuilderInterface | HTMLElement | string;
  /** Whether to use ordered list */
  ordered?: boolean;
  /** Optional class name */
  className?: string;
}

/**
 * Create a text lockup (eyebrow + headline + text)
 *
 * @example
 * ```typescript
 * const lockup = compose.textLockup({
 *   eyebrow: 'News & Events',
 *   headline: 'Latest Updates',
 *   text: 'Check out what's happening at UMD',
 *   headlineSize: 'large'
 * }).build();
 * ```
 */
export function textLockup(props: TextLockupProps): ElementBuilderInterface<HTMLDivElement> {
  const {
    eyebrow,
    headline,
    text: bodyText,
    theme,
    headlineSize = 'large'
  } = props;

  const container = layouts.stacked('small')
    .withClassName('umd-text-lockup');

  if (theme) {
    container.withThemeDark(theme === 'dark');
  }

  // Add eyebrow if provided
  if (eyebrow) {
    container.withChild(
      text.eyebrow().withText(eyebrow)
    );
  }

  // Add headline
  const headlineMap = {
    large: headlines.sansLarge,
    medium: headlines.sansMedium,
    small: headlines.sansSmall,
    min: headlines.sansMin,
  };

  container.withChild(
    headlineMap[headlineSize]().withText(headline)
  );

  // Add body text if provided
  if (bodyText) {
    container.withChild(
      text.body().withText(bodyText)
    );
  }

  return container as unknown as ElementBuilderInterface<HTMLDivElement>;
}

/**
 * Create a card component
 *
 * @example
 * ```typescript
 * const card = compose.card({
 *   image: '/image.jpg',
 *   imageAlt: 'Card image',
 *   eyebrow: 'Featured',
 *   headline: 'Card Title',
 *   text: 'Card description text',
 *   action: {
 *     text: 'Learn More',
 *     href: '/learn-more',
 *     type: 'secondary'
 *   }
 * }).build();
 * ```
 */
export function card(props: CardProps): ElementBuilderInterface<HTMLDivElement> {
  const {
    image,
    imageAlt,
    eyebrow,
    headline,
    text: bodyText,
    action,
    theme
  } = props;

  const container = new ElementBuilder()
    .withClassName('umd-card')
    .withStyles({
      element: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }
    });

  if (theme) {
    container.withThemeDark(theme === 'dark');
  }

  // Add image if provided
  if (image) {
    container.withChild(
      new ElementBuilder()
        .withClassName('umd-card-image')
        .withChild(
          new ElementBuilder('img')
            .withAttribute('src', image)
            .withAttribute('alt', imageAlt || '')
            .withStyles({
              element: {
                width: '100%',
                height: 'auto',
                display: 'block',
              }
            })
        )
    );
  }

  // Add content section
  const content = new ElementBuilder()
    .withClassName('umd-card-content')
    .withStyles({
      element: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }
    });

  // Add eyebrow if provided
  if (eyebrow) {
    content.withChild(
      text.eyebrow().withText(eyebrow)
    );
  }

  // Add headline
  content.withChild(
    headlines.sansSmall().withText(headline)
  );

  // Add body text if provided
  if (bodyText) {
    content.withChild(
      text.body().withText(bodyText)
    );
  }

  // Add action if provided
  if (action) {
    const actionMap = {
      primary: actions.primary,
      secondary: actions.secondary,
      outline: actions.outline,
    };

    const actionBuilder = actionMap[action.type || 'secondary']();
    content.withChild(
      actionBuilder
        .withText(action.text)
        .withAttribute('href', action.href)
    );
  }

  container.withChild(content);

  return container as unknown as ElementBuilderInterface<HTMLDivElement>;
}

/**
 * Create a hero component
 *
 * @example
 * ```typescript
 * const hero = compose.hero({
 *   image: '/hero.jpg',
 *   imageAlt: 'Hero image',
 *   eyebrow: 'Welcome',
 *   headline: 'University of Maryland',
 *   text: 'A leading research institution',
 *   actions: [
 *     { text: 'Apply Now', href: '/apply', type: 'primary' },
 *     { text: 'Learn More', href: '/about', type: 'secondary' }
 *   ]
 * }).build();
 * ```
 */
export function hero(props: HeroProps): ElementBuilderInterface<HTMLDivElement> {
  const {
    image,
    imageAlt,
    eyebrow,
    headline,
    text: bodyText,
    actions: actionList,
    theme
  } = props;

  const container = new ElementBuilder()
    .withClassName('umd-hero')
    .withStyles({
      element: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        minHeight: '400px',
        padding: '2rem',
      }
    });

  if (theme) {
    container.withThemeDark(theme === 'dark');
  }

  // Add background image if provided
  if (image) {
    container.withChild(
      new ElementBuilder()
        .withClassName('umd-hero-image')
        .withStyles({
          element: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
          }
        })
        .withChild(
          new ElementBuilder('img')
            .withAttribute('src', image)
            .withAttribute('alt', imageAlt || '')
            .withStyles({
              element: {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }
            })
        )
    );
  }

  // Add content section
  const content = layouts.stacked('medium')
    .withClassName('umd-hero-content')
    .withStyles({
      element: {
        maxWidth: '800px',
        position: 'relative',
        zIndex: 1,
      }
    });

  // Add eyebrow if provided
  if (eyebrow) {
    content.withChild(
      text.eyebrow().withText(eyebrow)
    );
  }

  // Add headline
  content.withChild(
    headlines.sansLargest().withText(headline)
  );

  // Add body text if provided
  if (bodyText) {
    content.withChild(
      text.body().withText(bodyText)
    );
  }

  // Add actions if provided
  if (actionList && actionList.length > 0) {
    const actionsContainer = layouts.inline('medium')
      .withClassName('umd-hero-actions');

    actionList.forEach(action => {
      const actionMap = {
        primary: actions.primary,
        secondary: actions.secondary,
        outline: actions.outline,
      };

      const actionBuilder = actionMap[action.type || 'primary']();
      actionsContainer.withChild(
        actionBuilder
          .withText(action.text)
          .withAttribute('href', action.href)
      );
    });

    content.withChild(actionsContainer);
  }

  container.withChild(content);

  return container as unknown as ElementBuilderInterface<HTMLDivElement>;
}

/**
 * Create a list from an array of items
 *
 * @example
 * ```typescript
 * const list = compose.list({
 *   items: ['Apple', 'Banana', 'Cherry'],
 *   mapper: (fruit) => li().withText(fruit),
 *   ordered: false
 * }).build();
 * ```
 */
export function list<T>(props: ListProps<T>): ElementBuilderInterface<HTMLUListElement | HTMLOListElement> {
  const { items, mapper, ordered = false, className } = props;

  const listElement = ordered
    ? new ElementBuilder().withStyles({ element: { listStyleType: 'decimal' } }) as any
    : new ElementBuilder().withStyles({ element: { listStyleType: 'disc' } }) as any;

  if (className) {
    listElement.withClassName(className);
  }

  items.forEach((item, index) => {
    listElement.withChild(mapper(item, index));
  });

  return listElement;
}

/**
 * Create a grid of items
 *
 * @example
 * ```typescript
 * const grid = compose.grid({
 *   items: products,
 *   mapper: (product) => compose.card({
 *     image: product.image,
 *     headline: product.name,
 *     text: product.description
 *   }),
 *   columns: 3
 * }).build();
 * ```
 */
export function grid<T>(props: {
  items: T[];
  mapper: (item: T, index: number) => ElementBuilderInterface | HTMLElement | string;
  columns?: 2 | 3 | 4;
  withGap?: boolean;
}): ElementBuilderInterface<HTMLDivElement> {
  const { items, mapper, columns = 3, withGap = true } = props;

  const gridContainer = layouts.grid(columns, withGap);

  items.forEach((item, index) => {
    gridContainer.withChild(mapper(item, index));
  });

  return gridContainer;
}

/**
 * All composition helpers combined
 *
 * @example
 * ```typescript
 * import { compose } from '@universityofmaryland/web-builder-library/compose';
 *
 * const myCard = compose.card({ ... }).build();
 * const myHero = compose.hero({ ... }).build();
 * ```
 */
export const compose = {
  textLockup,
  card,
  hero,
  list,
  grid,
};
