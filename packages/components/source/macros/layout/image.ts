import { Tokens, Typography } from '@universityofmaryland/variables';
import { Styles } from 'utilities';

const { Spacing, Colors } = Tokens;
const { SansMin } = Typography;
const { ConvertJSSObjectToStyles } = Styles;

const ATTRIBUTE_CAPTION = 'data-caption';

const ELEMENT_IMAGE_CONTAINER = 'image-container';

// prettier-ignore
const STYLES_IMAGE_CONTAINER = `
  .${ELEMENT_IMAGE_CONTAINER} {
    position: relative;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_IMAGE_CONTAINER} > span`]: SansMin,
    },
  })}

  .${ELEMENT_IMAGE_CONTAINER} > span {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: ${Spacing.min};
    background-color: rgba(0, 0, 0, 0.5);
    color: ${Colors.white};
    z-index: 99;
  }

  .${ELEMENT_IMAGE_CONTAINER} > img {
    display: block;
    width: 100%;
  }

  .${ELEMENT_IMAGE_CONTAINER} > a {
    display: block;
    line-height: 0;
    overflow: hidden;
  }

  .${ELEMENT_IMAGE_CONTAINER} > a img {
    object-fit: cover;
    object-position: center;
    transform: scale(1);
    transition: transform 0.5s;
    width: 100%;
  }

  .${ELEMENT_IMAGE_CONTAINER} > a:hover img,
  .${ELEMENT_IMAGE_CONTAINER} > a:focus img {
    transform: scale(1.025);
  }
`;

const CreateImageContainer = ({
  image,
  showCaption = false,
}: {
  image: HTMLImageElement | string;
  showCaption?: boolean;
}) => {
  const container = document.createElement('div');
  const isString = typeof image === 'string';
  const hasCaption = !isString && image.hasAttribute(ATTRIBUTE_CAPTION);

  container.classList.add(ELEMENT_IMAGE_CONTAINER);

  if (isString) {
    container.innerHTML = image;
    return container;
  }

  if (hasCaption && showCaption) {
    const caption = document.createElement('span');
    caption.textContent = image.getAttribute(ATTRIBUTE_CAPTION);
    container.appendChild(caption);
  }

  container.appendChild(image);
  return container;
};

export default {
  CreateElement: CreateImageContainer,
  Styles: STYLES_IMAGE_CONTAINER,
  Elements: {
    container: ELEMENT_IMAGE_CONTAINER,
  },
};
