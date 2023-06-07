import {Component, OnDestroy, Optional} from '@angular/core';
import {SignupService} from "../signup.service";
import {Auth} from "@angular/fire/auth";
import {AdminService} from "../admin.service";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-admin-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [],
  imports: [
    RouterOutlet
  ],
  standalone: true
})
export class AdminRootComponent implements OnDestroy {
  constructor(private firebase: SignupService,
              private admin: AdminService,
              @Optional() private auth: Auth,
  ) {
  }

  ngOnDestroy(): void {
    this.firebase.disconnect();
    this.admin.disconnect();
  }
}
