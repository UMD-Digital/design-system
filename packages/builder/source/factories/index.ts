/**
 * @file index.ts
 * @description Factory exports for the UMD Design System Element Builder
 *
 * This module exports:
 * - createElement helper (deprecated - use new ElementBuilder() instead)
 * - Preset builders (actions, headlines, text, layouts)
 * - Composition helpers (card, hero, textLockup, etc.)
 * - StyledOptions type (deprecated - use individual builder methods instead)
 */

// Preset builders (for creating new slot elements)
export { actions, headlines, text, layouts, assets, presets } from './presets';

// Composition helpers
export { compose, textLockup, card, hero, list, grid } from './compose';

// Composition types
export type {
  TextLockupProps,
  CardProps,
  HeroProps,
  ListProps,
} from './compose';
