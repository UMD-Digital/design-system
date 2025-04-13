module.exports = {
  token: {
    spacing: {
      lg: '2rem',
      md: '16px'
    },
    media: {
      queries: {
        large: {
          min: 'min-width: 1024px'
        }
      }
    },
    color: {
      white: '#ffffff'
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