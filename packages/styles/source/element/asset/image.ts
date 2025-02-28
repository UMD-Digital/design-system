import { color, spacing } from '../../token';
import { sans } from '../../typography';
import { box } from '../../layout/background';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-asset-image';

const base = {
  position: `relative`,
  display: `inline-block`,
  height: `100%`,
  overflow: `hidden`,
};

const imageBase = {
  display: `block`,
  height: '100%',
};

const imageScaled = {
  ...imageBase,
  objectFit: 'cover',
  objectPosition: 'center',
  width: '100%',
};

const imageAnimationStart = {
  transform: 'scale(1)',
  transition: 'transform 0.5s',
};

const imageAnimationEnd = {
  transform: 'scale(1.025)',
};

const linkBase = {
  lineHeight: `0`,
  overflow: `hidden`,
};

const signBase = {
  [`& .${box.white.className}`]: {
    position: `absolute`,
    bottom: `${spacing.min}`,
    left: `${spacing.min}`,
  },
};

const linkImage = {
  '& img': {
    ...imageBase,
  },

  '& > a': {
    ...linkBase,

    '& img': {
      ...imageAnimationStart,
    },
  },

  [`a:hover, a:focus`]: {
    '& > img': {
      ...imageAnimationEnd,
    },
  },
};

const linkImageScaled = {
  '& img': {
    ...imageBase,
    ...imageAnimationStart,
    ...imageScaled,
  },

  '& > a': {
    ...linkBase,
    height: '100%',
    width: '100%',

    '& img': {
      ...imageAnimationStart,
    },
  },

  [`a:hover, a:focus`]: {
    '& > img': {
      ...imageAnimationEnd,
    },
  },
};

// umd-asset-image-caption
export const caption = create.jssObject({
  ...sans.min,
  className: `${classNamePrefix}-caption`,
  position: 'absolute',
  bottom: '0',
  right: '0',
  height: 'auto !important',
  width: 'auto !important',
  padding: `${spacing.min}`,
  backgroundColor: ` rgba(0, 0, 0, 0.5)`,
  color: `${color.white}`,
  zIndex: '99',
});

// umd-asset-image-wrapper
export const wrapper = create.jssObject({
  className: `${classNamePrefix}-wrapper`,
  ...base,
  ...linkImage,
  ...signBase,
});

// umd-asset-image-wrapper-scaled
export const wrapperScaled = create.jssObject({
  className: `${classNamePrefix}-wrapper-scaled`,
  ...base,
  width: '100%',
  ...linkImageScaled,
  ...signBase,
});

// umd-asset-image-aspect-standard
export const aspectStandard = create.jssObject({
  className: `${classNamePrefix}-aspect-standard`,
  aspectRatio: `4/3`,
  width: 'auto',

  '& img': {
    aspectRatio: `4/3`,
    width: 'auto',
  },
});

// umd-asset-image-aspect-square
export const aspectSquare = create.jssObject({
  className: `${classNamePrefix}-aspect-square`,
  aspectRatio: `1/1`,
  width: 'auto',

  '& img': {
    aspectRatio: `1/1`,
    width: 'auto',
  },
});
