let TITLE_ELEMENT: HTMLElement;
let PREVIOUS_PAGE_URL: string;

const getPreviousPageUrl = () => {
  PREVIOUS_PAGE_URL = document.referrer;
};

const savePreviousPageHeading = () => {
  getPreviousPageUrl();
  const currentHeading: string =
    document.querySelector('h1')?.textContent || '';
  localStorage.setItem('previousPageHeading', currentHeading);
};

const createBackButton = (): HTMLElement => {
  const backButton = document.createElement('button');
  const link = document.createElement('a');
  const previousPageHeading =
    localStorage.getItem('previousPageHeading') || 'Previous Page';

  backButton.setAttribute('class', 'call-to-action-outline');

  link.setAttribute('href', PREVIOUS_PAGE_URL);
  link.textContent = `Back to ${previousPageHeading}`;

  backButton.appendChild(link);
  backButton.addEventListener('click', () => {
    savePreviousPageHeading();
  });

  return backButton;
};

const LoadBackButton = () => {
  TITLE_ELEMENT =
    document.querySelector('.component-title') ?? document.createElement('div');

  const parentElement = TITLE_ELEMENT.parentElement;
  const backButtonExists =
    parentElement?.querySelector('.call-to-action-outline') !== null;

  getPreviousPageUrl();

  if (PREVIOUS_PAGE_URL && !backButtonExists) {
    const backButton = createBackButton();

    TITLE_ELEMENT.parentElement?.insertBefore(backButton, TITLE_ELEMENT);
  }
  savePreviousPageHeading();
};

export default () => {
  LoadBackButton();
};
