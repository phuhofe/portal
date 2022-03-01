import { Component, OnInit } from '@angular/core';
import { environment} from '@app/env';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  environment = environment;

  constructor() { }

  ngOnInit(): void {
  }

}
