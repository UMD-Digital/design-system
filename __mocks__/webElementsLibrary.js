// Mock for @universityofmaryland/web-elements-library
// This mock provides element creation functions and utilities for the elements package

module.exports = {
  // Atomic elements - basic building blocks
  Atomic: {
    actions: {
      primary: jest.fn().mockReturnValue({
        element: document.createElement('button'),
        styles: '.mock-style-action-primary'
      }),
      secondary: jest.fn().mockReturnValue({
        element: document.createElement('button'),
        styles: '.mock-style-action-secondary'
      }),
      outline: jest.fn().mockReturnValue({
        element: document.createElement('button'),
        styles: '.mock-style-action-outline'
      }),
      options: jest.fn().mockImplementation(({ element }) => ({
        element,
        styles: '.mock-style-actions'
      }))
    },
    animations: {
      loader: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-loader'
      }),
      transition: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-transition'
      }),
      brand: {
        chevronScroll: jest.fn().mockReturnValue({
          element: document.createElement('div'),
          styles: '.mock-style-chevron-scroll'
        })
      }
    },
    assets: {
      image: jest.fn().mockReturnValue({
        element: document.createElement('img'),
        styles: '.mock-style-image'
      }),
      icon: jest.fn().mockReturnValue({
        element: document.createElement('span'),
        styles: '.mock-style-icon'
      }),
      logo: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-logo'
      })
    },
    buttons: {
      close: jest.fn().mockReturnValue({
        element: document.createElement('button'),
        styles: '.mock-style-button-close'
      }),
      hamburger: jest.fn().mockReturnValue({
        element: document.createElement('button'),
        styles: '.mock-style-button-hamburger'
      })
    },
    events: {
      meta: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-events-meta'
      }),
      sign: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-sign'
      })
    },
    layout: {
      container: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-container'
      }),
      overlay: {
        modal: jest.fn().mockReturnValue({
          element: document.createElement('div'),
          styles: '.mock-style-layout-overlay-modal'
        })
      }
    },
    textLockup: {
      date: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-textlockup-date'
      }),
      title: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-textlockup-title'
      })
    }
  },

  // Composite elements - complex UI patterns
  Composite: {
    accordion: {
      item: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-accordion-item'
      })
    },
    alert: {
      page: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-alert-page'
      }),
      site: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-alert-site'
      })
    },
    banner: {
      promo: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-banner-promo'
      })
    },
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
        color: jest.fn().mockReturnValue({
          element: document.createElement('div'),
          styles: '.mock-style-overlay-card-color'
        }),
        image: jest.fn().mockReturnValue({
          element: document.createElement('div'),
          styles: '.mock-style-overlay-card-image'
        })
      },
      video: {
        short: jest.fn().mockReturnValue({
          element: document.createElement('div'),
          styles: '.mock-style-video-card'
        })
      }
    },
    carousel: {
      cards: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-carousel-cards'
      }),
      image: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-carousel-image'
      }),
      images: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-carousel-images'
      }),
      macro: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-carousel-macro'
      }),
      thumbnail: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-carousel-thumbnail'
      })
    },
    footer: {
      options: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-footer-options'
      })
    },
    hero: {
      brand: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-hero-brand'
      }),
      expand: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-hero-expand'
      }),
      grid: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-hero-grid'
      }),
      logo: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-hero-logo'
      }),
      minimal: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-hero-minimal'
      }),
      overlay: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-hero-overlay'
      }),
      stacked: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-hero-stacked'
      }),
      standard: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-hero-standard'
      }),
      custom: {
        expand: jest.fn().mockReturnValue({
          element: document.createElement('div'),
          styles: '.mock-style-hero-expand'
        }),
        grid: jest.fn().mockReturnValue({
          element: document.createElement('div'),
          styles: '.mock-style-hero-grid'
        }),
        videoArrow: jest.fn().mockReturnValue({
          element: document.createElement('div'),
          styles: '.mock-style-hero-video-arrow'
        })
      }
    },
    layout: {
      box: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-layout-box'
      }),
      image: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-layout-image'
      }),
      scrollTop: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-layout-scrollTop'
      }),
      sticky: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-layout-sticky'
      }),
      modal: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-layout-modal'
      })
    },
    navigation: {
      breadcrumb: jest.fn().mockReturnValue({
        element: document.createElement('nav'),
        styles: '.mock-style-breadcrumb'
      }),
      drawer: jest.fn().mockReturnValue({
        element: document.createElement('nav'),
        styles: '.mock-style-drawer'
      }),
      header: jest.fn().mockReturnValue({
        element: document.createElement('header'),
        styles: '.mock-style-header'
      }),
      utility: jest.fn().mockReturnValue({
        element: document.createElement('nav'),
        styles: '.mock-style-utility'
      })
    },
    pathway: {
      highlight: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-pathway-highlight'
      }),
      image: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-pathway-image'
      })
    },
    person: {
      bio: {
        full: jest.fn().mockReturnValue({
          element: document.createElement('div'),
          styles: '.mock-style-person-bio-full'
        }),
        small: jest.fn().mockReturnValue({
          element: document.createElement('div'),
          styles: '.mock-style-person-bio-small'
        })
      },
      block: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-person-block'
      }),
      list: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-person-list'
      }),
      tabular: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-person-tabular'
      }),
      display: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-person-display'
      }),
      hero: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-person-hero'
      })
    },
    quote: {
      featured: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-quote-featured'
      }),
      inline: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-quote-inline'
      })
    },
    slider: {
      events: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-slider',
        events: {
          load: jest.fn()
        }
      })
    },
    stat: {
      display: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-stat-display'
      })
    },
    tab: {
      display: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-tab-display'
      })
    }
  },

  // Layout utilities
  Layout: {
    grid: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-style-layout-grid'
    }),
    container: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-style-layout-container'
    }),
    section: jest.fn().mockReturnValue({
      element: document.createElement('section'),
      styles: '.mock-style-layout-section'
    })
  },

  // Model utilities for element creation patterns
  Model: {
    createElement: jest.fn().mockImplementation(({ tag, attributes = {}, children = [] }) => {
      const element = document.createElement(tag);
      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
      children.forEach(child => element.appendChild(child));
      return element;
    }),
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
        })),
        outlineOptions: jest.fn().mockImplementation(({ element }) => ({
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
  },

  // Utilities
  Utilities: {
    accessibility: {
      setFocus: jest.fn(),
      trapFocus: jest.fn(),
      releaseFocus: jest.fn()
    },
    assets: {
      icon: jest.fn().mockReturnValue('<svg></svg>'),
      logo: jest.fn().mockReturnValue('<svg></svg>')
    },
    markup: {
      create: {
        element: jest.fn(({ elementType, attributes = {} }) => {
          const element = document.createElement(elementType);
          Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
          });
          return element;
        })
      },
      validate: {
        isElement: jest.fn().mockReturnValue(true)
      }
    },
    styles: {
      optimizedCss: jest.fn().mockResolvedValue('optimized-css'),
      inject: jest.fn()
    },
    events: {
      dispatchEvent: jest.fn((element, eventName, detail) => {
        const event = new CustomEvent(eventName, {
          detail,
          bubbles: true,
          cancelable: true
        });
        return element.dispatchEvent(event);
      })
    },
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
    }
  }
};