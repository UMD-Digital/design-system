import { Typography, Tokens, Layout } from '@universityofmaryland/variables';
import { Styles } from 'utilities';

type TypeLayoutImageExpandProps = {
  content: HTMLElement;
  image: HTMLImageElement;
};

const ELEMENT_NAME = 'umd-section-intro-default';
const ELEMENT_LIST_CONTAINER = 'intro-default-container';

// prettier-ignore
const STYLES_LAYOUT_IMAGE_EXPAND = `
  .${ELEMENT_LIST_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }
`;

const CreateLayoutImageExpand = ({ content }: TypeLayoutImageExpandProps) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');

  container.appendChild(wrapper);

  return container;
};

export default {
  CreateElement: CreateLayoutImageExpand,
  Styles: STYLES_LAYOUT_IMAGE_EXPAND,
};
