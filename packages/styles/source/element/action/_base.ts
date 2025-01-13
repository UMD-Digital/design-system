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
    paddingLeft: `${spacing.lg}`,
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
      paddingLeft: `calc(${spacing.xl})`,
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
  left: `${spacing.xs}`,
  top: '50%',
  transform: 'translateY(-50%)',
};

export const iconBaseLarge = {
  ...iconBase,

  [`@media (${media.queries.tablet.min})`]: {
    height: '17px',
    width: '17px',
    left: `${spacing.sm}`,
  },
};
