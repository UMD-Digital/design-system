import * as campaign from '../../source/typography/campaign';

describe('typography/campaign', () => {
  it('should match snapshot', () => {
    expect(campaign).toMatchSnapshot();
  });

  describe('size objects', () => {
    it('should have correctly defined campaign text sizes', () => {
      // Test individual size exports
      expect(campaign.maximum).toMatchSnapshot();
      expect(campaign.extralarge).toMatchSnapshot();
      expect(campaign.large).toMatchSnapshot();
      expect(campaign.medium).toMatchSnapshot();
      expect(campaign.small).toMatchSnapshot();
      expect(campaign.extraSmall).toMatchSnapshot();
    });
  });

  describe('fonts objects', () => {
    it('should have correctly named font objects with classNames', () => {
      expect(campaign.fonts.maximum.className).toBe('umd-campaign-maximum');
      expect(campaign.fonts.extraLarge.className).toBe(
        'umd-campaign-extralarge',
      );
      expect(campaign.fonts.large.className).toBe('umd-campaign-large');
      expect(campaign.fonts.medium.className).toBe('umd-campaign-medium');
      expect(campaign.fonts.small.className).toBe('umd-campaign-small');
      expect(campaign.fonts.extraSmall.className).toBe(
        'umd-campaign-extrasmall',
      );
    });

    it('should match snapshot for all fonts objects', () => {
      expect(campaign.fonts).toMatchSnapshot();
    });
  });
});
