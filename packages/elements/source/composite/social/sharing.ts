import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import { email as iconEmail } from '@universityofmaryland/web-icons-library/communication';
import { print as iconPrint } from '@universityofmaryland/web-icons-library/controls';
import {
  facebook as iconFacebook,
  x as iconX,
} from '@universityofmaryland/web-icons-library/social';
import { debounce } from '@universityofmaryland/web-utilities-library/performance';
import type { ElementModel } from '../../_types';
import type { SocialSharingProps } from './_types';

const createFacebookButton = (): ElementModel<HTMLButtonElement> => {
  const model = new ElementBuilder<HTMLButtonElement>('button')
    .withClassName('social-sharing-facebook')
    .withHTML(iconFacebook)
    .withStyles({
      element: {
        ['& svg']: {
          width: '34px',
          height: '30px',
        },
      },
    })
    .withAria({ label: 'share this page on facebook' })
    .withEvents({
      click: () => {
        const shareURL = `http://www.facebook.com/share.php?u=${encodeURIComponent(
          window.location.toString(),
        )}`;

        window.open(
          shareURL,
          'Facebook',
          'toolbar=0,status=0,width=626,height=436',
        );
      },
    })
    .build();

  return model;
};

const createTwitterButton = ({
  url,
  title,
}: Pick<
  SocialSharingProps,
  'url' | 'title'
>): ElementModel<HTMLButtonElement> => {
  const model = new ElementBuilder<HTMLButtonElement>('button')
    .withHTML(iconX)
    .withAria({ label: 'share this page on twitter' })
    .withEvents({
      click: () => {
        const shareURL = `http://twitter.com/share?url=${url}&text=${title}`;

        window.open(
          shareURL,
          'sharer',
          'toolbar=0,status=0,width=626,height=436',
        );
      },
    })
    .build();

  return model;
};

const createEmailLink = ({
  url,
  title,
}: Pick<
  SocialSharingProps,
  'url' | 'title'
>): ElementModel<HTMLAnchorElement> =>
  new ElementBuilder<HTMLAnchorElement>('a')
    .withClassName('social-sharing-email')
    .withStyles({
      element: {
        ['& svg']: {
          width: '21px',
          height: '20px',
        },
      },
    })
    .withHTML(iconEmail)
    .withAttributes({
      href: `mailto:?subject=${title}&body=${url}`,
      target: '_blank',
    })
    .withAria({ label: 'email this page' })
    .build();

const createPrintButton = (): ElementModel<HTMLButtonElement> => {
  const model = new ElementBuilder<HTMLButtonElement>('button')
    .withHTML(iconPrint)
    .withAria({ label: 'print this page' })
    .withEvents({
      click: () => window.print(),
    })
    .build();

  return model;
};

const createContainer = (
  props: SocialSharingProps,
): ElementModel<HTMLElement> => {
  const {
    includeFacebook = true,
    includeTwitter = true,
    includeEmail = false,
    includePrint = false,
    isFixed = false,
    title: defaultTitle,
    url: defaultUrl,
  } = props;

  const title = defaultTitle || document.title;
  const url = defaultUrl || window.location.toString();

  const container = new ElementBuilder()
    .withClassName('social-sharing-container')
    .withStyles({
      element: {
        display: 'flex',
        transition: 'transform 250ms ease-in-out',

        ['& > *']: {
          height: token.spacing['2xl'],
          width: token.spacing['2xl'],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${token.color.gray.light}`,
          backgroundColor: token.color.white,
          transition: 'background-color 250ms ease-in-out',
        },

        ['& > button:hover, & > button:focus, & > a:hover, & > a:focus']: {
          backgroundColor: token.color.gray.dark,

          ['svg path']: {
            fill: token.color.white,
          },
        },

        ['& > *:not(:last-child)']: {
          borderRight: 'none',
        },

        ['& svg']: {
          display: 'block',
          transition: 'fill 250ms ease-in-out',
        },

        ['& svg path']: {
          fill: token.color.black,
        },

        [`@media (${token.media.queries.tablet.min})`]: {
          ['&[fixed]']: {
            flexDirection: 'column',
          },

          ['&[fixed] > *:not(:last-child)']: {
            borderRight: `1px solid ${token.color.gray.light}`,
            borderBottom: 'none',
          },
        },
      },
    });

  if (isFixed) {
    container.withAttribute('fixed', '');
  }

  if (includeFacebook) {
    container.withChild(createFacebookButton());
  }

  if (includeTwitter) {
    container.withChild(
      createTwitterButton({
        title,
        url,
      }),
    );
  }

  if (includeEmail) {
    container.withChild(
      createEmailLink({
        title,
        url,
      }),
    );
  }

  if (includePrint) {
    container.withChild(createPrintButton());
  }

  return container.build();
};

const setupFixedBehaviour = ({
  container,
  declaration,
}: {
  container: HTMLElement;
  declaration: HTMLElement;
}) => {
  const defaultStartingPosition = -100;

  const getSpacing = () => {
    if (window.innerWidth > 768) {
      return 40;
    }

    return 8;
  };
  let startingPosition: number | null = null;
  let isShowing = false;

  const setVisiblePosition = () => {
    if (!isShowing) {
      container.style.transform = 'translateX(0)';
      isShowing = true;
    }
  };

  const setHiddenPosition = () => {
    if (isShowing) {
      isShowing = false;

      if (startingPosition) {
        const spacing = getSpacing();
        const translateAmount = window.innerWidth - startingPosition;
        const position = translateAmount + spacing + container.offsetWidth;

        container.style.transform = `translateX(-${position}px)`;
      } else {
        container.style.transform = `translateX(${defaultStartingPosition}vh)`;
      }
    }
  };

  const eventResize = () => {
    startingPosition = declaration.getBoundingClientRect().left;
  };

  const eventScroll = () => {
    const windowHeight = window.innerHeight;
    const pagePosition = window.scrollY;
    const isNearBottom =
      pagePosition + windowHeight >=
      document.body.scrollHeight - windowHeight / 2;

    const shouldShow = !isNearBottom;

    if (shouldShow) {
      setVisiblePosition();
    } else {
      setHiddenPosition();
    }
  };

  const load = () => {
    startingPosition = declaration.getBoundingClientRect().left;
    container.style.transition = 'none';
    setHiddenPosition();

    setTimeout(() => {
      container.style.transition = 'transform 250ms ease-in-out';
    }, 100);
  };

  window.addEventListener(
    'scroll',
    debounce(() => eventScroll(), 20),
  );

  window.addEventListener(
    'resize',
    debounce(() => eventResize(), 20),
  );

  return {
    load,
    onScroll: eventScroll,
    onResize: eventResize,
    setHiddenPosition,
  };
};

const CreateSocialSharingElement = (props: SocialSharingProps) => {
  const { isFixed = false } = props;
  const containerModel = createContainer(props);

  const declarationModel = new ElementBuilder()
    .withClassName('social-sharing-declarion')
    .withChild(containerModel)
    .withStyles({
      element: {
        container: 'umd-element-social-sharing / inline-size',
      },
    })
    .build();

  const model: ElementModel<HTMLElement> = {
    ...declarationModel,
  };

  if (isFixed) {
    const { load } = setupFixedBehaviour({
      container: containerModel.element,
      declaration: declarationModel.element,
    });

    model.events = { load };
  }

  return model;
};

export const createCompositeSocialSharing = CreateSocialSharingElement;
