import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  // constructor(public auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  loginWithGoogle() {
    // this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
