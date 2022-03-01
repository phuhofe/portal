import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  label = 'Sort';

  items = [
    'Most relevant',
    'Alphabetically sorted by first name (A - Å)',
    'Alphabetically sorted by last name (A - Å)',
    'Year of birth (high to low)',
    'Year of birth (low to high)',
    'Year of death (high to low)',
    'Year of death (low to high)',
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
