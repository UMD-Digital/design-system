import { Loader } from './loader';
import { CaptionedMedia } from './media';
import Listing from './listing';
import PeopleListing from './people-listing';

export default {
  ...Loader,
  ...CaptionedMedia,
  ...Listing,
  ...PeopleListing,
};
