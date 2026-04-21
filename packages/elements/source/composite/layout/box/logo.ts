import * as token from '@universityofmaryland/web-token-library';
import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';

export type TypeLogoRequirements = {
  isBordered?: boolean;
  isThemeDark?: boolean;
  image: HTMLElement;
  text?: HTMLElement | null;
};

const CreateBoxLogoElement = (element: TypeLogoRequirements) => {
  const { isThemeDark, image, text, isBordered = false } = element;

  const createText = () => {
    if (!text) {
      console.warn('CreateBoxLogoElement: text element is not provided');
      return null;
    }

    return new ElementBuilder(text)
      .withClassName('logo-block-text')
      .styled(Styles.typography.sans.min)
      .withStyles({
        element: {
          color: token.color.gray.darker,
          ...(isThemeDark && { color: token.color.white }),
          '& *': {
            ...Styles.typography.sans.min,
            color: token.color.gray.darker,
            ...(isThemeDark && { color: token.color.white }),
          },
          '& a:hover, & a:focus': {
            textDecoration: 'underline',
          },
        },
      })
      .build();
  };

  const assetBuilder = new ElementBuilder()
    .withClassName('logo-block-asset')
    .withChild(image)
    .withStyles({
      element: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...(isBordered && {
          border: `1px solid ${token.color.gray.light}`,
          ...(isThemeDark && { border: `1px solid ${token.color.gray.dark}` }),
          height: '100%',
        }),
        ...(isThemeDark && {
          backgroundColor: token.color.gray.darker,
        }),
        ...((isBordered || isThemeDark) && { padding: token.spacing.xl }),
        '& > *': {
          maxHeight: '50px',
          maxWidth: '150px',
          display: 'flex',
        },
        '& img': {
          objectFit: 'contain',
        },
      },
      siblingAfter: {
        marginTop: token.spacing.min,
      },
    });

  return new ElementBuilder()
    .withClassName('logo-block-container')
    .withStyles({
      element: {
        containerType: 'inline-size',
        height: '100%',
      },
    })
    .withChild(assetBuilder)
    .withChild(createText())
    .build();
};

export const createCompositeLayoutBoxLogo = CreateBoxLogoElement;
