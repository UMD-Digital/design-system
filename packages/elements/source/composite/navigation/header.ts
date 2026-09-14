import * as token from '@universityofmaryland/web-token-library';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { isExternalUrl } from '@universityofmaryland/web-utilities-library/network';
import { search as iconSearch } from '@universityofmaryland/web-icons-library/search';
import { createCompositeNavigationMenuButton as MenuButton } from './elements/menu-button';

type TypeLogoRequirments = {
  logo?: HTMLElement | null;
  eventOpen?: () => void;
};

type TypeSearchLink = {
  searchUrl: string | null;
};

type TypeCtaLink = {
  ctaUrl: string | null;
  ctaText: string | null;
};

type TypeNavRow = TypeSearchLink &
  TypeCtaLink & {
    utilityRow?: HTMLElement | null;
    navItems?: HTMLElement[];
  };

type TypeHeaderRequirements = TypeLogoRequirments & TypeNavRow;

const ANIMATION_TIME = 500;

const ATTRIBUTE_STICKY = 'data-sticky';
const ATTRIBUTE_CTA = 'data-cta';

const createSearchLink = ({ searchUrl }: TypeSearchLink) => {
  if (!searchUrl) return null;

  return new ElementBuilder('a')
    .withClassName('element-header-menu-search')
    .withAttribute('href', searchUrl)
    .withAria({ label: 'Visit the search page' })
    .withHTML(iconSearch);
};

const createCtaLink = ({ ctaUrl, ctaText }: TypeCtaLink) => {
  if (!ctaUrl || !ctaText) return null;

  let ctaBuilder = new ElementBuilder('a')
    .withClassName('element-header-menu-cta')
    .withAttribute('href', ctaUrl)
    .withHTML(ctaText)
    .withStyles({
      element: {
        color: token.color.white,
        fontWeight: token.font.weight.bold,
        fontSize: token.font.size.sm,
        padding: token.spacing.xs,
        backgroundColor: token.color.red,
        transition: 'background .5s',
        whiteSpace: 'nowrap',

        '&:hover, &:focus': {
          backgroundColor: token.color.redDark,
        },
      },
    });

  if (isExternalUrl(ctaUrl)) {
    ctaBuilder = ctaBuilder.withAttribute('target', '_blank');
  }

  return ctaBuilder;
};

const createUtilityRow = (utilityRow?: HTMLElement | null) => {
  if (!utilityRow) return null;

  return new ElementBuilder()
    .withClassName('element-header-utility-row')
    .withChild(utilityRow)
    .withStyles({
      element: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: token.spacing.sm,

        '& ::slotted(*)': {
          display: 'flex',
          justifyContent: 'flex-end',
          gap: token.spacing.md,
        },
      },
    });
};

const createNavigationColumn = ({
  utilityRow,
  navItems,
  searchUrl,
  ctaText,
  ctaUrl,
}: TypeNavRow) => {
  if (!navItems) return null;

  const searchLink = createSearchLink({ searchUrl });
  const ctaLink = createCtaLink({ ctaText, ctaUrl });
  const utilityRowContainer = createUtilityRow(utilityRow);

  const navRowChildren = [...navItems, searchLink, ctaLink].filter(
    (child) => child != null,
  );

  const navRowContainer = new ElementBuilder()
    .withClassName('element-header-navigation-row')
    .withChildren(...navRowChildren)
    .withStyles({
      element: {
        display: 'grid',
        gridAutoFlow: 'column',

        '& > *': {
          display: 'block',
        },

        '& > *:not(:first-child)': {
          marginLeft: token.spacing.md,
        },

        '& svg': {
          width: '24px',
          height: '24px',
          fill: token.color.black,
        },
      },
    });

  const navigationColumnChildren = [
    utilityRowContainer,
    navRowContainer,
  ].filter((child) => child != null);

  return new ElementBuilder()
    .withClassName('element-header-navigation-column')
    .withChildren(...navigationColumnChildren)
    .withStyles({
      element: {
        '@media (max-width: 1240px)': {
          display: 'none',
        },
      },
    });
};

const createMenuButton = ({ eventOpen }: TypeLogoRequirments) => {
  if (!eventOpen) return null;

  return MenuButton({ eventOpen })
    .withClassName('element-header-menu-button')
    .withStyles({
      element: {
        borderRight: `1px solid ${token.color.gray.light}`,
        paddingRight: token.spacing.min,
        marginRight: token.spacing.sm,
      },
    });
};

