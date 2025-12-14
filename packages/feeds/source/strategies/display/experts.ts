/**
 * Experts Display Strategy
 *
 * Strategy for displaying expert entries using person elements.
 * Maps expert data to person profile cards with biographical information.
 *
 * @module strategies/display/experts
 */

import { person } from '@universityofmaryland/web-elements-library/composite';
import {
  createTextWithLink,
  createTextContainer,
  createImageOrLinkedImage,
} from '@universityofmaryland/web-utilities-library/elements';
import { DisplayStrategy, CardMappingOptions } from '../../factory/core/types';
import { ElementModel } from '../../_types';

/**
 * Expert entry type
 */
export interface ExpertType {
  id: number | string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  url: string;
  title?: string;
  headshot?: Array<{ url: string }> | null;
  summary?: {
    plainText: string;
  } | null;
  organizations?: Array<{
    id: string;
    title: string;
    url: string;
    jobs: Array<{
      id: string;
      title: string;
      url: string;
    }>;
  }>;
}

/**
 * Experts display strategy
 *
 * Maps expert entries to person elements for profile display.
 * Optimized for displaying faculty and expert profiles.
 *
 * @example
 * ```typescript
 * const feed = createBaseFeed({
 *   displayStrategy: expertsDisplayStrategy,
 *   // ...
 * });
 * ```
 */
export const expertsDisplayStrategy: DisplayStrategy<ExpertType> = {
  layoutType: 'list',

  mapEntryToCard: (
    entry: ExpertType,
    options: CardMappingOptions
  ): ElementModel => {
    const {
      isThemeDark = false,
    } = options;

    // Build full name
    const fullName = entry.middleName
      ? `${entry.firstName} ${entry.middleName} ${entry.lastName}`
      : `${entry.firstName} ${entry.lastName}`;

    // Create name (expert name with link)
    const name = createTextWithLink({
      text: fullName,
      url: entry.url,
    });

    // Get primary job title and organization
    const primaryOrg = entry.organizations?.[0];
    const primaryJob = primaryOrg?.jobs?.[0];

    // Create job title element
    const job = primaryJob
      ? createTextContainer({
          text: primaryJob.title,
        })
      : undefined;

    // Create association (organization)
    const association = primaryOrg
      ? createTextContainer({
          text: primaryOrg.title,
        })
      : undefined;

    // Create summary text
    const subText = entry.summary?.plainText
      ? createTextContainer({
          text: entry.summary.plainText,
        })
      : undefined;

    // Create image from headshot
    const image = entry.headshot?.[0]?.url
      ? createImageOrLinkedImage({
          imageUrl: entry.headshot[0].url,
          altText: fullName,
          linkUrl: entry.url,
          linkLabel: `View profile for ${fullName}`,
        })
      : undefined;

    // Create person element
    return person.block({
      name,
      job,
      association,
      subText,
      image,
      isThemeDark,
    });
  },
};
