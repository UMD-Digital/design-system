import * as token from '@universityofmaryland/web-styles-library/token';
import { ElementModel } from 'model';
import { type ElementVisual } from '../../_types';
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
  let children: ElementVisual[] = [];

  if (nameComposite && !name) {
    children.push(nameComposite);
  }

  if (name) {
    children.push(
      ElementModel.headline.sansLarger({
        element: name,
        elementStyles: {
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
        },
        isThemeDark,
      }),
    );
  }

  if (job) {
    children.push(
      ElementModel.headline.sansSmall({
        element: job,
        elementStyles: {
          element: {
            lineHeight: `1.25em`,
          },
          subElement: {
            color: 'currentColor',
          },
        },
        isThemeDark,
      }),
    );
  }

  if (association) {
    children.push(
      ElementModel.headline.sansSmall({
        element: association,
        elementStyles: {
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
        },
        isThemeDark,
      }),
    );
  }

  if (pronouns) {
    pronouns.innerHTML = `<i>${pronouns.innerHTML}</i>`;
    children.push(
      ElementModel.headline.sansSmall({
        element: pronouns,
        elementStyles: {
          element: {
            [`& + *`]: {
              marginTop: '4px',
            },
          },
          subElement: {
            color: 'currentColor',
          },
        },
        isThemeDark,
      }),
    );
  }

  if (subText) {
    children.push(
      ElementModel.headline.sansSmall({
        element: subText,
        elementStyles: {
          siblingAfter: {
            marginTop: '4px',
          },
        },
        isThemeDark,
      }),
    );
  }

  if (actions) {
    children.push(
      ElementModel.layout.gridInlineTabletRows({
        element: actions,
        elementStyles: {
          element: {
            marginTop: token.spacing.sm,
          },
        },
      }),
    );
  }

  return ElementModel.createDiv({
    className: 'text-lockup-person-container',
    children,
    elementStyles: {
      element: {
        zIndex: '9',
        position: 'relative',
      },
    },
  });
};
