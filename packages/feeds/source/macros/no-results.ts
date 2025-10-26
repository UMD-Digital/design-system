import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { Atomic } from '@universityofmaryland/web-elements-library';
import { type ElementModel } from '../_types';

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
}: NoResultsContentType): ElementModel => {
  const headline = new ElementBuilder(document.createElement('p'))
    .styled(Styles.typography.sans.fonts.extraLarge)
    .withThemeDark(isThemeDark)
    .withStyles({
      element: {
        textTransform: 'uppercase',
      },
    })
    .build();

  headline.element.innerHTML = message || 'No results found';

  const composite = new ElementBuilder()
    .styled(Styles.layout.grid.stacked)
    .withThemeDark(isThemeDark)
    .withChild(headline)
    .withStyles({
      element: {
        [`& *`]: {
          textAlign: isAlignedCenter ? 'center' : 'left',
        },
        [`& *:not(:first-child)`]: {
          marginTop: `${Styles.token.spacing.md}`,
        },
      },
    });

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

    composite.withChild(ctaButton);
  }

  return composite.build();
};
