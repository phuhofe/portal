import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomAdminPanelComponent} from './containers/custom-admin-panel/custom-admin-panel.component';

const routes: Routes = [
  {
    path: '',
    component: CustomAdminPanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomizationAdminRoutingModule { }
