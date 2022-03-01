import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AdminState} from '../store/admin.state';
import {Observable} from 'rxjs';
import {AdminActions} from '../store/admin.action';
import {AuthStorageService} from '@app/core/services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  currentTheme: number;
  mainColor: string;
  bannerURL: string;
  logoUrl: string;
  previewBannerPicture: any;
  userId: number;

  themeArray = [
    'newGeneration',
    'netNotice'
  ];

  demoBannerURL = [
    'https://davekochphoto.com/wp-content/uploads/2018/05/8103540-Edit.jpg',
    'https://i.pinimg.com/originals/30/fb/21/30fb21d49cf3982df233ce432a7c0a44.jpg',
    'https://i.pinimg.com/originals/ff/fc/b1/fffcb1f5b8a707aebec19f0a57cefb01.jpg',
  ];

  themeNameMap = new Map([
    ['0', 'Standard Theme'],
    ['1', 'New Generation Theme'],
    ['2', 'Net Notice'],
    ['3', 'Customer Specific 1'],
  ]);

  currentThemeName: string;

  dummyText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitasse potenti vestibulum, elementum, sed. Feugiat
          vestibulum non quis sapien nisl netus eget egestas quam. Mauris vel sit suspendisse turpis. Commodo, elementum
          pulvinar diam non eu et neque neque nibh. Risus proin adipiscing convallis sit mi, lorem. Id ac nisl sit
          ultrices nec velit. Vel fringilla consectetur.`;

  @Select(AdminState.funeralHomeSetting) funeralHomeSetting$: Observable<any>;

  constructor(
    private store: Store,
    private authService: AuthStorageService
  ) {
    this.authService.getLoggedInUser().subscribe(value => {
      if (value) {
        this.userId = value.username === 'metalgear' ? 2 : 1;
        this.store.dispatch(new AdminActions.GetFuneralHomeSettings(this.userId));
      }
    });
  }

  ngOnInit(): void {
    this.funeralHomeSetting$.subscribe(data => {
      if (data) {
        this.currentTheme = data.themeId;
        this.getCurrentThemeName();
        this.mainColor = data.mainColor;
        this.bannerURL = data.bannerURL;
        this.logoUrl = data.logoUrl;
      }
    });

  }

  getCurrentThemeName(): void {
    this.currentThemeName = this.themeNameMap.get(this.currentTheme.toString());
  }

  previousTheme(): void {
    if (this.currentTheme === 0) {
      return;
    }

    this.currentTheme -= 1;
    this.getCurrentThemeName();
  }

  nextTheme(): void {
    if (this.currentTheme === 3) {
      return;
    }

    this.currentTheme += 1;
    this.getCurrentThemeName();
  }

  onSave(): void {
    this.store.dispatch(new AdminActions.SaveConfig({
      userId: this.userId,
      themeId: this.currentTheme,
      mainColor: this.mainColor,
      bannerURL: this.bannerURL
    }));
  }

  copyLink(url: string): void {
    this.bannerURL = url;
  }

  noBanner(): void {
    this.bannerURL = '';
  }

  handleBannerPicture(event): void {

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.previewBannerPicture = reader.result;
        this.copyLink(this.previewBannerPicture);
      };
    }

  }

}
