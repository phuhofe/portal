import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { from, Observable, of } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'adstate-advanced-filter',
  templateUrl: './filter.html',
  styleUrls: ['./filter.scss'],
  encapsulation: ViewEncapsulation.None,
})
export default class AdvancedFilterComponent {

  @Input() label: string = 'Filter';
  @Input() totalSearchResult: number = 1202502;
  @Input() usingCustomTemplate: boolean = false;

  @Output() clear = new EventEmitter();
  @Output() filterParam = new EventEmitter();

  isCollapsed: boolean = true;
  searchParam = {};
  cityOptions = [];
  regionOptions = [];
  filteredRegionOptions: Observable<any>;
  filteredCityOptions = from(import('../assets/cities-regions.json'))
    .pipe(
      map((citiesAndRegions) => {
        this.cityOptions = citiesAndRegions.data;
        return citiesAndRegions.data;
      })
    );

  filterForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    birthdateFrom: [''],
    birthdateTo: [''],
    deathdateFrom: [''],
    deathdateTo: [''],
    city: [],
    region: [],
  });

  constructor(private formBuilder: FormBuilder) {
    this.filteredCityOptions.subscribe();

    this.filteredCityOptions = this.filterForm.controls['city'].valueChanges.pipe(
      startWith(''),
      map((value) => this.filterCity(value))
    );

    this.filteredRegionOptions = this.filterForm.controls['region'].valueChanges.pipe(
      startWith(''),
      map((value) => this.filterRegion(value))
    );



    this.filterForm.valueChanges.pipe(
      debounceTime(250)
    ).subscribe(value => {
      this.filterParam.emit(value);
    });
  }

  ngOnInit() { }

  filterCity(option) {

    let filterValue = '';

    if (typeof option === 'string') {
      filterValue = option.toLowerCase();
    } else {
      filterValue = option.name.toLowerCase();
    }

    return this.cityOptions.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  filterRegion(option) {

    let filterValue = '';

    if (typeof option === 'string') {
      filterValue = option.toLowerCase();
    } else {
      filterValue = option.name.toLowerCase();
    }

    return this.regionOptions.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  toggleFilter() {
    this.isCollapsed = !this.isCollapsed;
  }

  clearFilterForm(a) {

    if (this.usingCustomTemplate) {
      return this.clear.emit(true);
    }

    return this.filterForm.patchValue({
      firstName: '',
      lastName: '',
      city: '',
      region: '',
      birthdateFrom: '',
      birthdateTo: '',
      deathdateFrom: '',
      deathdateTo: '',
    });
  }

  onSelectCity(event) {
    this.getRegionsByCityName(event.option.value)

    this.filterForm.controls['city'].setValue(event.option.value);

    this.regionOptions = [
      { id: 0, name: 'All cities' },
      ...this.getRegionsByCityName(event.option.value)
    ];

    this.filterForm.controls['region'].setValue(this.regionOptions[0].name);
    this.filteredRegionOptions = of(this.regionOptions);
  }

  onSelectRegion(event) {
    this.filterForm.controls['region'].setValue(event.option.value.name);
  }

  onOpenCitySelect() {
    if (!this.filterForm.controls['city'].value) {
      return this.filterForm.controls['city'].setValue('');
    }
  }

  onOpenRegionSelect() {
    if (!this.filterForm.controls['region'].value) {
      return this.filterForm.controls['region'].setValue('');
    }
  }

  clearCitySelect() {
    this.filterForm.controls['city'].setValue('');
    this.clearRegionSelect();
    this.regionOptions = [];
  }

  clearRegionSelect() {
    this.filterForm.controls['region'].setValue('');
  }

  getRegionsByCityName(cityName: string) {
    return this.cityOptions.find(city => city.name === cityName).cities;
  }

  getCityIdByName(cityName: string) {
    return this.cityOptions.find(city => city.name === cityName).id;
  }

  getRegionIdByName(cityId: number, regionName: string) {
    const regions = this.cityOptions.find(city => city.id === cityId).cities;
    const regionId = regions.find(r => r.name === regionName).id;

    return regionId;
  }

  log() {
    const cityId = this.getCityIdByName(this.filterForm.value.city);
    const regionId = this.getRegionIdByName(cityId, this.filterForm.value.region);
    const formValue = this.filterForm.value;

    this.searchParam = {
      firstname: formValue.firstName,
      lastname: formValue.lastName,
      'birthDate.dateFrom': formValue.birthdateFrom,
      'birthDate.dateTo': formValue.birthdateTo,
      'deathDate.dateFrom': formValue.deathdateFrom,
      'deathDate.dateTo': formValue.deathdateTo,
      regionId: regionId,
      cityId: cityId,
    }

  }
}
