import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxModule } from '@app/shared/checkbox/checkbox.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Meta, moduleMetadata } from '@storybook/angular';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule } from 'ngx-mask';
import AdvancedFilterComponent from '../filter/filter.component';
import ClientFilterComponent from './client-filter.component';

export default {
  title: 'Adstate/Admin page/Client filter',
  component: ClientFilterComponent,
  subcomponents: [
    AdvancedFilterComponent
  ],
  decorators: [
    moduleMetadata({
      imports: [
        ModalModule.forRoot(),
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        CheckboxModule,
        NgSelectModule,

        BsDropdownModule.forRoot(),
        ButtonsModule.forRoot(),
        CollapseModule.forRoot(),
        BsDatepickerModule.forRoot(),
        NgxMaskModule.forRoot(),

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
      declarations: [
        ClientFilterComponent,
        AdvancedFilterComponent
      ]
    })
  ],
} as Meta;

export const Default = (arg) => ({
  props: {
    ...arg,
  },
});
