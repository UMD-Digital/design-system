import * as token from '@universityofmaryland/web-styles-library/token';
import ElementBuilder from '@universityofmaryland/web-builder-library';
import {
  createMediaQuery,
  createMediaQueryRange,
} from '@universityofmaryland/web-utilities-library/styles';
import {
  type PersonContactPropsWithStyles,
  type PersonTextLockupPropsWithStyles,
  type PersonFullProps,
} from '../../_types';
import { assets, textLockup } from 'atomic';

const smallBreakpoint = token.media.breakpointValues.small.max;
const mediumBreakpointStart = token.media.breakpointValues.medium.min;
const mediumBreakpoint = token.media.breakpointValues.large.min;

export const image = ({
  customStyles,
  image,
  isThemeDark,
}: {
  customStyles?: Record<string, any>;
  image: HTMLImageElement;
  isThemeDark?: boolean;
}) =>
  ElementBuilder.create.div({
    className: 'person-column-image',
    elementStyles: {
      element: {
        ...createMediaQuery('max-width', smallBreakpoint, {
          marginBottom: `${token.spacing.md}`,
          backgroundColor: `${token.color.gray.lighter}`,
          display: 'flex',
          justifyContent: 'center',

          ...(isThemeDark && {
            ...createMediaQuery('max-width', smallBreakpoint, {
              backgroundColor: `${token.color.gray.darker}`,
            }),
          }),
        }),

        ...createMediaQuery('min-width', mediumBreakpointStart, {
          display: 'block',
          width: '96px',
          paddingRight: `${token.spacing.md}`,
          alignSelf: 'flex-start',
        }),

        ...customStyles,

        '& img, & svg': {
          ...createMediaQuery('max-width', smallBreakpoint, {
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
  return ElementBuilder.create.div({
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

  return ElementBuilder.create.div({
    className: 'person-column-contact',
    elementStyles: {
      element: {
        marginTop: `${token.spacing.sm}`,

        ...createMediaQuery('min-width', mediumBreakpointStart, {
          paddingLeft: `${token.spacing.md}`,
        }),

        ...createMediaQuery('min-width', mediumBreakpoint, {
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
  return ElementBuilder.create.div({
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
