/**
 * Basic test to verify Jest setup is working correctly
 */

describe('Package Setup', () => {
  it('should run tests successfully', () => {
    expect(true).toBe(true);
  });

  it('should have access to jsdom environment', () => {
    expect(document).toBeDefined();
    expect(window).toBeDefined();
  });

  it('should support TypeScript', () => {
    const testNumber: number = 42;
    const testString: string = 'hello';

    expect(typeof testNumber).toBe('number');
    expect(typeof testString).toBe('string');
  });
});