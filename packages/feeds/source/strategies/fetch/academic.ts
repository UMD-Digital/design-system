/**
 * Academic Fetch Strategy
 *
 * Strategy for fetching academic event data from the UMD Provost GraphQL API.
 *
 * @module strategies/fetch/academic
 */

/**
 * Slider-specific query for academic events
 * Used by academic slider for carousel displays
 */
export const ACADEMIC_SLIDER_QUERY = `
  query getEvents($startDate: String!, $related: [QueryArgument]) {
    entries: solspace_calendar {
      events(
        relatedTo: $related
        loadOccurrences: true
        startsAfterOrAt: $startDate
        limit: 12
        calendarId: [4, 2]
      ) {
        title
        url
        startMonth: startDate @formatDateTime(format: "M")
        startDay: startDate @formatDateTime(format: "d")
        endMonth: endDate @formatDateTime(format: "M")
        endDay: endDate @formatDateTime(format: "d")
      }
    }
  }
`;
