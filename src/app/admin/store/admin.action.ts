export namespace AdminActions {

  export class GetConfig {
    static readonly type = '[Settings] Get Config';
  }

  export class GetFuneralHomeSettings {
    static readonly type = '[Settings] Get Funeral Home Settings';

    constructor(public id: number) {}
  }

  export class GetConfigFail {
    static readonly type = '[Settings] Get Config Fail';

    constructor(public code: string, public message: string) {
    }
  }

  export class SaveConfig {
    static readonly type = '[Settings] Save Config';

    constructor(public config: {
      userId: number;
      mainColor: string;
      themeId: number;
      bannerURL: string;
    }) {
    }
  }

  export class UpdateUserRole {
    static readonly type = '[Settings] Update User Role';

    constructor(public config: {
      userId: string,
      roles: Array<string>
    }) {
    }
  }

}
