import * as Styles from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import * as theme from 'helpers/theme';
import { ElementModel } from 'model';
import { PersonBio } from '../_types';
import { type ElementVisual } from '../../../_types';

const createTextContainer = (props: PersonBio) => {
  const { isThemeDark, name, ...textProps } = props;
  const children: ElementVisual[] = [];

  if (name) {
    children.push(
      ElementModel.headline.sansExtraLarge({
        element: name,
        isThemeDark,
        elementStyles: {
          element: {
            color: `${Styles.token.color.black}`,
            textTransform: 'uppercase',
            fontWeight: '800',
            display: 'block',
          },
          siblingAfter: {
            marginTop: Styles.token.spacing.sm,
          },
        },
      }),
    );
  }

  children.push(textLockup.person({ ...textProps, isThemeDark }));

  return ElementModel.text.lineAdjustmentInset({
    element: document.createElement('div'),
    children,
  });
};

const createTextColumn = (props: PersonBio) => {
  const { actions } = props;
  const textContainer = createTextContainer(props);
  const children: ElementVisual[] = [];

  children.push(textContainer, textLockup.contact(props));

  if (actions) {
    children.push(
      ElementModel.layout.gridInlineTabletRows({
        element: actions,
        elementStyles: {
          element: {
            marginTop: Styles.token.spacing.sm,
          },
        },
      }),
    );
  }

  return ElementModel.createDiv({
    className: 'person-bio-summary-text-column',
    children,
  });
};

const makeContainer = (props: PersonBio) => {
  const { image } = props;
  const textColumn = createTextColumn(props);
  const children: ElementVisual[] = [];

  if (image) {
    children.push(
      assets.image.background({
        element: image,
        isScaled: false,
        customStyles: {
          element: {
            ...theme.media.createContainerQuery(
              'max-width',
              Styles.token.media.breakpointValues.medium.max,
              {
                display: 'flex',
              },
            ),

            [`& img`]: {
              ...theme.media.createContainerQuery(
                'min-width',
                Styles.token.media.breakpointValues.large.min,
                {
                  width: `100%`,
                  height: `auto !important`,
                },
              ),
            },
          },
        },
      }),
    );
  }

  children.push(textColumn);

  return ElementModel.createDiv({
    className: 'person-bio-summary-container',
    children,
    elementStyles: {
      element: {
        display: 'grid',
        gridGap: `${Styles.token.spacing.md}`,

        ...theme.media.createContainerQuery(
          'min-width',
          Styles.token.media.breakpointValues.large.min,
          {
            gridTemplateColumns: `repeat(8, 1fr)`,
            gridGap: `${Styles.token.spacing.lg}`,
            alignItems: `center`,
          },
        ),

        [`& > *`]: {
          ...theme.media.createContainerQuery(
            'min-width',
            Styles.token.media.breakpointValues.large.min,
            {
              gridColumn: `span 5`,
            },
          ),
        },

        [`&:has(> :nth-child(2)) > *:first-child `]: {
          ...theme.media.createContainerQuery(
            'min-width',
            Styles.token.media.breakpointValues.large.min,
            {
              gridColumn: `span 3`,
              alignSelf: `flex-start`,
            },
          ),
        },
      },
    },
  });
};

export default (props: PersonBio) => {
  const { isThemeDark, description } = props;
  const container = makeContainer(props);
  const children: ElementVisual[] = [container];

  if (description) {
    children.push(
      ElementModel.richText.simpleLarge({
        element: description,
        isThemeDark,
        elementStyles: {
          element: {
            marginTop: Styles.token.spacing.lg,
            maxWidth: Styles.token.spacing.maxWidth.smallest,
          },
        },
      }),
    );
  }

  return ElementModel.createDiv({
    className: 'person-bio-summary-composite',
    children,
  });
};
