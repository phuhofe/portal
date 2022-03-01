import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder} from '@angular/forms';

import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {debounceTime} from 'rxjs/operators';

import {MemorialActions} from '../../store/memorial.actions';
import {MemorialSelectors} from '../../store/memorial.selectors';
import {NgSelectComponent} from '@ng-select/ng-select';
import {SearchParam} from '../../models/search-param.model';
import {DateHelperService} from '../../services/date-helper';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  localSearchForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    born: [''],
    death: [''],
    region: [ {id: 0, name: 'All countries'} ],
    city: [ { id: 0, name: 'All countries', cities: [] } ],
  });

  isCollapsed = false;

  isLoadingRegion = false;
  currentLanguage = 'en';
  regions = [];
  cities = [];

  @Select(MemorialSelectors.citiesAndRegions) citiesAndRegions$: Observable<Array<any>>;
  @Select(MemorialSelectors.isLoadingRegion) isLoadingRegion$: Observable<boolean>;

  @Input() searchBackground: string;
  @ViewChild('citySelect') ngSelectComponent: NgSelectComponent;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private dateHelper: DateHelperService,
    private translationService: TranslocoService
  ) {
    this.store.dispatch(new MemorialActions.GetCityAndRegion());

    this.citiesAndRegions$.subscribe(value => {
      if (value) {
        this.regions = value;
      }
    });

    this.currentLanguage = this.translationService.getActiveLang();
  }

  ngOnInit(): void {
    this.localSearchForm.get('born').valueChanges
      .pipe(debounceTime(500))
      .subscribe();

    this.localSearchForm.get('death').valueChanges
      .pipe(debounceTime(500))
      .subscribe();
  }

  onSubmit(): void {
    const formValue = this.localSearchForm.value;
    const birthdateFromTo = this.dateHelper.getDateRangeFromString(formValue.born);
    const deathDateFromTo = this.dateHelper.getDateRangeFromString(formValue.death);

    const searchParam: SearchParam = {
      firstname: formValue.firstName,
      lastname: formValue.lastName,
      'birthDate.dateFrom': birthdateFromTo ? birthdateFromTo[0] : undefined,
      'birthDate.dateTo': birthdateFromTo ? birthdateFromTo[1] : undefined,
      'deathDate.dateFrom': deathDateFromTo ? deathDateFromTo[0] : undefined,
      'deathDate.dateTo': deathDateFromTo ? deathDateFromTo[1] : undefined,
      regionId: formValue.region?.id !== 0 ? formValue.region?.id : undefined,
      cityId: formValue.city !== 0 ? formValue?.city?.id : undefined,
    };

    this.store.dispatch(new MemorialActions.SearchLocally(searchParam)).subscribe();
  }

  onSelectRegion(region): void {
    const citiesByRegion = this.regions.find(reg => reg.id === region.id);
    this.ngSelectComponent.handleClearClick();

    this.cities = [
      {id: 0, name: 'All cities'},
      ...citiesByRegion.cities
    ];

    this.localSearchForm.patchValue({
      region: region.id === 0 ? {id: 0, name: 'All countries'} : {...region},
      city: {id: 0, name: 'All cities'},
    });
  }

  compareSelectedValue(item, selected): boolean {
    return item.id === selected.id;
  }

  onSelectCity(event): void {
    this.localSearchForm.patchValue({
      city: event
    });
  }

  toggleAdvancedSearch(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onSearchBox(searchString: string): void {
    this.store.dispatch(new MemorialActions.SearchBox(searchString)).subscribe();
  }

}
