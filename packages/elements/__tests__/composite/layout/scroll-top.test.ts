import { createCompositeLayoutScrollTop as createScrollTop } from '../../../source/composite/layout/scroll-top';
import '../test-helpers/setup';

jest.mock('@universityofmaryland/web-icons-library/arrows', () => ({
  arrow_up: '<svg viewBox="0 0 10 10"><path d="M0 0" /></svg>',
}));

describe('Composite Layout Scroll Top — accessibility', () => {
  const getButton = () => {
    const model = createScrollTop({});
    const button = model.element.querySelector('button');

    if (button === null) {
      throw new Error('Scroll top button was not rendered');
    }

    return button;
  };

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('exposes an accessible name via screen-reader text', () => {
    const button = getButton();
    const label = button.querySelector('.sr-only');

    expect(label).not.toBeNull();
    expect(button.textContent).toContain('Scroll to top');
  });

  it('renders the arrow icon hidden from assistive technology', () => {
    const button = getButton();
    const icon = button.querySelector('[aria-hidden="true"]');

    if (icon === null) {
      throw new Error('Scroll top icon was not rendered');
    }

    expect(icon.querySelector('svg')).not.toBeNull();
  });

  it('is a non-submitting button', () => {
    const button = getButton();

    expect(button.getAttribute('type')).toBe('button');
  });

  it('scrolls to the top when activated', () => {
    const scrollTo = jest.fn();
    window.scrollTo = scrollTo;

    const button = getButton();
    button.click();

    expect(scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
});
