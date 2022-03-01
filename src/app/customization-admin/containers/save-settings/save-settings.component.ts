import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-save-settings',
  templateUrl: './save-settings.component.html',
  styleUrls: ['./save-settings.component.scss'],
  
})
export class SaveSettingsComponent implements OnInit {

  @Output() discardChanges = new EventEmitter();
  @Output() saveSettings = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onDiscardChanges(): void {
    this.discardChanges.emit(true);
  }

  onSaveSettings(): void {
    this.saveSettings.emit(true);
  }

}
