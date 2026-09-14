import * as token from '@universityofmaryland/web-token-library';
import * as animation from '@universityofmaryland/web-styles-library/animation';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { wrapLinkForAnimation } from '@universityofmaryland/web-utilities-library/animation';
import { handleKeyboardNavigation } from '@universityofmaryland/web-utilities-library/events';
import { chevron_down as iconChevronDown } from '@universityofmaryland/web-icons-library/controls';

type TypePrimaryLinkRequirements = {
  primaryLinkContainer?: HTMLElement | null;
  context?: HTMLElement;
};

type TypeDropdownProps = {
  dropdownLinksContainer?: HTMLElement | null;
  dropdownCalloutsSlot?: HTMLSlotElement | null;
};

type TypePrimaryLinkButtonProps = {
  buttonClick: () => void;
  navItemName: string;
};

type TypePrimaryLinkProps = TypePrimaryLinkRequirements &
  TypeDropdownProps &
  TypePrimaryLinkButtonProps & {
    hasDropdown: boolean;
  };

export type TypeNavItemRequirements = TypeDropdownProps &
  TypePrimaryLinkRequirements;

type TypeNavItem = TypeNavItemRequirements;

const ATTRIBUTE_SHOWING = 'data-showing';
const ATTRIBUTE_SELECTED = 'data-selected';
const BOUNDS_SHIFT = 140;
const MAX_COLUMN_ITEMS = 8;

const createMultipleColumns = ({ links }: { links: HTMLAnchorElement[] }) => {
  const firstColumnLinks = links.splice(0, Math.ceil(links.length / 2));

  firstColumnLinks.forEach((link) => wrapLinkForAnimation({ element: link }));
  links.forEach((link) => wrapLinkForAnimation({ element: link }));

  return [
    new ElementBuilder().withChildren(...firstColumnLinks),
    new ElementBuilder().withChildren(...links),
  ];
};

const createSingleColumn = ({ links }: { links: HTMLAnchorElement[] }) => {
  links.forEach((link) => wrapLinkForAnimation({ element: link }));

  return new ElementBuilder().withChildren(...links);
};

const createDropdownCtaColumn = (dropdownCalloutsSlot?: HTMLElement | null) => {
  if (!dropdownCalloutsSlot) return null;

  return new ElementBuilder()
    .withClassName('nav-item-dropdown-cta-column')
    .withChild(dropdownCalloutsSlot);
};

const createDropdown = ({
  dropdownLinksContainer,
  dropdownCalloutsSlot,
}: TypeDropdownProps) => {
  if (!dropdownLinksContainer) return null;

  const links = Array.from(
    dropdownLinksContainer.querySelectorAll('a'),
  ) as HTMLAnchorElement[];
  const isMultipleColumn =
    links.length > MAX_COLUMN_ITEMS || Boolean(dropdownCalloutsSlot);

  let columnChildren = [createSingleColumn({ links })];

  if (links.length > MAX_COLUMN_ITEMS) {
    columnChildren = createMultipleColumns({ links });
  }

  const dropdownCtaColumn = createDropdownCtaColumn(dropdownCalloutsSlot);

  const wrapperChildren = [...columnChildren, dropdownCtaColumn].filter(
    (child) => child != null,
  );

  const wrapper = new ElementBuilder()
    .withClassName('nav-item-dropdown-list')
    .withChildren(...wrapperChildren)
    .withStyles({
      element: {
        backgroundColor: token.color.white,
        borderTop: `2px solid ${token.color.red}`,
        padding: token.spacing.lg,
        boxShadow: '-1px 9px 32px -10px rgba(0,0,0,0.19)',

        '& a': {
          display: 'block',
          minWidth: '120px',
          maxWidth: '230px',
          fontWeight: 700,
          fontSize: '14px',
          lineHeight: '1.5em',
          ...animation.line.slideUnderRed,
        },

        '& a:hover, & a:focus': {
          color: token.color.red,
        },

        '& a + a': {
          marginTop: token.spacing.md,
          display: 'block',
        },

        [`& a[${ATTRIBUTE_SELECTED}] span:not(.sr-only)`]: {
          display: 'inline',
          position: 'relative',
          backgroundPosition: 'left calc(100% - 0px)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 2.5px',
          backgroundImage: `linear-gradient(${token.color.gold}, ${token.color.gold})`,
        },

        [`& a[${ATTRIBUTE_SELECTED}]:hover span, & a[${ATTRIBUTE_SELECTED}]:focus span`]:
          {
            borderBottom: 'none',
          },

        ...(isMultipleColumn && {
          display: 'flex',
          justifyContent: 'space-between',

          '& > *': {
            minWidth: '232px',
          },

          '& > *:not(:first-child)': {
            marginLeft: '40px',
          },
        }),
      },
    });

  return new ElementBuilder()
    .withClassName('nav-item-dropdown-container')
    .withChild(wrapper)
    .withStyles({
      element: {
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        minWidth: '200px',
        width: 'auto',
        paddingTop: token.spacing.sm,
        display: 'none',

        [`.nav-item-container[data-dropdown][${ATTRIBUTE_SHOWING}] &`]: {
          display: 'block',
        },

        '.nav-item-container:focus-within &': {
          display: 'block',
        },
      },
    });
};

