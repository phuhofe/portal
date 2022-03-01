import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {catchError, map} from 'rxjs/operators';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';

import {environment} from '@app/env';
import {AdminActions} from './admin.action';

@State({
  name: 'admin',
  defaults: {
    funeralHomeSetting: {
      themeId: 0,
      mainColor: '#17313B',
      bannerURL: '',
      logoUrl: undefined
    },
    user: {
      email: undefined,
      emailVerified: undefined,
      firstName: undefined,
      lastName: undefined,
      username: undefined,
      roles: []
    },
    error: {
      code: undefined,
      message: undefined
    }
  }
})
@Injectable()
export class AdminState {

  @Selector()
  static errorCode(state): any {
    return state.error.code;
  }

  @Selector()
  static funeralHomeSetting(state): any {
    return state.funeralHomeSetting;
  }


  constructor(
    private http: HttpClient,
    private store: Store,
    private toastr: ToastrService
  ) {
  }

  @Action(AdminActions.SaveConfig)
  saveConfig(ctx: StateContext<any>, action: AdminActions.SaveConfig): void {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      ...action
    });

    this.http.patch(`/funeralhomes/${action.config.userId}`, {
      themeId: action.config.themeId,
      mainColor: action.config.mainColor,
      bannerURL: action.config.bannerURL
    }).subscribe(res => {
      if (res) {
        this.toastr.success('Update success');
      }
    });
  }

  @Action(AdminActions.GetFuneralHomeSettings)
  getFuneralHomeSettings(
    ctx: StateContext<any>,
    action: AdminActions.GetFuneralHomeSettings
  ): Observable<any> {
    return this.http.get(`${environment.fakeUrl}/funeralhomes/${action.id}`)
      .pipe(
        map((setting: any) => {
          if (setting) {
            return ctx.patchState({
              funeralHomeSetting: {
                themeId: setting.themeId,
                mainColor: setting.mainColor,
                bannerURL: setting.bannerURL,
                logoUrl: setting.logoUrl
              }
            });
          }
        })
      );
  }

  @Action(AdminActions.GetConfig)
  getConfig(ctx: StateContext<any>): Observable<any> {
    const state = ctx.getState();

    return this.http.get(`${environment.fakeUrl}/settings`)
      .pipe(
        map(data => {
          ctx.setState({
            ...state,
            ...data
          });
        }),
        catchError((error: any) => {

          if (error) {
            return this.store.dispatch(
              new AdminActions.GetConfigFail(error.errorCode, error.message)
            );
          }

          return this.store.dispatch(
            new AdminActions.GetConfigFail('Unknow', 'Unknow')
          );
        })
      );
  }

  @Action(AdminActions.GetConfigFail)
  getConfigFail(ctx: StateContext<any>, action: AdminActions.GetConfigFail): void {
    ctx.patchState({
      error: {
        code: action.code,
        message: action.message
      }
    });
  }
}
