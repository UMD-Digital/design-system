import { Tokens } from '@universityofmaryland/variables';

type TypeUtilitySearchProps = {
  isSearchDomain?: boolean;
};

const { Colors, Spacing } = Tokens;

const SEARCH_URL = 'https://search.umd.edu';
const ANIMATION_IN_SPEED = 800;
const ANIMATION_OUT_SPEED = 400;
const LARGE = 1024;

const ATTRIBUTE_LAYOUT = 'layout';
const LAYOUT_DESKTOP = 'desktop';
const LAYOUT_MOBILE = 'mobile';

const IS_LAYOUT_DESKTOP = `[${ATTRIBUTE_LAYOUT}=${LAYOUT_DESKTOP}]`;
const IS_LAYOUT_MOBILE = `[${ATTRIBUTE_LAYOUT}=${LAYOUT_MOBILE}]`;

const ELEMENT_UTILITY_FORM = 'element-utility-form';
const ELEMENT_UTILITY_FORM_WRAPPER = 'element-utility-form-wrapper';

const OVERWRITE_UTILITY_FORM_LAYOUT_DESKTOP = `.${ELEMENT_UTILITY_FORM}${IS_LAYOUT_DESKTOP}`;
const OVERWRITE_UTILITY_FORM_LAYOUT_MOBILE = `.${ELEMENT_UTILITY_FORM}${IS_LAYOUT_MOBILE}`;

const OverwriteLayoutDesktop = `
  ${OVERWRITE_UTILITY_FORM_LAYOUT_DESKTOP} {
    margin: 0;
    padding: 0;
    display: none;
    overflow: hidden;
    min-width: 420px;
    height: 0;
    position: absolute;
    top: 48px;
    right: 0;
    background-color: ${Colors.white};
    transition: height ${ANIMATION_OUT_SPEED}ms;
  }

  ${ELEMENT_UTILITY_FORM}[aria-hidden="true"] {
    transition: height ${ANIMATION_OUT_SPEED}ms;
  }

  ${ELEMENT_UTILITY_FORM}[aria-hidden="false"] {
    transition: height ${ANIMATION_IN_SPEED}ms;
  }
`;

const OverwriteLayoutMobile = `
  ${OVERWRITE_UTILITY_FORM_LAYOUT_MOBILE} {
    padding: ${Spacing.md} ${Spacing.lg};
    order: 1;
    display: block;
    height: auto;
  }
`;

// prettier-ignore
const FormElementsStyles = `
  .${ELEMENT_UTILITY_FORM} input[type="text"] {
    width: calc(100% - 120px);
    display: block;
    padding: 0 10px;
    height: 44px;
    font-family: Source Sans,Source Sans Pro,sans-serif;
    font-size: 13px;
    line-height: 1.3;
    border: 1px solid #ccc;
  }

  .${ELEMENT_UTILITY_FORM} input[type="submit"] {
    border: none;
    background-color: ${Colors.red};
    color: ${Colors.white};
    font-weight: 700;
    font-size: 12px;
    transition: background ${ANIMATION_OUT_SPEED}ms;
    min-width: 120px;
    height: 44px;
  }

  .${ELEMENT_UTILITY_FORM} input[type="submit"]:hover,
  .${ELEMENT_UTILITY_FORM} input[type="submit"]:focus {
    background-color: ${Colors.redDark};
    transition: background ${ANIMATION_IN_SPEED}ms;
  }
`;

// prettier-ignore
const FormWrapperStyles = `
  .${ELEMENT_UTILITY_FORM_WRAPPER} {
    display: flex;
  }

  @container (min-width: ${LARGE}px) {
    .${ELEMENT_UTILITY_FORM_WRAPPER} {
      padding: 10px;
    }
  }
`;

// prettier-ignore
const STYLES_NAV_UTILITY_SEARCH = `
  ${FormWrapperStyles}
  ${FormElementsStyles}
  ${OverwriteLayoutDesktop}
  ${OverwriteLayoutMobile}
`

const CreateNavUtilitySearch = ({ isSearchDomain }: TypeUtilitySearchProps) =>
  (() => {
    const isDesktop = window.innerWidth >= LARGE;
    const form = document.createElement('form');
    const wrapper = document.createElement('div');
    const inputTextLabel = document.createElement('label');
    const inputText = document.createElement('input');
    const inputSubmit = document.createElement('input');

    inputTextLabel.innerHTML = 'Search input';
    inputTextLabel.setAttribute('for', 'input-text');
    inputTextLabel.classList.add('sr-only');

    inputText.setAttribute('type', 'text');
    inputText.setAttribute('id', 'input-text');
    inputText.setAttribute('name', 'query');
    inputText.setAttribute(
      'placeholder',
      'Search for People, places and things',
    );
    inputText.setAttribute('required', '');

    inputSubmit.setAttribute('type', 'submit');
    inputSubmit.value = 'Submit';

    wrapper.appendChild(inputTextLabel);
    wrapper.appendChild(inputText);
    wrapper.appendChild(inputSubmit);
    wrapper.classList.add(ELEMENT_UTILITY_FORM_WRAPPER);

    form.setAttribute('id', ELEMENT_UTILITY_FORM);
    form.classList.add(ELEMENT_UTILITY_FORM);
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      let searchString = `#gsc.tab=0&gsc`;

      if (isSearchDomain) {
        searchString += `.q=site:${window.location.hostname} ${inputText.value}`;
      } else {
        searchString += `.q=${inputText.value}`;
      }

      searchString += `&gsc.sort=`;

      window.open(`${SEARCH_URL}${encodeURI(searchString)}`, '_blank');
    });

    if (isDesktop) {
      form.setAttribute('aria-hidden', 'true');
      form.setAttribute(ATTRIBUTE_LAYOUT, LAYOUT_DESKTOP);
    } else {
      form.setAttribute('aria-hidden', 'false');
      form.setAttribute(ATTRIBUTE_LAYOUT, LAYOUT_MOBILE);
    }

    form.appendChild(wrapper);

    return form;
  })();

export default {
  CreateElement: CreateNavUtilitySearch,
  Styles: STYLES_NAV_UTILITY_SEARCH,
  Elements: {
    form: ELEMENT_UTILITY_FORM,
  },
};
