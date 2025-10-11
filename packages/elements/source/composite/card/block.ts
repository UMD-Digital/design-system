import * as token from '@universityofmaryland/web-styles-library/token';
import { createMediaQuery } from '@universityofmaryland/web-utilities-library/styles';
import { assets, layout, textLockup } from 'atomic';
import { CardBlockProps } from './_types';
import { type UMDElement } from '../../_types';

const smallBreakpoint = token.media.breakpointValues.small.max;

export default (props: CardBlockProps) => {
  const {
    dateSign,
    hasBorder,
    hasEyebrowRibbon,
    image,
    isAligned,
    isThemeDark,
    isTransparent,
    newsId,
  } = props;
  const shouldImageBeFullWidth = hasEyebrowRibbon;
  const children: UMDElement[] = [];
  const sizingProps = {
    isThemeDark,
    isTransparent,
    hasBorder,
  };

  if (image) {
    children.push(
      layout.block.stacked.image({
        children: [
          assets.image.background({
            element: image,
            isScaled: true,
            isAspectStandard: isAligned,
            dateSign,
          }),
        ],
        customStyles: {
          ...(shouldImageBeFullWidth && {
            ...createMediaQuery('max-width', smallBreakpoint, {
              marginBottom: token.spacing.md,
              width: '100%',
            }),
          }),
        },
        ...sizingProps,
      }),
    );
  }

  children.push(
    layout.block.stacked.textContainer({
      children: [textLockup.smallScaling(props)],
      ...sizingProps,
    }),
  );

  const composite = layout.block.stacked.container({
    children,
    ...sizingProps,
  });

  if (newsId) {
    composite?.element.setAttribute('news-id', newsId);
  }

  return composite;
};
