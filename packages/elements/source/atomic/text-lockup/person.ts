import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import * as animationStyles from '@universityofmaryland/web-styles-library/animation';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
import { wrapTextNodeInSpan } from '@universityofmaryland/web-utilities-library/dom';
import { type PersonTextLockupProps } from '../_types';

export const createTextLockupPerson = ({
  actions,
  slotTwo,
  isThemeDark,
  slotOne,
  name,
  nameComposite,
  slotThreeItalic,
  slotFour,
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
      ...animationStyles.line.composeSlideUnder({
        color: theme.foreground(isThemeDark),
      }),
      ...typography.sans.compose('larger', {
        theme: theme.fontColor(isThemeDark),
      }),
    };

    const nameElement = new ElementBuilder(name)
      .withClassName('person-name')
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

  if (slotOne) {
    const slotOneElement = new ElementBuilder(slotOne)
      .withClassName('slot-one')
      .styled(
        typography.sans.compose('small', {
          theme: theme.fontColor(isThemeDark),
        }),
      )
      .withStyles({
        element: {
          lineHeight: `1.25em`,

          ...(!isThemeDark && { color: `${token.color.gray.dark} !important` }),
        },
        subElement: {
          color: 'currentColor',
        },
      })
      .build();

    container.withChild(slotOneElement);
  }

  if (slotTwo) {
    const slotTwoElement = new ElementBuilder(slotTwo)
      .withClassName('slot-two')
      .styled(
        typography.sans.compose('small', {
          theme: theme.fontColor(isThemeDark),
        }),
      )
      .withStyles({
        element: {
          lineHeight: '1.2em',
          display: 'block',
          ...(!isThemeDark && { color: `${token.color.gray.dark} !important` }),

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

    container.withChild(slotTwoElement);
  }

  if (slotThreeItalic) {
    const italicElement = document.createElement('i');
    while (slotThreeItalic.firstChild) {
      italicElement.appendChild(slotThreeItalic.firstChild);
    }
    slotThreeItalic.appendChild(italicElement);
    const slotThreeItalicElement = new ElementBuilder(slotThreeItalic)
      .withClassName('slot-three-italic')
      .styled(
        typography.sans.compose('small', {
          theme: theme.fontColor(isThemeDark),
        }),
      )
      .withStyles({
        element: {
          ...(!isThemeDark && { color: `${token.color.gray.dark} !important` }),

          [`& + *`]: {
            marginTop: '4px',
          },

          [`&  *`]: {
            color: 'currentColor',
          },
        },
      })
      .build();

    container.withChild(slotThreeItalicElement);
  }

  if (slotFour) {
    const slotFourElement = new ElementBuilder(slotFour)
      .withClassName('slot-four')
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

    container.withChild(slotFourElement);
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
