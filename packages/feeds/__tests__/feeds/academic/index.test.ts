import * as academicModule from '../../../source/feeds/academic/index';
import sliderImplementation from '../../../source/feeds/academic/slider';

describe('Academic Module', () => {
  test('exports the slider component', () => {
    expect(academicModule.slider).toBeDefined();
    expect(academicModule.slider).toBe(sliderImplementation);
  });
});
