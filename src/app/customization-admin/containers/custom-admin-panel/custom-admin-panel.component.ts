import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-admin-panel',
  templateUrl: './custom-admin-panel.component.html',
  styleUrls: ['./custom-admin-panel.component.scss']
})
export class CustomAdminPanelComponent implements OnInit {

  isChanged: boolean;
  isSaveSettings: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onChangeBannerImage(isChanged: boolean): void {
    this.isChanged = isChanged;
  }

  onDiscardChanges(isDiscardChanges: boolean): void {
    this.isChanged = !isDiscardChanges;
  }

  onSaveSettings(isSaveSettings: boolean): void {
    this.isSaveSettings = isSaveSettings;
  }

}
