module.exports = {
  Utilities: {
    network: {
      FetchGraphQL: jest.fn().mockImplementation(() => {
        return Promise.resolve({
          data: {
            entries: {
              events: [
                {
                  id: 1,
                  title: 'Test Article',
                  url: 'https://example.com/1',
                  date: '2023-01-01',
                  dateFormatted: 'January 1, 2023',
                  summary: 'Test summary',
                  image: [{ url: 'https://example.com/image.jpg', altText: 'Test' }],
                  categories: [{ title: 'News', url: 'https://example.com/categories/news' }]
                }
              ]
            },
            entryCount: 1
          }
        });
      })
    },
    events: {
      dispatchEvent: jest.fn()
    },
    styles: {
      optimizedCss: jest.fn().mockResolvedValue('optimized-css')
    }
  },
  Composite: {
    card: {
      block: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-block-card'
      }),
      list: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-list-card'
      }),
      overlay: {
        image: jest.fn().mockReturnValue({
          element: document.createElement('div'),
          styles: '.mock-style-overlay-card'
        })
      }
    },
    slider: {
      events: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-slider',
        events: {
          load: jest.fn()
        }
      })
    }
  },
  Atomic: {
    events: {
      sign: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-sign'
      })
    },
    textLockup: {
      date: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-textlockup'
      })
    },
    actions: {
      options: jest.fn().mockImplementation(({ element }) => ({
        element,
        styles: '.mock-style-actions'
      }))
    }
  },
  Model: {
    ElementModel: {
      layout: {
        alignedCenter: jest.fn().mockImplementation(({ element }) => ({
          element,
          styles: '.aligned-center { margin-top: 2rem; }'
        })),
        gridStacked: jest.fn().mockReturnValue({
          element: document.createElement('div'),
          styles: '.mock-style-gridStacked'
        }),
        grid: jest.fn().mockReturnValue({
          element: document.createElement('div'),
          styles: '.mock-style-grid'
        })
      },
      actions: {
        outline: jest.fn().mockImplementation(({ element }) => ({
          element,
          styles: '.outline-button { color: blue; }'
        }))
      },
      headline: {
        sansExtraLarge: jest.fn().mockReturnValue({
          element: document.createElement('p'),
          styles: '.mock-style-headline'
        })
      }
    }
  }
};