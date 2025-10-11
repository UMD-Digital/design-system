import * as token from '@universityofmaryland/web-styles-library/token';
import { createContainerQuery } from '@universityofmaryland/web-utilities-library/styles';
import { ElementModel } from 'model';
import { assets, textLockup } from 'atomic';
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
            color: `${token.color.black}`,
            textTransform: 'uppercase',
            fontWeight: '800',
            display: 'block',
          },
          siblingAfter: {
            marginTop: token.spacing.sm,
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
            marginTop: token.spacing.sm,
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
            ...createContainerQuery(
              'max-width',
              token.media.breakpointValues.medium.max,
              {
                display: 'flex',
              },
            ),

            [`& img`]: {
              ...createContainerQuery(
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

  children.push(textColumn);

  return ElementModel.createDiv({
    className: 'person-bio-summary-container',
    children,
    elementStyles: {
      element: {
        display: 'grid',
        gridGap: `${token.spacing.md}`,

        ...createContainerQuery(
          'min-width',
          token.media.breakpointValues.large.min,
          {
            gridTemplateColumns: `repeat(8, 1fr)`,
            gridGap: `${token.spacing.lg}`,
            alignItems: `center`,
          },
        ),

        [`& > *`]: {
          ...createContainerQuery(
            'min-width',
            token.media.breakpointValues.large.min,
            {
              gridColumn: `span 5`,
            },
          ),
        },

        [`&:has(> :nth-child(2)) > *:first-child `]: {
          ...createContainerQuery(
            'min-width',
            token.media.breakpointValues.large.min,
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
            marginTop: token.spacing.lg,
            maxWidth: token.spacing.maxWidth.smallest,
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
