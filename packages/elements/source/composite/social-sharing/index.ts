import { Tokens } from '@universityofmaryland/variables';
import { Asset, Performance } from 'utilities';

type TypeSocialSharingProps = {
  isFixed?: boolean;
  includeFacebook?: boolean;
  includeTwitter?: boolean;
  includeEmail?: boolean;
  includePrint?: boolean;
  title?: string | null;
  url?: string | null;
};

const { Colors, Queries, Spacing } = Tokens;

const ATTRIBUTE_FIXED = 'fixed';

const IS_FIXED = `[${ATTRIBUTE_FIXED}]`;

const ELEMENT_NAME = 'umd-element-social-sharing';
const ELEMENT_SOCIAL_SHARING_DECLARATION = 'social-sharing-declarion';
const ELEMENT_SOCIAL_SHARING_CONTAINER = 'social-sharing-container';

const OVERWRITE_FIXED_CONTAINER = `.${ELEMENT_SOCIAL_SHARING_CONTAINER}${IS_FIXED}`;

// prettier-ignore
const OverwriteFixed = `
  @media (${Queries.tablet.min}) {
    ${OVERWRITE_FIXED_CONTAINER} {
      flex-direction: column;
    }
  }

  @media (${Queries.tablet.min}) {
    ${OVERWRITE_FIXED_CONTAINER} > *:not(:last-child) {
      border-right: 1px solid ${Colors.gray.light};
      border-bottom: none;
    }
  }
`

// prettier-ignore
const ContainerStyles = `
  .${ELEMENT_SOCIAL_SHARING_CONTAINER} {
    display: flex;
    transition: transform 250ms ease-in-out;
  }
  
  .${ELEMENT_SOCIAL_SHARING_CONTAINER} > * {
    height: ${Spacing['2xl']};
    width: ${Spacing['2xl']};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${Colors.gray.light};
    background-color: ${Colors.white};
    transition: background-color 250ms ease-in-out;
  }

  .${ELEMENT_SOCIAL_SHARING_CONTAINER} > button:hover,
  .${ELEMENT_SOCIAL_SHARING_CONTAINER} > button:focus,
  .${ELEMENT_SOCIAL_SHARING_CONTAINER} > a:hover,
  .${ELEMENT_SOCIAL_SHARING_CONTAINER} > a:focus {
    background-color: ${Colors.gray.dark};

    & svg path {
      fill: ${Colors.white};
    }
  }

  .${ELEMENT_SOCIAL_SHARING_CONTAINER} > *:not(:last-child) {
    border-right: none;
  }
  
  .${ELEMENT_SOCIAL_SHARING_CONTAINER} svg {
    display: block;
    transition: fill 250ms ease-in-out;
  }
  
  .${ELEMENT_SOCIAL_SHARING_CONTAINER} svg path {
    fill: ${Colors.black};
  }

  .${ELEMENT_SOCIAL_SHARING_CONTAINER} svg#icon_facebook {
    width: 34px;
    height: 30px;
  }

  .${ELEMENT_SOCIAL_SHARING_CONTAINER} svg#icon_email {
    width: 21px;
    height: 20px;
  }
`

// prettier-ignore
const STYLES_SOCIAL_SHARING_ELEMENT = `
  .${ELEMENT_SOCIAL_SHARING_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${ContainerStyles}
  ${OverwriteFixed}
`;

const CreateFacebook = () => {
  const button = document.createElement('button');

  button.innerHTML = Asset.social.FACEBOOK;
  button.setAttribute('aria-label', 'share this page on facebook');

  button.addEventListener('click', () => {
    const shareURL = `http://www.facebook.com/share.php?u=${encodeURIComponent(
      window.location.toString(),
    )}`;

    window.open(
      shareURL,
      'Facebook',
      'toolbar=0,status=0,width=626,height=436',
    );
  });

  return button;
};

const CreateTwitter = ({ url, title }: { url: string; title: string }) => {
  const button = document.createElement('button');

  button.innerHTML = Asset.social.X;
  button.setAttribute('aria-label', 'share this page on twitter');

  button.addEventListener('click', () => {
    const shareURL = `http://twitter.com/share?url=${url}&text=${title}`;

    window.open(shareURL, 'sharer', 'toolbar=0,status=0,width=626,height=436');
  });

  return button;
};

const CreateEmail = ({ url, title }: { url: string; title: string }) => {
  const link = document.createElement('a');

  link.href = `mailto:?subject=${title}&body=${url}`;
  link.setAttribute('aria-label', 'email this page');
  link.setAttribute('target', '_blank');

  link.innerHTML = Asset.icon.EMAIL;

  return link;
};

const CreatePrint = () => {
  const button = document.createElement('button');

  button.innerHTML = Asset.icon.PRINTER;
  button.setAttribute('aria-label', 'print this page');
  button.addEventListener('click', () => window.print());

  return button;
};

const CreateSocialSharingElement = (props: TypeSocialSharingProps) =>
  (() => {
    const {
      includeFacebook = true,
      includeTwitter = true,
      includeEmail = false,
      includePrint = false,
      title: defaultTitle,
      url: defaultUrl,
      isFixed = false,
    } = props;
    const declaration = document.createElement('div');
    const container = document.createElement('div');
    const defaultStartingPosition = `translateX(-100vh)`;
    const title = defaultTitle || document.title;
    const url = defaultUrl || window.location.toString();

    const getSpacing = () => (window.innerWidth > 768 ? 40 : 8);
    let startingPosition: null | number = null;
    let isShowing = false;

    const eventResize = () => {
      startingPosition = declaration.getBoundingClientRect().left;
    };

    const eventScroll = () => {
      const windowHeight = window.innerHeight;
      const pagePosition = window.scrollY;
      const isNearBottom =
        pagePosition + windowHeight >=
        document.body.scrollHeight - windowHeight / 2;
      const showWindow = !isNearBottom;

      if (showWindow) {
        setVisiblePosition();
      } else {
        setHiddenPosition();
      }
    };

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
          container.style.transform = defaultStartingPosition;
        }
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

    container.classList.add(ELEMENT_SOCIAL_SHARING_CONTAINER);

    if (includeFacebook) {
      container.appendChild(CreateFacebook());
    }

    if (includeTwitter) {
      container.appendChild(
        CreateTwitter({
          title,
          url,
        }),
      );
    }

    if (includeEmail) {
      container.appendChild(
        CreateEmail({
          title,
          url,
        }),
      );
    }

    if (includePrint) {
      container.appendChild(CreatePrint());
    }

    declaration.appendChild(container);
    declaration.classList.add(ELEMENT_SOCIAL_SHARING_DECLARATION);

    if (isFixed) {
      container.setAttribute(ATTRIBUTE_FIXED, '');
      window.addEventListener(
        'scroll',
        Performance.debounce(() => eventScroll(), 20),
      );

      window.addEventListener(
        'resize',
        Performance.debounce(() => eventResize(), 20),
      );
    }

    return {
      element: declaration,
      events: {
        load,
      },
      styles: STYLES_SOCIAL_SHARING_ELEMENT,
    };
  })();

export default CreateSocialSharingElement;
