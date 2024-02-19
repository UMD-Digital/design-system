import * as FontFaces from './font-face';
import * as SansFonts from './sans';
import * as SerifFonts from './serif';
import * as CampaignFonts from './campaign';
import * as ElementFonts from './elements';

export default {
  ...FontFaces,
  ...CampaignFonts,
  ...ElementFonts,
  ...SansFonts,
  ...SerifFonts,
};
