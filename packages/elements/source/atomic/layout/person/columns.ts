import * as Styles from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import * as theme from 'helpers/theme';
import { ElementModel } from 'model';
import {
  type PersonContactPropsWithStyles,
  type PersonTextLockupPropsWithStyles,
  type PersonFullProps,
} from '../../_types';

const smallBreakpoint = Styles.token.media.breakpointValues.small.max;
const mediumBreakpointStart = Styles.token.media.breakpointValues.medium.min;
const mediumBreakpoint = Styles.token.media.breakpointValues.large.min;

export const image = ({
  customStyles,
  image,
  isThemeDark,
}: {
  customStyles?: Record<string, any>;
  image: HTMLImageElement;
  isThemeDark?: boolean;
}) =>
  ElementModel.createDiv({
    className: 'person-column-image',
    elementStyles: {
      element: {
        ...theme.media.createContainerQuery('max-width', smallBreakpoint, {
          marginBottom: `${Styles.token.spacing.md}`,
          backgroundColor: `${Styles.token.color.gray.lighter}`,
          display: 'flex',
          justifyContent: 'center',

          ...(isThemeDark && {
            ...theme.media.createContainerQuery('max-width', smallBreakpoint, {
              backgroundColor: `${Styles.token.color.gray.darker}`,
            }),
          }),
        }),

        ...theme.media.createContainerQuery(
          'min-width',
          mediumBreakpointStart,
          {
            display: 'block',
            width: '96px',
            paddingRight: `${Styles.token.spacing.md}`,
            alignSelf: 'flex-start',
          },
        ),

        ...customStyles,

        '& img, & svg': {
          ...theme.media.createContainerQuery('max-width', smallBreakpoint, {
            height: 'auto !important',
            width: '140px',
          }),
        },
      },
    },
    children: [
      assets.image.background({
        element: image,
        isScaled: false,
      }),
    ],
  });

const personLockup = ({
  actions,
  association,
  isThemeDark,
  job,
  name,
  nameComposite,
  pronouns,
  subText,
}: PersonTextLockupPropsWithStyles) =>
  textLockup.person({
    actions,
    name,
    nameComposite,
    job,
    association,
    pronouns,
    subText,
    isThemeDark,
  });

export const details = (props: PersonTextLockupPropsWithStyles) => {
  const { customStyles = {} } = props;
  return ElementModel.createDiv({
    className: 'person-column-details',
    elementStyles: {
      element: {
        flex: '1 0',
        ...customStyles,
      },
    },
    children: [personLockup(props)],
  });
};

const contactLockup = ({
  actions,
  additionalContact,
  address,
  email,
  isThemeDark,
  linkendIn,
  phone,
}: PersonContactPropsWithStyles) =>
  textLockup.contact({
    actions,
    additionalContact,
    address,
    email,
    isThemeDark,
    linkendIn,
    phone,
  });

export const contact = (props: PersonContactPropsWithStyles) => {
  const { customStyles = {} } = props;

  return ElementModel.createDiv({
    className: 'person-column-contact',
    elementStyles: {
      element: {
        marginTop: `${Styles.token.spacing.sm}`,

        ...theme.media.createContainerQuery(
          'min-width',
          mediumBreakpointStart,
          {
            paddingLeft: `${Styles.token.spacing.md}`,
          },
        ),

        ...theme.media.createContainerQuery('min-width', mediumBreakpoint, {
          width: '30%',
        }),

        ...customStyles,
      },
    },
    children: [contactLockup(props)],
  });
};

export const information = ({
  actions,
  additionalContact,
  address,
  association,
  customStyles = {},
  email,
  isThemeDark,
  job,
  linkendIn,
  name,
  phone,
  pronouns,
  subText,
}: PersonFullProps) => {
  return ElementModel.createDiv({
    className: 'person-column-information',
    elementStyles: {
      element: {
        ...customStyles,
      },
    },
    children: [
      personLockup({
        association,
        isThemeDark,
        job,
        name,
        pronouns,
        subText,
      }),
      contactLockup({
        actions,
        additionalContact,
        address,
        email,
        isThemeDark,
        linkendIn,
        phone,
      }),
    ],
  });
};
