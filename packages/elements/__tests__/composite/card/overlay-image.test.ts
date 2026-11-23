import { assets } from 'atomic';
import { createCardOverlayImage } from '../../../source/composite/card/overlay/image';
import '../test-helpers/setup';

jest.mock('atomic', () => {
  const createModel = () => ({
    element: document.createElement('div'),
    styles: '',
  });

  return {
    actions: { icon: jest.fn(createModel) },
    assets: { image: { background: jest.fn(createModel) } },
    textLockup: { smallScaling: jest.fn(createModel) },
  };
});

jest.mock('@universityofmaryland/web-utilities-library/string', () => ({
  truncateTextBasedOnSize: jest.fn(),
}));

jest.mock('@universityofmaryland/web-icons-library/brand', () => ({
  quote: '<svg aria-hidden="true"></svg>',
}));

const background = jest.mocked(assets.image.background);

const createLinkedImage = () => {
  const link = document.createElement('a');
  const image = document.createElement('img');

  link.href = 'https://example.com/article';
  image.alt = 'Article image';
  link.appendChild(image);

  return link;
};

describe('Card Overlay Image — background gradient', () => {
  beforeEach(() => {
    background.mockClear();
  });

  it('lets clicks pass through the gradient to the image link', () => {
    createCardOverlayImage({ backgroundImage: createLinkedImage() });

    const { customStyles } = background.mock.calls[0][0];

    if (customStyles === undefined) {
      throw new Error('Image wrapper styles were not provided');
    }

    expect(customStyles['&:before']).toMatchObject({
      zIndex: 1,
      pointerEvents: 'none',
    });
  });
});
