module.exports = {
  typography: {
    sans: {
      fonts: {
        extraLarge: { className: 'mock-font-extra-large' },
        larger: { className: 'mock-font-larger' },
        large: { className: 'mock-font-large' },
        base: { className: 'mock-font-base' },
        small: { className: 'mock-font-small' },
        min: { className: 'mock-font-min' }
      },
      scalingFonts: {
        larger: { className: 'mock-scaling-font-larger' },
        base: { className: 'mock-scaling-font-base' },
        min: { className: 'mock-scaling-font-min' }
      }
    },
    serif: {
      fonts: {
        extraLarge: { className: 'mock-serif-extra-large' },
        larger: { className: 'mock-serif-larger' },
        large: { className: 'mock-serif-large' },
        base: { className: 'mock-serif-base' }
      }
    },
    campaign: {
      fonts: {
        maximum: { className: 'mock-campaign-maximum' },
        extraLarge: { className: 'mock-campaign-extra-large' },
        larger: { className: 'mock-campaign-larger' },
        large: { className: 'mock-campaign-large' },
        medium: { className: 'mock-campaign-medium' },
        base: { className: 'mock-campaign-base' },
        small: { className: 'mock-campaign-small' },
        min: { className: 'mock-campaign-min' }
      }
    }
  },
  token: {
    spacing: {
      lg: '2rem',
      md: '16px'
    },
    media: {
      queries: {
        large: {
          min: 'min-width: 1024px'
        },
        highDef: {
          min: 'min-width: 1440px'
        },
        tablet: {
          min: 'min-width: 768px'
        }
      }
    },
    color: {
      white: '#ffffff',
      gray: {
        dark: '#333333',
        light: '#f5f5f5',
        lighter: '#fafafa',
        medium: '#666666'
      },
      red: '#d3232a',
      gold: '#ffc600',
      black: '#000000'
    }
  },
  layout: {
    alignment: {
      block: {
        center: {
          className: 'center-class'
        }
      }
    }
  },
  element: {
    composite: {
      card: {
        overlay: {
          image: {
            tint: {
              className: 'mock-tint-class'
            }
          }
        }
      }
    },
    asset: {
      image: {
        wrapperScaled: {
          className: 'mock-wrapper-class'
        }
      }
    }
  },
  utilities: {
    events: {
      dispatchEvent: jest.fn((element, eventName, detail) => {
        const event = new CustomEvent(eventName, {
          detail,
          bubbles: true, 
          cancelable: true
        });
        return element.dispatchEvent(event);
      }),
      eventNames: {
        FEED_LOADED: 'feed:loaded',
        FEED_ERROR: 'feed:error',
        FEED_ITEM_CLICK: 'feed:item:click'
      }
    }
  }
};