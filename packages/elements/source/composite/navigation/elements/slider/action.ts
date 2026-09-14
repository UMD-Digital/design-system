import * as token from '@universityofmaryland/web-token-library';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { chevron_down as iconChevronDown } from '@universityofmaryland/web-icons-library/controls';

export type TypeActionProps = {
  GetContainer: () => Element | null;
  setUpcomingSlide: (arg: string) => void;
  eventSlideLeft: () => void;
  ATTRIBUTE_CHILD_REF: string;
  ATTRIBUTE_PARENT_REF: string;
};

export type TypeAction = TypeActionProps & {
  link: HTMLAnchorElement;
};

const createSlideButton = ({
  link,
  GetContainer,
  setUpcomingSlide,
  eventSlideLeft,
  ATTRIBUTE_CHILD_REF,
}: TypeAction) => {
  if (!GetContainer()) return null;

  const childReference = link.getAttribute(ATTRIBUTE_CHILD_REF);

  if (!childReference) return null;

  return new ElementBuilder('button')
    .withClassName('nav-slide-action-button')
    .withAttribute('type', 'button')
    .withAttribute('aria-label', 'Next level of navigation')
    .withHTML(iconChevronDown)
    .withStyles({
      element: {
        position: 'absolute',
        right: token.spacing.min,
        top: '5px',
        width: token.spacing.lg,
        height: token.spacing.lg,
        display: 'flex',
        justifyContent: 'center',

        '&:hover svg, &:focus svg': {
          transform: 'rotate(-90deg) translateY(4px)',
        },

        '& svg': {
          fill: token.color.red,
          height: '16px',
          width: '16px',
          transform: 'rotate(-90deg) translateY(0)',
          transition: 'transform 0.3s ease-in-out',
        },
      },
    })
    .on('click', () => {
      setUpcomingSlide(childReference);
      eventSlideLeft();
    });
};

export const createCompositeNavigationSliderAction = (props: TypeAction) => {
  const { link } = props;

  const linkBuilder = new ElementBuilder(link)
    .withClassName('nav-slide-action-link')
    .withStyles({
      element: {
        ...typography.sans.small,
        transition: 'color 0.3s ease-in-out',

        '&:hover, &:focus': {
          color: token.color.red,
        },
      },
    });

  const button = createSlideButton(props);
  const children = [linkBuilder, button].filter((child) => child != null);

  return new ElementBuilder()
    .withClassName('nav-slide-action-container')
    .withChildren(...children)
    .withStyles({
      element: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        paddingRight: token.spacing['3xl'],
        marginBottom: token.spacing.xs,
      },
    })
    .build();
};
