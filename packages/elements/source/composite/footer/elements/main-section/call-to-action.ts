import { token } from '@universityofmaryland/web-styles-library';

export const CALL_TO_ACTION_CONTAINER = 'umd-footer-call-to-action-container';

export const CallToActionStyles = `
  .${CALL_TO_ACTION_CONTAINER} {
    margin-left: auto;
  }

  .${CALL_TO_ACTION_CONTAINER} a {
    display: inline-block;
    padding: ${token.spacing.xs} ${token.spacing['lg']};
    background-color: ${token.color.red};
    color: ${token.color.white} !important;
    transition: background-color 0.3s ease-in-out;
    font-weight: 700;
  }

  .${CALL_TO_ACTION_CONTAINER} a:hover,
  .${CALL_TO_ACTION_CONTAINER} a:focus {
    background-color: ${token.color.redDark};
  }

  .${CALL_TO_ACTION_CONTAINER} a * {
    color: ${token.color.white} !important;
  }
`;

const makeGivingLink = () => {
  const defaultLink = document.createElement('a');
  defaultLink.textContent = 'Support UMD';
  defaultLink.href = 'https://giving.umd.edu/';
  defaultLink.target = '_blank';
  defaultLink.rel = 'noopener noreferrer';

  return defaultLink;
};

export interface CallToActionProps {
  slotCta?: HTMLAnchorElement;
}

export default ({ slotCta }: CallToActionProps) => {
  const container = document.createElement('div');

  container.classList.add(CALL_TO_ACTION_CONTAINER);

  if (slotCta) {
    container.appendChild(slotCta);
  } else {
    container.appendChild(makeGivingLink());
  }

  return container;
};
