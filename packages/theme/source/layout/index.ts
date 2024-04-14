import Alignment from './alignment';
import Grid from './grid-gap';
import GridGutterless from './grid-gutterless';
import GridColumn from './grid-column';
import Lock from './lock';
import SpacingVertical from './spacing-vertical';

export default {
  ...Alignment,
  ...Grid,
  ...GridGutterless,
  ...GridColumn,
  ...Lock,
  ...SpacingVertical,
};
