import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilterComponent } from './components/filter/filter.component';
import { TestFilterComponent } from './components/test-filter/test-filter.component';

import {UserListComponent} from './containers/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemorialRoutingModule { }
