import * as token from '@universityofmaryland/web-styles-library/token';
import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
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
    })
    .withThemeDark(isThemeDark);

  if (nameComposite && !name) {
    container.withChild(nameComposite.element);
  }

  if (name) {
    const nameElement = new ElementBuilder(name)
      .styled(Styles.typography.sans.fonts.larger)
      .withStyles({
        element: {
          fontWeight: '700',
          color: `${token.color.black}`,

          [`& + *`]: {
            marginTop: '4px',
          },
        },
        subElement: {
          color: 'currentColor',
        },
      })
      .withThemeDark(isThemeDark)
      .build();

    container.withChild(nameElement);
  }

  if (job) {
    const jobElement = new ElementBuilder(job)
      .styled(Styles.typography.sans.fonts.small)
      .withStyles({
        element: {
          lineHeight: `1.25em`,
        },
        subElement: {
          color: 'currentColor',
        },
      })
      .withThemeDark(isThemeDark)
      .build();

    container.withChild(jobElement);
  }

  if (association) {
    const associationElement = new ElementBuilder(association)
      .styled(Styles.typography.sans.fonts.small)
      .withStyles({
        element: {
          lineHeight: '1.2em',
          display: 'block',
          color: `${token.color.gray.dark}`,

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
      .withThemeDark(isThemeDark)
      .build();

    container.withChild(associationElement);
  }

  if (pronouns) {
    pronouns.innerHTML = `<i>${pronouns.innerHTML}</i>`;
    const pronounsElement = new ElementBuilder(pronouns)
      .styled(Styles.typography.sans.fonts.small)
      .withStyles({
        element: {
          [`& + *`]: {
            marginTop: '4px',
          },
        },
        subElement: {
          color: 'currentColor',
        },
      })
      .withThemeDark(isThemeDark)
      .build();

    container.withChild(pronounsElement);
  }

  if (subText) {
    const subTextElement = new ElementBuilder(subText)
      .styled(Styles.typography.sans.fonts.small)
      .withStyles({
        siblingAfter: {
          marginTop: '4px',
        },
      })
      .withThemeDark(isThemeDark)
      .build();

    container.withChild(subTextElement);
  }

  if (actions) {
    const actionsElement = new ElementBuilder(actions)
      .styled(Styles.layout.grid.inline.tabletRows)
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
