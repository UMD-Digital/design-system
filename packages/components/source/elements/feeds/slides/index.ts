import { Network } from 'utilities';
import { EventLockupDate, EventElements } from 'elements';

type TypeSlideFeedResponse = {
  title: string;
  url: string;
  startMonth: string;
  startDay: string;
  endMonth?: string;
  endDay?: string;
};

const { FetchGraphQL } = Network;
const CALENDAR_PRODUCTION_URL = 'https://calendar.umd.edu/graphql';

const EVENTS_QUERY = `
  query getEvents($startDate: String!, $related: [QueryArgument]) {
    entries: solspace_calendar {
      events(
        relatedTo: $related
        loadOccurrences: true
        startsAfterOrAt: $startDate
        limit: 12
      ) {
        ... on submission_Event {
          title
          url
          startMonth: startDate @formatDateTime(format: "M")
          startDay: startDate @formatDateTime(format: "d")
          endMonth: endDate @formatDateTime(format: "M")
          endDay: endDate @formatDateTime(format: "d")
        }
      }
    }
  }
`;

// prettier-ignore
const STYLES_FEEDS_SLIDE_ELEMENT = `
  ${EventLockupDate.Styles}
  ${EventElements.Sign.Styles}
`;

const CreateFeedSlideEvent = async ({
  token,
  categories,
  theme,
}: {
  token: string;
  categories?: string | null;
  theme?: string | null;
}) => {
  let variables: any = { startDate: new Date().toDateString() };

  if (categories) {
    const related = categories.split(',');
    variables.related = related;
  }

  const graceFail = ({ message }: { message: string }) => {
    throw new Error(message);
  };

  const feedData = await FetchGraphQL({
    query: EVENTS_QUERY,
    url: CALENDAR_PRODUCTION_URL,
    token,
    variables,
  });

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
    const dateSign = EventElements.Sign.CreateElement({
      startMonth: data.startMonth,
      startDay: data.startDay,
      endDay: data.endDay,
      endMonth: data.endMonth,
      theme: theme,
    });

    headline.textContent = data.title;

    return EventLockupDate.CreateElement({
      headline,
      theme,
      dateSign,
    });
  });
};

export default {
  CreateElement: CreateFeedSlideEvent,
  Styles: STYLES_FEEDS_SLIDE_ELEMENT,
};
