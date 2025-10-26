import * as token from '@universityofmaryland/web-styles-library/token';
import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { type ElementModel } from '../../_types';
import { assets, textLockup } from 'atomic';
import { PersonContact } from './_types';

interface Theme {
  isThemeDark?: boolean;
}

interface PersonText extends Theme {
  name: HTMLElement | null;
  job?: HTMLElement | null;
  subText?: HTMLElement | null;
}

interface PersonInfo extends PersonContact, Theme {
  image?: HTMLImageElement | null;
  association?: HTMLElement | null;
  pronouns?: HTMLElement | null;
}

interface PersonHero extends PersonText, PersonInfo {
  breadcrumbMobile?: HTMLElement | null;
  breadcrumbDesktop?: HTMLElement | null;
}

const CreateImageBlock = (props: PersonInfo): ElementModel<HTMLElement> => {
  const { image, association, pronouns, isThemeDark } = props;

  const wrapper = new ElementBuilder()
    .withClassName('umd-person-hero-image-wrapper');

  const contactContainer = textLockup.contact({
    ...props,
    isThemeDark: !isThemeDark,
  });

  if (image) {
    const imageBlock = assets.image.background({
      element: image,
      isScaled: false,
    });

    const imageContainer = new ElementBuilder()
      .withClassName('umd-person-hero-image')
      .withChild(imageBlock)
      .withStyles({
        element: {
          backgroundColor: `${
            isThemeDark ? token.color.gray.lightest : token.color.gray.darker
          }`,
          display: 'flex',
          justifyContent: 'center',
          marginBottom: token.spacing.md,

          ['& img']: {
            [`@container (max-width: ${token.media.breakpoints.large.max})`]: {
              maxHeight: '160px',
            },
          },
        },
      })
      .build();

    wrapper.withChild(imageContainer);
  }

  if (association) {
    wrapper.withChild(
      new ElementBuilder(association)
        .styled(Styles.typography.sans.fonts.large)
        .withThemeDark(!isThemeDark)
        .withStyles({
          element: {
            display: 'block',
          },
          siblingAfter: {
            marginTop: token.spacing.min,
          },
        })
        .build(),
    );
  }

  if (pronouns) {
    const italicStyle = document.createElement('i');
    italicStyle.appendChild(pronouns);

    wrapper.withChild(
      new ElementBuilder(italicStyle)
        .withClassName('umd-person-hero-pronouns')
        .withThemeDark(!isThemeDark)
        .withStyles({
          element: {
            display: 'block',
          },
          siblingAfter: {
            display: 'block',
            marginTop: token.spacing.min,
          },
        })
        .build(),
    );
  }

  if (contactContainer) {
    wrapper.withChild(contactContainer);
  }

  const wrapperBuilt = wrapper.build();

  return new ElementBuilder()
    .withClassName('umd-person-hero-image-container')
    .withChild(wrapperBuilt)
    .withStyles({
      element: {
        paddingTop: `${token.spacing.lg}`,
        paddingBottom: `${token.spacing.lg}`,
        backgroundColor: `${
          isThemeDark ? token.color.gray.lightest : token.color.black
        }`,
        position: 'relative',

        [`@container (max-width: ${token.media.breakpoints.large.max})`]: {
          paddingLeft: `${token.spacing.md}`,
          paddingRight: `${token.spacing.md}`,
        },

        [`@container (min-width: ${token.media.breakpoints.tablet.min})`]: {
          padding: `${token.spacing.md}`,
          width: '30%',
          maxWidth: '320px',
        },
      },
    })
    .build();
};

