import { Tokens, Typography } from '@universityofmaryland/variables';
import { CheckForAnimationLinkSpan } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

type TypeTextProps = {
  eyebrow?: HTMLElement | null;
  headline: HTMLElement | null;
  richText?: HTMLElement | null;
  actions?: HTMLElement | null;
};

export type TypeTextContainerProps = TypeTextProps;

const { Colors, Spacing } = Tokens;
const { SansMedium } = Typography;

const TABLET = 768;

export const ELEMENT_NAME = 'umd-element-hero-text-container';
export const ELEMENT_TEXT_CONTAINER = 'hero-text-container';
export const ELEMENT_TEXT_CONTAINER_WRAPPER = 'hero-text-container-wrapper';
export const ELEMENT_HERO_EYEBROW = 'hero-eyebrow';
export const ELEMENTS_HERO_HEADLINE = 'hero-headline';
export const ELEMENTS_HERO_RICH_TEXT = 'hero-richtext';
export const ELEMENTS_HERO_ACTION = 'hero-actions';

// prettier-ignore
const EyebrowStyles = `  
  .${ELEMENT_HERO_EYEBROW} + * {
    margin-top: ${Spacing.sm} !important;
  }
`

// prettier-ignore
const HeadlineStyles = `
  .${ELEMENTS_HERO_HEADLINE} {
    text-transform: uppercase;
    color: ${Colors.white};
  }

  .${ELEMENTS_HERO_HEADLINE} + * {
    margin-top: ${Spacing.md};
  }

  .${ELEMENTS_HERO_HEADLINE} > a:hover,
  .${ELEMENTS_HERO_HEADLINE} > a:focus {
    text-decoration: underline;
  }
`

// prettier-ignore
const TextStyles = `
  .${ELEMENTS_HERO_RICH_TEXT} {
    max-width: 860px;
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS_HERO_RICH_TEXT}`]: SansMedium,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS_HERO_RICH_TEXT} *`]: SansMedium,
    },
  })}

  .${ELEMENTS_HERO_RICH_TEXT} + * {
    margin-top: ${Spacing.lg};
  }
`

// prettier-ignore
const ActionStyles = `
  * + .${ELEMENTS_HERO_ACTION} {
    margin-top: ${Spacing.sm};
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    * + .${ELEMENTS_HERO_ACTION} {
      margin-top: ${Spacing.lg};
    }
  }
`;

// prettier-ignore
export const STYLES_HERO_ELEMENT_TEXT_CONTAINER = `
  .${ELEMENT_TEXT_CONTAINER} {
    position: relative;
    height: 100%;
  }

  .${ELEMENT_TEXT_CONTAINER_WRAPPER} {
    position: relative;
  }

  ${EyebrowStyles}
  ${HeadlineStyles}
  ${TextStyles}
  ${ActionStyles}

`;

const CreateBody = ({
  eyebrow,
  headline,
  richText,
  actions,
}: TypeTextProps) => {
  const container = document.createElement('div');

  container.classList.add(ELEMENT_TEXT_CONTAINER_WRAPPER);

  if (eyebrow) {
    eyebrow.classList.add(ELEMENT_HERO_EYEBROW);
    container.appendChild(eyebrow);
  }

  if (headline) {
    const characterCount = headline.textContent?.trim().length || 0;

    CheckForAnimationLinkSpan({ element: headline });
    headline.classList.add(ELEMENTS_HERO_HEADLINE);
    if (characterCount > 30) headline.setAttribute('size', 'extra-large');
    container.appendChild(headline);
  }

  if (richText) {
    richText.classList.add(ELEMENTS_HERO_RICH_TEXT);
    container.appendChild(richText);
  }

  if (actions) {
    actions.classList.add(ELEMENTS_HERO_ACTION);
    container.appendChild(actions);
  }

  return container;
};

export const CreateTextContainerElement = ({
  element,
}: {
  element: TypeTextContainerProps;
}) => {
  const wrapper = document.createElement('div');
  const childWrapper = document.createElement('div');
  const body = CreateBody(element);

  wrapper.classList.add(ELEMENT_TEXT_CONTAINER);
  childWrapper.classList.add(ELEMENT_TEXT_CONTAINER_WRAPPER);
  childWrapper.appendChild(body);

  wrapper.appendChild(childWrapper);

  return wrapper;
};

export default {
  CreateElement: CreateTextContainerElement,
  Styles: STYLES_HERO_ELEMENT_TEXT_CONTAINER,
};
