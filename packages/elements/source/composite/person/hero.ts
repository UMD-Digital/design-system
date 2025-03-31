import {
  token,
  layout,
  typography,
} from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';
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

const CreateImageBlock = (props: PersonInfo) => {
  const { image, association, pronouns, isThemeDark } = props;
  const container = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-person-hero-image-container',
    elementStyles: {
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
    },
  });

  const wrapper = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-person-hero-image-wrapper',
  });

  const contactContainer = textLockup.contact({
    ...props,
    isThemeDark: !isThemeDark,
  });

  if (image) {
    const imageContainer = ElementModel.create({
      element: document.createElement('div'),
      className: 'umd-person-hero-image',
      elementStyles: {
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
      },
    });
    const imageBlock = assets.image.background({ image, isScaled: false });

    imageContainer.element.appendChild(imageBlock.element);
    imageContainer.styles += imageBlock.styles;
    wrapper.element.appendChild(imageContainer.element);
    wrapper.styles += imageContainer.styles;
  }

  if (association) {
    const styledAssociation = ElementModel.headline.sansLarge({
      element: association,
      isThemeDark: !isThemeDark,
      elementStyles: {
        element: {
          display: 'block',
        },
        siblingAfter: {
          marginTop: token.spacing.min,
        },
      },
    });
    wrapper.element.appendChild(styledAssociation.element);
    wrapper.styles += styledAssociation.styles;
  }

  if (pronouns) {
    const italicStyle = document.createElement('i');
    italicStyle.appendChild(pronouns);

    const styledPronouns = ElementModel.create({
      element: italicStyle,
      className: 'umd-person-hero-pronouns',
      isThemeDark: !isThemeDark,
      elementStyles: {
        element: {
          display: 'block',
        },
        siblingAfter: {
          display: 'block',
          marginTop: token.spacing.min,
        },
      },
    });

    wrapper.element.appendChild(styledPronouns.element);
    wrapper.styles += styledPronouns.styles;
  }

  if (contactContainer) {
    wrapper.element.append(contactContainer.element);
    wrapper.styles += contactContainer.styles;
  }

  container.element.appendChild(wrapper.element);
  container.styles += wrapper.styles;
  return container;
};

const CreateTextContainer = ({
  name,
  job,
  subText,
  isThemeDark,
}: PersonText) => {
  const container = ElementModel.create({
    element: document.createElement('div'),
    className: 'person-hero-text',
    elementStyles: {
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
    },
  });

  const lineWrapper = ElementModel.text.lineAdjustmentInset({
    element: document.createElement('div'),
    elementStyles: {
      pseudoBefore: {
        backgroundColor: `${isThemeDark ? token.color.gold : token.color.red}`,
      },
    },
  });

  if (subText) {
    const styledSubText = ElementModel.headline.sansSmall({
      element: subText,
      isThemeDark,
      elementStyles: {
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
      },
    });

    lineWrapper.element.appendChild(styledSubText.element);
    lineWrapper.styles += styledSubText.styles;
  }

  if (name) {
    const styledName = ElementModel.headline.campaignLarge({
      element: name,
      isThemeDark,
      elementStyles: {
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
      },
    });

    lineWrapper.element.appendChild(styledName.element);
    lineWrapper.styles += styledName.styles;
  }

  if (job) {
    const styledJob = ElementModel.headline.sansMedium({
      element: job,
      isThemeDark,
      elementStyles: {
        element: {
          display: 'block',
        },
      },
    });
    lineWrapper.element.appendChild(styledJob.element);
    lineWrapper.styles += styledJob.styles;
  }

  container.element.appendChild(lineWrapper.element);
  container.styles += lineWrapper.styles;

  return container;
};

export default (props: PersonHero) => {
  const { breadcrumbMobile, breadcrumbDesktop } = props;
  const composite = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-person-hero',
    elementStyles: {
      element: {
        overflow: 'hidden',
        containerType: 'inline-size',
      },
    },
  });
  const elementLock = ElementModel.layout.spaceHorizontalMax({
    element: document.createElement('div'),
    elementStyles: {
      element: {
        [`@container (max-width: ${token.media.breakpoints.large.max})`]: {
          padding: '0',
        },
      },
    },
  });

  const elementWrapper = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-person-hero-wrapper',
    elementStyles: {
      element: {
        [`@container (min-width: ${token.media.breakpoints.tablet.min})`]: {
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: `${token.spacing['7xl']}`,
        },
      },
    },
  });

  const textColumns = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-person-hero-columns',
    elementStyles: {
      element: {
        [`@container (min-width: ${token.media.breakpoints.tablet.min})`]: {
          width: '70%',
        },
      },
    },
  });

  const textContainer = CreateTextContainer(props);

  textColumns.element.appendChild(textContainer.element);
  textColumns.styles += textContainer.styles;
  elementWrapper.element.appendChild(textColumns.element);
  elementWrapper.styles += textColumns.styles;

  if (breadcrumbDesktop) {
    const textColumnBreadcrumb = ElementModel.create({
      element: document.createElement('div'),
      className: 'umd-person-hero-breadcrumb-desktop',
      elementStyles: {
        element: {
          [`@container (max-width: ${token.media.breakpoints.large.max})`]: {
            display: 'none',
          },
        },
      },
    });

    textColumnBreadcrumb.element.appendChild(breadcrumbDesktop);
    textColumns.element.appendChild(textColumnBreadcrumb.element);
    elementWrapper.styles += textColumnBreadcrumb.styles;
  }

  const imageBlock = CreateImageBlock(props);
  elementWrapper.element.appendChild(imageBlock.element);
  elementWrapper.styles += imageBlock.styles;

  elementLock.element.appendChild(elementWrapper.element);
  elementLock.styles += elementWrapper.styles;

  composite.element.appendChild(elementLock.element);
  composite.styles += elementLock.styles;

  if (breadcrumbMobile) {
    const mainBreadcrumb = ElementModel.create({
      element: document.createElement('div'),
      className: 'umd-person-hero-breadcrumb-mobile',
      elementStyles: {
        element: {
          paddingLeft: `${token.spacing.md}`,
          paddingRight: `${token.spacing.md}`,

          [`@container (min-width: ${token.media.breakpoints.tablet.min})`]: {
            display: 'none',
          },
        },
      },
    });

    mainBreadcrumb.element.appendChild(breadcrumbMobile);
    elementLock.element.appendChild(mainBreadcrumb.element);
    composite.styles += mainBreadcrumb.styles;
  }

  return composite;
};
