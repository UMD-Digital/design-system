import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import { createMediaQuery } from '@universityofmaryland/web-utilities-library/styles';
import { assets, textLockup } from 'atomic';
import {
  type PersonContactPropsWithStyles,
  type PersonTextLockupPropsWithStyles,
  type PersonFullProps,
} from '../../_types';

const smallBreakpoint = token.media.breakpointValues.small.max;
const mediumBreakpointStart = token.media.breakpointValues.medium.min;
const mediumBreakpoint = token.media.breakpointValues.large.min;

export const image = ({
  customStyles,
  image,
  isThemeDark,
}: {
  customStyles?: Record<string, any>;
  image: HTMLImageElement | HTMLAnchorElement;
  isThemeDark?: boolean;
}) => {
  const backgroundImage = assets.image.background({
    element: image,
    isScaled: false,
  });

  return new ElementBuilder()
    .withClassName('person-column-image')
    .withStyles({
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
    })
    .withChild(backgroundImage)
    .build();
};

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
  const lockup = personLockup(props);

  return new ElementBuilder()
    .withClassName('person-column-details')
    .withStyles({
      element: {
        flex: '1 0',
        ...customStyles,
      },
    })
    .withChild(lockup)
    .build();
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
  const lockup = contactLockup(props);

  return new ElementBuilder()
    .withClassName('person-column-contact')
    .withStyles({
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
    })
    .withChild(lockup)
    .build();
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
  const person = personLockup({
    association,
    isThemeDark,
    job,
    name,
    pronouns,
    subText,
  });

  const contact = contactLockup({
    actions,
    additionalContact,
    address,
    email,
    isThemeDark,
    linkendIn,
    phone,
  });

  return new ElementBuilder()
    .withClassName('person-column-information')
    .withStyles({
      element: {
        ...customStyles,
      },
    })
    .withChildren(person, contact)
    .build();
};
