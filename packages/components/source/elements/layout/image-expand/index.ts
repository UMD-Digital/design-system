import { Typography, Tokens, Layout } from '@universityofmaryland/variables';
import { Styles } from 'utilities';

type TypeLayoutImageExpandProps = {
  content: HTMLElement;
  image: HTMLImageElement;
};

const { ConvertJSSObjectToStyles } = Styles;
const { Spacing, Queries } = Tokens;
const { LockMax } = Layout;

const ELEMENT_NAME = 'umd-layout-image-expand';
const ELEMENT_LIST_DECLARATION = 'layout-image-expand-declaration';
const ELEMENT_LIST_CONTAINER = 'layout-image-expand-container';
const ELEMENT_LIST_IMAGE_CONTAINER = 'layout-image-expand-image-container';
const ELEMENT_LIST_TEXT_CONTAINER = 'layout-image-expand-text-container';
const ELEMENT_LIST_TEXT_LOCK = 'layout-image-expand-text-lock';

// prettier-ignore
const TextContainer = `
  .${ELEMENT_LIST_TEXT_CONTAINER} {
    position: relative;
    padding-top: ${Spacing.md};
    padding-bottom: ${Spacing.md};
    height: 100%;
  }

  @media (${Queries.tablet.min}) {
    .${ELEMENT_LIST_TEXT_CONTAINER} {
      padding-top: ${Spacing['2xl']};
      padding-bottom: ${Spacing['2xl']};
    }
  }

  @media (${Queries.desktop.min}) {
    .${ELEMENT_LIST_TEXT_CONTAINER} {
      padding-top: ${Spacing['4xl']};
      padding-bottom: ${Spacing['4xl']};
    }
  }

  @media (${Queries.highDef.min}) {
    .${ELEMENT_LIST_TEXT_CONTAINER} {
      padding-top: ${Spacing.max};
      padding-bottom: ${Spacing.max};
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_LIST_TEXT_LOCK}`]: LockMax,
    },
  })}

  .${ELEMENT_LIST_TEXT_LOCK} {
    display: flex;
    height: 100%;
  }
`;

// prettier-ignore
const ImageContainer = `
  .${ELEMENT_LIST_IMAGE_CONTAINER} {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .${ELEMENT_LIST_IMAGE_CONTAINER}::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.75);
  }

  .${ELEMENT_LIST_IMAGE_CONTAINER} img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

// prettier-ignore
const Container = `
  .${ELEMENT_LIST_CONTAINER} {
    height: 100vh;
    width: 100vw;
    position: relative;
  }
`;

// prettier-ignore
const STYLES_LAYOUT_IMAGE_EXPAND = `
  .${ELEMENT_LIST_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${Container}
  ${ImageContainer}
  ${TextContainer}
`;

const CreateLayoutImageExpand = ({
  content,
  image,
}: TypeLayoutImageExpandProps) => {
  const declaration = document.createElement('div');
  const container = document.createElement('div');
  const imageContainer = document.createElement('div');
  const textContainer = document.createElement('div');
  const textLock = document.createElement('div');

  imageContainer.appendChild(image);
  imageContainer.classList.add(ELEMENT_LIST_IMAGE_CONTAINER);

  textLock.classList.add(ELEMENT_LIST_TEXT_LOCK);
  textLock.appendChild(content);

  textContainer.appendChild(textLock);
  textContainer.classList.add(ELEMENT_LIST_TEXT_CONTAINER);

  container.appendChild(imageContainer);
  container.appendChild(textContainer);
  container.classList.add(ELEMENT_LIST_CONTAINER);

  declaration.appendChild(container);
  declaration.classList.add(ELEMENT_LIST_DECLARATION);

  return declaration;
};

export default {
  CreateElement: CreateLayoutImageExpand,
  Styles: STYLES_LAYOUT_IMAGE_EXPAND,
};
