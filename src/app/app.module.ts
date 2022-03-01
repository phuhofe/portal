import {BrowserModule} from '@angular/platform-browser';
import {NgModule, APP_INITIALIZER, ApplicationRef, Injector} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {createCustomElement} from '@angular/elements';

import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';

import {
  BsDatepickerContainerComponent,
  BsDatepickerModule,
  BsDaterangepickerContainerComponent
} from 'ngx-bootstrap/datepicker';
import {NgxMaskModule} from 'ngx-mask';
import {NgSelectModule} from '@ng-select/ng-select';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {LayoutModule} from './layout/layout.module';
import {AppRoutingModule} from './app-routing.module';
import {initializeKeycloak} from './keycloackhelper';
import {TranslocoRootModule} from './transloco/transloco-root.module';
import {SearchComponent} from './memorial/containers/search/search.component';
import {UserListComponent} from './memorial/containers/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    CoreModule,
    LayoutModule,
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgSelectModule,
    FormsModule,
    KeycloakAngularModule,
    TranslocoRootModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    }
  ],
  entryComponents: [
    UserListComponent, SearchComponent,
    BsDatepickerContainerComponent,
    BsDaterangepickerContainerComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private injector: Injector, private router: Router) {

    this.exportElement();

    // if (environment.production) {
    //   this.router.navigateByUrl('', {skipLocationChange: true});
    // }
  }

  exportElement(): void {
    const userList = createCustomElement(UserListComponent, {injector: this.injector});
    customElements.define('ng-user-list', userList);
  }

  ngDoBootstrap(_appRef: ApplicationRef): void {}
}
