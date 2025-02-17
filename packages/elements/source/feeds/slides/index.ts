import * as Utility from 'utilities';
import * as Composite from 'composite';

type TypeSlideFeedResponse = {
  title: string;
  startMonth: string;
  startDay: string;
  endMonth?: string;
  endDay?: string;
};

const { FetchGraphQL } = Utility.network;
const CALENDAR_PRODUCTION_URL = 'https://calendar.umd.edu/graphql';
const ACADEMICS_PRODUCTION_URL = 'https://provost.umd.edu/graphql';

const QUERY_DATA = `
  title
  url
  startMonth: startDate @formatDateTime(format: "M")
  startDay: startDate @formatDateTime(format: "d")
  endMonth: endDate @formatDateTime(format: "M")
  endDay: endDate @formatDateTime(format: "d")
`;

const CALENDAR_QUERY = `
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

const ACADEMICS_QUERY = `
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

// prettier-ignore
const STYLES_FEEDS_SLIDE_ELEMENT = `
  ${Composite.event.lockup.date.Styles}
  ${Composite.event.elements.sign.Styles}
`;

const CreateFeedSlideEvent = async ({
  token,
  type = 'academic',
  categories,
  isThemeDark,
}: {
  token: string;
  type?: string | null;
  categories?: string | null;
  isThemeDark?: boolean;
}) => {
  const isCalendar = type === 'calendar';
  let variables: any = { startDate: new Date().toDateString() };

  if (categories) {
    const related = categories.split(',');
    variables.related = related;
  }

  const graceFail = ({ message }: { message: string }) => {
    throw new Error(message);
  };

  const fetchVariables = {
    query: ACADEMICS_QUERY,
    url: ACADEMICS_PRODUCTION_URL,
    token,
    variables,
  };

  if (isCalendar) {
    fetchVariables.query = CALENDAR_QUERY;
    fetchVariables.url = CALENDAR_PRODUCTION_URL;
  }

  const feedData = await FetchGraphQL(fetchVariables);

  if (
    !feedData ||
    !feedData.data ||
    !feedData.data.entries ||
    feedData.message
  ) {
    if (!feedData) graceFail({ message: 'Feed not found' });
    if (!feedData.data) graceFail({ message: 'Feed data not found' });
    if (!feedData.data.entries)
      graceFail({ message: 'Feed entries not found' });
    if (!feedData.data.entries.events)
      graceFail({ message: 'Feed events not found' });
    if (!feedData.message)
      graceFail({ message: `Feed data errors: ${feedData.message}` });

    return null;
  }

  return feedData.data.entries.events.map((data: TypeSlideFeedResponse) => {
    const headline = document.createElement('p');
    const dateSign = Composite.event.elements.sign.CreateElement({
      startMonth: data.startMonth,
      startDay: data.startDay,
      endDay: data.endDay,
      endMonth: data.endMonth,
      isThemeDark,
    });

    headline.textContent = data.title;

    return Composite.event.lockup.date.CreateElement({
      headline,
      isThemeDark,
      dateSign,
    });
  });
};

export default {
  CreateElement: CreateFeedSlideEvent,
  Styles: STYLES_FEEDS_SLIDE_ELEMENT,
};
