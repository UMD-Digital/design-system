import * as token from '@universityofmaryland/web-token-library';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import { ElementBuilder, type ElementModel } from '@universityofmaryland/web-builder-library';

const ATTRIBUTE_CAPTION = 'data-caption';
const ATTRIBUTE_CREDIT = 'data-credit';

const getCaptionText = (image: HTMLImageElement): string | null => {
  if (image.hasAttribute(ATTRIBUTE_CAPTION)) {
    console.log(
      `Attribute "data-caption" is deprecated. Use "data-credit" instead. This attribute will be removed in version 2.0.`,
    );
  }
  return image.getAttribute(ATTRIBUTE_CREDIT) || image.getAttribute(ATTRIBUTE_CAPTION);
};

const makeBlockCaption = (image: HTMLImageElement): ElementModel | null => {
  const text = getCaptionText(image);
  if (!text) return null;

  return new ElementBuilder('span')
    .withClassName('image-caption-block')
    .styled(typography.sans.min)
    .withStyles({
      element: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: token.spacing.min,
        color: token.color.white,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    })
    .withText(text)
    .build();
};

const makeToggleCaption = (image: HTMLImageElement): ElementModel | null => {
  const text = getCaptionText(image);
  if (!text) return null;

  const indicator = new ElementBuilder('summary')
    .withClassName('image-caption-toggle-indicator')
    .withAria({ label: 'Toggle caption' })
    .withStyles({
      element: {
        cursor: 'pointer',
        width: token.spacing.lg,
        height: token.spacing.lg,
        position: 'relative',
        display: 'grid',
        flexShrink: 0,
        borderRadius: '50%',
        backgroundColor: token.color.gray.darker,
        color: token.color.white,
        transition: 'background-color 0.5s ease, color 0.5s ease',
        '&:hover': {
          backgroundColor: token.color.white,
          color: token.color.gray.darker,
        },
        '&::before': {
          content: "''",
          position: 'absolute',
          width: '3px',
          height: '3px',
          borderRadius: '50%',
          backgroundColor: 'currentColor',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '-6px 0 0 currentColor, 6px 0 0 currentColor',
          transition: 'opacity 0.1s ease',
        },
        '&::after': {
          content: "'✕'",
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '14px',
          lineHeight: 1,
          opacity: 0,
          transition: 'opacity 0.1s ease',
        },
      },
    })
    .build();

  const captionText = new ElementBuilder('span')
    .withClassName('image-caption-toggle-text')
    .withText(text)
    .styled(typography.sans.smaller)
    .withStyles({
      element: {
        display: 'none',
        overflow: 'auto',
        color: token.color.white,
        backgroundColor: token.color.gray.darker,
        border: `${token.spacing.sm} solid ${token.color.gray.darker}`,
        borderRadius: '2px',
        lineHeight: 1.1,
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        maxHeight: '100px',
        [`@media (${token.media.queries.desktop.min})`]: { maxHeight: '200px' },
      },
    })
    .build();

  const model = new ElementBuilder('details')
    .withClassName('image-caption-toggle')
    .withStyles({
      element: {
        position: 'absolute',
        inset: `auto ${token.spacing.sm} ${token.spacing.sm} auto`,
        display: 'inline-flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        zIndex: 99,
        userSelect: 'none',
        maxWidth: `calc(100% - (${token.spacing.sm} * 2))`,
        maxHeight: `calc(100% - (${token.spacing.sm} * 2))`,

        '&[open]': {
          width: `calc(100% - (${token.spacing.sm} * 2))`,
          gap: token.spacing.sm,
          alignItems: 'flex-end',
          '& .image-caption-toggle-text': {
            display: 'block',
            flex: 1,
          },
          '& .image-caption-toggle-indicator::before': { opacity: 0 },
          '& .image-caption-toggle-indicator::after': { opacity: 1 },
        },
      },
    })
    .withChildren(indicator, captionText)
    .build();

  return model;
};

const create = (isToggleCaption: boolean, image: HTMLImageElement): ElementModel | null => {
  if (isToggleCaption) return makeToggleCaption(image);
  return makeBlockCaption(image);
};

export const createCaption = {
  create,
  Elements: {
    container: 'image-container',
  },
};
