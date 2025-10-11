// Mock for @universityofmaryland/web-utilities-library/network

module.exports = {
  fetchGraphQL: jest.fn().mockImplementation(() => {
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
