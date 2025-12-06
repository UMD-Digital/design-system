import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as Styles from '@universityofmaryland/web-styles-library';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
import { type ElementModel } from '../../../_types';

export interface SectionIntroWideProps {
  headline?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
}

const TABLET = 500;

const createHeadline = (
  props: Pick<SectionIntroWideProps, 'headline' | 'isThemeDark'>,
): ElementModel<HTMLElement> | null => {
  const { headline, isThemeDark } = props;
  if (!headline) return null;

  return new ElementBuilder(headline)
    .styled(
      Styles.typography.sans.compose('largest', {
        theme: theme.fontColor(isThemeDark),
      }),
    )
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
  const { headline, actions, isThemeDark } = props;
  const headlineElement = createHeadline({ headline, isThemeDark });
  const actionsElement = createActions({ actions });

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
  const wrapperElement = createWrapper(props);

  return new ElementBuilder()
    .withClassName('intro-wide-container')
    .withChild(wrapperElement)
    .build();
};

export default (props: SectionIntroWideProps) => createContainer(props);
