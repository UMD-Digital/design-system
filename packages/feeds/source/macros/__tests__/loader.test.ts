import loader from '../loader';

const ID_UMD_LOADER = 'umd-loader-container';

describe('Loader Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('creates a loader component with correct structure', () => {
    const component = loader.create({});

    expect(component).toBeDefined();
    expect(component).toBeInstanceOf(HTMLDivElement);
    expect(component.element.classList.contains(ID_UMD_LOADER)).toBeTruthy();

    const wrapper = component.element.firstChild as HTMLElement;
    expect(wrapper).toBeDefined();
    expect(wrapper.childNodes.length).toBe(4);

    for (let i = 0; i < 4; i++) {
      expect(wrapper.childNodes[i]).toBeInstanceOf(HTMLDivElement);
    }
  });

  test('removes loader from container', () => {
    const container = document.createElement('div');
    const loaderElement = loader.create({});
    container.appendChild(loaderElement.element);

    loader.remove({ container });

    expect(container.querySelector(`.${ID_UMD_LOADER}`)).toBeNull();
  });

  test('displays loader in container', () => {
    const container = document.createElement('div');

    loader.display({ container });

    const loaderElement = container.querySelector(`.${ID_UMD_LOADER}`);
    expect(loaderElement).toBeDefined();
    expect(loaderElement).not.toBeNull();
  });
});
