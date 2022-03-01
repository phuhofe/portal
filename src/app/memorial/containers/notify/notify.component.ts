import {Component, Input, OnInit} from '@angular/core';
import {Select} from "@ngxs/store";
import {MemorialSelectors} from "../../store/memorial.selectors";
import {Observable} from "rxjs";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

  @Select(MemorialSelectors.users) users$: Observable<Array<User>>;
  @Select(MemorialSelectors.errorCode) errorCode$: Observable<string>;
  @Select(MemorialSelectors.errorMessage) errorMessage$: Observable<string>;
  @Select(MemorialSelectors.isLoading) isLoading$: Observable<boolean>

  @Input() mainColor: string;

  constructor() { }

  ngOnInit(): void {}

}
