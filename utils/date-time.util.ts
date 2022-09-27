import { endOfWeek } from 'date-fns';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import { isDefined } from './common.util';

export function displayDates(
  startDate: Date,
  endDate: Date,
  type: 'day' | 'week' | 'month',
  showPresent: boolean = false
): string {
  let viewDisplayDate = '';

  if (type === 'day') {
    viewDisplayDate = format(startDate, 'MMM d, y');
  } else if (type === 'week') {
    if (isDefined(endDate) === false) {
      endDate = endOfWeek(startDate);
    }

    // format them and split contents into month, day and year
    const weekStartDateFormatted = format(startDate, 'MMM d y').split(' ');
    const weekEndDateFormatted = format(endDate, 'MMM d y').split(' ');

    if (showPresent && isToday(endDate)) {
      viewDisplayDate = `${weekStartDateFormatted.join(' ')}, present`;
    } else {
      let monthDiffers = false;
      let yearDiffers = false;

      if (weekStartDateFormatted[0] !== weekEndDateFormatted[0]) {
        monthDiffers = true;
      }
      if (weekStartDateFormatted[2] !== weekEndDateFormatted[2]) {
        yearDiffers = true;
      }

      const startDisplayDate = `${weekStartDateFormatted[0]} ${weekStartDateFormatted[1]}`;
      let endDisplayDate = '';

      if (monthDiffers) {
        endDisplayDate = `${weekEndDateFormatted[0]} ${weekEndDateFormatted[1]}`; // both day and month
      } else {
        endDisplayDate = `${weekEndDateFormatted[1]}`; // only day
      }

      if (yearDiffers) {
        viewDisplayDate = `${startDisplayDate}, ${weekStartDateFormatted[2]} - ${endDisplayDate}, ${weekEndDateFormatted[2]}`;
      } else {
        viewDisplayDate = `${startDisplayDate} - ${endDisplayDate}, ${weekStartDateFormatted[2]}`;
      }
    }
  } else if (type === 'month') {
    viewDisplayDate = format(startDate, 'MMMM, y');
  }

  return viewDisplayDate;
}
