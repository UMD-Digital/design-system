/**
 * Common test content fixtures
 */

export const testContent = {
  // Text content
  text: {
    headline: 'Test Headline',
    subheadline: 'Test Subheadline',
    eyebrow: 'Test Eyebrow',
    description: 'This is a test description that provides some context.',
    longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    cta: 'Learn More',
  },

  // URLs
  urls: {
    internal: '/test-page',
    external: 'https://example.com',
    anchor: '#test-anchor',
    image: '/test-image.jpg',
    video: '/test-video.mp4',
    document: '/test-document.pdf',
  },

  // Media
  media: {
    image: {
      src: '/test-image.jpg',
      alt: 'Test image description',
      srcset: '/test-image-320.jpg 320w, /test-image-640.jpg 640w, /test-image-1280.jpg 1280w',
    },
    video: {
      src: '/test-video.mp4',
      poster: '/test-poster.jpg',
      sources: [
        { src: '/test-video.webm', type: 'video/webm' },
        { src: '/test-video.mp4', type: 'video/mp4' },
      ],
    },
  },

  // Person data
  person: {
    name: 'John Doe',
    title: 'Test Title',
    description: 'Test person description',
    email: 'test@example.com',
    phone: '555-123-4567',
    image: '/test-person.jpg',
    link: '/people/john-doe',
  },

  // Event data
  event: {
    title: 'Test Event',
    date: new Date('2024-12-01T10:00:00'),
    location: 'Test Location',
    description: 'Test event description',
    link: '/events/test-event',
  },

  // Lists
  lists: {
    links: [
      { text: 'Link 1', url: '/link-1' },
      { text: 'Link 2', url: '/link-2' },
      { text: 'Link 3', url: '/link-3' },
    ],
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    social: [
      { platform: 'facebook', url: 'https://facebook.com/test' },
      { platform: 'twitter', url: 'https://twitter.com/test' },
      { platform: 'instagram', url: 'https://instagram.com/test' },
    ],
  },
};

export default testContent;