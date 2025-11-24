import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-styles-library/token';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import * as animationStyles from '@universityofmaryland/web-styles-library/animation';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
import { wrapTextNodeInSpan } from '@universityofmaryland/web-utilities-library/dom';
import { type PersonTextLockupProps } from '../_types';

export default ({
  actions,
  association,
  isThemeDark,
  job,
  name,
  nameComposite,
  pronouns,
  subText,
}: PersonTextLockupProps) => {
  const container = new ElementBuilder()
    .withClassName('text-lockup-person-container')
    .withStyles({
      element: {
        zIndex: '9',
        position: 'relative',
      },
    });

  if (nameComposite && !name) {
    container.withChild(nameComposite);
  }

  if (name) {
    const headlineStyles = {
      ...typography.sans.compose('larger', {
        theme: theme.fontColor(isThemeDark),
      }),
      ...animationStyles.line.composeSlideUnder({
        color: theme.foreground(isThemeDark),
      }),
    };

    const nameElement = new ElementBuilder(name)
      .styled(headlineStyles)
      .withStyles({
        element: {
          fontWeight: '700',

          [`& + *`]: {
            marginTop: '4px',
          },
        },
        subElement: {
          color: 'currentColor',
        },
      })
      .withModifier((el) => wrapTextNodeInSpan(el))
      .build();

    container.withChild(nameElement);
  }

  if (job) {
    const jobElement = new ElementBuilder(job)
      .styled(
        typography.sans.compose('small', {
          theme: theme.fontColor(isThemeDark),
        }),
      )
      .withStyles({
        element: {
          lineHeight: `1.25em`,

          ...(!isThemeDark && { color: `${token.color.gray.dark}` }),
        },
        subElement: {
          color: 'currentColor',
        },
      })
      .build();

    container.withChild(jobElement);
  }

  if (association) {
    const associationElement = new ElementBuilder(association)
      .styled(
        typography.sans.compose('small', {
          theme: theme.fontColor(isThemeDark),
        }),
      )
      .withStyles({
        element: {
          lineHeight: '1.2em',
          display: 'block',
          ...(!isThemeDark && { color: `${token.color.gray.dark}` }),

          [`& + *`]: {
            marginTop: '4px',
          },

          [`& a:hover, a:focus`]: {
            textDecoration: 'underline',
          },
        },
        subElement: {
          color: 'currentColor',
        },
      })
      .build();

    container.withChild(associationElement);
  }

  if (pronouns) {
    pronouns.innerHTML = `<i>${pronouns.innerHTML}</i>`;
    const pronounsElement = new ElementBuilder(pronouns)
      .styled(
        typography.sans.compose('small', {
          theme: theme.fontColor(isThemeDark),
        }),
      )
      .withStyles({
        element: {
          ...(!isThemeDark && { color: `${token.color.gray.dark}` }),

          [`& + *`]: {
            marginTop: '4px',
          },
        },
        subElement: {
          color: 'currentColor',
        },
      })
      .build();

    container.withChild(pronounsElement);
  }

  if (subText) {
    const subTextElement = new ElementBuilder(subText)
      .styled(
        typography.sans.compose('small', {
          theme: theme.fontColor(isThemeDark),
        }),
      )
      .withStyles({
        element: {
          ...(!isThemeDark && { color: `${token.color.gray.dark}` }),
        },
        siblingAfter: {
          marginTop: '4px',
        },
      })
      .build();

    container.withChild(subTextElement);
  }

  if (actions) {
    const actionsElement = new ElementBuilder(actions)
      .styled(layout.grid.inline.tabletRows)
      .withStyles({
        element: {
          marginTop: token.spacing.sm,
        },
      })
      .build();

    container.withChild(actionsElement);
  }

  return container.build();
};
