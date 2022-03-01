import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxModule } from '@app/shared/checkbox/checkbox.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Meta, moduleMetadata } from '@storybook/angular';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxMaskModule } from 'ngx-mask';
import { ControlType } from '../control-types';
import SortComponent from '../sort/sort.component';
import AdvancedFilterComponent from './filter.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';

import { FlexLayoutModule } from '@angular/flex-layout';
import ClientTemplateFilterComponent from '../client-filter/client-filter.component';

export default {
  title: 'Adstate/Portal page/Filter',
  component: AdvancedFilterComponent,
  subcomponents: [SortComponent, ClientTemplateFilterComponent],
  decorators: [
    moduleMetadata({
      declarations: [AdvancedFilterComponent, SortComponent, ClientTemplateFilterComponent],
      imports: [
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
    }),
  ],
  argTypes: {
    label: {
      name: 'Filter',
      defaultValue: 'Filter',
      control: { type: ControlType.InputTypeText },
    },
    items: {
      name: 'Filter items',
      description: 'Filter items',
      control: {
        type: 'array',
      },
      defaultValue: [
        {
          label: 'Memorial page',
          isSelected: false,
        },
        {
          label: 'Have donations',
          isSelected: false,
        },
        {
          label: 'Has death notice',
          isSelected: false,
        },
        {
          label: 'Has flower shop',
          isSelected: false,
        },
      ],
    },
  },
} as Meta;

export const Default = (arg) => ({
  props: arg,
});
