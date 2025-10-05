import * as Icons from '../index';

describe('Main Icons Export', () => {
  it('should export navigation icons', () => {
    expect(Icons.ARROW).toBeDefined();
    expect(Icons.CHEVRON_SMALL).toBeDefined();
  });

  it('should export UI control icons', () => {
    expect(Icons.PAUSE).toBeDefined();
    expect(Icons.PLAY).toBeDefined();
    expect(Icons.CLOSE_BUTTON).toBeDefined();
    expect(Icons.CLOSE_X).toBeDefined();
  });

  it('should export communication icons', () => {
    expect(Icons.EMAIL).toBeDefined();
    expect(Icons.PHONE).toBeDefined();
  });

  it('should export time icons', () => {
    expect(Icons.CALENDAR).toBeDefined();
    expect(Icons.CLOCK).toBeDefined();
  });

  it('should export alert icons', () => {
    expect(Icons.EXCLAMATION).toBeDefined();
    expect(Icons.NOTIFICATION).toBeDefined();
  });

  it('should export social icons', () => {
    expect(Icons.FACEBOOK).toBeDefined();
    expect(Icons.INSTAGRAM).toBeDefined();
  });

  it('should export logos', () => {
    expect(Icons.DARK_LOGO).toBeDefined();
    expect(Icons.LIGHT_LOGO).toBeDefined();
  });

  it('should export brand icons', () => {
    expect(Icons.FEARLESS).toBeDefined();
  });

  it('should export user icons', () => {
    expect(Icons.PERSON).toBeDefined();
  });

  it('should export location icons', () => {
    expect(Icons.PIN).toBeDefined();
  });

  it('should export content icons', () => {
    expect(Icons.QUOTE).toBeDefined();
  });

  it('should export search icons', () => {
    expect(Icons.MAGNIFY_GLASS).toBeDefined();
  });
});
