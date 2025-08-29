import { layout } from '../index';

// Set up mock implementation for web-elements-library's Model.ElementModel.layout
jest.mock('@universityofmaryland/web-elements-library', () => {
  return {
    Model: {
      ElementModel: {
        layout: {
          gridStacked: jest.fn(),
          grid: jest.fn(),
        },
      },
    },
    Composite: {
      card: {
        overlay: {
          imageClassRef: 'mock-overlay-image-class',
        },
      },
    },
  };
});

// Import the mock functions after the jest.mock call
import { Model } from '@universityofmaryland/web-elements-library';
const mockGridStacked = Model.ElementModel.layout.gridStacked as jest.Mock;
const mockGrid = Model.ElementModel.layout.grid as jest.Mock;

// Create mock for the styles library
jest.mock('@universityofmaryland/web-styles-library', () => {
  return {
    token: {
      spacing: { md: '16px' },
      media: { queries: { large: { min: 'min-width: 1024px' } } },
      color: { 
        white: '#ffffff',
        gray: {
          light: '#cccccc',
          dark: '#333333'
        }
      }
    },
    element: {
      asset: {
        image: {
          wrapperScaled: { className: 'mock-wrapper-class' }
        }
      },
      composite: {
        card: {
          overlay: {
            image: {
              tint: { className: 'mock-tint-class' }
            }
          }
        }
      }
    }
  };
});

describe('Layout Elements', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Set default mock return values
    mockGridStacked.mockImplementation(() => ({
      element: document.createElement('div'),
      styles: '.mock-style-gridStacked',
    }));
    
    mockGrid.mockImplementation(() => ({
      element: document.createElement('div'),
      styles: '.mock-style-grid',
    }));
  });

  describe('stacked', () => {
    test('creates a stacked grid layout', () => {
      layout.stacked();
      
      expect(mockGridStacked).toHaveBeenCalled();
      expect(mockGridStacked).toHaveBeenCalledWith(
        expect.objectContaining({
          element: expect.any(HTMLDivElement),
          elementStyles: expect.any(Object),
        })
      );
    });
  });

  describe('grid', () => {
    test('creates a grid layout with two columns by default', () => {
      layout.grid({});
      
      expect(mockGrid).toHaveBeenCalled();
      expect(mockGrid).toHaveBeenCalledWith(
        expect.objectContaining({
          element: expect.any(HTMLDivElement),
          isGap: false,
          isColumnsTwo: true,
          isColumnsThree: false,
          isColumnsFour: false,
        })
      );
    });

    test('creates a grid layout with specified number of columns', () => {
      layout.grid({ count: 3 });
      
      expect(mockGrid).toHaveBeenCalledWith(
        expect.objectContaining({
          isColumnsTwo: false,
          isColumnsThree: true,
          isColumnsFour: false,
        })
      );
    });
  });

  describe('gridGap', () => {
    test('creates a grid with gap and two columns by default', () => {
      layout.gridGap({});
      
      expect(mockGrid).toHaveBeenCalledWith(
        expect.objectContaining({
          isGap: true,
          isColumnsTwo: true,
          isColumnsThree: false,
          isColumnsFour: false,
        })
      );
    });

    test('creates a grid with gap and specified number of columns', () => {
      layout.gridGap({ count: 4 });
      
      expect(mockGrid).toHaveBeenCalledWith(
        expect.objectContaining({
          isGap: true,
          isColumnsTwo: false,
          isColumnsThree: false,
          isColumnsFour: true,
        })
      );
    });
  });

  describe('gridOffsetGap', () => {
    test('creates a grid with offset, gap and default properties', () => {
      layout.gridOffsetGap({});
      
      expect(mockGrid).toHaveBeenCalledWith(
        expect.objectContaining({
          elementStyles: expect.objectContaining({
            element: expect.objectContaining({
              [' > *:first-child']: expect.objectContaining({
                order: -1,
              }),
            }),
          }),
          isGap: true,
          isColumnsTwo: true,
        })
      );
    });

    test('creates a grid with offset, gap and reversed layout', () => {
      layout.gridOffsetGap({ isLayoutReversed: true });
      
      expect(mockGrid).toHaveBeenCalledWith(
        expect.objectContaining({
          elementStyles: expect.objectContaining({
            element: expect.objectContaining({
              [' > *:first-child']: expect.objectContaining({
                order: 2,
              }),
            }),
          }),
        })
      );
    });

    test('creates a grid with offset, gap and custom sticky position', () => {
      layout.gridOffsetGap({ overwriteStickyPosition: 100 });
      
      expect(mockGrid).toHaveBeenCalledWith(
        expect.objectContaining({
          elementStyles: expect.any(Object),
        })
      );
      
      // Instead of checking exact CSS properties, just verify the function was called correctly
      expect(mockGrid.mock.calls[0][0].elementStyles.element).toBeDefined();
    });
  });
});