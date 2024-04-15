import { Tokens } from '@universityofmaryland/variables';
import { CallToAction } from 'elements';

const { Spacing } = Tokens;

export const ID_LAZY_LOAD_BUTTON = 'umd-feeds-events-lazy-load-button';

export const STYLES_LAZY_LOAD_BUTTON = `
  ${CallToAction.Styles}

  .${ID_LAZY_LOAD_BUTTON} {
    display: flex;
    justify-content: center;
    margin-top: ${Spacing.lg};
  }
`;

export const CreateLazyLoadButton = ({
  callback,
}: {
  callback: (args: any) => void;
}) => {
  const container = document.createElement('div');
  const button = document.createElement('button');
  const ctaButton = CallToAction.CreateElement({
    cta: button,
    type: 'outline',
  });

  button.innerHTML = 'Load More';
  button.addEventListener('click', callback);

  container.classList.add(ID_LAZY_LOAD_BUTTON);
  container.appendChild(ctaButton);

  return container;
};
