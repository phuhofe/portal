import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { catchError, map, tap } from 'rxjs/operators';
import { from, Observable, of, Subscription, timer } from 'rxjs';
import { Action, State, StateContext, Store } from '@ngxs/store';

import { User } from '../models/user.model';
import { MemorialActions } from './memorial.actions';
import { environment } from "@app/env";

@State({
  name: 'memorial',
  defaults: {
    users: undefined,
    citiesRegions: undefined,
    funeralHomeSetting: {
      id: undefined,
      adminName: undefined,
      name: undefined,
      themeId: undefined,
      mainColor: undefined,
      bannerURL: undefined,
      photoUrl: undefined
    },
    isLoading: false,
    isLoadingRegion: false,
    error: {
      code: undefined,
      message: undefined
    }
  }
})
@Injectable()
export class MemorialState {

  subscription: Subscription;
  searchPortalUrl = '/portal/search';

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) {
  }

  refreshSubscription(userId: number): any {
    this.subscription = timer(5000).subscribe(() => {
      this.store.dispatch(new MemorialActions.GetFuneralHomeSettings(userId))
        .pipe()
        .subscribe(() => {
          if (!this.router.url.includes('memorial')) {
            return this.subscription.unsubscribe();
          }
        });
    });
  }

  @Action(MemorialActions.GetUsers)
  getUsers(ctx: StateContext<any>, action: MemorialActions.GetUsers): Observable<any> {
    let params = new HttpParams();
    params = params.append('size', action.size.toString());
    params = params.append('domain', 'vareminnesider.no');
    params = params.append('orderBy', 'memorial_page,desc');

    return from(import(`src/assets/data.json`))
    // return this.http.get(this.searchPortalUrl, { params })
      .pipe(
        tap(ctx.patchState({ isLoading: true })),
        tap(() => {

        }),
        map((response: any) => {
          if (response) {
            const userMap = this.mapUserData(response.content);
            ctx.patchState({ isLoading: false, users: userMap });
          }
        }),
        catchError((error) => {
          if (error) {
            return this.store.dispatch(new MemorialActions.GetUsersFailed(
              error.errorCode,
              error.message
            ));
          }

          return this.store.dispatch(new MemorialActions.GetUsersFailed(
            'Unknow', 'Unknow'
          ));
        })
      );
  }

  @Action(MemorialActions.GetUsersFailed)
  getUsersFailed(ctx: StateContext<any>, action: MemorialActions.GetUsersFailed): void {
    ctx.patchState({
      users: [],
      isLoading: false,
      error: { code: action.errorCode, message: action.message }
    });
  }

  @Action(MemorialActions.SearchLocally)
  searchLocally(ctx: StateContext<any>, action: MemorialActions.SearchLocally): Observable<any> {
    let params = new HttpParams();
    params = params.append('orderBy', 'memorial_page,desc');

    Object.entries(action.searchParams).forEach(([key, value]) => {
      if (value instanceof Date) {
        value = new DatePipe('en-US').transform(value, 'yyyy-MM-dd');
      }

      if (value) {
        params = params.append(key, value);
      }
    });

    return this.makeSearchPortalRequest(ctx, params);
  }

  @Action(MemorialActions.GetCityAndRegion)
  getCityAndRegion(ctx: StateContext<any>): Observable<any> {
    const url = '/portal/regions';
    let params = new HttpParams();
    params = params.append('domain', this.getDomain());

    return this.http.get(url, { params })
      .pipe(
        tap(ctx.patchState({ isLoadingRegion: true })),
        map((response: any) => {
          if (response) {
            ctx.patchState({
              isLoadingRegion: false,
              citiesRegions: [
                { id: 0, name: 'All countries', cities: [] },
                ...response
              ]
            });
          }
        }),
        catchError(error => {
          ctx.patchState({ isLoadingRegion: false });
          return of(error);
        })
      );
  }


  @Action(MemorialActions.GetFuneralHomeSettings)
  getFuneralHomeSettings(ctx: StateContext<any>, action: MemorialActions.GetFuneralHomeSettings): Observable<any> {

    return this.http.get(`${environment.fakeUrl}/funeralhomes/${action.id}`).pipe(
      tap(() => this.refreshSubscription(action.id)),
      map((response) => {
        if (response) {
          ctx.patchState({
            funeralHomeSetting: response,
            isLoading: false
          });
        }
      }),
    );
  }

  @Action(MemorialActions.SortMemorialPage)
  sortMemorialPage(ctx: StateContext<any>, action: MemorialActions.SortMemorialPage): Observable<any> {
    let params = new HttpParams();
    params = params.append('orderBy', `${action.sortValue.param},${action.sortValue.value}`);

    return this.makeSearchPortalRequest(ctx, params);
  }

  @Action(MemorialActions.FilterMemorialPage)
  filterMemorialPage(ctx: StateContext<any>, action: MemorialActions.FilterMemorialPage): Observable<any> {
    let params = new HttpParams();
    params = params.append('filterBy', action.filterValue.param);

    return this.makeSearchPortalRequest(ctx, params);
  }

  @Action(MemorialActions.SearchBox)
  searchBox(ctx: StateContext<any>, action: MemorialActions.SearchBox): Observable<any> {
    const encodedSearchTerm = encodeURI(action.searchString);
    let params = new HttpParams().append('searchTerm', encodedSearchTerm);

    return this.makeSearchPortalRequest(ctx, params);
  }

  makeSearchPortalRequest(ctx: StateContext<any>, params: HttpParams): Observable<any> {
    // params = params.append('domain', 'vareminnesider.no');
    params = params.append('domain', this.getDomain());

    return this.http.get(this.searchPortalUrl, { params })
      .pipe(
        tap(ctx.patchState({
          isLoading: true,
          error: { code: null, message: null }
        })),
        map((response: any) => {
          if (response) {
            const userMap = this.mapUserData(response.content);
            ctx.patchState({ users: userMap, isLoading: false });
          }
        }),
        catchError(error => {
          this.store.dispatch(new MemorialActions.GetUsersFailed(error.errorCode, error.message));
          return of(error);
        })
      );
  }

  mapUserData(data: any): Array<User> {
    return data.map(user => {
      return {
        birthdate: user.birthdate,
        deathdate: user.deathdate,
        firstName: user.firstName,
        lastName: user.lastName,
        photoUrl: user.photoUrl ? user.photoUrl : '',
        deathCity: user.deathCity,
        memorialPageCreated: user.memorialPageCreated,
        flowerShopActivated: user.flowerShopActivated,
        donationActivated: user.donationActivated,
        publishOnWebDate: user.publishOnWebDate,
        memorialPage: {
          visible: user.memorialPage.visible,
          url: user.memorialPage.url
        },
        donation: {
          visible: user.donation.visible,
          url: user.donation.url,
        },
        flowerShop: {
          visible: user.flowerShop.visible,
          url: user.flowerShop.url,
        },
        deathNotice: {
          visible: user.deathNotice.visible,
          url: user.deathNotice.url,
        },
      };
    });
  }

  getDomain(): string {
    return location.origin.replace(/(^\w+:|^)\/\//, '');
  }
}
