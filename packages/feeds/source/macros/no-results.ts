import * as Styles from '@universityofmaryland/web-styles-library';
import { Atomic, Model } from '@universityofmaryland/web-elements-library';

interface NoResultsContentType {
  message?: string;
  linkUrl?: string;
  linkText?: string;
  ctaType?: string;
  isThemeDark?: boolean;
  isAlignedCenter?: boolean;
}

export default ({
  message,
  linkUrl,
  linkText,
  isThemeDark,
  isAlignedCenter = true,
}: NoResultsContentType) => {
  const composite = Model.ElementModel.layout.gridStacked({
    element: document.createElement('div'),
    isThemeDark,
    elementStyles: {
      element: {
        [`& *`]: {
          textAlign: isAlignedCenter ? 'center' : 'left',
        },
        [`& *:not(:first-child)`]: {
          marginTop: `${Styles.token.spacing.md}`,
        },
      },
    },
  });

  const headline = Model.ElementModel.headline.sansExtraLarge({
    element: document.createElement('p'),
    isThemeDark,
    elementStyles: {
      element: {
        textTransform: 'uppercase',
      },
    },
  });

  headline.element.innerHTML = message || 'No results found';
  composite.element.appendChild(headline.element);
  composite.styles += headline.styles;

  if (linkUrl && linkText) {
    const link = document.createElement('a');
    link.innerHTML = linkText;
    link.setAttribute('href', linkUrl);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');

    const ctaButton = Atomic.actions.options({
      element: link,
      isTypeOutline: true,
      isThemeDark,
    });

    composite.element.appendChild(ctaButton.element);
    composite.styles += ctaButton.styles;
  }

  return composite;
};
