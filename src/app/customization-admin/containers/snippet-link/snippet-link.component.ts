import {Component, OnInit, ViewChild} from '@angular/core';
import {TooltipDirective} from 'ngx-bootstrap/tooltip';

@Component({
  selector: 'app-snippet-link',
  templateUrl: './snippet-link.component.html',
  styleUrls: ['./snippet-link.component.scss']
})
export class SnippetLinkComponent implements OnInit {

  @ViewChild('pop') pop: TooltipDirective;

  snippetLink = `<script src="https:/adstate/assets/js/sdk.js"></script>`;

  constructor() {
  }

  ngOnInit(): void {
  }

  onCopySnippet(): void {
    this.pop.show();
    setTimeout(() => this.pop.hide(), 1000);
  }

}
