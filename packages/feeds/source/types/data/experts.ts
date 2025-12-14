/**
 * Expert Data Types
 *
 * Type definitions for expert/faculty entries from the UMD Experts API.
 *
 * @module types/data/experts
 */

import { BaseEntry, Image } from '../core';

/**
 * Expert job/position information
 *
 * Details about a specific job/position held by an expert.
 */
export interface ExpertJob {
  /** Unique identifier for the job */
  id: string;
  /** Job title */
  title: string;
  /** URL to job detail page */
  url: string;
  /** Office/room number */
  roomNumber?: string;
}

/**
 * Expert organization affiliation
 *
 * Details about an organization the expert is affiliated with.
 */
export interface ExpertOrganization {
  /** Unique identifier for the organization */
  id: string;
  /** Organization name */
  title: string;
  /** URL to organization page */
  url: string;
  /** Jobs/positions held within this organization */
  jobs: ExpertJob[];
}

/**
 * Expert entry
 *
 * Complete data structure for an expert/faculty profile.
 * Uses name fields instead of generic title field.
 */
export interface ExpertEntry extends BaseEntry {
  /** Expert's first name */
  firstName: string;
  /** Expert's middle name (optional) */
  middleName?: string | null;
  /** Expert's last name */
  lastName: string;
  /** Expert's headshot image */
  headshot?: Image[] | null;
  /** Brief biography or description */
  summary?: {
    plainText: string;
  } | null;
  /** Organizations and jobs the expert is affiliated with */
  organizations?: ExpertOrganization[];
}
