import { JssEntry } from './transform';

export const jssObject = <T extends JssEntry>(style: T): T => style;
