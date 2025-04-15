import * as academicModule from '../index';
import sliderImplementation from '../slider';

describe('Academic Module', () => {
  test('exports the slider component', () => {
    expect(academicModule.slider).toBeDefined();
    expect(academicModule.slider).toBe(sliderImplementation);
  });
});
