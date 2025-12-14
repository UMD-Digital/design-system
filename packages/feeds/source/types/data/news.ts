/**
 * News Data Types
 *
 * Type definitions for news entries from the Maryland Today API.
 *
 * @module types/data/news
 */

import { ContentEntry } from '../core';

/**
 * News entry
 *
 * Complete data structure for a news article from Maryland Today.
 * Extends ContentEntry with required fields for news display.
 */
export interface NewsEntry extends ContentEntry {
  /** Article summary/excerpt (required for news) */
  summary: string;
  /** Formatted publication date (required for news display) */
  dateFormatted: string;
}
