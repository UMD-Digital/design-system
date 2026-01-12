import { createGraphQLFetchStrategy } from './graphql';
import { InTheNewsEntry } from 'types/data';

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

export const IN_THE_NEWS_QUERY = `
  query getInTheNewsContent($limit: Int, $offset: Int, $expertId: [QueryArgument]) {
    inTheNewsCount: entryCount(
      section: "inTheNews"
      relatedTo: $expertId
      limit: $limit
      offset: $offset
      orderBy: "postDate DESC"
    )
    inTheNews: entries(
      section: "inTheNews"
      relatedTo: $expertId
      limit: $limit
      offset: $offset
      orderBy: "postDate DESC"
    ) {
      ... on inTheNews_Entry {
        ...EntriesNativeFields
        summary: inTheNewsSummary {
          html
          rawHtml
          markdown
          plainText
        }
        externalLink: inTheNewsLink {
          link
        }
        attribution: inTheNewsAttribution
        author: inTheNewsAuthor
        expert: inTheNewsLinkExpert {
          title
          ... on expertsContent_Entry {
            firstName: expertsNameFirst
            middleName: expertsNameMiddle
            lastName: expertsNameLast
          }
        }
      }
    }
  }
  ${FRAGMENT_ENTRIES_NATIVE_FIELDS}
`;

export const inTheNewsFetchStrategy =
  createGraphQLFetchStrategy<InTheNewsEntry>({
    endpoint: 'https://content-api.umd.edu/graphql',

    queries: {
      entries: IN_THE_NEWS_QUERY,
    },

    transformResponse: (data) => {
      if (!data?.data?.inTheNews) return null;
      return data.data.inTheNews;
    },

    transformCount: (data) => {
      if (!data?.data) return 0;
      return data.data.inTheNewsCount || 0;
    },

    composeVariables: (baseVariables) => {
      const { expertId, ...rest } = baseVariables;
      const variables: any = { ...rest };

      if (expertId) {
        variables.expertId = Array.isArray(expertId) ? expertId : [expertId];
      }

      return variables;
    },
  });
