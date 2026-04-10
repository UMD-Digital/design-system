import * as animation from '@universityofmaryland/web-styles-library/animation';
import * as token from '@universityofmaryland/web-token-library';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { truncateText } from '@universityofmaryland/web-utilities-library/string';
import { wrapLinkForAnimation } from '@universityofmaryland/web-utilities-library/animation';

type TypeEventLockupDate = {
  headline: HTMLElement | null;
  dateSign?: { element: HTMLElement; styles: string };
  isThemeDark?: boolean;
};

export const createTextLockupDate = (props: TypeEventLockupDate) => {
  const { headline, dateSign, isThemeDark } = props;

  const createHeadline = () => {
    if (!headline) {
      console.warn('Headline element is required');
      return;
    }

    const modifiedText = truncateText({
      text: headline.innerHTML,
      maxTextSize: 50,
    });

    headline.innerHTML = modifiedText;
    wrapLinkForAnimation({ element: headline });

    return new ElementBuilder(headline)
      .withClassName('event-lockup-headline')
      .withStyles({
        element: {
          marginLeft: token.spacing.sm,
          ...typography.sans.large,
          ...(isThemeDark && { color: token.color.white }),
          [`@media (${token.media.queries.large.max})`]: {
            fontSize: token.font.size.sm,
            fontWeight: 600,
          },
          '& *': {
            ...typography.sans.large,
            ...(isThemeDark && { color: token.color.white }),
            [`@media (${token.media.queries.large.max})`]: {
              fontSize: token.font.size.sm,
              fontWeight: 600,
            },
          },
          '& a': {
            ...animation.line.slideUnderBlack,
            ...(isThemeDark && animation.line.slideUnderWhite),
          },
        },
      });
  };

  const headlineElement = createHeadline();
  const children = [dateSign, headlineElement].filter(
    (child) => child != null,
  );

  return new ElementBuilder()
    .withClassName('event-lockup-container')
    .withStyles({
      element: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'left',
        '& *': { color: 'currentColor' },
      },
    })
    .withChildren(...children)
    .build();
};
