export const summary = ({ text }: { text: string }): HTMLDivElement | null => {
  if (text) {
    const textElement = document.createElement('div');
    const textNode = document.createElement('p');
    textNode.innerHTML = text;
    textElement.appendChild(textNode);
    return textElement;
  }

  return null;
};

export const headline = ({ text, url }: { text: string; url: string }): HTMLParagraphElement | null => {
  if (text && url) {
    const headline = document.createElement('p');
    const headlineLink = document.createElement('a');

    headlineLink.href = url;
    headlineLink.innerHTML = text;
    headlineLink.target = '_blank';
    headlineLink.rel = 'noopener noreferrer';
    headline.appendChild(headlineLink);

    return headline;
  }

  return null;
};

export const date = ({
  date,
  dateFormatted,
}: {
  date: string;
  dateFormatted: string;
}): HTMLTimeElement | null => {
  if (date && dateFormatted) {
    const dateElement = document.createElement('time');
    dateElement.innerHTML = dateFormatted;
    dateElement.setAttribute('datetime', date);
    return dateElement;
  }

  return null;
};
