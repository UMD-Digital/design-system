/**
 * Types Index
 *
 * Central export point for all type definitions in the feeds package.
 * This provides a single import location for all types.
 *
 * @module types
 *
 * @example
 * ```typescript
 * // Import core types
 * import { ElementModel, Image, BaseEntry } from 'types';
 *
 * // Import API types
 * import { GraphQLResponse, FeedApiVariables } from 'types';
 *
 * // Import feed configuration types
 * import { BaseFeedProps, GridFeedProps } from 'types';
 *
 * // Import data types
 * import { EventEntry, NewsEntry, ExpertEntry } from 'types';
 *
 * // Or import specific types from submodules
 * import { EventEntry } from 'types/data';
 * import { BaseFeedProps } from 'types/feeds';
 * ```
 */

// Core types - fundamental building blocks
export * from './core';

// API types - request/response structures
export * from './api';

// Feed configuration types - user-facing props
export * from './feeds';

// Data types - domain-specific entry structures
export * from './data';
