import { create } from '../utilities';

// sr-only
export const only = create.jssObject({
  className: 'sr-only',
  clip: 'rect(0,0,0,0)',
  borderWidth: '0px',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: '0',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
});
