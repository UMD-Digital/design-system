import * as feedMacros from 'macros';
import { type AcademicSliderProps } from './_types';
import { type ElementModel } from '../../_types';

const QUERY_DATA = `
  title
  url
  startMonth: startDate @formatDateTime(format: "M")
  startDay: startDate @formatDateTime(format: "d")
  endMonth: endDate @formatDateTime(format: "M")
  endDay: endDate @formatDateTime(format: "d")
`;

const query = `
  query getEvents($startDate: String!, $related: [QueryArgument]) {
    entries: solspace_calendar {
      events(
        relatedTo: $related
        loadOccurrences: true
        startsAfterOrAt: $startDate
        limit: 12
        calendarId: 5
      ) {
        ${QUERY_DATA}
      }
    }
  }
`;

export default (props: AcademicSliderProps): ElementModel =>
  feedMacros.slider({
    ...props,
    query,
    url: 'https://provost.umd.edu/graphql',
  });
