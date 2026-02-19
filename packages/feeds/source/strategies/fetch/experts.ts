/**
 * Experts Fetch Strategy
 *
 * Strategy for fetching expert profile data from the UMD Experts GraphQL API.
 *
 * @module strategies/fetch/experts
 */

import { createGraphQLFetchStrategy } from './graphql';
import { ExpertEntry } from 'types/data';

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
    collegeSchools: categoryCollegeSchools {
      title
      ... on collegeSchools_Category {
        link: externalLink {
          url
        }
      }
    }
    campusUnits: categoryCampusUnit {
      title
      ... on campusUnits_Category {
        link: externalLink {
          url
        }
      }
    }
  }
`;

const FRAGMENT_EXPERT_NAME = `
  fragment Name on expertsContent_Entry {
    prefix: expertsNamePrefix
    firstName: expertsNameFirst
    middleName: expertsNameMiddle
    lastName: expertsNameLast
    suffix: expertsNameSuffix
    pronouns: expertsNamePronouns
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
    summary: expertsSummary {
      html
    }
    bio: expertsBiography {
      html
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
    blueSky: expertsContactBluesky {
      id
      url
    }
    substack: expertsContactSubstack {
      id
      url
    }
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
    topics: expertsCategoryTopics {
      ...CategoryFields
    }
  }
`;

/**
 * GraphQL query for experts
 * Supports filtering by ID, relatedTo (categories), or fetching all experts
 *
 * @param ids - Specific entry IDs to fetch (use with fixedOrder for preserved order)
 * @param relatedTo - Category IDs to filter by (narrows results to related entries)
 * @param fixedOrder - When true, returns results in the order specified by ids argument
 * @param orderBy - Field to order results by (ignored when fixedOrder is true)
 */
export const EXPERTS_QUERY = `
  query getExpertsContent($limit: Int, $offset: Int, $ids: [QueryArgument], $relatedTo: [QueryArgument], $isMediaTrained: Boolean, $orderBy: String, $fixedOrder: Boolean) {
    entryCount(
      section: "experts"
      limit: $limit
      offset: $offset
      type: "expertsContent"
      id: $ids
      relatedTo: $relatedTo
      expertsMediaTrained: $isMediaTrained
    )
    entries(
      section: "experts"
      limit: $limit
      offset: $offset
      type: "expertsContent"
      id: $ids
      relatedTo: $relatedTo
      expertsMediaTrained: $isMediaTrained
      orderBy: $orderBy
      fixedOrder: $fixedOrder
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
 *
 * Parameter handling:
 * - `ids` - Specific entry IDs to fetch. When provided, uses `fixedOrder: true`
 *   to return results in the exact order specified by the IDs array.
 * - `categories` - Category IDs passed to `relatedTo` to narrow results to
 *   entries related to those categories.
 * - `isMediaTrained` - Filter for media-trained experts only.
 *
 * @example
 * ```typescript
 * // Fetch by categories (uses relatedTo)
 * const feed = createBaseFeed({
 *   token: 'my-token',
 *   fetchStrategy: expertsFetchStrategy,
 *   categories: ['computer-science', 'engineering'],
 * });
 *
 * // Fetch specific IDs in order (uses fixedOrder)
 * const feed = createBaseFeed({
 *   token: 'my-token',
 *   fetchStrategy: expertsFetchStrategy,
 *   ids: ['123', '456', '789'], // Results returned in this order
 * });
 * ```
 */
export const expertsFetchStrategy = createGraphQLFetchStrategy<ExpertEntry>({
  endpoint: 'https://content-api.umd.edu/graphql',

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
    const { categories, entriesToRemove, ids, isMediaTrained, ...rest } =
      baseVariables;

    const variables: any = { ...rest };

    if (ids) {
      variables.ids = Array.isArray(ids) ? ids : [ids];
      variables.fixedOrder = true;
    } else {
      variables.orderBy = 'expertsNameLast';
    }

    if (categories) {
      variables.relatedTo = categories;
    }

    if (isMediaTrained) {
      variables.isMediaTrained = isMediaTrained;
    }

    return variables;
  },
});
