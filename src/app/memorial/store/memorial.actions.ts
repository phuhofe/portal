import {Filter, Sort} from '../models/sort.model';
import {SearchParam} from "../models/search-param.model";

export namespace MemorialActions {
  export class GetUsers {
    static readonly type = '[Memorial] Get Users';

    constructor(
      public size = 20,
      public page = 0
    ) {}
  }

  export class SearchLocally {
    static readonly type = '[Memorial] Search Users Locally';

    constructor(public searchParams: SearchParam) {}
  }

  
  export class SearchBox {
    static readonly type = '[Memorial] Search Box';

    constructor(public searchString: string) {}
  }

  export class SortMemorialPage {
    static readonly type = '[Memorial] Sort User List';
    constructor(public sortValue: Sort) {}
  }

  export class FilterMemorialPage {
    static readonly type = '[Memorial] Filter User List';
    constructor(public filterValue: Filter) {}
  }

  export class GetCityAndRegion {
    static readonly type = '[Memorial] Get Cities and Regions';
  }

  export class GetFuneralHomeSettings {
    static readonly type = '[Memorial] Get Funeral Home Settings';
    constructor(public id: number) {}
  }

  export class GetUsersFailed {
    static readonly type = '[Memorial] Get Users Failed';
    constructor(public errorCode: string, public message: string) {}
  }
}
