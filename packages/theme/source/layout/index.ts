import { SpacingContent } from './spacing';
import { FlexColumnsContent, FlexColumnsCore, FlexColumnsRows } from './flex';
import {
  GridColumnsGutterless,
  GridColumnsStandard,
  GridColumnsFeatured,
} from './grid';
import { LockSizes } from './lock';

export default {
  ...SpacingContent,
  ...FlexColumnsContent,
  ...FlexColumnsCore,
  ...FlexColumnsRows,
  ...GridColumnsGutterless,
  ...GridColumnsStandard,
  ...GridColumnsFeatured,
  ...LockSizes,
};