const createButton = ({
  buttonClick,
  navItemName,
}: TypePrimaryLinkButtonProps) =>
  new ElementBuilder('button')
    .withClassName('nav-item-primary-link-button')
    .withHTML(iconChevronDown)
    .withAttribute('aria-expanded', 'false')
    .withAttribute('aria-controls', 'nav-links-')
    .withAttribute('aria-label', `List of menu items for ${navItemName}`)
    .withStyles({
      element: {
        position: 'absolute',
        top: '2px',
        right: '-20px',
        transition: 'transform .5s',

        '& svg': {
          fill: token.color.red,
          height: '14px',
          width: '14px',
          transform: 'rotate(0deg) translateY(0)',
          transition: 'fill .5s,transform .5s',
        },

        [`.nav-item-container[data-dropdown][${ATTRIBUTE_SHOWING}] &`]: {
          transform: 'rotate(180deg) translateY(4px)',
        },
      },
    })
    .on('click', () => buttonClick());

const createPrimaryLinkAnchor = ({
  primaryLinkContainer,
  hasDropdown,
}: {
  primaryLinkContainer?: HTMLElement | null;
  hasDropdown: boolean;
}) => {
  if (!primaryLinkContainer) return null;

  const clonedPrimaryLink = primaryLinkContainer.cloneNode(true) as HTMLElement;

  return new ElementBuilder(clonedPrimaryLink)
    .withClassName('nav-item-primary-link')
    .withStyles({
      element: {
        color: token.color.black,
        fontSize: token.font.size.base,
        transition: 'color 0.2s ease-in-out',
        fontWeight: 700,
        textWrap: 'pretty',
        display: 'flex',
        alignItems: 'flex-end',
        textAlign: 'right',
        lineHeight: '1.15em !important',
        letterSpacing: '0 !important',
        wordSpacing: '0 !important',

        '&:hover, &:focus': {
          color: token.color.red,
        },

        [`&[${ATTRIBUTE_SELECTED}] span`]: {
          display: 'inline',
          position: 'relative',
          backgroundPosition: 'left calc(100% - 0px)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 2.5px',
          backgroundImage: `linear-gradient(${token.color.gold}, ${token.color.gold})`,
        },

        [`.nav-item-container[data-dropdown] &[${ATTRIBUTE_SELECTED}]:before`]:
          {
            bottom: '1px',
            right: '20px',
          },
      },
    });
};

const createDropdownButton = ({
  hasDropdown,
  buttonClick,
  navItemName,
}: TypePrimaryLinkButtonProps & { hasDropdown?: boolean }) => {
  if (!hasDropdown) return null;

  return createButton({ buttonClick, navItemName });
};

const createPrimaryLink = (props: TypePrimaryLinkProps) => {
  const { hasDropdown, primaryLinkContainer, navItemName, buttonClick } = props;

  const primaryLinkAnchor = createPrimaryLinkAnchor({
    primaryLinkContainer,
    hasDropdown,
  });
  const button = createDropdownButton({
    hasDropdown,
    buttonClick,
    navItemName,
  });
  const dropdown = createDropdown(props);

  const wrapperChildren = [primaryLinkAnchor, button, dropdown].filter(
    (child) => child != null,
  );

  const wrapper = new ElementBuilder()
    .withClassName('nav-item-primary-link-wrapper')
    .withChildren(...wrapperChildren)
    .withStyles({
      element: {
        display: 'block',
        position: 'relative',
      },
    });

  return new ElementBuilder()
    .withClassName('nav-item-primary-link-container')
    .withChild(wrapper)
    .withStyles({
      element: {
        position: 'relative',
      },
    });
};

