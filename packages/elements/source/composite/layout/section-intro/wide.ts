import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-styles-library/token';
import * as Styles from '@universityofmaryland/web-styles-library';
import { type ElementModel } from '../../../_types';

export interface SectionIntroWideProps {
  headline?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
}

const TABLET = 500;

const createHeadline = (
  props: Pick<SectionIntroWideProps, 'headline'>,
): ElementModel<HTMLElement> | null => {
  const { headline } = props;
  if (!headline) return null;

  return new ElementBuilder(headline)
    .styled(Styles.typography.sans.fonts.largest)
    .withStyles({
      element: {
        fontWeight: 800,
        textTransform: 'uppercase',
      },
    })
    .build();
};

const createActions = (
  props: Pick<SectionIntroWideProps, 'actions'>,
): ElementModel<HTMLElement> | null => {
  const { actions } = props;
  if (!actions) return null;

  return new ElementBuilder(actions)
    .withClassName('intro-wide-actions')
    .withStyles({
      element: {
        display: 'block',

        [`@container (max-width: ${TABLET - 1}px)`]: {
          [`* + &`]: { marginTop: token.spacing.md },
        },
      },
    })
    .build();
};

const createWrapper = (
  props: Pick<SectionIntroWideProps, 'headline' | 'actions' | 'isThemeDark'>,
): ElementModel<HTMLElement> => {
  const headlineElement = createHeadline(props);
  const actionsElement = createActions(props);

  const wrapper = new ElementBuilder()
    .withClassName('intro-wide-container-wrapper')
    .withStyles({
      element: {
        [`@container (min-width: ${TABLET}px)`]: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      },
    });

  if (headlineElement) {
    wrapper.withChild(headlineElement);
  }

  if (actionsElement) {
    wrapper.withChild(actionsElement);
  }

  return wrapper.build();
};

const createContainer = (
  props: Pick<SectionIntroWideProps, 'isThemeDark' | 'headline' | 'actions'>,
): ElementModel<HTMLElement> => {
  const { isThemeDark } = props;
  const wrapperElement = createWrapper(props);

  return new ElementBuilder()
    .withClassName('intro-wide-container')
    .withChild(wrapperElement)
    .withStyles({
      element: {
        [`& *`]: {
          ...(isThemeDark && {
            color: token.color.white,
          }),
        },
      },
    })
    .build();
};

export default (props: SectionIntroWideProps) => createContainer(props);
