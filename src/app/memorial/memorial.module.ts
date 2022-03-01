import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgxMaskModule} from 'ngx-mask';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {
  BsDatepickerModule,
  BsDatepickerContainerComponent,
  BsDaterangepickerContainerComponent
} from 'ngx-bootstrap/datepicker';
import {NgSelectModule} from '@ng-select/ng-select';

import {CONTAINERS} from './containers';
import {COMPONENTS} from './components';

import {DateHelperService} from './services/date-helper';
import {MemorialRoutingModule} from './memorial-routing.module';

import {SearchComponent} from './containers/search/search.component';
import {UserListComponent} from './containers/user-list/user-list.component';
import {TranslocoRootModule} from '../transloco/transloco-root.module';
import { TranslatePipe } from './pipe/translate.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { SortComponent } from './components/sort/sort.component';
import { DateRangeComponent } from './components/date-range/date-range.component';
import { TestFilterComponent } from './components/test-filter/test-filter.component';
import { AdstateInputRowTemplateDirective } from './components/directive/adstate-input-row.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    CONTAINERS,
    COMPONENTS,
    TranslatePipe,
    FilterComponent,
    SortComponent,
    TestFilterComponent,

    AdstateInputRowTemplateDirective

  ],
  imports: [
    CommonModule,
    MemorialRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    ButtonsModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgSelectModule,
    TranslocoRootModule,


    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    FlexLayoutModule
  ],
  providers: [DateHelperService],
  exports: [
    UserListComponent,
    SearchComponent,
    DateRangeComponent,
    BsDatepickerContainerComponent,
    BsDaterangepickerContainerComponent
  ],
})
export class MemorialModule {
}
