import { tokens, typography } from '@universityofmaryland/web-elements-styles';
import * as Utility from 'utilities';

const { spacing, colors } = tokens;
const { convertJSSObjectToStyles } = Utility.styles;

const ATTRIBUTE_CAPTION = 'data-caption';

const ELEMENT_IMAGE_CONTAINER = 'image-container';

// prettier-ignore
const STYLES_IMAGE_CONTAINER = `
  .${ELEMENT_IMAGE_CONTAINER} {
    position: relative;
    display: inline-block;
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_IMAGE_CONTAINER} > span`]: typography.sans.min,
    },
  })}

  .${ELEMENT_IMAGE_CONTAINER} > span {
    position: absolute;
    bottom: 0;
    right: 0;
    height: auto !important;
    width: auto !important;
    padding: ${spacing.min};
    background-color: rgba(0, 0, 0, 0.5);
    color: ${colors.white};
    z-index: 99;
  }

  .${ELEMENT_IMAGE_CONTAINER} > img {
    display: block;
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
  image: HTMLImageElement | HTMLElement | string;
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
