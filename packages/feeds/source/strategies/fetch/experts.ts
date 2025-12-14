/**
 * Experts Fetch Strategy
 *
 * Strategy for fetching expert profile data from the UMD Experts GraphQL API.
 *
 * @module strategies/fetch/experts
 */

import { createGraphQLFetchStrategy } from './graphql';
import { ExpertType } from '../display/experts';

/**
 * GraphQL fragments for expert data
 */
const FRAGMENT_CATEGORIES_NATIVE_FIELDS = `
  fragment CategoryFields on CategoryInterface {
    title
    url
    id
  }
`;

const FRAGMENT_ENTRIES_NATIVE_FIELDS = `
  fragment EntriesNativeFields on EntryInterface {
    id
    uid
    status
    enabled
    slug
    title
    type: typeHandle
    postDate
    expiryDate
    dateUpdated
    dateCreated
  }
`;

const FRAGMENT_EXPERT_JOBS = `
  fragment Jobs on expertsOrganizationJob_Entry {
    id
    url
    title: expertsOrganizationJobTitle
    roomNumber: expertsOrganizationJobRoomNumber
  }
`;

const FRAGMENT_EXPERT_NAME = `
  fragment Name on expertsContent_Entry {
    firstName: expertsFirstName
    middleName: expertsMiddleName
    lastName: expertsLastName
  }
`;

const FRAGMENT_EXPERT_IMAGERY = `
  fragment Imagery on expertsContent_Entry {
    headshot: expertsImageHeadShot {
      ... on experts_Asset {
        url
      }
    }
  }
`;

const FRAGMENT_EXPERT_BIOGRAPHY = `
  fragment Biography on expertsContent_Entry {
    summary: expertSummary {
      html
      rawHtml
      markdown
      plainText
    }
    bio: expertBiography {
      html
      rawHtml
      markdown
      plainText
    }
  }
`;

const FRAGMENT_ENTRIES_ORGANIZATIONS = `
  fragment Organizations on expertsOrganization_Entry {
    id
    title
    url
    jobs: expertsOrganizationJob {
      ...Jobs
    }
  }
`;

const FRAGMENT_EXPERT_CONTACT = `
  fragment Contact on expertsContent_Entry {
    email: expertsContactEmail
    linkedin: expertsContactLinkedin
    website: expertsContactWebsite
    twitter: expertsContactTwitter
  }
`;

const FRAGMENT_EXPERT_SKILLS = `
  fragment Skills on expertsContent_Entry {
    languages: expertsLanguages
    mediaTrained: expertsMediaTrained
  }
`;

const FRAGMENT_EXPERT_CONTENT = `
  fragment Content on expertsContent_Entry {
    ...Name
    ...Imagery
    ...Biography
    organizations: expertsOrganization {
      ...Organizations
    }
    ...Contact
    ...Skills
  }
`;

const FRAGMENT_EXPERT_CATEGORIES = `
  fragment Categories on expertsContent_Entry {
    areasOfExpertise: expertsCategoryAreaOfExpertise {
      ...CategoryFields
    }
    campusUnits: expertsCategoryCampusUnit {
      ...CategoryFields
    }
    tags: expertsCategoryTags {
      ...CategoryFields
    }
  }
`;

/**
 * GraphQL query for experts
 */
export const EXPERTS_QUERY = `
  query getExpertsContent($limit: Int, $offset: Int, $relatedTo: [QueryArgument]) {
    entryCount(
      section: "experts"
      limit: $limit
      offset: $offset
      type: "expertsContent"
      relatedTo: $relatedTo
    )
    entries(
      section: "experts"
      limit: $limit
      offset: $offset
      type: "expertsContent"
      relatedTo: $relatedTo
    ) {
      ...EntriesNativeFields
      ... on expertsContent_Entry {
        ...Content
        ...Categories
      }
    }
  }
  ${FRAGMENT_ENTRIES_NATIVE_FIELDS}
  ${FRAGMENT_CATEGORIES_NATIVE_FIELDS}
  ${FRAGMENT_EXPERT_CONTENT}
  ${FRAGMENT_EXPERT_CATEGORIES}
  ${FRAGMENT_EXPERT_NAME}
  ${FRAGMENT_EXPERT_IMAGERY}
  ${FRAGMENT_EXPERT_BIOGRAPHY}
  ${FRAGMENT_ENTRIES_ORGANIZATIONS}
  ${FRAGMENT_EXPERT_JOBS}
  ${FRAGMENT_EXPERT_CONTACT}
  ${FRAGMENT_EXPERT_SKILLS}
`;

/**
 * Experts fetch strategy
 *
 * Fetches expert profile data from the UMD Experts GraphQL API.
 * Handles category filtering via relatedTo parameter, pagination,
 * and entry exclusion.
 *
 * @example
 * ```typescript
 * const feed = createBaseFeed({
 *   token: 'my-token',
 *   fetchStrategy: expertsFetchStrategy,
 *   categories: ['computer-science', 'engineering'],
 *   // ...
 * });
 * ```
 */
export const expertsFetchStrategy = createGraphQLFetchStrategy<ExpertType>({
  endpoint: 'https://umd-api.production.servd.dev/graphql',

  queries: {
    entries: EXPERTS_QUERY,
  },

  transformResponse: (data) => {
    if (!data || !data.data || !data.data.entries) {
      return null;
    }
    return data.data.entries || null;
  },

  transformCount: (data) => {
    if (!data || !data.data) {
      return 0;
    }
    return data.data.entryCount || 0;
  },

  composeVariables: (baseVariables) => {
    const { categories, entriesToRemove, ...rest } = baseVariables;

    const variables: any = { ...rest };

    // Handle categories via relatedTo
    if (categories) {
      variables.relatedTo = categories;
    }

    // Note: Entry exclusion not supported in experts API
    // If needed in the future, would need backend API changes

    return variables;
  },
});
