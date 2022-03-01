import {Component, OnInit} from '@angular/core';

import {from, Observable, of} from 'rxjs';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';
import {catchError} from 'rxjs/operators';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  user: any;

  flags = [
    {value: 'cs', label: 'Česky'},
    {value: 'da', label: 'Dansk'},
    {value: 'nl', label: 'Nederlands'},
    {value: 'en', label: 'English'},
    {value: 'de', label: 'Deutsch'},
    {value: 'nb', label: 'Norsk'},
    {value: 'sk', label: 'Slovensky'},
    {value: 'sv', label: 'Svenska'},
  ];

  selectedLanguageId = 'en';

  constructor(
    private readonly keycloak: KeycloakService,
    public translationService: TranslocoService
  ) {
    this.getUser()
      .pipe(
        catchError(e => {
          console.log('The user profile was not loaded as the user is not logged in');
          return of(e);
        })
      )
      .subscribe(value => {
        this.user = value;
      });
  }

  ngOnInit(): void {
    this.isLoggedIn$ = from(this.keycloak.isLoggedIn());
  }

  getUser(): Observable<KeycloakProfile> {
    return from(this.keycloak.loadUserProfile());
  }

  login(): Promise<void> {
    return this.keycloak.login();
  }

  logout(): Promise<void> {
    return this.keycloak.logout();
  }

  changeLanguage(event): void {
    this.translationService.setActiveLang(event.value);
  }
}
