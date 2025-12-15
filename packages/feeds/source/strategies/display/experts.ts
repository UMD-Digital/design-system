/**
 * Experts Display Strategy
 *
 * Strategy for displaying expert entries using person or card elements.
 * Maps expert data to profile cards with biographical information,
 * including contact information and skills.
 * Supports overlay cards when headshot images are available.
 *
 * @module strategies/display/experts
 */

import { person, card } from '@universityofmaryland/web-elements-library/composite';
import {
  createTextWithLink,
  createTextContainer,
  createImageOrLinkedImage,
} from '@universityofmaryland/web-utilities-library/elements';
import { DisplayStrategy, CardMappingOptions } from '../../factory/core/types';
import { ElementModel } from '../../_types';
import { ExpertEntry } from 'types/data';

/**
 * Contact configuration for rendering contact links
 */
interface ContactConfig {
  key: keyof Pick<ExpertEntry, 'email' | 'website' | 'linkedin' | 'twitter'>;
  label: (value: string) => string;
  url: (value: string) => string;
}

/**
 * Contact information configuration
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

/**
 * Create contact information elements
 *
 * Renders contact links (email, website, LinkedIn, Twitter) when available.
 * Uses a data-driven approach to reduce repetition and improve maintainability.
 *
 * @param entry - Expert entry with contact information
 * @returns Object with contact link elements keyed by contact type
 */
const createContactInfo = (
  entry: ExpertEntry,
): { [key: string]: HTMLElement } => {
  return CONTACT_CONFIGS.reduce<{ [key: string]: HTMLElement }>(
    (contacts, config) => {
      const value = entry[config.key];

      if (!value) return contacts;

      const element = createTextWithLink({
        text: config.label(value),
        url: config.url(value),
      });

      if (element) contacts[config.key] = element;

      return contacts;
    },
    {},
  );
};

/**
 * Create skills information element
 *
 * Renders languages and media training status when available.
 */
const createSkillsInfo = (entry: ExpertEntry): ElementModel | undefined => {
  const skills: string[] = [];

  if (entry.languages && entry.languages.length > 0) {
    skills.push(`Languages: ${entry.languages.join(', ')}`);
  }
  if (entry.mediaTrained) {
    skills.push('Media Trained');
  }

  if (skills.length === 0) return undefined;

  const textElement = createTextContainer({
    text: skills.join(' • '),
  });

  // Return null if element wasn't created
  if (!textElement) return undefined;

  return {
    element: textElement,
    styles: '',
  };
};

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
    const {
      isThemeDark = false,
      isTransparent = false,
      isOverlay = false,
      cardType = 'block',
    } = options;
    const url = `https://umdrightnow.umd.edu/expert/${entry.slug}`;

    // Build full name
    const fullName = entry.middleName
      ? `${entry.firstName} ${entry.middleName} ${entry.lastName}`
      : `${entry.firstName} ${entry.lastName}`;

    // Handle overlay card type (requires headshot)
    if (isOverlay && entry.headshot?.[0]?.url) {
      const headline = createTextWithLink({
        text: fullName,
        url: url,
      });

      const backgroundImage = createImageOrLinkedImage({
        imageUrl: entry.headshot[0].url,
        altText: fullName,
        linkUrl: url,
        linkLabel: `View profile for ${fullName}`,
      });

      // Get primary job title for subtext
      const primaryJob = entry.organizations?.[0]?.jobs?.[0];
      const text = primaryJob
        ? createTextContainer({
            text: primaryJob.title,
          })
        : undefined;

      return card.overlay.image({
        headline,
        text,
        backgroundImage,
        isThemeDark,
      });
    }

    // Create name (expert name with link)
    const name = createTextWithLink({
      text: fullName,
      url: url,
    });

    // Get primary job title and organization
    const primaryOrg = entry.organizations?.[0];
    const primaryJob = primaryOrg?.jobs?.[0];
    const primaryJobCampusUnit = primaryJob?.campusUnits?.[0];
    const primaryJobCampusUnitUrl = primaryJobCampusUnit?.link?.url;

    // Create job title element
    const job = primaryJob
      ? createTextContainer({
          text: primaryJob.title,
        })
      : undefined;

    // Create association (campus unit with optional link)
    let association: HTMLElement | null | undefined = undefined;
    if (primaryJobCampusUnit) {
      association = primaryJobCampusUnitUrl
        ? createTextWithLink({
            text: primaryJobCampusUnit.title,
            url: primaryJobCampusUnitUrl,
          })
        : createTextContainer({
            text: primaryJobCampusUnit.title,
          });
    }

    // Create summary text
    const summary = entry.summary?.html
      ? createTextContainer({
          text: entry.summary.html,
          allowHTML: true,
        })
      : undefined;

    // Create image from headshot
    const image = entry.headshot?.[0]?.url
      ? createImageOrLinkedImage({
          imageUrl: entry.headshot[0].url,
          altText: fullName,
          linkUrl: url,
          linkLabel: `View profile for ${fullName}`,
        })
      : undefined;

    // Create contact information
    const contactInfo = createContactInfo(entry);

    // Create skills information
    const skillsInfo = createSkillsInfo(entry);

    // Common card properties
    const commonProps = {
      name,
      job,
      association,
      image,
      isThemeDark,
    };

    if (cardType === 'list') {
      return person.list({
        ...commonProps,
      });
    }

    if (cardType === 'tabular') {
      return person.tabular({
        ...commonProps,
        ...contactInfo,
      });
    }

    return person.block({
      ...commonProps,
    });
  },
};
