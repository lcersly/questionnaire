import {Injectable, Optional} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Auth, signInAnonymously} from "@angular/fire/auth";
import {from, map, of, shareReplay, switchMap} from "rxjs";
import {addDoc, collection, Firestore} from "@angular/fire/firestore/lite";
import {SignupData, SignupFull} from "../models/signup.model";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private credentials$ = from(signInAnonymously(this.auth)).pipe(
    map((auth)=>auth?.user?.uid),
    shareReplay(1)
  )

  constructor(private client: HttpClient,
              @Optional() private auth: Auth,
              private readonly firestore: Firestore) {
  }

  sendSignup(signup: SignupData) {
    if(!signup.quizId){
      throw new Error("QuizID not set");
    }

    let credentials$;
    if (this.auth?.currentUser?.uid) {
      credentials$ = of(this.auth.currentUser.uid)
    } else {
      credentials$ = this.credentials$;
    }

    return credentials$.pipe(
      switchMap((token) => {
          if (!token) {
            throw new Error("User not authenticated");
          }

          const data = {
            ...signup,
            uid: token,
            signupTime: new Date()
          } as SignupFull;
          return from(addDoc(collection(this.firestore, 'signups'), data));
        }
      )
    );
  }
}
