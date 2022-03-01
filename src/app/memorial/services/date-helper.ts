import {Injectable} from '@angular/core';

@Injectable()
export class DateHelperService {
  getStringFromDate(date: Date): string {
    if (date) {
      let day = date.getUTCDate().toString();
      let month = (date.getMonth() + 1).toString();
      const year = date.getFullYear().toString();

      if (day.length < 2) {
        day = 0 + day;
      }

      if (month.length < 2) {
        month = 0 + month;
      }

      return `${day}/${month}/${year}`;
    }
  }

  getDateRangeFromString(dateString: string): Array<Date> {

    if (!dateString) {
      return null;
    }

    const rangeDateArray = dateString
      .replace(/\s/g, '')
      .split('-');

    const fromArray = rangeDateArray[0];
    const toArray = rangeDateArray[1];

    const fromDate = fromArray.split('/')[0];
    const fromMonth = fromArray.split('/')[1];
    const fromYear = fromArray.split('/')[2];

    const toDate = toArray.split('/')[0];
    const toMonth = toArray.split('/')[1];
    const toYear = toArray.split('/')[2];

    const checkValidDateFrom = this.isValidDate(fromDate, fromMonth, fromYear);
    const checkValidDateTo = this.isValidDate(toDate, toMonth, toYear);

    if (!checkValidDateFrom || !checkValidDateTo) {
      return null;
    }

    const from = new Date(
      parseInt(fromYear, 0),
      parseInt(fromMonth, 0) - 1,
      parseInt(fromDate, 0)
    );

    const to = new Date(
      parseInt(toYear, 0),
      parseInt(toMonth, 0) - 1,
      parseInt(toDate, 0)
    );

    const today = new Date();

    if (+from > +to || +to > +today) {
      return null;
    }

    return [from, to];
  }

  newDate(dayString: string, monthString: string, yearString: string): Date {
    return new Date(
      parseInt(yearString, 0),
      parseInt(monthString, 0) - 1,
      parseInt(dayString, 0));
  }


  isValidDate(dateInput: string, monthInput: string, yearInput: string): boolean {
    const day = parseInt(dateInput, 10);
    const month = parseInt(monthInput, 10);
    const year = parseInt(yearInput, 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month === 0 || month > 12) {
      return false;
    }

    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
      monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  }
}
