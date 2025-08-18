import Styles from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import { type ElementVisual } from '../../_types';

export interface StatProps {
  isThemeDark: boolean;
  isDisplayBlock: boolean;
  isSizeLarge: boolean;
  hasLine: boolean;
  stat?: HTMLElement;
  text?: HTMLElement;
  subText?: HTMLElement;
}

const BLOCK_TEXTURE = `<svg id="stat_block-texture" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" ><defs><style>.cls-1{opacity:.02;}.cls-1,.cls-2{fill:#454545;fill-rule:evenodd;isolation:isolate;stroke-width:0px;}.cls-2{opacity:.04;}</style></defs><path class="cls-1" d="M109.49,0H0v63.18l181.67,182.32L0,427.82v63.18h109.49l244.61-245.5L109.49,0Z"/><path class="cls-2" d="M108.94,0h172.44l244.61,245.5-244.61,245.5H108.94l244.61-245.5L108.94,0ZM0,179.11l58.16-58.29L0,62.54v116.57Z"/></svg>`;

const createStat = (
  props: Pick<StatProps, 'stat' | 'isThemeDark' | 'isSizeLarge'>,
) => {
  const { stat: statElement, isThemeDark, isSizeLarge } = props;
  if (!statElement) return;

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
      siblingAfter: { marginTop: Styles.token.spacing.min },

      element: {
        ...Styles.typography.stats.medium,
        color: Styles.token.color.red,
        WebkitFontSmoothing: 'antialiased',

        ...(isThemeDark && { color: Styles.token.color.gold }),
        ...(isSizeLarge && { ...Styles.typography.stats.large }),

        [`& *`]: {
          ...Styles.typography.stats.medium,
          color: 'currentColor',
          WebkitFontSmoothing: 'antialiased',

          ...(isSizeLarge && Styles.typography.stats.large),
        },

        [`& + *`]: { marginTop: Styles.token.spacing.min },
      },
    },
  });
};

const createSubtext = (
  props: Pick<StatProps, 'subText' | 'isThemeDark' | 'isSizeLarge'>,
) => {
  const { subText, isThemeDark, isSizeLarge } = props;
  if (!subText) return;

  return ElementModel.create({
    element: subText,
    className: 'stat-sub-text',
    elementStyles: {
      element: {
        ...Styles.typography.sans.min,
        marginTop: Styles.token.spacing.min,
        color: Styles.token.color.gray.mediumAA,

        ...(isSizeLarge && Styles.typography.sans.small),
        ...(isThemeDark && { color: Styles.token.color.gray.light }),

        ['& *']: {
          ...Styles.typography.sans.min,
          color: 'currentColor',

          ...(isSizeLarge && Styles.typography.sans.small),
        },
      },
    },
  });
};

const createText = (
  props: Pick<StatProps, 'text' | 'isThemeDark' | 'isSizeLarge'>,
) => {
  const { text, isThemeDark, isSizeLarge } = props;
  if (!text) return;

  if (isSizeLarge) {
    return ElementModel.richText.simpleLargest({
      element: text,
      isThemeDark,
      elementStyles: {
        siblingAfter: { marginTop: Styles.token.spacing.md },
      },
    });
  }

  return ElementModel.richText.simpleLarge({
    element: text,
    isThemeDark,
    elementStyles: {
      siblingAfter: { marginTop: Styles.token.spacing.min },
    },
  });
};

const createWrapper = (
  props: Pick<
    StatProps,
    'isThemeDark' | 'hasLine' | 'isSizeLarge' | 'stat' | 'text' | 'subText'
  >,
) => {
  const { isThemeDark, hasLine, isSizeLarge, stat, text, subText } = props;

  const subTextElement = createSubtext({ subText, isThemeDark, isSizeLarge });
  const textElement = createText({ text, isThemeDark, isSizeLarge });
  const statElement = createStat({ stat, isThemeDark, isSizeLarge });

  const childElements = [statElement, textElement, subTextElement].filter(
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
          [`& .stat-sub-text`]: { color: Styles.token.color.gray.light },
        }),
      },
    },
  });
};

const createDisplayBlock = (
  props: Pick<StatProps, 'isDisplayBlock'> & { wrapperElement: ElementVisual },
) => {
  const { isDisplayBlock, wrapperElement } = props;
  if (!isDisplayBlock) return null;

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

const createContainer = (containerChild: ElementVisual) => {
  return ElementModel.createDiv({
    className: 'stat-container',
    children: [containerChild],
    elementStyles: {
      element: {
        container: `umd-element-stat / inline-size`,
        height: `inherit`,
      },
    },
  });
};

export default (props: StatProps): ElementVisual => {
  const wrapperElement = createWrapper(props);
  const blockElement = createDisplayBlock({
    isDisplayBlock: props.isDisplayBlock,
    wrapperElement,
  });

  if (props.isDisplayBlock) {
    return createContainer(blockElement as ElementVisual);
  } else {
    return createContainer(wrapperElement as ElementVisual);
  }
};
