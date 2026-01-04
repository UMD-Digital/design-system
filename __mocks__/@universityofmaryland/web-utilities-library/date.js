/**
 * Mock for @universityofmaryland/web-utilities-library/date
 */

const formatDateForDisplay = jest.fn().mockReturnValue('January 1, 2024');
const formatDateForComparison = jest.fn().mockReturnValue('2024-01-01');
const parseDateFromElement = jest.fn().mockReturnValue({
  startDate: new Date('2024-01-01'),
  endDate: null,
});
const createEventDetails = jest.fn().mockReturnValue({
  startDate: 'January 1',
  startTime: '10:00 AM',
  endDate: null,
  endTime: null,
});

module.exports = {
  formatDateForDisplay,
  formatDateForComparison,
  parseDateFromElement,
  createEventDetails,
};
