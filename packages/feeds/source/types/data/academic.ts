/**
 * Academic Data Types
 *
 * Type definitions for academic program entries.
 *
 * @module types/data/academic
 */

import { BaseEntry, Image } from '../core';

/**
 * Academic program entry
 *
 * Complete data structure for an academic program.
 * This is a placeholder - actual fields should be added based on the API response.
 */
export interface AcademicEntry extends BaseEntry {
  /** Program description or summary */
  summary?: string;
  /** Program image/hero */
  image?: Image[];
  /** Additional academic-specific fields can be added here */
}
