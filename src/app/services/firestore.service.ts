import {Injectable, Optional} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Auth, signInAnonymously} from "@angular/fire/auth";
import {from, shareReplay, switchMap} from "rxjs";
import {addDoc, collection, Firestore} from "@angular/fire/firestore";
import {SignupData, SignupFull} from "../models/signup.model";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private credentials$ = from(signInAnonymously(this.auth)).pipe(shareReplay(1))

  constructor(private client: HttpClient, @Optional() private auth: Auth, private readonly firestore: Firestore) {
  }

  sendSignup(signup: SignupData) {
    return this.credentials$.pipe(
      switchMap((credentials) => {
          if (!credentials?.user) {
            throw new Error("User not authenticated");
          }

          const data = {
            ...signup,
            uid: credentials.user.uid,
            signupTime: new Date()
          } as SignupFull;
          return from(addDoc(collection(this.firestore, 'signups'), data));
        }
      )
    );
  }
}
