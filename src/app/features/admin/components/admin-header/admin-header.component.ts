import {Component, OnInit, Optional} from '@angular/core';
import {Auth} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(@Optional() private auth: Auth, private router: Router) {
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
