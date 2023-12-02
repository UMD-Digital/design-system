type StyleType = {
  [key: string]: string | { [key: string]: string };
};

export const CovertObjectToStyles = ({ styles }: { styles: StyleType }) => {
  let contactString = '';

  for (const [key, value] of Object.entries(styles)) {
    const property = key.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
    if (typeof value !== 'object' && value !== null) {
      contactString += `${property}: ${value};`;
    }
  }

  return contactString;
};

export const CovertObjectMediaQueriesToStyles = ({
  element,
  styles,
}: {
  element: string;
  styles: StyleType;
}) => {
  let contactString = '';

  for (const [query, value] of Object.entries(styles)) {
    if (typeof value === 'object' && value !== null) {
      contactString = `${query} { .${element} {`;
      for (const [key, prop] of Object.entries(value)) {
        const property = key.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
        contactString += `${property}: ${prop};`;
      }
      contactString += `}}`;
    }
  }

  return contactString;
};

export const MakeDefaultStyleTag = ({
  styleString,
}: {
  styleString: string;
}) => {
  const body = document.querySelector('body') as HTMLBodyElement;
  const style = document.createElement('style');
  style.innerHTML = `${styleString.replace(/\s\s+/g, ' ')}`;

  body.appendChild(style);
};

export const Reset = `
  :host * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  :host button {
    border: none;
  }

  :host img {
    max-width: 100%;
  }
`;