const CreateTextContainer = ({
  name,
  job,
  subText,
  isThemeDark,
}: PersonText): ElementModel<HTMLElement> => {
  const lineWrapper = new ElementBuilder()
    .styled(Styles.element.text.line.adjustentInset)
    .withStyles({
      pseudoBefore: {
        backgroundColor: `${isThemeDark ? token.color.gold : token.color.red}`,
      },
    });

  if (subText) {
    lineWrapper.withChild(
      new ElementBuilder(subText)
        .styled(Styles.typography.sans.fonts.small)
        .withThemeDark(isThemeDark)
        .withStyles({
          element: {
            display: 'block',
            textTransform: 'uppercase',
            fontWeight: '700',
            color: `${token.color.black}`,
            maxWidth: '650px',
          },
          siblingAfter: {
            marginTop: token.spacing.min,

            [`@container (min-width: ${token.media.breakpoints.tablet.min})`]: {
              marginTop: token.spacing.sm,
            },
          },
        })
        .build(),
    );
  }

  if (name) {
    lineWrapper.withChild(
      new ElementBuilder(name)
        .styled(Styles.typography.campaign.fonts.large)
        .withThemeDark(isThemeDark)
        .withStyles({
          element: {
            textTransform: 'uppercase',
            fontWeight: '700',
            display: 'block',
            color: `${token.color.black}`,
          },
          siblingAfter: {
            marginTop: token.spacing.min,

            [`@container (min-width: ${token.media.breakpoints.tablet.min})`]: {
              marginTop: token.spacing.md,
            },
          },
        })
        .build(),
    );
  }

  if (job) {
    lineWrapper.withChild(
      new ElementBuilder(job)
        .styled(Styles.typography.sans.fonts.medium)
        .withThemeDark(isThemeDark)
        .withStyles({
          element: {
            display: 'block',
          },
        })
        .build(),
    );
  }

  const lineWrapperBuilt = lineWrapper.build();

  return new ElementBuilder()
    .withClassName('person-hero-text')
    .withChild(lineWrapperBuilt)
    .withStyles({
      element: {
        backgroundColor: `${
          isThemeDark ? token.color.black : token.color.gray.lightest
        }`,
        paddingTop: `${token.spacing['3xl']}`,
        paddingBottom: `${token.spacing['3xl']}`,
        position: 'relative',

        [`@container (max-width: ${token.media.breakpoints.large.max})`]: {
          paddingLeft: `${token.spacing.md}`,
          paddingRight: `${token.spacing.md}`,
        },

        [`@container (min-width: ${token.media.breakpoints.tablet.min})`]: {
          paddingTop: `0`,
          paddingBottom: `${token.spacing['7xl']}`,
          alignSelf: 'flex-start',
        },
      },
      pseudoBefore: {
        content: '""',
        position: 'absolute',
        top: '-100px',
        left: '0',
        bottom: '0',
        width: '200vw',
        transform: 'translateX(-20%)',
        backgroundColor: `${
          isThemeDark ? token.color.black : token.color.gray.lightest
        }`,
      },
    })
    .build();
};

export default (props: PersonHero): ElementModel<HTMLElement> => {
  const { breadcrumbMobile, breadcrumbDesktop } = props;
  const textContainer = CreateTextContainer(props);

  const textColumns = new ElementBuilder()
    .withClassName('umd-person-hero-columns')
    .withChild(textContainer)
    .withStyles({
      element: {
        [`@container (min-width: ${token.media.breakpoints.tablet.min})`]: {
          width: '70%',
        },
      },
    });

  if (breadcrumbDesktop) {
    const textColumnBreadcrumb = new ElementBuilder()
      .withClassName('umd-person-hero-breadcrumb-desktop')
      .withChild(breadcrumbDesktop)
      .withStyles({
        element: {
          [`@container (max-width: ${token.media.breakpoints.large.max})`]: {
            display: 'none',
          },
        },
      })
      .build();

    textColumns.withChild(textColumnBreadcrumb);
  }

  const textColumnsBuilt = textColumns.build();
  const imageBlock = CreateImageBlock(props);

  const elementWrapper = new ElementBuilder()
    .withClassName('umd-person-hero-wrapper')
    .withChild(textColumnsBuilt)
    .withChild(imageBlock)
    .withStyles({
      element: {
        [`@container (min-width: ${token.media.breakpoints.tablet.min})`]: {
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: `${token.spacing['7xl']}`,
        },
      },
    })
    .build();

  const elementLock = new ElementBuilder()
    .styled(Styles.layout.space.horizontal.larger)
    .withChild(elementWrapper)
    .withStyles({
      element: {
        [`@container (max-width: ${token.media.breakpoints.large.max})`]: {
          padding: '0',
        },
      },
    });

  if (breadcrumbMobile) {
    const mainBreadcrumb = new ElementBuilder()
      .withClassName('umd-person-hero-breadcrumb-mobile')
      .withChild(breadcrumbMobile)
      .withStyles({
        element: {
          paddingLeft: `${token.spacing.md}`,
          paddingRight: `${token.spacing.md}`,

          [`@container (min-width: ${token.media.breakpoints.tablet.min})`]: {
            display: 'none',
          },
        },
      })
      .build();

    elementLock.withChild(mainBreadcrumb);
  }

  const elementLockBuilt = elementLock.build();

  return new ElementBuilder()
    .withClassName('umd-person-hero')
    .withChild(elementLockBuilt)
    .withStyles({
      element: {
        overflow: 'hidden',
        containerType: 'inline-size',
      },
    })
    .build();
};
