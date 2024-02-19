import { AlignedContent } from './alignment';
import { FlexGridContent, FlexGridCore, FlexRows } from './flex';
import { GridGutterless, GridStandard } from './grid';
import { LockSizes } from './lock';

export default {
  ...AlignedContent,
  ...FlexGridContent,
  ...FlexGridCore,
  ...FlexRows,
  ...GridGutterless,
  ...GridStandard,
  ...LockSizes,
};
