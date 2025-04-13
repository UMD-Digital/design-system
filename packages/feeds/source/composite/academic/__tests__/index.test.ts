import * as academicModule from '../index';
import sliderImplementation from '../slider';

describe('Academic Module', () => {
  test('exports the slider component', () => {
    // Verify slider is exported from the academic module
    expect(academicModule.slider).toBeDefined();
    expect(academicModule.slider).toBe(sliderImplementation);
  });
});