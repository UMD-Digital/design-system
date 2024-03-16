import { Tokens } from '@universityofmaryland/variables';
import {
  CreateCallToActionElement,
  STYLES_CALL_TO_ACTION_ELEMENT,
} from 'elements/call-to-action';

const { Spacing } = Tokens;

export const ID_LAZY_LOAD_BUTTON = 'umd-feeds-events-lazy-load-button';

export const STYLES_LAZY_LOAD_BUTTON = `
  ${STYLES_CALL_TO_ACTION_ELEMENT}

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
  const ctaButton = CreateCallToActionElement({
    cta: button,
    type: 'outline',
  });

  button.innerHTML = 'Load More Events';
  button.addEventListener('click', callback);

  container.classList.add(ID_LAZY_LOAD_BUTTON);
  container.appendChild(ctaButton);

  return container;
};
