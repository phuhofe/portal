import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {

  currentTheme = 0;
  currentThemeName: string;
  dummyText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitasse potenti vestibulum, elementum, sed. Feugiat
          vestibulum non quis sapien nisl netus eget egestas quam. Mauris vel sit suspendisse turpis. Commodo, elementum
          pulvinar diam non eu et neque neque nibh. Risus proin adipiscing convallis sit mi, lorem. Id ac nisl sit
          ultrices nec velit. Vel fringilla consectetur.`;


  themeNameMap = new Map([
    ['0', 'Standard Theme'],
    ['1', 'New Generation Theme'],
    ['2', 'Net Notice'],
    ['3', 'Customer Specific 1'],
  ]);

  constructor() { }

  ngOnInit(): void {
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


}
