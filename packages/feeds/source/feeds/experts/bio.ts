/**
 * Expert Bio Feed (Specialized Implementation)
 *
 * Single expert bio display using person bio elements.
 * Fetches a single expert by ID and displays their full profile.
 *
 * @module feeds/experts/bio
 */

import { person } from '@universityofmaryland/web-elements-library/composite';
import {
  createTextWithLink,
  createTextContainer,
  createImageOrLinkedImage,
} from '@universityofmaryland/web-utilities-library/elements';
import { expertsFetchStrategy } from 'strategies';
import { type BioProps } from './_types';
import { type ExpertEntry } from 'types/data';
import { type ElementModel } from '../../_types';

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
 * Map expert entry to PersonBio props
 */
const mapExpertToBioProps = (
  entry: ExpertEntry,
  displayType: 'small' | 'full',
  isThemeDark: boolean = false,
) => {
  const url = `https://umdrightnow.umd.edu/expert/${entry.slug}`;

  // Build full name
  const fullName = entry.middleName
    ? `${entry.firstName} ${entry.middleName} ${entry.lastName}`
    : `${entry.firstName} ${entry.lastName}`;

  // Create name element
  const name = createTextWithLink({
    text: fullName,
    url: url,
    containerTag: 'h1',
  });

  // Get primary job and organization
  const primaryOrg = entry.organizations?.[0];
  const primaryJob = primaryOrg?.jobs?.[0];
  const primaryJobCampusUnit = primaryJob?.campusUnits?.[0];
  const primaryJobCampusUnitUrl = primaryJobCampusUnit?.link?.url;

  // Create job title
  const job = primaryJob
    ? createTextContainer({
        text: primaryJob.title,
      })
    : null;

  // Create association (campus unit with optional link)
  let association: HTMLElement | null = null;
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

  // Create contact elements
  const contactElements = CONTACT_CONFIGS.reduce<{
    [key: string]: HTMLElement | null;
  }>((contacts, config) => {
    const value = entry[config.key];
    if (!value) return contacts;

    const element = createTextWithLink({
      text: config.label(value),
      url: config.url(value),
    });

    if (element) contacts[config.key] = element;
    return contacts;
  }, {});

  // Create image from headshot
  const image = entry.headshot?.[0]?.url
    ? createImageOrLinkedImage({
        imageUrl: entry.headshot[0].url,
        altText: fullName,
        linkUrl: url,
        linkLabel: `View profile for ${fullName}`,
      })
    : null;

  // Create description based on display type
  const description =
    displayType === 'full' && entry.bio?.html
      ? createTextContainer({
          text: entry.bio.html,
          allowHTML: true,
        })
      : displayType === 'small' && entry.summary?.html
        ? createTextContainer({
            text: entry.summary.html,
            allowHTML: true,
          })
        : null;

  return {
    name,
    job,
    association,
    email: contactElements.email || null,
    linkedin: contactElements.linkedin || null,
    phone: null,
    address: null,
    additionalContact: null,
    image,
    description,
    isThemeDark,
  };
};

/**
 * Create an expert bio feed
 *
 * Fetches and displays a single expert's bio.
 * Default display uses 'small' layout with summary.
 * Set data-display="full" to use 'full' layout with bio.
 *
 * @param props - Feed configuration
 * @returns ElementModel with bio element and styles
 *
 * @example
 * ```typescript
 * // Small bio with summary
 * const bio = expertBio({
 *   token: 'my-token',
 *   expertId: 'john-doe',
 * });
 *
 * // Full bio with biography
 * const fullBio = expertBio({
 *   token: 'my-token',
 *   expertId: 'john-doe',
 * });
 * fullBio.element.setAttribute('data-display', 'full');
 * ```
 */
export default (props: BioProps): ElementModel => {
  const { token, expertId, isThemeDark = false } = props;
  const container = document.createElement('div');
  container.className = 'expert-bio-feed';
  let styles = '';

  // Determine display type from data-display attribute
  const getDisplayType = (): 'small' | 'full' => {
    const displayAttr = container.getAttribute('data-display');
    return displayAttr === 'full' ? 'full' : 'small';
  };

  // Fetch and render expert bio
  const initialize = async () => {
    try {
      // Fetch single expert by ID using relatedTo
      const variables = expertsFetchStrategy.composeApiVariables({
        token,
        limit: 1,
        offset: 0,
        relatedTo: [expertId],
      });

      const entries = await expertsFetchStrategy.fetchEntries(variables);

      if (!entries || entries.length === 0) {
        // Show error state
        const error = document.createElement('p');
        error.textContent = 'Expert not found';
        container.appendChild(error);
        return;
      }

      const expert = entries[0];
      const displayType = getDisplayType();

      // Map expert to bio props
      const bioProps = mapExpertToBioProps(expert, displayType, isThemeDark);

      // Create bio element
      const bioElement =
        displayType === 'full'
          ? person.bio.full(bioProps)
          : person.bio.small(bioProps);

      container.appendChild(bioElement.element);
      styles += bioElement.styles;
    } catch (error) {
      console.error('Error fetching expert bio:', error);
      const errorEl = document.createElement('p');
      errorEl.textContent = 'Failed to load expert bio';
      container.appendChild(errorEl);
    }
  };

  // Initialize on creation
  initialize();

  return {
    element: container,
    get styles() {
      return styles;
    },
  };
};
