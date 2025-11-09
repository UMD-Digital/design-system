import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-styles-library/token';
import { textLockup } from 'atomic';
import { type UMDElement } from '../../../_types';

interface CardIconProps {
  headline: HTMLElement | null;
  text?: HTMLElement | null;
  image?: HTMLImageElement | null;
  isThemeDark?: boolean;
}

export default (props: CardIconProps) => {
  const children: UMDElement[] = [];

  if (props.image) {
    const imageContainer = new ElementBuilder()
      .withClassName('card-overlay-icon-image')
      .withStyles({
        element: {
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: `${token.spacing.lg}`,

          '& *': {
            maxHeight: '120px',
          },
        },
      })
      .withChild(props.image)
      .build();

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

  return new ElementBuilder()
    .withClassName('card-overlay-icon')
    .withStyles({
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
    })
    .withChildren(...children)
    .build();
};
