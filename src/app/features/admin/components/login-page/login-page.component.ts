import {Component, OnInit, Optional} from '@angular/core';
import {Auth, GoogleAuthProvider, signInWithPopup,} from '@angular/fire/auth';
import {from} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    standalone: true
})
export class LoginPageComponent implements OnInit {

  constructor(@Optional() private auth: Auth, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  loginWithGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider()))
      .subscribe(() =>
        this.router.navigate(['..', 'answers'], {relativeTo: this.route})
      );
  }
}
