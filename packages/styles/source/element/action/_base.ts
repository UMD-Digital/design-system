import { color, media, spacing } from '../../token';
import { elements } from '../../typography';

export const base = {
  ...elements.interativeSmall,
  display: 'inline-block',
  padding: `${spacing.xs} ${spacing.lg}`,
  position: 'relative',
  textAlign: 'left',
  maxWidth: '380px',

  '&:has(svg), &:has(img)': {
    paddingLeft: `${spacing['2xl']}`,
  },
};

export const baseLarge = {
  ...base,
  ...elements.interativeMedium,

  [`@media (${media.queries.tablet.min})`]: {
    ...elements.interativeMedium,
    padding: `${spacing.sm} ${spacing.lg}`,
  },

  '&:has(svg), &:has(img)': {
    [`@media (${media.queries.tablet.min})`]: {
      paddingLeft: `57px`,
    },
  },
};

export const iconBase = {
  height: '14px',
  width: '14px',
  fill: color.red,
  transition: 'fill 0.5s ease-in-out',
  zIndex: '99',
  position: 'absolute',
  left: `calc(${spacing['md']} + 4px)`,
  top: '50%',
  transform: 'translateY(-50%)',
};

export const iconBaseLarge = {
  ...iconBase,
  left: `14px`,

  [`@media (${media.queries.tablet.min})`]: {
    height: '17px',
    width: '17px',
    left: `34px`,
  },
};
