import { AlignedContent } from './alignment';
import { FlexSpecial, FlexGridContent, FlexGridCore, FlexRows } from './flex';
import { GridSpecial, GridGutterless, GridStandard } from './grid';
import { LockSizes } from './lock';

export default {
  ...AlignedContent,
  ...FlexSpecial,
  ...FlexGridContent,
  ...FlexGridCore,
  ...FlexRows,
  ...GridSpecial,
  ...GridGutterless,
  ...GridStandard,
  ...LockSizes,
};
