import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule} from '@angular/router';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

import {HeaderComponent} from './header/header.component';
import {DefaultLayoutComponent} from './default-layout/default-layout.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {TranslocoRootModule} from '../transloco/transloco-root.module';
import { LanguageSelectComponent } from './language-select/language-select.component';


@NgModule({
  declarations: [
    HeaderComponent,
    DefaultLayoutComponent,
    LanguageSelectComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    FormsModule,

    BsDropdownModule.forRoot(),
    TranslocoRootModule
  ]
})
export class LayoutModule {
}
