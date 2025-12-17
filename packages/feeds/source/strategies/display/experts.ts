/**
 * Experts Display Strategy
 *
 * Strategy for displaying expert entries using person or card elements.
 * Uses a functional composition approach with pure data extraction,
 * element creation, and card composition functions.
 *
 * @module strategies/display/experts
 */

import {
  person,
  card,
} from '@universityofmaryland/web-elements-library/composite';
import {
  createTextWithLink,
  createTextContainer,
  createImageOrLinkedImage,
} from '@universityofmaryland/web-utilities-library/elements';
import { DisplayStrategy, CardMappingOptions } from '../../factory/core/types';
import { ElementModel } from '../../_types';
import { ExpertEntry } from 'types/data';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Contact field configuration
 */
interface ContactConfig {
  key: keyof Pick<ExpertEntry, 'email' | 'website' | 'linkedin' | 'twitter'>;
  label: (value: string) => string;
  url: (value: string) => string;
}

/**
 * Extracted association data
 */
interface AssociationData {
  title: string;
  url?: string | null;
}

/**
 * Extracted image data
 */
interface ImageData {
  url: string;
  altText: string;
}

/**
 * Extracted contact data
 */
interface ContactData {
  email?: string | null;
  website?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Contact field configuration
 *
 * Defines how each contact type should be rendered as a link.
 */
const CONTACT_CONFIGS: ContactConfig[] = [
  {
    key: 'email',
    label: () => 'Email',
    url: (value) => `mailto:${value}`,
  },
  {
    key: 'website',
    label: (value) => value,
    url: (value) => value,
  },
  {
    key: 'linkedin',
    label: (value) => value,
    url: (value) => value,
  },
  {
    key: 'twitter',
    label: (value) => value,
    url: (value) => value,
  },
];

// ============================================================================
// PURE DATA EXTRACTION FUNCTIONS
// ============================================================================

/**
 * Build full name from expert entry
 *
 * Combines prefix (optional), first, middle (optional), last name, and suffix (optional).
 *
 * @param entry - Expert entry
 * @returns Full name string
 */
export const buildFullName = (entry: ExpertEntry): string => {
  const parts = [
    entry.prefix,
    entry.firstName,
    entry.middleName,
    entry.lastName,
    entry.suffix,
  ].filter(Boolean);

  return parts.join(' ');
};

/**
 * Build expert profile URL
 *
 * @param entry - Expert entry
 * @returns Profile URL string
 */
const buildProfileUrl = (entry: ExpertEntry): string => {
  return `https://umdrightnow.umd.edu/expert/${entry.slug}`;
};

/**
 * Extract primary job title
 *
 * @param entry - Expert entry
 * @returns Job title string or null
 */
const extractPrimaryJobTitle = (entry: ExpertEntry): string | null => {
  return entry.organizations?.[0]?.jobs?.[0]?.title || null;
};

/**
 * Extract primary association (campus unit)
 *
 * @param entry - Expert entry
 * @returns Association data or null
 */
const extractPrimaryAssociation = (
  entry: ExpertEntry,
): AssociationData | null => {
  const campusUnit = entry.organizations?.[0]?.jobs?.[0]?.campusUnits?.[0];
  if (!campusUnit) return null;

  return {
    title: campusUnit.title,
    url: campusUnit.link?.url,
  };
};

/**
 * Extract image data from headshot
 *
 * @param entry - Expert entry
 * @param fullName - Full name for alt text
 * @returns Image data or null
 */
const extractImageData = (
  entry: ExpertEntry,
  fullName: string,
): ImageData | null => {
  const headshotUrl = entry.headshot?.[0]?.url;
  if (!headshotUrl) return null;

  return {
    url: headshotUrl,
    altText: fullName,
  };
};

/**
 * Extract contact data
 *
 * @param entry - Expert entry
 * @returns Contact data object
 */
const extractContactData = (entry: ExpertEntry): ContactData => {
  return {
    email: entry.email || null,
    website: entry.website || null,
    linkedin: entry.linkedin || null,
    twitter: entry.twitter || null,
  };
};

/**
 * Extract description based on display type
 *
 * @param entry - Expert entry
 * @param displayType - 'small' for summary, 'full' for biography
 * @returns HTML description string or null
 */
const extractDescription = (
  entry: ExpertEntry,
  displayType: 'small' | 'full',
): string | null => {
  if (displayType === 'full') {
    return entry.bio?.html || null;
  }
  return entry.summary?.html || null;
};

/**
 * Extract pronouns
 *
 * @param entry - Expert entry
 * @returns Pronouns string or null
 */
const extractPronouns = (entry: ExpertEntry): string | null => {
  return entry.pronouns || null;
};

// ============================================================================
// ELEMENT CREATION FUNCTIONS
// ============================================================================

/**
 * Create name element with link
 *
 * @param fullName - Full name text
 * @param url - Profile URL
 * @param containerTag - HTML tag for container (default: undefined)
 * @returns Name element or null
 */
const createNameElement = (
  fullName: string,
  url: string,
  containerTag?: 'h1' | 'h2' | 'h3',
): HTMLElement | null => {
  return createTextWithLink({
    text: fullName,
    url,
    containerTag,
  });
};

/**
 * Create job title element
 *
 * @param jobTitle - Job title text
 * @returns Job element or null
 */
const createJobElement = (jobTitle: string | null): HTMLElement | null => {
  if (!jobTitle) return null;
  return createTextContainer({ text: jobTitle });
};

/**
 * Create association element (with optional link)
 *
 * @param association - Association data
 * @returns Association element or null
 */
const createAssociationElement = (
  association: AssociationData | null,
): HTMLElement | null => {
  if (!association) return null;

  if (association.url) {
    return createTextWithLink({
      text: association.title,
      url: association.url,
    });
  }

  return createTextContainer({ text: association.title });
};

/**
 * Create image element (with optional link)
 *
 * @param imageData - Image data
 * @param linkUrl - Optional link URL
 * @param linkLabel - Optional link label
 * @returns Image element or null
 */
const createImageElement = (
  imageData: ImageData | null,
  linkUrl?: string,
  linkLabel?: string,
): HTMLImageElement | HTMLAnchorElement | null => {
  if (!imageData) return null;

  return createImageOrLinkedImage({
    imageUrl: imageData.url,
    altText: imageData.altText,
    linkUrl,
    linkLabel,
  });
};

/**
 * Create description element
 *
 * @param description - HTML description text
 * @returns Description element or null
 */
const createDescriptionElement = (
  description: string | null,
): HTMLElement | null => {
  if (!description) return null;
  return createTextContainer({ text: description, allowHTML: true });
};

/**
 * Create pronouns element
 *
 * @param pronouns - Pronouns text
 * @returns Pronouns element or null
 */
const createPronounsElement = (pronouns: string | null): HTMLElement | null => {
  if (!pronouns) return null;
  return createTextContainer({ text: pronouns });
};

/**
 * Create contact elements from contact data
 *
 * @param contactData - Contact data object
 * @returns Object with contact elements keyed by contact type
 */
const createContactElements = (
  contactData: ContactData,
): { [key: string]: HTMLElement | null } => {
  return CONTACT_CONFIGS.reduce<{ [key: string]: HTMLElement | null }>(
    (elements, config) => {
      const value = contactData[config.key];
      if (!value) return elements;

      const element = createTextWithLink({
        text: config.label(value),
        url: config.url(value),
      });

      elements[config.key] = element;
      return elements;
    },
    {},
  );
};

// ============================================================================
// CARD COMPOSITION FUNCTIONS
// ============================================================================

/**
 * Create props for person block card
 *
 * @param entry - Expert entry
 * @param options - Card mapping options
 * @returns Person block card element
 */
const createBlockCardProps = (
  entry: ExpertEntry,
  options: CardMappingOptions,
): ElementModel => {
  const { isThemeDark = false } = options;

  // Extract data
  const fullName = buildFullName(entry);
  const profileUrl = buildProfileUrl(entry);
  const jobTitle = extractPrimaryJobTitle(entry);
  const association = extractPrimaryAssociation(entry);
  const imageData = extractImageData(entry, fullName);
  const pronouns = extractPronouns(entry);

  // Create elements
  const name = createNameElement(fullName, profileUrl);
  const job = createJobElement(jobTitle);
  const associationElement = createAssociationElement(association);
  const image = createImageElement(imageData, profileUrl, `View profile for ${fullName}`);
  const pronounsElement = createPronounsElement(pronouns);

  return person.block({
    name,
    pronouns: pronounsElement,
    job,
    association: associationElement,
    image,
    isThemeDark,
  });
};

/**
 * Create props for person list card
 *
 * @param entry - Expert entry
 * @param options - Card mapping options
 * @returns Person list card element
 */
const createListCardProps = (
  entry: ExpertEntry,
  options: CardMappingOptions,
): ElementModel => {
  const { isThemeDark = false } = options;

  // Extract data
  const fullName = buildFullName(entry);
  const profileUrl = buildProfileUrl(entry);
  const jobTitle = extractPrimaryJobTitle(entry);
  const association = extractPrimaryAssociation(entry);
  const imageData = extractImageData(entry, fullName);
  const pronouns = extractPronouns(entry);

  // Create elements
  const name = createNameElement(fullName, profileUrl);
  const job = createJobElement(jobTitle);
  const associationElement = createAssociationElement(association);
  const image = createImageElement(imageData, profileUrl, `View profile for ${fullName}`);
  const pronounsElement = createPronounsElement(pronouns);

  return person.list({
    name,
    pronouns: pronounsElement,
    job,
    association: associationElement,
    image,
    isThemeDark,
  });
};

/**
 * Create props for person tabular card
 *
 * @param entry - Expert entry
 * @param options - Card mapping options
 * @returns Person tabular card element
 */
const createTabularCardProps = (
  entry: ExpertEntry,
  options: CardMappingOptions,
): ElementModel => {
  const { isThemeDark = false } = options;

  // Extract data
  const fullName = buildFullName(entry);
  const profileUrl = buildProfileUrl(entry);
  const jobTitle = extractPrimaryJobTitle(entry);
  const association = extractPrimaryAssociation(entry);
  const imageData = extractImageData(entry, fullName);
  const contactData = extractContactData(entry);
  const pronouns = extractPronouns(entry);

  // Create elements
  const name = createNameElement(fullName, profileUrl);
  const job = createJobElement(jobTitle);
  const associationElement = createAssociationElement(association);
  const image = createImageElement(imageData, profileUrl, `View profile for ${fullName}`);
  const contactElements = createContactElements(contactData);
  const pronounsElement = createPronounsElement(pronouns);

  return person.tabular({
    name,
    pronouns: pronounsElement,
    job,
    association: associationElement,
    image,
    ...contactElements,
    isThemeDark,
  });
};

/**
 * Create props for overlay card
 *
 * @param entry - Expert entry
 * @param options - Card mapping options
 * @returns Overlay card element
 */
const createOverlayCardProps = (
  entry: ExpertEntry,
  options: CardMappingOptions,
): ElementModel => {
  const { isThemeDark = false } = options;

  // Extract data
  const fullName = buildFullName(entry);
  const profileUrl = buildProfileUrl(entry);
  const jobTitle = extractPrimaryJobTitle(entry);
  const imageData = extractImageData(entry, fullName);

  // Create elements
  const headline = createNameElement(fullName, profileUrl);
  const text = createJobElement(jobTitle);
  const backgroundImage = createImageElement(
    imageData,
    profileUrl,
    `View profile for ${fullName}`,
  );

  return card.overlay.image({
    headline,
    text,
    backgroundImage,
    isThemeDark,
  });
};

/**
 * Map expert entry to PersonBio props
 *
 * Shared helper for creating PersonBio props from expert data.
 * Used by both the display strategy and bio feed for consistency.
 *
 * @param entry - Expert entry from API
 * @param displayType - 'small' for summary, 'full' for biography
 * @param isThemeDark - Dark theme flag
 * @returns Props for person.bio.full() or person.bio.small()
 *
 * @example
 * ```typescript
 * const bioProps = mapExpertToBioProps(expert, 'full', false);
 * const bioElement = person.bio.full(bioProps);
 * ```
 */
export const mapExpertToBioProps = (
  entry: ExpertEntry,
  displayType: 'small' | 'full',
  isThemeDark: boolean = false,
) => {
  // Extract data
  const fullName = buildFullName(entry);
  const profileUrl = buildProfileUrl(entry);
  const jobTitle = extractPrimaryJobTitle(entry);
  const association = extractPrimaryAssociation(entry);
  const imageData = extractImageData(entry, fullName);
  const contactData = extractContactData(entry);
  const description = extractDescription(entry, displayType);
  const pronouns = extractPronouns(entry);

  // Create elements
  const name = createNameElement(fullName, profileUrl, 'h1');
  const job = createJobElement(jobTitle);
  const associationElement = createAssociationElement(association);
  const image = createImageElement(imageData); // No link for bio display
  const descriptionElement = createDescriptionElement(description);
  const contactElements = createContactElements(contactData);
  const pronounsElement = createPronounsElement(pronouns);

  return {
    name,
    pronouns: pronounsElement,
    job,
    association: associationElement,
    email: contactElements.email || null,
    linkedin: contactElements.linkedin || null,
    phone: null,
    address: null,
    additionalContact: null,
    image,
    description: descriptionElement,
    isThemeDark,
  };
};

// ============================================================================
// DISPLAY STRATEGY
// ============================================================================

/**
 * Experts display strategy
 *
 * Maps expert entries to person elements for profile display.
 * Optimized for displaying faculty and expert profiles with contact
 * information and skills.
 *
 * @example
 * ```typescript
 * const feed = createBaseFeed({
 *   displayStrategy: expertsDisplayStrategy,
 *   // ...
 * });
 * ```
 */
export const expertsDisplayStrategy: DisplayStrategy<ExpertEntry> = {
  layoutType: 'list',

  mapEntryToCard: (
    entry: ExpertEntry,
    options: CardMappingOptions,
  ): ElementModel => {
    const { isOverlay = false, cardType = 'block' } = options;

    // Handle overlay card type (requires headshot)
    if (isOverlay && entry.headshot?.[0]?.url) {
      return createOverlayCardProps(entry, options);
    }

    // Route to appropriate card type
    switch (cardType) {
      case 'list':
        return createListCardProps(entry, options);
      case 'tabular':
        return createTabularCardProps(entry, options);
      default:
        return createBlockCardProps(entry, options);
    }
  },
};
