import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'Bankdata Quiz';

  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
    const browserLang = this.translateService.getBrowserLang();
    if (browserLang) {
      this.translateService.use(browserLang)
    }
  }
}
