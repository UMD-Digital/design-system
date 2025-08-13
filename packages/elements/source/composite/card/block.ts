import * as Styles from '@universityofmaryland/web-styles-library';
import { assets, layout, textLockup } from 'atomic';
import { theme } from 'utilities';
import { CardBlockProps } from './_types';
import { type UMDElement } from '../../_types';

const smallBreakpoint = Styles.token.media.breakpointValues.small.max;

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
            image,
            isScaled: true,
            isAspectStandard: isAligned,
            dateSign,
          }),
        ],
        customStyles: {
          ...(shouldImageBeFullWidth && {
            ...theme.media.createContainerQuery('max-width', smallBreakpoint, {
              marginBottom: Styles.token.spacing.md,
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
