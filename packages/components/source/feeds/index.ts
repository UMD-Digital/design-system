import { Load as FeedNewsGridLoader } from './news/grid';
import { Load as FeedNewsListLoader } from './news/list';
import { Load as EventsNewsGridLoader } from './events/grid';
import { Load as EventsNewsListLoader } from './events/list';

export default () => {
  FeedNewsGridLoader();
  FeedNewsListLoader();
  EventsNewsGridLoader();
  EventsNewsListLoader();
};
