import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {DatePipe} from "@angular/common";

@Pipe({
    name: 'localizedDate',
    pure: false,
    standalone: true
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {
  }

  transform(value: any, pattern: string = 'mediumDate'): any {
    const datePipe: DatePipe = new DatePipe(this.translateService.currentLang);
    return datePipe.transform(value, pattern);
  }
}
