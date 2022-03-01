import { Component, ContentChild, Input, OnInit, QueryList, TemplateRef, ViewChildren, ViewEncapsulation } from '@angular/core';
import { AdstateInputRowTemplateDirective } from '../directive/adstate-input-row.directive';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilterComponent implements OnInit {

  @Input() usingCustomTemplate: boolean;
  @Input() totalSearchResult: number = 123456578;
  
  @ContentChild(AdstateInputRowTemplateDirective, { read: TemplateRef }) adstateInputRowTemplate: TemplateRef<any>;
  
  isCollapsed: boolean = true;

  constructor() {

  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    console.log('adstateInputRowTemplate', this.adstateInputRowTemplate);
  }

  toggleFilter() {
    this.isCollapsed = !this.isCollapsed;
  }

  clearFilterForm() {

  }

}
