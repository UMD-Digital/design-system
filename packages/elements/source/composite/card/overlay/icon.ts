import * as token from '@universityofmaryland/web-styles-library/token';
import { ElementModel } from 'model';
import { textLockup } from 'atomic';
import { ElementVisual } from '../../../_types';

interface CardIconProps {
  headline: HTMLElement | null;
  text?: HTMLElement | null;
  image?: HTMLImageElement | null;
  isThemeDark?: boolean;
}

export default (props: CardIconProps) => {
  const children: ElementVisual[] = [];

  if (props.image) {
    const imageContainer = ElementModel.createDiv({
      className: 'card-overlay-icon-image',
      elementStyles: {
        element: {
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: `${token.spacing.lg}`,

          '& *': {
            maxHeight: '120px',
          },
        },
      },
    });
    imageContainer.element.appendChild(props.image);
    children.push(imageContainer);
  }

  children.push(
    textLockup.smallScaling({
      ...props,
      customStyles: {
        height: 'auto',
      },
    }),
  );

  return ElementModel.createDiv({
    className: 'card-overlay-icon',
    children,
    elementStyles: {
      element: {
        containerType: 'inline-size',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        padding: `${token.spacing.md}`,
        paddingTop: `${token.spacing.sm}`,
        backgroundColor: token.color.gray.lightest,

        ...(props.isThemeDark && {
          backgroundColor: token.color.gray.darker,
        }),
      },
    },
  });
};
