export const EVENTS_COUNT_QUERY = `
query getEventsCount($startDate: String!, $related: [QueryArgument]) {
  count: solspace_calendar {
    events(relatedTo: $related, loadOccurrences: true, startsAfterOrAt: $startDate) {
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

export const EVENTS_QUERY = `
query getEvents($startDate: String!, $related: [QueryArgument], $limit: Int, $offset: Int) {
  entries: solspace_calendar {
    events(
      relatedTo: $related
      loadOccurrences: true
      startsAfterOrAt: $startDate
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
          alt
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
          alt
          title
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
