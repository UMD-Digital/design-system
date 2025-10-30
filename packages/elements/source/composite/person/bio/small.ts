import * as token from '@universityofmaryland/web-styles-library/token';
import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { createMediaQuery } from '@universityofmaryland/web-utilities-library/styles';
import { type ElementModel } from '../../../_types';
import { assets, textLockup } from 'atomic';
import { PersonBio } from '../_types';

const createTextContainer = (props: PersonBio): ElementModel<HTMLElement> => {
  const { isThemeDark, name, ...textProps } = props;

  const builder = new ElementBuilder()
    .styled(Styles.element.text.line.adjustentInset);

  if (name) {
    builder.withChild(
      new ElementBuilder(name)
        .styled(Styles.typography.sans.fonts.extraLarge)
        .withThemeDark(isThemeDark)
        .withStyles({
          element: {
            color: `${token.color.black}`,
            textTransform: 'uppercase',
            fontWeight: '800',
            display: 'block',
          },
          siblingAfter: {
            marginTop: token.spacing.sm,
          },
        })
        .build(),
    );
  }

  builder.withChild(textLockup.person({ ...textProps, isThemeDark }));

  return builder.build();
};

const createTextColumn = (props: PersonBio): ElementModel<HTMLElement> => {
  const { actions } = props;
  const textContainer = createTextContainer(props);

  const builder = new ElementBuilder()
    .withClassName('person-bio-summary-text-column')
    .withChild(textContainer)
    .withChild(textLockup.contact(props));

  if (actions) {
    builder.withChild(
      new ElementBuilder(actions)
        .styled(Styles.layout.grid.inline.tabletRows)
        .withStyles({
          element: {
            marginTop: token.spacing.sm,
          },
        })
        .build(),
    );
  }

  return builder.build();
};

const makeContainer = (props: PersonBio): ElementModel<HTMLElement> => {
  const { image } = props;
  const textColumn = createTextColumn(props);

  const builder = new ElementBuilder()
    .withClassName('person-bio-summary-container')
    .withStyles({
      element: {
        display: 'grid',
        gridGap: `${token.spacing.md}`,

        ...createMediaQuery(
          'min-width',
          token.media.breakpointValues.large.min,
          {
            gridTemplateColumns: `repeat(8, 1fr)`,
            gridGap: `${token.spacing.lg}`,
            alignItems: `center`,
          },
        ),

        [`& > *`]: {
          ...createMediaQuery(
            'min-width',
            token.media.breakpointValues.large.min,
            {
              gridColumn: `span 5`,
            },
          ),
        },

        [`&:has(> :nth-child(2)) > *:first-child `]: {
          ...createMediaQuery(
            'min-width',
            token.media.breakpointValues.large.min,
            {
              gridColumn: `span 3`,
              alignSelf: `flex-start`,
            },
          ),
        },
      },
    });

  if (image) {
    builder.withChild(
      assets.image.background({
        element: image,
        isScaled: false,
        customStyles: {
          element: {
            ...createMediaQuery(
              'max-width',
              token.media.breakpointValues.medium.max,
              {
                display: 'flex',
              },
            ),

            [`& img`]: {
              ...createMediaQuery(
                'min-width',
                token.media.breakpointValues.large.min,
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

  builder.withChild(textColumn);

  return builder.build();
};

export default (props: PersonBio): ElementModel<HTMLElement> => {
  const { isThemeDark, description } = props;
  const container = makeContainer(props);

  const builder = new ElementBuilder()
    .withClassName('person-bio-summary-composite')
    .withChild(container);

  if (description) {
    builder.withChild(
      new ElementBuilder(description)
        .styled(Styles.element.text.rich.simpleLarge)
        .withThemeDark(isThemeDark)
        .withStyles({
          element: {
            marginTop: token.spacing.lg,
            maxWidth: token.spacing.maxWidth.smallest,
          },
        })
        .build(),
    );
  }

  return builder.build();
};
