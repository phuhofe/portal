import {
  Component, Input,
  OnInit, AfterViewInit, ViewChild
} from '@angular/core';

import {Select, Store} from '@ngxs/store';

import {Observable} from 'rxjs';

import {TranslocoService} from '@ngneat/transloco';
import {NgSelectComponent} from '@ng-select/ng-select';

import {Destroyable} from '@app/core/destroyable';

import {User} from '../../models/user.model';
import {AuthStorageService} from '@app/core/services';
import {MemorialActions} from '../../store/memorial.actions';
import {MemorialSelectors} from '../../store/memorial.selectors';
import {FuneralHomeSetting} from '../../models/funeralhome.model';
import {Sort, Filter, sortItems, filterItems} from '../../models/sort.model';

@Destroyable()
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {

  currentLanguage$: Observable<string>;

  gridViewText = 'grid';
  listViewText = 'list';
  page = 0;
  displayNumberListView = 20;
  displayNumberShadowView = 4;
  adstateMainColor = '#692d87';

  users = [];
  bannerURL = '';
  mainColor: string;
  searchBackground = '#692d87';
  currentView = this.listViewText;
  isOpenAdvancedSearch = false;

  sortItems = sortItems;
  filterItems = filterItems;

  selectedSortOption = this.sortItems[0];
  selectedFilterOption = this.filterItems[0];

  @Select(MemorialSelectors.users) users$: Observable<Array<User>>;
  @Select(MemorialSelectors.errorCode) errorCode$: Observable<string>;
  @Select(MemorialSelectors.isLoading) isLoading$: Observable<boolean>;
  @Select(MemorialSelectors.errorMessage) errorMessage$: Observable<string>;
  @Select(MemorialSelectors.funeralHomeSetting) funeralHomeSetting$: Observable<FuneralHomeSetting>;

  @Input()
  get userId() {
    return this._userId;
  }

  set userId(id: string) {
    const funeralHomeId = parseInt(id, 0);
    this.store.dispatch(new MemorialActions.GetFuneralHomeSettings(funeralHomeId)).subscribe();
  }

  private _userId: string;

  @ViewChild('sortSelect') sortSelect: NgSelectComponent;
  @ViewChild('filterSelect') filterSelect: NgSelectComponent;

  constructor(
    private store: Store,
    private authService: AuthStorageService,
    public translationService: TranslocoService
  ) {

    this.setupMainColor(this.adstateMainColor);

    this.store.dispatch(new MemorialActions.GetUsers(
      this.displayNumberListView, this.page
    )).subscribe();

    this.setupFuneralHomeSettings();
    // this.funeralHomeSetting$
    //   .pipe(takeUntilDestroyed(this))
    //   .subscribe((setting) => {
    //     if (setting) {
    //
    //       this.setupMainColor(setting.mainColor);
    //       this.bannerURL = setting.bannerURL;
    //
    //       if (!setting.themeId) {
    //         this.currentView = this.listViewText;
    //       } else {
    //         this.currentView = setting.themeId === 0 ? this.listViewText : this.gridViewText;
    //       }
    //
    //       setTimeout(this.setupSearchThumbnailBackground, 500);
    //     }
    //   });
  }

  ngOnInit(): void {
    this.selectedSortOption = this.sortItems[0];
    this.selectedFilterOption = this.filterItems[0];
  }

  ngAfterViewInit(): void {
    this.currentLanguage$ = this.translationService.langChanges$;
    this.currentLanguage$.subscribe(() => {
      const sortOption = this.selectedSortOption;
      const filterOption = {...this.selectedFilterOption};

      if (this.selectedSortOption.value) {
        this.sortSelect.handleClearClick();
        setTimeout(() => {
          this.selectedSortOption = sortOption;
          this.sortSelect.blur();
        }, 0);
      }

      if (this.selectedFilterOption.value) {
        this.filterSelect.handleClearClick();
        setTimeout(() => {
          this.selectedFilterOption = filterOption;
          this.filterSelect.blur();
        }, 0);
      }
    });
  }

  onSelectSort(sortOption: Sort): void {
    if (!sortOption?.value) {
      return;
    }

    this.selectedSortOption = sortOption;
    this.store.dispatch(new MemorialActions.SortMemorialPage(sortOption)).subscribe();
  }

  onSelectFilter(filterOption: Filter): void {
    if (!filterOption?.value) {
      return;
    }

    this.selectedFilterOption = filterOption;
    this.store.dispatch(new MemorialActions.FilterMemorialPage(filterOption)).subscribe();
  }

  changeView(viewType: string): void {
    this.currentView = viewType;
  }

  onOpenAdvancedSearch(isOpenAdvancedSearch: boolean): void {
    this.isOpenAdvancedSearch = isOpenAdvancedSearch;
  }

  loadMore(): void {
    let viewNumber = 0;

    if (this.currentView === this.listViewText) {
      this.displayNumberListView = this.displayNumberListView + 7;
      viewNumber = this.displayNumberListView;
    }

    if (this.currentView === this.gridViewText) {
      this.displayNumberShadowView = this.displayNumberShadowView + 4;
      viewNumber = this.displayNumberShadowView;
    }

    this.store.dispatch(new MemorialActions.GetUsers(viewNumber, this.page)).subscribe();
  }

  setupFuneralHomeSettings(): void {
    this.authService.isAuthenticatedPromise().then((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.authService.getLoggedInUserPromise().then(loggedInUser => {
          const id = loggedInUser.username === 'metalgear' ? 2 : 1;
          // this.store.dispatch(new MemorialActions.GetFuneralHomeSettings(id)).subscribe();
        });
      }
    });
  }

  setupMainColor(color): void {
    const root = document.documentElement;
    this.mainColor = color;
    if (!color) {
      color = '#692d87';
    }

    root.style.setProperty('--bs-primary', '#692d87');
  }

  setupSearchThumbnailBackground(): string {
    if (!this.bannerURL) {
      this.searchBackground = this.adstateMainColor;
    }

    return this.searchBackground;
  }
}

