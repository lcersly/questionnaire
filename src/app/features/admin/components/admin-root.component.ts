import {Component, OnDestroy, Optional} from '@angular/core';
import {SignupService} from "../signup.service";
import {Auth} from "@angular/fire/auth";

@Component({
  selector: 'app-admin-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AdminRootComponent implements OnDestroy {
  constructor(private firebase: SignupService,
              @Optional() private auth: Auth,
  ) {
  }

  ngOnDestroy(): void {
    this.firebase.disconnect();
  }
}
