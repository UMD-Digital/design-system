import { Tokens, Typography } from '@universityofmaryland/variables';
import { CreateCallToActionElement } from 'elements/call-to-action';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

const { Spacing } = Tokens;

export type NoResultsContentType = {
  message?: string;
  linkUrl?: string;
  linkText?: string;
};

type NoResultsType = NoResultsContentType & {
  container: HTMLElement;
};

const CONTAINER_NO_RESULTS = 'container-no-results';

export const STYLES_NO_RESULTS = `
  .${CONTAINER_NO_RESULTS} {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [` .${CONTAINER_NO_RESULTS} p`]: Typography['.umd-sans-large'],
    },
  })}

  .${CONTAINER_NO_RESULTS} p {
    margin-bottom: ${Spacing.md};
  }
`;

export const CreateNoResultsInterface = ({
  container,
  message,
  linkUrl,
  linkText,
}: NoResultsType) => {
  container.innerHTML = '';

  const wrapper = document.createElement('div');
  const noResults = document.createElement('p');
  noResults.innerHTML = message || 'No results found';
  wrapper.classList.add(CONTAINER_NO_RESULTS);
  wrapper.appendChild(noResults);

  if (linkUrl && linkText) {
    const link = document.createElement('a');
    link.innerHTML = linkText;
    link.setAttribute('href', linkUrl);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');

    const ctaButton = CreateCallToActionElement({
      cta: link,
      type: 'outline',
    });

    wrapper.appendChild(ctaButton);
  }

  container.appendChild(wrapper);
};
