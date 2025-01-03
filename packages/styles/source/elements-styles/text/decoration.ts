import { colors, font, spacing, media } from '../../tokens';
import { transition } from '../../animation';
import { elements } from '../../typography';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-text-decoration';

const watermarkChild = {
  position: 'absolute',
  top: '20px',
  left: '-2%',
  color: colors.gray.lighter,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  fontSize: `min(calc(${font.size['5xl']} + 13vw), 240px)`,
  lineHeight: '0',
  opacity: ' 0.6',
  pointerEvents: 'none',
  userSelect: 'none',
  zIndex: '-1',

  [`@media (${media.queries.large.max})`]: {
    display: 'none',
  },
};

// umd-text-decoration-watermark
export const watermark = create.jssObject({
  className: [
    `${classNamePrefix}-watermark`,
    /** @deprecated Use 'umd-text-decoration-watermark' instead */
    'umd-watermark',
  ],

  position: 'relative',

  '> *': {
    ...watermarkChild,
    ...transition.slideRight,
  },
});

// umd-text-decoration-watermark-dark
export const watermarkDark = create.jssObject({
  ...watermark,

  className: [
    `${classNamePrefix}-watermark-dark`,
    /** @deprecated Use 'umd-text-decoration-watermark-dark' instead */
    'umd-watermark-dark',
  ],

  '> *': {
    ...watermarkChild,
    ...transition.slideRight,
    opacity: '0.12',
    zIndex: 'inherit',
  },
});

// umd-text-decoration-eyebrow
export const ribbon = create.jssObject({
  className: [
    `${classNamePrefix}-eyebrow`,
    /** @deprecated Use 'umd-text-decoration-eyebrow' instead */
    'umd-eyebrow-ribbon',
  ],

  ...elements.eyebrow,
  backgroundColor: colors.gold,
  padding: `${spacing.min} ${spacing.md}`,
  display: `inline-block`,
  clipPath: `polygon(8% 0, 100% 0, 92% 100%, 0 100%)`,
});
