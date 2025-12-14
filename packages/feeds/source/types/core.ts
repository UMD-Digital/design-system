/**
 * Core Types
 *
 * Fundamental types used across the entire feeds package.
 * These are the building blocks that other types extend.
 *
 * @module types/core
 */

/**
 * Element Model Pattern
 *
 * All feeds and components return this structure.
 * This is the standard interface for any component that creates DOM elements.
 *
 * @template T - The type of HTML element (defaults to HTMLElement)
 */
export interface ElementModel<T = HTMLElement> {
  /** The DOM element created by the component */
  element: T;
  /** CSS styles associated with this component */
  styles: string;
  /** Optional event handlers and callbacks */
  events?: Record<string, Function>;
}

/**
 * Generic image structure from CraftCMS
 *
 * Represents an image asset with URL and metadata.
 */
export interface Image {
  /** URL to the image file */
  url: string;
  /** Alternative text for accessibility */
  altText?: string;
  /** Unique identifier for the image */
  id?: string;
}

/**
 * Generic category structure
 *
 * Represents a category or taxonomy term.
 */
export interface Category {
  /** Unique identifier for the category */
  id?: string;
  /** Display title of the category */
  title: string;
  /** URL to the category page */
  url: string;
}

/**
 * Base entry structure
 *
 * All feed entries extend this base interface.
 * Contains the minimum required fields for any content entry.
 */
export interface BaseEntry {
  /** Unique identifier (can be number or string) */
  id: number | string;
  /** Display title of the entry */
  title: string;
  /** URL to the entry's detail page */
  url: string;
  /** URL-friendly slug */
  slug?: string;
  /** Entry status (live, draft, etc.) */
  status?: string;
}

/**
 * Entry with image support
 *
 * Extends BaseEntry to include image attachments.
 */
export interface ImageEntry extends BaseEntry {
  /** Array of images associated with this entry */
  image: Image[];
}

/**
 * Entry with category support
 *
 * Extends BaseEntry to include category/taxonomy associations.
 */
export interface CategorizedEntry extends BaseEntry {
  /** Categories this entry belongs to */
  categories?: Category[];
}

/**
 * Entry with date support
 *
 * Extends BaseEntry to include date information.
 */
export interface DatedEntry extends BaseEntry {
  /** ISO date string or formatted date */
  date: string;
  /** Human-readable formatted date */
  dateFormatted?: string;
  /** Publication date (CraftCMS field) */
  postDate?: string;
}

/**
 * Entry with summary/description
 *
 * Extends BaseEntry to include text content.
 */
export interface SummarizedEntry extends BaseEntry {
  /** Short summary or description */
  summary?: string;
  /** Longer description text */
  description?: string;
}

/**
 * Common content entry
 *
 * Combines all common entry features for typical content types
 * like news articles, blog posts, etc.
 *
 * This is a convenience type that includes:
 * - Images
 * - Categories
 * - Dates
 * - Summaries
 */
export interface ContentEntry extends
  ImageEntry,
  CategorizedEntry,
  DatedEntry,
  SummarizedEntry {}
