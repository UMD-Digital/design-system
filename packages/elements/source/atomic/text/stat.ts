import Styles from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import { type ElementVisual } from '../../_types';

const BLOCK_TEXTURE = `<svg id="stat_block-texture" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" ><defs><style>.cls-1{opacity:.02;}.cls-1,.cls-2{fill:#454545;fill-rule:evenodd;isolation:isolate;stroke-width:0px;}.cls-2{opacity:.04;}</style></defs><path class="cls-1" d="M109.49,0H0v63.18l181.67,182.32L0,427.82v63.18h109.49l244.61-245.5L109.49,0Z"/><path class="cls-2" d="M108.94,0h172.44l244.61,245.5-244.61,245.5H108.94l244.61-245.5L108.94,0ZM0,179.11l58.16-58.29L0,62.54v116.57Z"/></svg>`;

const createContainer = (child: ElementVisual) => {
  return ElementModel.createDiv({
    className: 'stat-container',
    children: [child],
    elementStyles: {
      element: {
        container: `umd-element-stat / inline-size`,
        height: `inherit`,
      },
    },
  });
};

const createWrapper = (
  isThemeDark: boolean,
  hasLine: boolean,
  subText?: ElementVisual,
  textElement?: ElementVisual,
  statElement?: ElementVisual,
) => {
  const childElements = [statElement, textElement, subText].filter(
    Boolean,
  ) as ElementVisual[];

  return ElementModel.createDiv({
    className: 'stat-wrapper',
    children: childElements,
    elementStyles: {
      element: {
        maxWidth: '720px',
        position: 'relative',

        ...(hasLine && {
          paddingLeft: Styles.token.spacing.md,
          borderLeft: `2px solid ${Styles.token.color.gold}`,
          [`@container umd-element-stat (min-width: 400px)`]: {
            paddingLeft: Styles.token.spacing.xl,
          },
        }),

        ...(isThemeDark && {
          [`& .stat-sub-text`]: {
            color: Styles.token.color.gray.light,
          },
        }),
      },
    },
  });
};

const createDisplayBlock = (
  isDisplayBlock: boolean,
  wrapperElement: ElementVisual,
) => {
  if (!isDisplayBlock) {
    return null;
  }

  const block = ElementModel.createDiv({
    className: 'stat-display-block',
    children: [wrapperElement],
    elementStyles: {
      element: {
        padding: `${Styles.token.spacing.lg} ${Styles.token.spacing.sm}`,
        borderTop: `2px solid ${Styles.token.color.red}`,
        backgroundColor: `${Styles.token.color.gray.lightest}`,
        position: 'relative',
        overflow: 'hidden',
        height: `100%`,
        display: `flex`,
        alignItems: `center`,

        [`@media (min-width: ${Styles.token.media.breakpoints.large.min})`]: {
          padding: Styles.token.spacing.lg,
        },
        [`@media (min-width: ${Styles.token.media.breakpoints.highDef.min})`]: {
          padding: `${Styles.token.spacing['2xl']} ${Styles.token.spacing['3xl']}`,
        },
        [`& > svg`]: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        },
      },
    },
  });

  block.element.insertAdjacentHTML('afterbegin', BLOCK_TEXTURE);

  return block;
};

const createStat = (
  statElement: HTMLElement,
  isThemeDark: boolean,
  isSizeLarge: boolean,
) => {
  let rawText = statElement.textContent;

  if (!rawText) return;

  rawText = rawText.trim();

  if (rawText.length > 6) {
    console.error('Stat text is too long. Please limit to 6 characters.');
    statElement.textContent = rawText.slice(0, 6);
  }

  return ElementModel.create({
    element: statElement,
    className: 'stat-display',
    elementStyles: {
      element: {
        ...Styles.typography.stats.medium,
        color: Styles.token.color.red,
        WebkitFontSmoothing: 'antialiased',

        ...(isThemeDark && { color: Styles.token.color.gold }),
        ...(isSizeLarge && { ...Styles.typography.stats.large }),

        [`& *`]: {
          ...(isSizeLarge
            ? Styles.typography.stats.large
            : Styles.typography.stats.medium),
          color: 'currentColor',
          WebkitFontSmoothing: 'antialiased',
        },
        [`& + *`]: {
          marginTop: Styles.token.spacing.min,
        },
      },
    },
  });
};

const createSubtext = (
  subText: HTMLElement,
  isThemeDark: boolean,
  isSizeLarge: boolean,
) => {
  return ElementModel.create({
    element: subText,
    className: 'stat-sub-text',
    elementStyles: {
      element: {
        ...(isSizeLarge
          ? Styles.typography.sans.small
          : Styles.typography.sans.min),
        marginTop: Styles.token.spacing.min,
        color: isThemeDark
          ? Styles.token.color.gray.light
          : Styles.token.color.gray.mediumAA,

        ['& *']: {
          ...(isSizeLarge
            ? Styles.typography.sans.small
            : Styles.typography.sans.min),
          color: 'currentColor',
        },
      },
    },
  });
};

const createText = (
  text: HTMLElement,
  isThemeDark: boolean,
  isSizeLarge: boolean,
) => {
  if (!text) return;

  return ElementModel.create({
    element: text,
    className: 'stat-text',
    elementStyles: {
      element: {
        ...Styles.element.text.rich.advanced,
        ...(isSizeLarge
          ? Styles.typography.sans.larger
          : Styles.typography.sans.medium),
        color: Styles.token.color.black,
        lineHeight: 1.444,

        ...(isThemeDark && {
          ...Styles.animation.nestedElements.linksDark,
          color: Styles.token.color.white,
        }),

        [`& *`]: {
          ...(isSizeLarge
            ? Styles.typography.sans.larger
            : Styles.typography.sans.medium),
          color: 'currentColor',
        },
        [`& + *`]: {
          marginTop: Styles.token.spacing.min,
        },
      },
    },
  });
};

export default ({
  isThemeDark,
  isDisplayBlock,
  isSizeLarge,
  hasLine,
  stat,
  text,
  subText,
}: {
  isThemeDark: boolean;
  isDisplayBlock: boolean;
  isSizeLarge: boolean;
  hasLine: boolean;
  stat: HTMLElement;
  text: HTMLElement;
  subText: HTMLElement;
}) => {
  const subTextElement = createSubtext(subText, isThemeDark, isSizeLarge);
  const textElement = createText(text, isThemeDark, isSizeLarge);
  const statElement = createStat(stat, isThemeDark, isSizeLarge);

  const wrapperElement = createWrapper(
    isThemeDark,
    hasLine,
    subTextElement,
    textElement,
    statElement,
  );

  const blockElement = createDisplayBlock(isDisplayBlock, wrapperElement);

  const containerChild = isDisplayBlock
    ? (blockElement as ElementVisual)
    : (wrapperElement as ElementVisual);

  const container = createContainer(containerChild);

  return container;
};
