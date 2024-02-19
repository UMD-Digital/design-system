import { AlignedContent } from './alignment';
import { FlexColumnsContent, FlexColumnsCore, FlexColumnsRows } from './flex';
import {
  GridColumnsGutterless,
  GridColumnsStandard,
  GridColumnsFeatured,
} from './grid';
import { LockSizes } from './lock';

export default {
  ...AlignedContent,
  ...FlexColumnsContent,
  ...FlexColumnsCore,
  ...FlexColumnsRows,
  ...GridColumnsGutterless,
  ...GridColumnsStandard,
  ...GridColumnsFeatured,
  ...LockSizes,
};
