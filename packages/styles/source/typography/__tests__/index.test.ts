import * as typography from '../index';

describe('typography module', () => {
  it('should match snapshot', () => {
    expect(typography).toMatchSnapshot();
  });

  it('should export all typography submodules', () => {
    expect(typography.fontFace).toBeDefined();
    expect(typography.campaign).toBeDefined();
    expect(typography.elements).toBeDefined();
    expect(typography.sans).toBeDefined();
    expect(typography.serif).toBeDefined();
    expect(typography.stats).toBeDefined();
  });

  it('should have correctly structured typography exports', () => {
    // Each export should have a fonts property
    expect(typography.campaign.fonts).toBeDefined();
    expect(typography.elements.fonts).toBeDefined();
    expect(typography.sans.fonts).toBeDefined();
    expect(typography.serif.fonts).toBeDefined();
    expect(typography.stats.fonts).toBeDefined();
    
    // Font-face export should have browser string
    expect(typography.fontFace.browserString).toBeDefined();
  });
});