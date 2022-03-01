import {Component, Input, OnInit, OnChanges, SimpleChanges, Renderer2} from '@angular/core';
import {User} from '../../models/user.model';
import {FuneralHomeSetting} from "../../models/funeralhome.model";

@Component({
  selector: 'app-standard-view',
  templateUrl: './standard-view.component.html',
  styleUrls: ['./standard-view.component.scss']
})
export class StandardViewComponent implements OnInit, OnChanges {

  @Input() users: Array<User>;
  @Input() end: number;
  @Input() userId: string;
  @Input() displayNumberListView: number;
  @Input() gettingImage: boolean;

  displayNumber = 7;

  imageLoader = true;

  deathNoticeIcon = 'https://video-demo-e2a84.web.app/assets/images/death_notice_icon.svg';
  candleFilterIcon = 'https://video-demo-e2a84.web.app/assets/images/candel_filter_icon.svg';
  donationFilterIcon = 'https://video-demo-e2a84.web.app/assets/images/donation_filter_icon.svg';
  flowerFilterIcon = 'https://video-demo-e2a84.web.app/assets/images/flower_filter_icon.svg';

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.displayNumberListView) {
      this.loadMore();
    }
  }

  loadMore(): number {
    return this.displayNumber = this.displayNumber + 2;
  }

  onUrlClick(event: any, link: string): void {
    if (link.length === 0) {
      event.preventDefault();
    }
  }

  trackByMethod(index: number, element: any): number {
    this.imageLoader = true;
    return element.id;
  }

  onLoadImage(): void {
    this.imageLoader = false;
  }

  handleErrorImage(element): void {
    const imagePlaceHolder = '/assets/images/avatarplaceholder.png';
    this.renderer.setAttribute(element, 'src', imagePlaceHolder);
  }
}
