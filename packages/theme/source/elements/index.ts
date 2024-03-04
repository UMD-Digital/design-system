import { Loader } from './loader';
import { CaptionedMedia } from './media';
import Listing from './listing';
import PeopleListing from './people-listing';
import EventListing from './event-listing';
import EventFlags from './event-flags';
import FeaturedEvent from './featured-event';

export default {
  ...Loader,
  ...CaptionedMedia,
  ...Listing,
  ...PeopleListing,
  ...EventListing,
  ...EventFlags,
  ...FeaturedEvent,
};
