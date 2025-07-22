import { assets, layout, textLockup } from 'atomic';
import { ElementModel } from 'model';
import { CardBlockProps } from './_types';
import { type ElementVisual } from '../../_types';

export default (props: CardBlockProps) => {
  const {
    dateSign,
    hasBorder,
    image,
    isAligned,
    isThemeDark,
    isTransparent,
    newsId,
  } = props;
  const children: ElementVisual[] = [];
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
