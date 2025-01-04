import { color, media, spacing } from '../../token';
import { elements } from '../../typography';

export const base = {
  ...elements.interativeSmall,
  display: 'inline-block',
  padding: `${spacing.xs} ${spacing.lg}`,
  position: 'relative',
  textAlign: 'left',
  maxWidth: '380px',
};

export const baseLarge = {
  ...base,

  [`@media (${media.queries.tablet.min})`]: {
    ...elements.interativeMedium,
    padding: `${spacing.sm} ${spacing.lg}`,
  },
};

export const iconBase = {
  height: '14px',
  width: '14px',
  fill: color.red,
  transition: 'fill 0.5s ease-in-out',
  zIndex: '99',
  marginRight: ' 4px',
  marginTop: '-3px',
  display: 'inline-block',
};

export const iconBaseLarge = {
  ...iconBase,

  [`@media (${media.queries.tablet.min})`]: {
    height: '17px',
    width: '17px',
    marginRight: '5px',
  },
};
