import {Component, Input, OnChanges, Self, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, ValidationErrors, Validator, NgControl} from '@angular/forms';

import {DateHelperService} from '../../services/date-helper';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {defineLocale} from 'ngx-bootstrap/chronos';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnChanges, ControlValueAccessor, Validator {

  @Input() locale: string;
  @Input() labelForId?: string;
  @Input() placeholder: string;

  wrongDateFormatMessage = 'Invalid date';
  rangeInputFormat = 'DD/MM/YYYY';
  maskInput = '00/00/0000 - 00/00/0000';

  datePickerConfig = {
    rangeInputFormat: this.rangeInputFormat,
    containerClass: 'theme-adstate',
    showClearButton: true
  };
  datepickerPlacement = 'bottom';

  isInvalidDate = false;
  today = new Date();
  value = '';

  constructor(
    @Self() private controlDir: NgControl,
    private dateHelper: DateHelperService,
    private localeService: BsLocaleService,
    private translationService: TranslocoService
  ) {
    this.controlDir.valueAccessor = this;
    this.translationService.langChanges$.subscribe(lang => {

      import(`ngx-bootstrap/chronos/esm2015/`)
        .then(locale => {
          const localeKey = Object.keys(locale).find(key => {
            return key.endsWith(lang + 'Locale');
          });
          defineLocale(lang, locale[localeKey]);
          this.localeService.use(lang);
        });
    });

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(value: any): void {
    this.value = value;
  }

  validate(value: any): ValidationErrors | null {
    return null;
  }

  onTypingDate(birthdateRangeValue: string): void {
    const dateRangeValue = this.dateHelper.getDateRangeFromString(birthdateRangeValue);

    this.controlDir.control.setValue(birthdateRangeValue);

    if (!dateRangeValue) {
      this.isInvalidDate = true;
      return;
    }

    this.isInvalidDate = false;
  }

  onValueChange(fromToArray: Array<Date>): void {
    if (fromToArray) {
      const bornFrom = this.dateHelper.getStringFromDate(fromToArray[0]);
      const bornTo = this.dateHelper.getStringFromDate(fromToArray[1]);

      this.isInvalidDate = false;
      this.value = `${bornFrom} - ${bornTo}`;
      this.controlDir.control.setValue(this.value);
    }
  }
}
