import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-styles-library/token';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import {
  stats as statsFont,
  sans as sansFonts,
} from '@universityofmaryland/web-styles-library/typography';
import { type ElementModel } from '../../_types';

export interface StatProps {
  isThemeDark?: boolean;
  isDisplayBlock: boolean;
  isSizeLarge: boolean;
  hasLine: boolean;
  stat?: HTMLElement;
  text?: HTMLElement;
  subText?: HTMLElement;
}

const BLOCK_TEXTURE = `<svg id="stat_block-texture" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" ><defs><style>.cls-1{opacity:.02;}.cls-1,.cls-2{fill:#454545;fill-rule:evenodd;isolation:isolate;stroke-width:0px;}.cls-2{opacity:.04;}</style></defs><path class="cls-1" d="M109.49,0H0v63.18l181.67,182.32L0,427.82v63.18h109.49l244.61-245.5L109.49,0Z"/><path class="cls-2" d="M108.94,0h172.44l244.61,245.5-244.61,245.5H108.94l244.61-245.5L108.94,0ZM0,179.11l58.16-58.29L0,62.54v116.57Z"/></svg>`;

const createStat = ({
  stat: statElement,
  isThemeDark,
  isSizeLarge,
}: Pick<StatProps, 'stat' | 'isThemeDark' | 'isSizeLarge'>) => {
  if (!statElement) return;

  let rawText = statElement.textContent;
  if (!rawText) return;

  rawText = rawText.trim();

  if (rawText.length > 6) {
    console.error('Stat text is too long. Please limit to 6 characters.');
    statElement.textContent = rawText.slice(0, 6);
  }

  return new ElementBuilder(statElement)
    .withClassName('stat-display')
    .styled(
      statsFont.compose(isSizeLarge ? 'large' : 'medium', {
        theme: isThemeDark ? 'dark' : 'light',
      }),
    )
    .withStyles({
      element: {
        WebkitFontSmoothing: 'antialiased',

        [`& *`]: {
          color: 'currentColor',
          WebkitFontSmoothing: 'antialiased',
        },

        [`& + *`]: { marginTop: token.spacing.min },
      },

      siblingAfter: { marginTop: token.spacing.min },
    })
    .build();
};

const createSubtext = (
  props: Pick<StatProps, 'subText' | 'isThemeDark' | 'isSizeLarge'>,
) => {
  const { subText, isThemeDark, isSizeLarge } = props;
  if (!subText) return;

  const fontStyle = isSizeLarge ? sansFonts.small : sansFonts.min;

  return new ElementBuilder(subText)
    .withClassName('stat-sub-text')
    .styled(fontStyle)
    .withStyles({
      element: {
        marginTop: token.spacing.min,
        color: token.color.gray.mediumAA,

        ...(isThemeDark && { color: token.color.gray.light }),

        ['& *']: {
          color: 'currentColor',
        },
      },
    })
    .build();
};

const createText = (
  props: Pick<StatProps, 'text' | 'isThemeDark' | 'isSizeLarge'>,
) => {
  const { text, isThemeDark, isSizeLarge } = props;
  if (!text) return;

  const styles = elementStyles.text.rich.composeSimple({
    size: isSizeLarge ? 'largest' : 'large',
    theme: isThemeDark ? 'dark' : 'light',
  });

  const marginTop = isSizeLarge ? token.spacing.md : token.spacing.min;

  return new ElementBuilder(text)
    .styled(styles)
    .withStyles({
      siblingAfter: { marginTop },
    })
    .build();
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

  const isDark = isThemeDark;

  const wrapper = new ElementBuilder()
    .withClassName('stat-wrapper')
    .withStyles({
      element: {
        maxWidth: '720px',
        position: 'relative',

        ...(hasLine && {
          paddingLeft: token.spacing.md,
          borderLeft: `2px solid ${token.color.gold}`,

          [`@container umd-element-stat (min-width: 400px)`]: {
            paddingLeft: token.spacing.xl,
          },
        }),

        ...(isDark && {
          [`& .stat-sub-text`]: { color: token.color.gray.light },
        }),
      },
    });

  if (statElement) {
    wrapper.withChild(statElement);
  }

  if (textElement) {
    wrapper.withChild(textElement);
  }

  if (subTextElement) {
    wrapper.withChild(subTextElement);
  }

  return wrapper.build();
};

const createDisplayBlock = (
  props: Pick<StatProps, 'isDisplayBlock'> & { wrapperElement: ElementModel },
) => {
  const { isDisplayBlock, wrapperElement } = props;
  if (!isDisplayBlock) return null;

  return new ElementBuilder()
    .withClassName('stat-display-block')
    .withStyles({
      element: {
        padding: `${token.spacing.lg} ${token.spacing.sm}`,
        borderTop: `2px solid ${token.color.red}`,
        backgroundColor: `${token.color.gray.lightest}`,
        position: 'relative',
        overflow: 'hidden',
        height: `100%`,
        display: `flex`,
        alignItems: `center`,

        [`@media (min-width: ${token.media.breakpoints.large.min})`]: {
          padding: token.spacing.lg,
        },

        [`@media (min-width: ${token.media.breakpoints.highDef.min})`]: {
          padding: `${token.spacing['2xl']} ${token.spacing['3xl']}`,
        },

        [`& > svg`]: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        },
      },
    })
    .withModifier((el) => {
      el.insertAdjacentHTML('afterbegin', BLOCK_TEXTURE);
    })
    .withChild(wrapperElement)
    .build();
};

const createContainer = (containerChild: ElementModel) => {
  const container = new ElementBuilder()
    .withClassName('stat-container')
    .withStyles({
      element: {
        containerType: `inline-size`,
        height: `inherit`,
      },
    });

  if (containerChild) {
    container.withChild(containerChild);
  }

  return container.build();
};

export default (props: StatProps) => {
  const wrapperElement = createWrapper(props);

  if (props.isDisplayBlock) {
    const blockElement = createDisplayBlock({
      isDisplayBlock: props.isDisplayBlock,
      wrapperElement,
    });
    return createContainer(blockElement!);
  }

  return createContainer(wrapperElement);
};
