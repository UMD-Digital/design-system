import { Animations } from '@universityofmaryland/variables';
import { MarkupModify, Styles } from 'utilities';

interface HeadlineProps {
  element: HTMLElement;
  fontStyle: Record<string, string>;
  additonalStyles?: {
    element: string;
    siblingAfter: string;
    subElement: string;
  };
  isColorWhite?: boolean;
}

const { ConvertJSSObjectToStyles } = Styles;
const { Link } = Animations;

const CreateHeadline = ({
  element,
  fontStyle,
  additonalStyles,
}: HeadlineProps) => {
  const { class: className, ...fontStyles } = fontStyle;
  let styles = ConvertJSSObjectToStyles({
    styleObj: {
      [`.${className}`]: fontStyles,
    },
  });
  styles += ConvertJSSObjectToStyles({
    styleObj: {
      [`.${className} *`]: fontStyles,
    },
  });
  styles += ConvertJSSObjectToStyles({
    styleObj: {
      [`.${className} a`]: Link.LineSlideUnder.black,
    },
  });

  if (additonalStyles?.element) {
    styles += `.${className} { ${additonalStyles.element} }`;
  }

  if (additonalStyles?.siblingAfter) {
    styles += `.${className} + * { ${additonalStyles.siblingAfter} }`;
  }

  if (additonalStyles?.subElement) {
    styles += `.${className} { ${additonalStyles.subElement} }`;
  }

  MarkupModify.AnimationLinkSpan({ element });
  element.classList.add(className);

  return {
    element,
    className,
    styles,
  };
};

export default CreateHeadline;
