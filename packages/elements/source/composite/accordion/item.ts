import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { debounce } from '@universityofmaryland/web-utilities-library/performance';

type TypeAccordionProps = {
  headline?: HTMLElement | null;
  text?: HTMLElement | null;
  isThemeLight?: boolean;
  isThemeDark?: boolean;
  isStateOpen: boolean;
};

type StateProps = {
  hasAnimation?: boolean;
};

type StateFunctions = {
  open: (props: StateProps) => void;
  close: (props: StateProps) => void;
};

type ActionAnimationProps = StateProps & {
  container: HTMLDivElement;
  isOpening: boolean;
};

const SMALL = 480;
const ANIMATION_TIME = 500;

const { token } = Styles;

const CreateBody = ({ text, isStateOpen, isThemeDark }: TypeAccordionProps) => {
  if (!text) return null;

  const bodyContent = new ElementBuilder()
    .withClassName('accordion-body')
    .withStyles({
      element: {
        padding: token.spacing.md,
        ...(isThemeDark && {
          color: token.color.white,
        }),
        [`@container umd-element-accordion-item (min-width: ${SMALL}px)`]: {
          padding: token.spacing.lg,
        },
        '& > *': {
          marginTop: token.spacing.sm,
          [`@container umd-element-accordion-item (min-width: ${SMALL}px)`]: {
            marginTop: token.spacing.lg,
          },
          '&:first-child': { marginTop: '0' },
        },
        '& *': {
          ...(isThemeDark && {
            color: token.color.white,
          }),
        },
      },
    })
    .withChild(text)
    .build();

  return new ElementBuilder()
    .withClassName('accordion-body-wrapper')
    .withAria({ hidden: isStateOpen ? 'false' : 'true' })
    .styled(Styles.typography.sans.medium)
    .withStyles({
      element: {
        backgroundColor: token.color.gray.lightest,
        height: '0',
        overflow: 'hidden',
        display: 'none',
        ...(isThemeDark && {
          backgroundColor: token.color.gray.darker,
        }),
      },
    })
    .withChild(bodyContent)
    .build();
};

const CreateHeadline = ({
  headline,
  isThemeDark,
  isStateOpen,
  open,
  close,
}: TypeAccordionProps & StateFunctions) => {
  if (!headline) return null;

  return new ElementBuilder('button')
    .withClassName('accordion-headline')
    .withAria({ expanded: isStateOpen ? 'true' : 'false' })
    .withChild(headline)
    .on('click', (event) => {
      const button = event.currentTarget as HTMLButtonElement;
      const isExpanded = button.ariaExpanded === 'true';

      if (isExpanded) {
        close({ hasAnimation: true });
      } else {
        open({ hasAnimation: true });
      }
    })
    .styled(Styles.typography.sans.large)
    .withStyles({
      element: {
        display: 'flex',
        borderTop: '2px solid transparent',
        padding: token.spacing.md,
        paddingRight: token.spacing['4xl'],
        backgroundColor: token.color.gray.lightest,
        position: 'relative',
        transition: 'background 0.5s, border 0.5s, color 0.5s, padding 0.5s',
        width: '100%',
        textAlign: 'left',
        color: token.color.black,
        ...(isThemeDark && {
          backgroundColor: token.color.gray.darker,
        }),
        [`@container umd-element-accordion-item (min-width: ${SMALL}px)`]: {
          padding: token.spacing.lg,
          paddingRight: token.spacing['6xl'],
        },
        '& > *': {
          ...(isThemeDark && {
            color: token.color.white,
          }),
        },
        '&:before, &:after': {
          content: "''",
          backgroundColor: token.color.red,
          position: 'absolute',
          right: token.spacing.md,
          transition:
            'background 0.5s, height 0.5s, right 0.5s, top 0.5s, transform 0.5s, width 0.5s',
          ...(isThemeDark && {
            backgroundColor: token.color.gold,
          }),
        },
        '&:before': {
          height: '4px',
          top: 'calc(50% - 2px)',
          width: '16px',
          [`@container umd-element-accordion-item (min-width: ${SMALL}px)`]: {
            width: '20px',
            right: '32px',
          },
        },
        '&:after': {
          height: '16px',
          top: 'calc(50% - 8px)',
          right: `calc(${token.spacing.md} + 6px)`,
          width: '4px',
          [`@container umd-element-accordion-item (min-width: ${SMALL}px)`]: {
            height: '20px',
            top: 'calc(50% - 10px)',
            right: `calc(${token.spacing.lg} + 8px)`,
          },
        },
        "&[aria-expanded='true'], &:hover, &:focus": {
          borderTop: `2px solid ${token.color.red}`,
          ...(isThemeDark && {
            borderTop: `2px solid ${token.color.gold}`,
          }),
        },
        "&[aria-expanded='true'] > *, &:hover > *, &:focus > *": {
          color: token.color.red,
          ...(isThemeDark && {
            color: token.color.gold,
          }),
        },
        "&[aria-expanded='true']:after": {
          transform: 'rotate(90deg)',
        },
      },
    })
    .build();
};

