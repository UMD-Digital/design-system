import { Load as FeedNewsGridLoader } from './news/grid';
import { Load as EventsNewsGridLoader } from './events/grid';
import { Load as EventsNewsListLoader } from './events/list';

export default () => {
  FeedNewsGridLoader();
  EventsNewsGridLoader();
  EventsNewsListLoader();
};
