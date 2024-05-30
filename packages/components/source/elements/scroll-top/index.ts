type TypeScrollTopProps = {};

const ELEMENT_NAME = 'umd-card-block';
const ELEMENT_CARD_BLOCK_DECLARATION = 'card-block-declarion';
const ELEMENT_CARD_BLOCK_CONTAINER = 'card-block-container';

// prettier-ignore
const STYLES_SCROLL_TOP_ELEMENT = `
  .${ELEMENT_CARD_BLOCK_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }


  .${ELEMENT_CARD_BLOCK_CONTAINER} {

  }
`;

const CreateScrollTopElement = (props: TypeScrollTopProps) => {
  const declaration = document.createElement('div');
  const container = document.createElement('div');

  container.classList.add(ELEMENT_CARD_BLOCK_CONTAINER);

  declaration.appendChild(container);
  declaration.classList.add(ELEMENT_CARD_BLOCK_DECLARATION);

  return declaration;
};

export default {
  CreateElement: CreateScrollTopElement,
  Styles: STYLES_SCROLL_TOP_ELEMENT,
};