const createLogo = ({ logo }: TypeLogoRequirments) => {
  if (!logo) return null;

  const childrenText = Array.from(logo.children).reduce(
    (accumulator, child) => {
      if (child.nodeName === 'IMG') return accumulator;
      if (child.textContent) return accumulator + child.textContent.length;
      return accumulator;
    },
    0,
  );

  let logoBuilder = new ElementBuilder(logo)
    .withClassName('element-header-logo')
    .withStyles({
      element: {
        display: 'grid',
        justifyContent: 'flex-start',
        maxWidth: '350px',

        '&:has(img[src*=".svg"]) img': {
          height: '240px',
        },

        ...typography.sans.larger,
        lineHeight: '1.05em',
        width: '100%',
        fontWeight: 700,

        '& *': {
          ...typography.sans.larger,
          lineHeight: '1.05em',
          width: '100%',
          fontWeight: 700,
        },

        '&[size="large"]': {
          ...typography.sans.extraLarge,
        },

        '&[size="large"] *': {
          ...typography.sans.extraLarge,
        },

        '& img': {
          width: '100%',
          maxHeight: '48px',
          maxWidth: '190px',

          [`@media (${token.media.queries.tablet.min})`]: {
            maxWidth: '240px',
          },
        },
      },
    });

  if (childrenText < 30) {
    logoBuilder = logoBuilder.withAttribute('size', 'large');
  }

  return logoBuilder;
};

const createLogoColumn = (props: TypeLogoRequirments) => {
  const menuButton = createMenuButton(props);
  const logo = createLogo(props);

  const logoColumnChildren = [menuButton, logo].filter(
    (child) => child != null,
  );

  return new ElementBuilder()
    .withClassName('element-header-logo-column')
    .withChildren(...logoColumnChildren)
    .withStyles({
      element: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-start',
        position: 'relative',
        width: '100%',
        maxWidth: '400px',
      },
    });
};

export const createCompositeNavigationHeader = (
  props: TypeHeaderRequirements,
) => {
  const { ctaUrl, ctaText } = props;

  const logoColumn = createLogoColumn(props);
  const navigationColumn = createNavigationColumn(props);

  const containerBuilder = new ElementBuilder()
    .withClassName('element-header-container')
    .withStyles({
      element: {
        backgroundColor: token.color.white,
        display: 'block',
        padding: `${token.spacing.md} 0`,
        position: 'relative',
        transition: `padding ${ANIMATION_TIME}ms`,

        [`&[${ATTRIBUTE_STICKY}="true"]`]: {
          padding: `${token.spacing.xs} 0`,
        },

        [`&[${ATTRIBUTE_STICKY}="true"] .element-header-logo img`]: {
          maxHeight: '30px',
        },
      },
    });

  const containerElement = containerBuilder.getElement();
  let isElementSticky = false;

  const eventSticky = ({ isSticky }: { isSticky: boolean }) => {
    const utility = containerElement.querySelector(
      '.element-header-utility-row',
    ) as HTMLDivElement;

    if (isSticky && isElementSticky) return;

    if (isSticky) {
      isElementSticky = true;
      containerElement.setAttribute(ATTRIBUTE_STICKY, 'true');

      if (utility) utility.style.display = 'none';
    }
    if (!isSticky) {
      isElementSticky = false;
      containerElement.removeAttribute(ATTRIBUTE_STICKY);

      if (utility) utility.style.display = 'block';
    }
  };

  const wrapperChildren = [logoColumn, navigationColumn].filter(
    (child) => child != null,
  );

  let wrapperBuilder = new ElementBuilder()
    .withClassName('element-header-wrapper')
    .withChildren(...wrapperChildren)
    .withStyles({
      element: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: token.spacing.lg,
        zIndex: 999,

        [`&[${ATTRIBUTE_CTA}="true"] .element-header-navigation-row`]: {
          paddingTop: token.spacing.sm,
        },

        [`&[${ATTRIBUTE_CTA}="true"] .element-header-menu-cta`]: {
          marginTop: `-${token.spacing.min}`,
        },
      },
    });

  if (ctaUrl && ctaText) {
    wrapperBuilder = wrapperBuilder.withAttribute(ATTRIBUTE_CTA, 'true');
  }

  return new ElementBuilder()
    .withClassName('element-header-declaration')
    .withChild(containerBuilder.withChild(wrapperBuilder))
    .withEvents({ sticky: eventSticky })
    .build();
};
