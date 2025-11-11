import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { Atomic } from '@universityofmaryland/web-elements-library';
import * as Styles from '@universityofmaryland/web-styles-library';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
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
    .styled(
      Styles.typography.sans.compose('extralarge', {
        theme: theme.fontColor(isThemeDark),
      }),
    )
    .withStyles({
      element: {
        textTransform: 'uppercase',
      },
    })
    .build();

  headline.element.innerHTML = message || 'No results found';

  const composite = new ElementBuilder()
    .styled(Styles.layout.grid.stacked)
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
