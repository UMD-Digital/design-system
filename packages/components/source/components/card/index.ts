import { MakeDefaultStyleTag } from 'helpers/ui';
import { Load } from './component';

const styleString = Load();
MakeDefaultStyleTag({ styleString });
