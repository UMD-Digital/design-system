import { slider } from 'widgets';
import { type SliderProps } from './_types';
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
      ) {
        ... on submission_Event {
          ${QUERY_DATA}
        }
      }
    }
  }
`;

export default (props: SliderProps): ElementModel =>
  slider({
    ...props,
    query,
    url: 'https://calendar.umd.edu/graphql',
  });
