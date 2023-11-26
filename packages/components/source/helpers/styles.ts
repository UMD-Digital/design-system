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
