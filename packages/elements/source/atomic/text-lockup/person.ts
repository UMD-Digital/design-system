import * as Styles from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import { ElementModel } from 'model';

interface PersonTextLockup {
  name: HTMLElement | null;
  job?: HTMLElement | null;
  association?: HTMLElement | null;
  pronouns?: HTMLElement | null;
  subText?: HTMLElement | null;
  isThemeDark?: boolean;
}

const ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER = 'text-lockup-person-container';
const { token } = Styles;

const headlineStyles = {
  element: {
    fontWeight: '700',
    color: `${token.color.black}`,

    [`& + *`]: {
      marginTop: token.spacing.min,
    },
  },
  subElement: {
    color: 'currentColor',
  },
};

const jobStyles = {
  element: {
    lineHeight: `1.25em`,
  },
  subElement: {
    color: 'currentColor',
  },
};

const associationStyles = {
  element: {
    lineHeight: '1.2em',
    display: 'block',
    color: `${token.color.gray.dark}`,

    [`& + *`]: {
      marginTop: token.spacing.min,
    },

    [`& a:hover, a:focus`]: {
      textDecoration: 'underline',
    },
  },
  subElement: {
    color: 'currentColor',
  },
};

const pronounsStyles = {
  element: {
    fontStyle: 'italic',

    [`& + *`]: {
      marginTop: token.spacing.min,
    },
  },
  subElement: {
    color: 'currentColor',
  },
};

const subTextStyles = {
  element: {
    fontStyle: 'italic',
  },
  siblingAfter: {
    marginTop: token.spacing.min,
  },
};

const containerStyles = {
  className: ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER,
  zIndex: '9',
  position: 'relative',
};

export default ({
  name,
  job,
  association,
  pronouns,
  subText,

  isThemeDark,
}: PersonTextLockup) => {
  const container = document.createElement('div');
  let styles = `
    ${Utility.styles.getStyleStringFromJssObject(containerStyles)}
  `;

  container.classList.add(ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER);

  if (name) {
    const styledHeadline = ElementModel.headline.sansLarger({
      element: name,
      elementStyles: headlineStyles,
      isThemeDark,
    });
    container.appendChild(styledHeadline.element);
    styles += styledHeadline.styles;
  }

  if (job) {
    const styledJob = ElementModel.headline.sansSmall({
      element: job,
      elementStyles: jobStyles,
      isThemeDark,
    });
    container.appendChild(styledJob.element);
    styles += styledJob.styles;
  }

  if (association) {
    const styledAssociation = ElementModel.headline.sansSmall({
      element: association,
      elementStyles: associationStyles,
      isThemeDark,
    });
    container.appendChild(styledAssociation.element);
    styles += styledAssociation.styles;
  }

  if (pronouns) {
    const styledPronouns = ElementModel.headline.sansSmall({
      element: pronouns,
      elementStyles: pronounsStyles,
      isThemeDark,
    });
    container.appendChild(styledPronouns.element);
    styles += styledPronouns.styles;
  }

  if (subText) {
    const styledSubText = ElementModel.headline.sansSmall({
      element: subText,
      elementStyles: subTextStyles,
      isThemeDark,
    });
    container.appendChild(styledSubText.element);
    styles += styledSubText.styles;
  }

  return { element: container, styles };
};
