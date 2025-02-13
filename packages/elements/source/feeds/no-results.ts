import { token, typography } from '@universityofmaryland/web-styles-library';
import { CallToAction } from 'composite';
import * as Utility from 'utilities';

const { convertJSSObjectToStyles } = Utility.styles;

type NoResultsContentType = {
  message?: string;
  linkUrl?: string;
  linkText?: string;
  ctaType?: string;
  isAlignedCenter?: boolean;
};

type NoResultsType = NoResultsContentType & {
  container: HTMLElement;
};

const CONTAINER_NO_RESULTS = 'container-no-results';

const STYLES_NO_RESULTS = `
  .${CONTAINER_NO_RESULTS} {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [` .${CONTAINER_NO_RESULTS} p`]: typography.sans.extraLarge,
    },
  })}

  .${CONTAINER_NO_RESULTS} p {
    margin-bottom: ${token.spacing.md};
    text-transform: uppercase;
    font-weight: 800;
    color: ${token.color.black};
  }
`;

const CreateNoResultsInterface = ({
  container,
  message,
  linkUrl,
  linkText,
  ctaType,
  isAlignedCenter = true,
}: NoResultsType) => {
  container.innerHTML = '';

  const wrapper = document.createElement('div');
  const noResults = document.createElement('p');
  noResults.innerHTML = message || 'No results found';
  wrapper.classList.add(CONTAINER_NO_RESULTS);
  wrapper.appendChild(noResults);

  if (isAlignedCenter) {
    wrapper.style.alignItems = 'center';
  }

  if (linkUrl && linkText) {
    const link = document.createElement('a');
    link.innerHTML = linkText;
    link.setAttribute('href', linkUrl);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');

    const ctaButton = CallToAction.CreateElement({
      cta: link,
      type: ctaType || 'outline',
    });

    wrapper.appendChild(ctaButton);
  }

  container.appendChild(wrapper);
};

const DisplayNoResults = (props: NoResultsType) => {
  const { container, ...NoResultsContent } = props;
  container.innerHTML = '';
  CreateNoResultsInterface({ container, ...NoResultsContent });
};

export default {
  DisplayElement: DisplayNoResults,
  Styles: STYLES_NO_RESULTS,
};
