import * as token from '@universityofmaryland/web-token-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';

type TypeUtilitySearchProps = {
  isSearchDomain?: boolean;
  isLayoutDesktop?: boolean;
  isLayoutMobile?: boolean;
};

const SEARCH_URL = 'https://search.umd.edu';
const ANIMATION_IN_SPEED = 800;
const ANIMATION_OUT_SPEED = 400;

export const createCompositeNavigationSearch = ({
  isSearchDomain,
  isLayoutDesktop,
  isLayoutMobile,
}: TypeUtilitySearchProps) => {
  const inputTextLabel = new ElementBuilder('label')
    .withClassName('sr-only')
    .withAttribute('for', 'input-text')
    .withHTML('Search input');

  const inputTextBuilder = new ElementBuilder('input')
    .withClassName('element-utility-form-input')
    .withAttribute('type', 'text')
    .withAttribute('id', 'input-text')
    .withAttribute('name', 'query')
    .withAttribute('placeholder', 'Search for People, places and things')
    .withAttribute('required', '')
    .withStyles({
      element: {
        width: 'calc(100% - 120px)',
        display: 'block',
        padding: '0 10px',
        height: '44px',
        fontFamily: token.font.family.sans,
        fontSize: '13px',
        lineHeight: '1.3',
        border: '1px solid #ccc',
      },
    });

  const inputTextElement = inputTextBuilder.getElement() as HTMLInputElement;

  const inputSubmit = new ElementBuilder('input')
    .withClassName('element-utility-form-submit')
    .withAttribute('type', 'submit')
    .withAttribute('value', 'Submit')
    .withStyles({
      element: {
        border: 'none',
        backgroundColor: token.color.red,
        color: token.color.white,
        fontWeight: token.font.weight.bold,
        fontSize: token.font.size.min,
        fontFamily: token.font.family.sans,
        transition: `background ${ANIMATION_OUT_SPEED}ms`,
        minWidth: '120px',
        height: '44px',

        '&:hover, &:focus': {
          backgroundColor: token.color.redDark,
          transition: `background ${ANIMATION_IN_SPEED}ms`,
        },
      },
    });

  const wrapper = new ElementBuilder()
    .withClassName('element-utility-form-wrapper')
    .withChildren(inputTextLabel, inputTextBuilder, inputSubmit)
    .withStyles({
      element: {
        display: 'flex',

        [`@container (${token.media.queries.desktop.min})`]: {
          padding: '10px',
        },
      },
    });

  const formBuilder = new ElementBuilder('form')
    .withClassName('element-utility-form')
    .withAttribute('id', 'element-utility-form')
    .withChild(wrapper)
    .withStyles({
      element: {
        '&[data-layout-desktop="true"]': {
          margin: 0,
          padding: 0,
          display: 'none',
          overflow: 'hidden',
          minWidth: '420px',
          height: 0,
          position: 'absolute',
          top: '48px',
          right: 0,
          backgroundColor: token.color.white,
          transition: `height ${ANIMATION_OUT_SPEED}ms`,
        },

        '&[data-layout-mobile="true"]': {
          padding: `${token.spacing.md} ${token.spacing.lg}`,
          order: 1,
          display: 'block',
          height: 'auto',
        },
      },
    })
    .on('submit', (event) => {
      event.preventDefault();

      let searchString = `#gsc.tab=0&gsc`;

      if (isSearchDomain) {
        searchString += `.q=site:${window.location.hostname} ${inputTextElement.value}`;
      } else {
        searchString += `.q=${inputTextElement.value}`;
      }

      searchString += `&gsc.sort=`;

      window.open(`${SEARCH_URL}${encodeURI(searchString)}`, '_blank');
    });

  const isDesktopLayout = isLayoutDesktop ?? !isLayoutMobile;

  if (isDesktopLayout) {
    formBuilder
      .withAttribute('aria-hidden', 'true')
      .withAttribute('data-layout-desktop', 'true')
      .withAttribute('data-layout-mobile', 'false');
  } else {
    formBuilder
      .withAttribute('aria-hidden', 'false')
      .withAttribute('data-layout-desktop', 'false')
      .withAttribute('data-layout-mobile', 'true');
  }

  return formBuilder;
};
