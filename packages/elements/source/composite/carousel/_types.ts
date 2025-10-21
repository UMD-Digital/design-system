import {
  type ContentElement,
  type ThemeProps,
} from '../../_types';

/**
 * Carousel-specific type definitions that extend the base types from _types.ts
 * These types provide explicit interfaces for each carousel variation
 */

/**
 * Carousel slide properties
 */
export interface CarouselSlideProps {
  image: HTMLImageElement | HTMLAnchorElement;
  content?: ContentElement;
  headline?: ContentElement;
  text?: ContentElement;
}

/**
 * Carousel animation properties
 */
export interface CarouselAnimationProps {
  animationTime?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

/**
 * Wide carousel variant props
 * Explicitly defines all properties needed for wide carousel
 */
export interface CarouselWideProps
  extends CarouselAnimationProps,
    Pick<ThemeProps, 'isThemeDark'> {
  slides: CarouselSlideProps[];
  title?: string;
  mobileBreakpoint?: number;
}