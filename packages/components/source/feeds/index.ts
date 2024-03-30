import { Load as FeedNewsGridLoader } from './news/grid';
import { Load as FeedNewsListLoader } from './news/list';
import { Load as EventsNewsGridLoader } from './events/grid';
import { Load as EventsNewsListLoader } from './events/list';

export const Components = {
  FeedNewsGridLoader,
  FeedNewsListLoader,
  EventsNewsGridLoader,
  EventsNewsListLoader,
};

export default () => {
  for (const key in Components) {
    // @ts-ignore
    Components[key]();
  }
};
