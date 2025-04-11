import * as campaign from '../campaign';
import { font, media } from '../../token';

describe('typography/campaign', () => {
  it('should match snapshot', () => {
    expect(campaign).toMatchSnapshot();
  });

  describe('size objects', () => {
    it('should have correctly defined campaign text sizes', () => {
      // Test individual size exports
      expect(campaign.maxium).toMatchSnapshot();
      expect(campaign.extralarge).toMatchSnapshot();
      expect(campaign.large).toMatchSnapshot();
      expect(campaign.medium).toMatchSnapshot();
      expect(campaign.CampaignSmall).toMatchSnapshot();
      expect(campaign.extraSmall).toMatchSnapshot();
    });

    it('should use the correct font family for campaign text', () => {
      // Campaign text typically uses the campaign font family
      [
        campaign.maxium,
        campaign.extralarge,
        campaign.large,
        campaign.medium,
        campaign.CampaignSmall,
        campaign.extraSmall,
      ].forEach((size) => {
        expect(size.fontFamily).toBe(font.family.campaign);
      });
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
