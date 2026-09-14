import * as token from '@universityofmaryland/web-token-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';

export type TypeMenuDisplayButtonRequirements = {
  eventOpen: () => void;
};

const createBar = ({ withStyles }: { withStyles: boolean }) => {
  const bar = new ElementBuilder('span').withClassName('nav-drawer-button-bar');

  if (!withStyles) return bar;

  return bar.withStyles({
    element: {
      width: '20px',
      height: '2px',
      backgroundColor: token.color.black,
      transition: 'background-color 0.3s ease-in-out',

      '&:last-child': {
        width: '17px',
      },
    },
  });
};

export const createCompositeNavigationMenuButton = ({
  eventOpen,
}: TypeMenuDisplayButtonRequirements) => {
  const wrapper = new ElementBuilder('span')
    .withClassName('nav-drawer-button-wrapper')
    .withChildrenFrom(['one', 'two', 'three'], (item, index) =>
      createBar({ withStyles: index === 0 }),
    )
    .withStyles({
      element: {
        position: 'relative',
        width: '20px',
        height: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
    });

  return new ElementBuilder('button')
    .withClassName('nav-drawer-button')
    .withAttribute('aria-label', 'Open Navigation Drawer')
    .withChild(wrapper)
    .withStyles({
      element: {
        height: '44px',
        width: '34px',
        display: 'flex',
        alignItems: 'center',

        '&:hover .nav-drawer-button-bar, &:focus .nav-drawer-button-bar': {
          backgroundColor: token.color.red,
        },
      },
    })
    .on('click', () => eventOpen());
};
