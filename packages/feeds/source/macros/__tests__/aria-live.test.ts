import ariaLive from '../aria-live';

describe('Aria Live Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('creates an aria-live component with correct attributes', () => {
    const message = 'Test message';
    const component = ariaLive.create({ message });

    expect(component).toBeDefined();
    expect(component).toBeInstanceOf(HTMLDivElement);
    expect(component.getAttribute('aria-live')).toBe('polite');
    expect(component.getAttribute('role')).toBe('status');
    expect(component.classList.contains('sr-only')).toBeTruthy();
    
    const textElement = component.querySelector('p');
    expect(textElement).toBeDefined();
    expect(textElement?.innerHTML).toBe(message);
  });

  test('updates message in existing aria-live component', () => {
    const initialMessage = 'Initial message';
    const updatedMessage = 'Updated message';
    
    const container = document.createElement('div');
    const ariaLiveElement = ariaLive.create({ message: initialMessage });
    container.appendChild(ariaLiveElement);
    
    ariaLive.update({ container, message: updatedMessage });
    
    const textElement = ariaLiveElement.querySelector('p');
    expect(textElement?.innerHTML).toBe(updatedMessage);
  });

  test('handles update when text element is not found', () => {
    const container = document.createElement('div');
    const ariaLiveElement = document.createElement('div');
    ariaLiveElement.setAttribute('aria-live', 'polite');
    container.appendChild(ariaLiveElement);
    
    ariaLive.update({ container, message: 'New message' });
    
    expect(ariaLiveElement.querySelector('p')).toBeNull();
  });
});