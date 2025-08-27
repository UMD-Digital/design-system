import { token } from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import { type ElementVisual } from '../../../_types';

export interface SectionIntroWideProps {
  headline?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
}

const TABLET = 500;

const createHeadline = (
  props: Pick<SectionIntroWideProps, 'headline'>,
): ElementVisual | undefined => {
  const { headline } = props;
  if (!headline) return;

  return ElementModel.headline.sansLargest({
    element: headline,
    elementStyles: {
      element: {
        fontWeight: 800,
        textTransform: 'uppercase',
      },
    },
  });
};

const createActions = (
  props: Pick<SectionIntroWideProps, 'actions'>,
): ElementVisual | undefined => {
  const { actions } = props;
  if (!actions) return;

  return ElementModel.create({
    element: actions,
    className: 'intro-wide-actions',
    elementStyles: {
      element: {
        display: 'block',

        [`@container umd-section-intro-wide (max-width: ${TABLET - 1}px)`]: {
          [`* + &`]: { marginTop: token.spacing.md },
        },
      },
    },
  });
};

const createWrapper = (
  props: Pick<SectionIntroWideProps, 'headline' | 'actions' | 'isThemeDark'>,
): ElementVisual => {
  const headlineElement = createHeadline(props);
  const actionsElement = createActions(props);

  const children = [headlineElement, actionsElement].filter(
    Boolean,
  ) as ElementVisual[];

  return ElementModel.createDiv({
    className: 'intro-wide-container-wrapper',
    children,
    elementStyles: {
      element: {
        [`@container umd-section-intro-wide (min-width: ${TABLET}px)`]: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      },
    },
  });
};

const createContainer = (
  props: Pick<SectionIntroWideProps, 'isThemeDark' | 'headline' | 'actions'>,
): ElementVisual => {
  const { isThemeDark } = props;
  const wrapperElement = createWrapper(props);

  return ElementModel.createDiv({
    className: 'intro-wide-container',
    children: [wrapperElement],
    elementStyles: {
      element: {
        container: 'umd-section-intro-wide / inline-size',
        ...(isThemeDark && {
          [`& *`]: { color: token.color.white },
        }),
      },
    },
  });
};

export default (props: SectionIntroWideProps) => {
  const containerElement = createContainer(props);

  return {
    element: containerElement.element,
    styles: containerElement.styles,
  };
};