export const createCompositeNavigationItem = (props: TypeNavItem) => {
  const { dropdownLinksContainer, primaryLinkContainer, context } = props;

  if (!primaryLinkContainer) {
    throw new Error('Primary link is required for a nav item');
  }

  const dropDownContainerLinks = dropdownLinksContainer?.children;
  const hasDropdown =
    (dropDownContainerLinks && dropDownContainerLinks.length > 0) || false;
  const navItemName = primaryLinkContainer.innerHTML
    .replace(/(<([^>]+)>)/gi, '')
    .trim();

  let isShowing = false;
  let focusCallback = () => {};

  let containerBuilder = new ElementBuilder()
    .withClassName('nav-item-container')
    .withStyles({
      element: {
        position: 'relative',
        zIndex: 9999,

        '& a': {
          fontFamily: token.font.family.sans,
          fontWeight: 700,
          color: token.color.black,
          textDecoration: 'none',
        },

        '&[data-dropdown]': {
          paddingRight: '20px',
        },
      },
    });

  const elementContainer = containerBuilder.getElement();

  const onLoadDropdownSpans = () => {
    if (!dropdownLinksContainer) return;

    const links = Array.from(
      dropdownLinksContainer.querySelectorAll('a'),
    ) as HTMLAnchorElement[];

    links.forEach((link) => {
      const hasSpan = link.querySelector('span');

      if (!hasSpan) {
        wrapLinkForAnimation({ element: link });
        link.appendChild(link);
      }
    });
  };

  const dropdownPositionPerViewPort = () => {
    const elementBounds = elementContainer.getBoundingClientRect();
    const dropdownContainer = elementContainer.querySelector(
      '.nav-item-dropdown-container',
    ) as HTMLDivElement;
    const width = elementContainer.offsetWidth;

    if (!dropdownContainer) return;

    const size = dropdownContainer.offsetWidth + BOUNDS_SHIFT;

    if (elementBounds.left + width < size) {
      dropdownContainer.style.left = '0';
      dropdownContainer.style.transform = 'translateX(0)';
    }

    if (window.innerWidth - elementBounds.right < size / 2) {
      dropdownContainer.style.right = '0';
      dropdownContainer.style.left = 'inherit';
      dropdownContainer.style.transform = 'translateX(0)';
    }
  };

  const showDropdown = () => {
    if (elementContainer.hasAttribute(ATTRIBUTE_SHOWING)) return;
    elementContainer.setAttribute(ATTRIBUTE_SHOWING, '');
    dropdownPositionPerViewPort();
    focusCallback = handleKeyboardNavigation({
      element: elementContainer,
      action: () => hideDropdown(),
      shadowDomContext: context,
    });
  };

  const hideDropdown = () => {
    elementContainer.removeAttribute(ATTRIBUTE_SHOWING);
    focusCallback();
    focusCallback = () => {};
  };

  const eventButtonClick = () => {
    if (isShowing && dropdownLinksContainer) {
      showDropdown();

      setTimeout(() => {
        const firstElement = dropdownLinksContainer.querySelector(
          'a',
        ) as HTMLAnchorElement;

        if (firstElement) firstElement.focus();
      }, 100);
    }

    if (!isShowing) hideDropdown();
  };

  const buttonClick = () => {
    isShowing = !isShowing;
    eventButtonClick();
  };

  const linkContainer = createPrimaryLink({
    ...props,
    hasDropdown,
    buttonClick,
    navItemName,
  });

  if (hasDropdown) {
    containerBuilder = containerBuilder.withAttribute('data-dropdown', '');
  }

  containerBuilder = containerBuilder.withChild(linkContainer);

  elementContainer.addEventListener('mouseover', () => {
    isShowing = true;
    showDropdown();
  });

  elementContainer.addEventListener('mouseleave', () => {
    isShowing = false;
    hideDropdown();
  });

  setTimeout(() => {
    onLoadDropdownSpans();
  }, 10);

  return containerBuilder.build();
};
