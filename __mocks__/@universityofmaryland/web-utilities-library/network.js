// Mock for @universityofmaryland/web-utilities-library/network

module.exports = {
  isExternalUrl: jest.fn().mockReturnValue(true),
  fetchGraphQL: jest.fn().mockImplementation(({ query }) => {
    // Check if this is a news query (contains 'getArticles' or 'section: "articles"')
    const isNewsQuery = query && (query.includes('getArticles') || query.includes('section: "articles"'));

    if (isNewsQuery) {
      // News articles response structure
      return Promise.resolve({
        data: {
          entryCount: 3,
          entries: [
            {
              id: 1,
              title: 'Test News Article',
              url: 'https://example.com/news/1',
              date: '2023-01-01T10:00:00',
              dateFormatted: 'January 1, 2023',
              summary: 'Test article summary',
              image: [{ url: 'https://example.com/news-image.jpg', altText: 'Test News' }],
              categories: [{ title: 'Research', url: 'https://example.com/research' }],
            },
            {
              id: 2,
              title: 'Test News Article 2',
              url: 'https://example.com/news/2',
              date: '2023-01-02T10:00:00',
              dateFormatted: 'January 2, 2023',
              summary: 'Test article summary 2',
              image: [{ url: 'https://example.com/news-image2.jpg', altText: 'Test News 2' }],
              categories: [{ title: 'Campus', url: 'https://example.com/campus' }],
            },
            {
              id: 3,
              title: 'Test News Article 3',
              url: 'https://example.com/news/3',
              date: '2023-01-03T10:00:00',
              dateFormatted: 'January 3, 2023',
              summary: 'Test article summary 3',
              image: [{ url: 'https://example.com/news-image3.jpg', altText: 'Test News 3' }],
              categories: [{ title: 'Arts', url: 'https://example.com/arts' }],
            },
          ],
        },
      });
    }

    // Events response structure (default)
    return Promise.resolve({
      data: {
        entries: {
          events: [
            {
              id: 1,
              title: 'Test Event',
              url: 'https://example.com/event/1',
              startStamp: '2023-01-01T10:00:00',
              startMonth: 'January',
              startDay: '1',
              startTime: '10:00 AM',
              summary: 'Test event summary',
              image: [{ url: 'https://example.com/image.jpg', altText: 'Test' }],
              location: [{ title: 'Test Location' }],
            },
          ],
        },
        count: {
          events: [{ id: 1 }],
        },
      },
    });
  }),
};
