import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ImageCropperModule} from 'ngx-image-cropper';

import {containers} from './containers';
import {components} from './components';

import {ToggleModule} from '@app/shared/toggle/toggle.module';
import {CheckboxModule} from '@app/shared/checkbox/checkbox.module';
import {CustomizationAdminRoutingModule} from './customization-admin-routing.module';

import { AngularPinturaModule } from 'angular-pintura';


@NgModule({
  declarations: [
    containers,
    components
  ],
  imports: [
    CommonModule,
    CustomizationAdminRoutingModule,
    CheckboxModule,
    ToggleModule,
    TooltipModule.forRoot(),
    ImageCropperModule,
    AngularPinturaModule
  ]
})
export class CustomizationAdminModule {
}
