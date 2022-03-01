import { Component, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-test-filter',
  templateUrl: './test-filter.component.html',
  styleUrls: ['./test-filter.component.scss']
})
export class TestFilterComponent implements OnInit {

  
  @ViewChildren('adsateInput') set cellTemplates(refs: QueryList<TemplateRef<any>>) {
    if(refs) {
      console.log('reft', refs);
    }
  }

  usingCustomTemplate: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
