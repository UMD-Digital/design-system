import { MakeDefaultStyleTag } from 'helpers/styles';
import { Load } from './component';

const styleString = Load();
MakeDefaultStyleTag({ styleString });
