/**
 * Common DOM element fixtures for testing
 */

import { createElement, createImageElement, createVideoElement, createLinkElement } from '../helpers/element';

/**
 * Creates a container element with common attributes
 */
export function createContainer(className?: string): HTMLElement {
  return createElement('div', undefined, {
    class: className || 'test-container',
    'data-testid': 'container',
  });
}

/**
 * Creates a card-like structure for testing
 */
export function createCardStructure() {
  const container = createContainer('card');
  const image = createImageElement('/card-image.jpg', 'Card image');
  const content = createElement('div', undefined, { class: 'card-content' });
  const headline = createElement('h3', 'Card Headline');
  const description = createElement('p', 'Card description text');
  const link = createLinkElement('/card-link', 'Read more');

  content.appendChild(headline);
  content.appendChild(description);
  content.appendChild(link);
  
  container.appendChild(image);
  container.appendChild(content);

  return { container, image, content, headline, description, link };
}

/**
 * Creates a hero-like structure for testing
 */
export function createHeroStructure() {
  const container = createContainer('hero');
  const background = createElement('div', undefined, { class: 'hero-background' });
  const content = createElement('div', undefined, { class: 'hero-content' });
  const headline = createElement('h1', 'Hero Headline');
  const subheadline = createElement('h2', 'Hero Subheadline');
  const description = createElement('p', 'Hero description text');
  const cta = createLinkElement('/hero-cta', 'Call to Action');

  content.appendChild(headline);
  content.appendChild(subheadline);
  content.appendChild(description);
  content.appendChild(cta);
  
  container.appendChild(background);
  container.appendChild(content);

  return { container, background, content, headline, subheadline, description, cta };
}

/**
 * Creates a list structure for testing
 */
export function createListStructure(itemCount: number = 3) {
  const container = createElement('ul', undefined, { class: 'test-list' });
  const items: HTMLElement[] = [];

  for (let i = 0; i < itemCount; i++) {
    const item = createElement('li', `Item ${i + 1}`, {
      'data-index': i.toString(),
    });
    items.push(item);
    container.appendChild(item);
  }

  return { container, items };
}

/**
 * Creates a media element structure (image or video)
 */
export function createMediaStructure(type: 'image' | 'video' = 'image') {
  const container = createContainer('media-container');
  const media = type === 'image' 
    ? createImageElement('/media.jpg', 'Media image')
    : createVideoElement('/media.mp4');
  const caption = createElement('figcaption', 'Media caption');

  container.appendChild(media);
  container.appendChild(caption);

  return { container, media, caption };
}

/**
 * Creates a navigation structure for testing
 */
export function createNavStructure() {
  const nav = createElement('nav', undefined, { class: 'test-nav' });
  const list = createElement('ul');
  const items = [
    { text: 'Home', url: '/' },
    { text: 'About', url: '/about' },
    { text: 'Contact', url: '/contact' },
  ];

  items.forEach(({ text, url }) => {
    const li = createElement('li');
    const link = createLinkElement(url, text);
    li.appendChild(link);
    list.appendChild(li);
  });

  nav.appendChild(list);

  return { nav, list, items: list.children };
}

/**
 * Creates a form structure for testing
 */
export function createFormStructure() {
  const form = createElement('form', undefined, {
    method: 'post',
    action: '/submit',
  }) as HTMLFormElement;
  
  const input = createElement('input', undefined, {
    type: 'text',
    name: 'test-input',
    placeholder: 'Enter text',
  }) as HTMLInputElement;
  
  const button = createElement('button', 'Submit', {
    type: 'submit',
  }) as HTMLButtonElement;

  form.appendChild(input);
  form.appendChild(button);

  return { form, input, button };
}

export default {
  createContainer,
  createCardStructure,
  createHeroStructure,
  createListStructure,
  createMediaStructure,
  createNavStructure,
  createFormStructure,
};