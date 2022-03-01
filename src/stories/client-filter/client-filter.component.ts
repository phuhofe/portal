import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'adstate-client-template-filter',
  templateUrl: './client-filter.html',
  styleUrls: ['./client-filter.scss'],
  encapsulation: ViewEncapsulation.None,
})
export default class ClientFilterComponent {

  usingCustomTemplate = false;
  filterParam = {};
  clearParam: boolean;

  customFilterForm = this.fb.group({
    firstName: '',
    lastName: '',
    birthdateRange: '',
    deathDateRange: '',
    city: '',
    region: ''
  });

  constructor(private fb: FormBuilder) { }

  onClear(event) {
    this.clearParam = event;
    this.customFilterForm.reset();
  }

  onSearchParam(event) {
    this.filterParam = event;
  }
}
