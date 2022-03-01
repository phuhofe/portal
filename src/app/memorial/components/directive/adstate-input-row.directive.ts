import { Directive, TemplateRef } from "@angular/core";

@Directive({ selector: '[adstate-input-row-tmp]' })
export class AdstateInputRowTemplateDirective {
  constructor(public template: TemplateRef<any>) {  }
}