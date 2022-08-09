import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-admin-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AdminRootComponent implements OnInit {
  isProduction = environment.production;
  correctAnswer: number[] | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }
}
