import { Tokens, Typography } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import ListImageContainer from '../list/image';
import LockupTextContainer, {
  TypeTextLockupSmall,
  ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE,
} from '../lockup/text-small';
import ListContainer from '../list/container';

type TypeListCardProps = TypeTextLockupSmall & {
  image?: HTMLImageElement | null;
};

const { Spacing } = Tokens;
const { SansLarger } = Typography;
const { ConvertJSSObjectToStyles } = Styles;

const ELEMENT_NAME = 'umd-card-list';
const ELEMENT_LIST_CARD_CONTAINER = 'card-list-container';

const OVERWRITE_LIST_CARD_HEADLINE = `.${ELEMENT_LIST_CARD_CONTAINER} .${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE}`;

const OverwriteHeadlineStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_LIST_CARD_HEADLINE}`]: SansLarger,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_LIST_CARD_HEADLINE} *`]: SansLarger,
    },
  })}
`;

// prettier-ignore
const STYLES_LIST_CARD_ELEMENT = `
  .${ELEMENT_LIST_CARD_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }
  
  .${ELEMENT_LIST_CARD_CONTAINER} + * {
    margin-top: ${Spacing.md}; 
  }

  ${LockupTextContainer.Styles}
  ${ListImageContainer.Styles}
  ${ListContainer.Styles}
  ${OverwriteHeadlineStyles}
`;

const CreateCardListElement = (element: TypeListCardProps) => {
  const { theme, image } = element;
  const textContainer = LockupTextContainer.CreateElement(element);
  const elementContainer = document.createElement('div');
  const imageContainer = image
    ? ListImageContainer.CreateElement({ image })
    : null;
  const container = ListContainer.CreateElement({
    textContainer,
    imageContainer,
    theme,
  });

  elementContainer.appendChild(container);
  elementContainer.classList.add(ELEMENT_LIST_CARD_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreateCardListElement,
  Styles: STYLES_LIST_CARD_ELEMENT,
};
