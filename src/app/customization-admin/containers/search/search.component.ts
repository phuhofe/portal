import {Component, OnInit} from '@angular/core';
import {AdminSearchTypeModel} from '../../models/admin-search-type.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  types: AdminSearchTypeModel[] = [
    {
      name: 'Funeral home',
      isAvailable: false,
      isDefault: false
    },
    {
      name: 'National search',
      isAvailable: true,
      isDefault: true
    },
    {
      name: 'Global search',
      isAvailable: true,
      isDefault: false
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
