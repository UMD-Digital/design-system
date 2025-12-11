import { createEventDetails } from '../../source/date/createEventDetails';

describe('createEventDetails', () => {
  describe('happy path', () => {
    it('should create event details with start date only', () => {
      const startDate = {
        dayOfWeek: 'Mon',
        month: 'Sep',
        day: '29',
        time: '2:30pm',
      };

      const result = createEventDetails({ startDate });

      expect(result.startDayOfWeek).toBe('Mon');
      expect(result.startMonth).toBe('Sep');
      expect(result.startDay).toBe('29');
      expect(result.startTime).toBe('2:30pm');
    });

    it('should create event details with start and end date', () => {
      const startDate = {
        dayOfWeek: 'Mon',
        month: 'Sep',
        day: '29',
        time: '2:30pm',
      };
      const endDate = {
        dayOfWeek: 'Tue',
        month: 'Sep',
        day: '30',
        time: '4:00pm',
      };

      const result = createEventDetails({ startDate, endDate });

      expect(result.startDayOfWeek).toBe('Mon');
      expect(result.startMonth).toBe('Sep');
      expect(result.startDay).toBe('29');
      expect(result.startTime).toBe('2:30pm');
      expect(result.endDayOfWeek).toBe('Tue');
      expect(result.endMonth).toBe('Sep');
      expect(result.endDay).toBe('30');
      expect(result.endTime).toBe('4:00pm');
    });

    it('should include location when locationElement has textContent', () => {
      const locationElement = document.createElement('div');
      locationElement.textContent = 'Memorial Chapel';
      const startDate = {
        dayOfWeek: 'Mon',
        month: 'Sep',
        day: '29',
        time: '2:30pm',
      };

      const result = createEventDetails({ locationElement, startDate });

      expect(result.location).toEqual([{ title: 'Memorial Chapel' }]);
    });

    it('should create complete event details with all parameters', () => {
      const locationElement = document.createElement('div');
      locationElement.textContent = 'McKeldin Library';
      const startDate = {
        dayOfWeek: 'Wed',
        month: 'Oct',
        day: '15',
        time: '10:00am',
      };
      const endDate = {
        dayOfWeek: 'Wed',
        month: 'Oct',
        day: '15',
        time: '2:00pm',
      };

      const result = createEventDetails({ locationElement, startDate, endDate });

      expect(result.startDayOfWeek).toBe('Wed');
      expect(result.startMonth).toBe('Oct');
      expect(result.startDay).toBe('15');
      expect(result.startTime).toBe('10:00am');
      expect(result.endDayOfWeek).toBe('Wed');
      expect(result.endMonth).toBe('Oct');
      expect(result.endDay).toBe('15');
      expect(result.endTime).toBe('2:00pm');
      expect(result.location).toEqual([{ title: 'McKeldin Library' }]);
    });

    it('should handle location with whitespace in textContent', () => {
      const locationElement = document.createElement('div');
      locationElement.textContent = '  Stamp Student Union  ';
      const startDate = {
        dayOfWeek: 'Mon',
        month: 'Sep',
        day: '29',
        time: '2:30pm',
      };

      const result = createEventDetails({ locationElement, startDate });

      expect(result.location).toEqual([{ title: '  Stamp Student Union  ' }]);
    });
  });

  describe('edge cases', () => {
    it('should not include location when locationElement is null', () => {
      const startDate = {
        dayOfWeek: 'Mon',
        month: 'Sep',
        day: '29',
        time: '2:30pm',
      };

      const result = createEventDetails({ locationElement: null, startDate });

      expect(result.location).toBeUndefined();
    });

    it('should not include location when locationElement is undefined', () => {
      const startDate = {
        dayOfWeek: 'Mon',
        month: 'Sep',
        day: '29',
        time: '2:30pm',
      };

      const result = createEventDetails({ locationElement: undefined, startDate });

      expect(result.location).toBeUndefined();
    });

    it('should not include location when textContent is empty', () => {
      const locationElement = document.createElement('div');
      locationElement.textContent = '';
      const startDate = {
        dayOfWeek: 'Mon',
        month: 'Sep',
        day: '29',
        time: '2:30pm',
      };

      const result = createEventDetails({ locationElement, startDate });

      expect(result.location).toBeUndefined();
    });

    it('should not include end date properties when endDate is null', () => {
      const startDate = {
        dayOfWeek: 'Mon',
        month: 'Sep',
        day: '29',
        time: '2:30pm',
      };

      const result = createEventDetails({ startDate, endDate: null });

      expect(result.endDayOfWeek).toBeUndefined();
      expect(result.endMonth).toBeUndefined();
      expect(result.endDay).toBeUndefined();
      expect(result.endTime).toBeUndefined();
    });

    it('should not include end date properties when endDate is undefined', () => {
      const startDate = {
        dayOfWeek: 'Mon',
        month: 'Sep',
        day: '29',
        time: '2:30pm',
      };

      const result = createEventDetails({ startDate, endDate: undefined });

      expect(result.endDayOfWeek).toBeUndefined();
      expect(result.endMonth).toBeUndefined();
      expect(result.endDay).toBeUndefined();
      expect(result.endTime).toBeUndefined();
    });

    it('should handle startDate with empty strings', () => {
      const startDate = {
        dayOfWeek: '',
        month: '',
        day: '',
        time: '',
      };

      const result = createEventDetails({ startDate });

      expect(result.startDayOfWeek).toBe('');
      expect(result.startMonth).toBe('');
      expect(result.startDay).toBe('');
      expect(result.startTime).toBe('');
    });

    it('should handle endDate with empty strings', () => {
      const startDate = {
        dayOfWeek: 'Mon',
        month: 'Sep',
        day: '29',
        time: '2:30pm',
      };
      const endDate = {
        dayOfWeek: '',
        month: '',
        day: '',
        time: '',
      };

      const result = createEventDetails({ startDate, endDate });

      expect(result.endDayOfWeek).toBe('');
      expect(result.endMonth).toBe('');
      expect(result.endDay).toBe('');
      expect(result.endTime).toBe('');
    });

    it('should handle multi-day events spanning months', () => {
      const startDate = {
        dayOfWeek: 'Mon',
        month: 'Sep',
        day: '30',
        time: '9:00am',
      };
      const endDate = {
        dayOfWeek: 'Tue',
        month: 'Oct',
        day: '1',
        time: '5:00pm',
      };

      const result = createEventDetails({ startDate, endDate });

      expect(result.startMonth).toBe('Sep');
      expect(result.startDay).toBe('30');
      expect(result.endMonth).toBe('Oct');
      expect(result.endDay).toBe('1');
    });

    it('should handle single digit days', () => {
      const startDate = {
        dayOfWeek: 'Thu',
        month: 'Jan',
        day: '1',
        time: '12:00pm',
      };
      const endDate = {
        dayOfWeek: 'Thu',
        month: 'Jan',
        day: '9',
        time: '1:00pm',
      };

      const result = createEventDetails({ startDate, endDate });

      expect(result.startDay).toBe('1');
      expect(result.endDay).toBe('9');
    });

    it('should handle location with special characters', () => {
      const locationElement = document.createElement('div');
      locationElement.textContent = "Cole's Fieldhouse & Arena";
      const startDate = {
        dayOfWeek: 'Mon',
        month: 'Sep',
        day: '29',
        time: '2:30pm',
      };

      const result = createEventDetails({ locationElement, startDate });

      expect(result.location).toEqual([{ title: "Cole's Fieldhouse & Arena" }]);
    });

    it('should handle location with newlines', () => {
      const locationElement = document.createElement('div');
      locationElement.textContent = 'Cole Fieldhouse\nBuilding 202';
      const startDate = {
        dayOfWeek: 'Mon',
        month: 'Sep',
        day: '29',
        time: '2:30pm',
      };

      const result = createEventDetails({ locationElement, startDate });

      expect(result.location).toEqual([{ title: 'Cole Fieldhouse\nBuilding 202' }]);
    });
  });

  describe('consistency', () => {
    it('should produce consistent results for same input', () => {
      const locationElement = document.createElement('div');
      locationElement.textContent = 'Test Location';
      const startDate = {
        dayOfWeek: 'Mon',
        month: 'Sep',
        day: '29',
        time: '2:30pm',
      };

      const result1 = createEventDetails({ locationElement, startDate });
      const result2 = createEventDetails({ locationElement, startDate });

      expect(result1).toEqual(result2);
    });

    it('should always return object with start date properties', () => {
      const startDate = {
        dayOfWeek: 'Mon',
        month: 'Sep',
        day: '29',
        time: '2:30pm',
      };

      const result = createEventDetails({ startDate });

      expect(result).toHaveProperty('startDayOfWeek');
      expect(result).toHaveProperty('startMonth');
      expect(result).toHaveProperty('startDay');
      expect(result).toHaveProperty('startTime');
    });

    it('should only include location when locationElement has content', () => {
      const startDate = {
        dayOfWeek: 'Mon',
        month: 'Sep',
        day: '29',
        time: '2:30pm',
      };

      const result1 = createEventDetails({ startDate });
      const result2 = createEventDetails({ locationElement: null, startDate });
      const result3 = createEventDetails({ locationElement: undefined, startDate });

      expect(result1).not.toHaveProperty('location');
      expect(result2).not.toHaveProperty('location');
      expect(result3).not.toHaveProperty('location');
    });

    it('should only include end date when provided', () => {
      const startDate = {
        dayOfWeek: 'Mon',
        month: 'Sep',
        day: '29',
        time: '2:30pm',
      };

      const result1 = createEventDetails({ startDate });
      const result2 = createEventDetails({ startDate, endDate: null });

      expect(result1).not.toHaveProperty('endDayOfWeek');
      expect(result2).not.toHaveProperty('endDayOfWeek');
    });
  });

  describe('location array format', () => {
    it('should always wrap location in array with title property', () => {
      const locationElement = document.createElement('div');
      locationElement.textContent = 'Test Location';
      const startDate = {
        dayOfWeek: 'Mon',
        month: 'Sep',
        day: '29',
        time: '2:30pm',
      };

      const result = createEventDetails({ locationElement, startDate });

      expect(Array.isArray(result.location)).toBe(true);
      expect(result.location).toHaveLength(1);
      expect(result.location?.[0]).toHaveProperty('title');
    });

    it('should preserve exact textContent in location title', () => {
      const testLocations = [
        'Simple Location',
        '  Padded Location  ',
        'Multi\nLine\nLocation',
        'Special!@#$%Characters',
      ];

      testLocations.forEach((locationText) => {
        const locationElement = document.createElement('div');
        locationElement.textContent = locationText;
        const startDate = {
          dayOfWeek: 'Mon',
          month: 'Sep',
          day: '29',
          time: '2:30pm',
        };

        const result = createEventDetails({ locationElement, startDate });

        expect(result.location?.[0].title).toBe(locationText);
      });
    });
  });
});
