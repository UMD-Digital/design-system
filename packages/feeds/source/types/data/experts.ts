/**
 * Expert Data Types
 *
 * Type definitions for expert/faculty entries from the UMD Experts API.
 *
 * @module types/data/experts
 */

import { BaseEntry, Image } from '../core';

/**
 * Campus unit information
 *
 * Details about a campus unit associated with a job/position.
 */
export interface CampusUnit {
  /** Campus unit name */
  title: string;
  /** External link to campus unit */
  link?: {
    url: string;
  } | null;
}

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
  /** College/school associated with this job */
  collegeSchools?: CampusUnit[] | null;
  /** Campus units associated with this job */
  campusUnits?: CampusUnit[] | null;
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
 * Expert contact information
 *
 * Contact details for reaching the expert.
 */
export interface ExpertContact {
  /** Expert's email address */
  email?: string | null;
  /** LinkedIn profile URL */
  linkedin?: string | null;
  /** Personal or professional website URL */
  website?: string | null;
  /** Twitter/X handle or profile URL */
  twitter?: string | null;
}

/**
 * Expert skills and capabilities
 *
 * Additional expertise and capabilities information.
 */
export interface ExpertSkills {
  /** Languages spoken by the expert */
  languages?: string[] | null;
  /** Whether the expert is media trained */
  mediaTrained?: boolean | null;
}

/**
 * Category reference
 *
 * Basic category information from the API.
 */
export interface ExpertCategory {
  /** Unique identifier for the category */
  id: string;
  /** Category name */
  title: string;
  /** URL to category page */
  url?: string | null;
}

/**
 * Expert entry
 *
 * Complete data structure for an expert/faculty profile.
 * Uses name fields instead of generic title field.
 */
export interface ExpertEntry extends BaseEntry {
  /** Expert's name prefix (e.g., Dr., Prof.) */
  prefix?: string | null;
  /** Expert's first name */
  firstName: string;
  /** Expert's middle name (optional) */
  middleName?: string | null;
  /** Expert's last name */
  lastName: string;
  /** Expert's name suffix (e.g., Jr., PhD, MD) */
  suffix?: string | null;
  /** Expert's pronouns (e.g., he/him, she/her, they/them) */
  pronouns?: string | null;
  /** Expert's headshot image */
  headshot?: Image[] | null;
  /** Brief summary of the expert */
  summary?: {
    html: string;
  } | null;
  /** Full biography of the expert */
  bio?: {
    html: string;
  } | null;
  /** Organizations and jobs the expert is affiliated with */
  organizations?: ExpertOrganization[];
  /** Areas of expertise categories */
  areasOfExpertise?: ExpertCategory[] | null;
  /** Topic categories */
  topics?: ExpertCategory[] | null;
  /** Campus unit categories */
  campusUnits?: ExpertCategory[] | null;
  /** Contact information */
  email?: string | null;
  linkedin?: string | null;
  website?: string | null;
  twitter?: string | null;
  bluesky?: string | null;
  substack?: string | null;
  /** Skills and capabilities */
  languages?: string[] | null;
  mediaTrained?: boolean | null;
}
