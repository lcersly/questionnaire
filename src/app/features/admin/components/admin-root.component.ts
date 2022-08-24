import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {SignupService} from "../signup.service";

@Component({
  selector: 'app-admin-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AdminRootComponent implements OnInit, OnDestroy {
  isProduction = environment.production;
  correctAnswer: number[] | undefined;

  constructor(private firebase: SignupService) {
  }

  ngOnInit(): void {
    this.firebase.connect()
  }

  ngOnDestroy(): void {
    this.firebase.disconnect()
  }
}
