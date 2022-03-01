import {Selector} from '@ngxs/store';
import {MemorialState} from './memorial.state';

export class MemorialSelectors extends MemorialState {

  @Selector()
  static errorMessage(state): any {
    return state.error.message;
  }

  @Selector()
  static isLoading(state): any {
    return state.isLoading;
  }

  @Selector()
  static isLoadingRegion(state): any {
    return state.isLoadingRegion;
  }

  @Selector()
  static users(state): any {
    return state.users;
  }

  @Selector()
  static funeralHomeSetting(state): any {
    return state.funeralHomeSetting;
  }

  @Selector()
  static citiesAndRegions(state): any {
    return state.citiesRegions;
  }

  @Selector()
  static errorCode(state): any {
    return state.error.code;
  }
}
