import * as accessibility from '../../source/accessibility/index';

describe('accessibility module', () => {
  it('should match snapshot', () => {
    expect(accessibility).toMatchSnapshot();
  });

  it('should export screenReader module', () => {
    expect(accessibility.screenReader).toBeDefined();
    expect(accessibility.screenReader.only).toBeDefined();
  });

  it('should export skip module', () => {
    expect(accessibility.skip).toBeDefined();
    expect(accessibility.skip.content).toBeDefined();
  });

  it('should have the correct nested structure', () => {
    // Test structure of exported objects
    expect(typeof accessibility.screenReader).toBe('object');
    expect(typeof accessibility.skip).toBe('object');
    
    // Test that the exported functions are correctly defined
    expect(accessibility.screenReader.only.className).toBe('sr-only');
    expect(accessibility.skip.content.className).toBe('umd-skip-content');
  });
});