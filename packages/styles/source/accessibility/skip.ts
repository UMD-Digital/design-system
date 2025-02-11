import { create } from '../utilities';

// umd-skip-content
export const content = create.jssObject({
  className: 'umd-skip-content',
  backgroundColor: `#fff`,
  color: `#e21833`,
  display: `block`,
  height: `0`,
  width: '0',
  opacity: `0`,
  padding: `8px`,
  position: `absolute`,
  textDecoration: `underline`,
  transition: `none`,
  overflow: 'hidden',
  whiteSpace: 'nowrap',

  '&:focus': {
    display: 'block',
    height: 'inherit',
    width: 'auto',
    zIndex: '9999',
    opacity: '1',
    transition: 'opacity 0.5s',
  },
});