const ActionAnimation = ({
  container,
  isOpening = true,
  hasAnimation = true,
}: ActionAnimationProps) => {
  const headlineContainer = container.querySelector(
    'button',
  ) as HTMLButtonElement;
  const bodyWrapperElement = container.querySelector(
    '.accordion-body-wrapper',
  ) as HTMLElement;
  const bodyElement = container.querySelector('.accordion-body') as HTMLElement;

  if (!headlineContainer || !bodyWrapperElement || !bodyElement) {
    console.warn('headlineContainer or bodyWrapperElement is not found');
    return;
  }

  const animateOpen = () => {
    bodyWrapperElement.style.display = 'block';
    setTimeout(() => {
      headlineContainer.ariaExpanded = 'true';
      bodyWrapperElement.ariaHidden = 'false';
    }, 100);
  };

  const animateClose = () => {
    headlineContainer.ariaExpanded = 'false';
    bodyWrapperElement.ariaHidden = 'true';
    setTimeout(() => {
      bodyWrapperElement.style.display = 'none';
    }, ANIMATION_TIME + 50);
  };

  if (hasAnimation)
    bodyWrapperElement.style.transition = `height ${ANIMATION_TIME}ms ease-in-out`;

  if (isOpening) animateOpen();
  else animateClose();

  setTimeout(() => {
    const bodyHeight = bodyElement.offsetHeight;
    bodyWrapperElement.style.height = isOpening ? `${bodyHeight}px` : '0';
  }, 100);

  setTimeout(() => {
    bodyWrapperElement.style.transition = 'none';
  }, 100 + ANIMATION_TIME);
};

export const createCompositeAccordionItem = (props: TypeAccordionProps) =>
  (() => {
    const { isStateOpen = false } = props;
    const containerBuilder = new ElementBuilder().withClassName(
      'accordion-container',
    );
    const container = containerBuilder.getElement() as HTMLDivElement;
		let isOpen = isStateOpen;

    const open = (props: StateProps) => {
      ActionAnimation({ ...props, container, isOpening: true });
      isOpen = true;
    };

    const close = (props: StateProps) => {
      ActionAnimation({ ...props, container, isOpening: false });
      isOpen = false;
    };
		
    const EventSize = () => {
      if (!isOpen) return;
      const bodyElement = container.querySelector(
        '.accordion-body',
      ) as HTMLElement;
      const bodyWrapperElement = container.querySelector(
        '.accordion-body-wrapper',
      ) as HTMLElement;

      bodyWrapperElement.style.height = `${bodyElement.offsetHeight}px`;
    };

    const headline = CreateHeadline({ ...props, isStateOpen, open, close });
    const body = CreateBody({ ...props, isStateOpen });

    const containerModel = containerBuilder
      .withChildren(headline, body)
      .build();

    if (isStateOpen) {
      open({ hasAnimation: false });
    }

    window.addEventListener('resize', debounce(EventSize, 20));

    return new ElementBuilder()
      .withClassName('accordion-declaration')
      .withStyles({
        element: {
          container: 'umd-element-accordion-item / inline-size',
        },
      })
      .withChild(containerModel)
      .withEvents({ open, close })
      .build();
  })();
