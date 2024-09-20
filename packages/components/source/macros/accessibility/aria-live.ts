const Create = ({ message }: { message: string }) => {
  const container = document.createElement('div');
  const textElement = document.createElement('p');
  container.setAttribute('aria-live', 'polite');
  container.setAttribute('role', 'status');
  container.classList.add('sr-only');

  textElement.innerHTML = message;

  container.appendChild(textElement);

  return container;
};

const Update = ({
  container,
  message,
}: {
  container: HTMLElement;
  message: string;
}) => {
  const element = container.querySelector(`[aria-live]`) as HTMLDivElement;
  const textElement = element.querySelector('p');

  if (textElement) textElement.innerHTML = message;
};

export default {
  Create,
  Update,
};
