type DateFilterType = 'startsAfterOrAt' | 'rangeStart';

const buildEventsCountQuery = (
  dateFilter: DateFilterType = 'startsAfterOrAt',
) => `
query getEventsCount($startDate: String!, $related: [QueryArgument]) {
  count: solspace_calendar {
    events(relatedTo: $related, loadOccurrences: true, ${dateFilter}: $startDate) {
      ... on communications_Event {
        id
      }
      ... on submission_Event {
        id
      }
    }
  }
}
`;

const buildEventsQuery = (dateFilter: DateFilterType = 'startsAfterOrAt') => `
query getEvents($startDate: String!, $related: [QueryArgument], $limit: Int, $offset: Int) {
  entries: solspace_calendar {
    events(
      relatedTo: $related
      loadOccurrences: true
      ${dateFilter}: $startDate
      limit: $limit
      offset: $offset
    ) {
      ... on communications_Event {
        id
        title
        url
        startDayOfWeek: startDate @formatDateTime(format: "D")
        startMonth: startDate @formatDateTime(format: "M")
        startDay: startDate @formatDateTime(format: "d")
        startStamp: startDate @formatDateTime(format: "Y-m-d")
        startTime: startDate @formatDateTime(format: "g:ia")
        endDayOfWeek: endDate @formatDateTime(format: "D")
        endMonth: endDate @formatDateTime(format: "M")
        endDay: endDate @formatDateTime(format: "d")
        endTime: endDate @formatDateTime(format: "g:ia")
        allDay
        desciption: commonRichText
        summary: commonRichTextTwo
        image: commonAssetHeroImageSingle {
          title
          commonPlainTextTwo: alt
          url
        }
        location: categoriesCampusBuildingSingle {
          title
        }
        link: commonEntriesLinkSingle {
          ... on links_links_Entry {
            type: linksDropdownSelector
            externalUrl: commonPlainTextThree
            altTitle: commonPlainTextTwo
            title
            internalLinks: calendarEntriesEvent {
              id
              url
            }
          }
        }
      }
      ... on submission_Event {
        id
        title
        url
        startDayOfWeek: startDate @formatDateTime(format: "D")
        startMonth: startDate @formatDateTime(format: "M")
        startDay: startDate @formatDateTime(format: "d")
        startStamp: startDate @formatDateTime(format: "Y-m-d")
        startTime: startDate @formatDateTime(format: "g:ia")
        endDayOfWeek: endDate @formatDateTime(format: "D")
        endMonth: endDate @formatDateTime(format: "M")
        endDay: endDate @formatDateTime(format: "d")
        endTime: endDate @formatDateTime(format: "g:ia")
        allDay
        desciption: commonRichText
        summary: commonRichTextTwo
        image: commonAssetHeroImageSingle {
          title
          commonPlainTextTwo: alt
          url
        }
        location: categoriesCampusBuildingSingle {
          title
        }
        link: commonEntriesLinkSingle {
          ... on links_links_Entry {
            type: linksDropdownSelector
            externalUrl: commonPlainTextThree
            altTitle: commonPlainTextTwo
            title
            internalLinks: calendarEntriesEvent {
              id
              url
            }
          }
        }
      }
    }
  }
}
`;

export const EVENTS_COUNT_QUERY = buildEventsCountQuery();
export const EVENTS_COUNT_RANGE_QUERY = buildEventsCountQuery('rangeStart');

export const EVENTS_QUERY = buildEventsQuery();
export const EVENTS_RANGE_QUERY = buildEventsQuery('rangeStart');
