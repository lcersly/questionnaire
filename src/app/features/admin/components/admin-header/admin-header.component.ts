import {Component, OnInit, Optional} from '@angular/core';
import {Auth} from "@angular/fire/auth";
import {Router, RouterLink} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterLink,
    NgIf,
    MatButtonModule
  ]
})
export class AdminHeaderComponent implements OnInit {

  constructor(@Optional() public auth: Auth, private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.signOut().then(() => this.router.navigateByUrl("/admin"));
  }

  isActiveRoute(answers: string) {
    return this.router.url.includes(answers)
  }
}
