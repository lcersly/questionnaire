import {Injectable} from '@angular/core';
import {DocumentData, FirestoreDataConverter, QuerySnapshot} from 'firebase/firestore';
import {SignupDatabase, SignupFull, Status} from "../../models/signup.model";
import {collection, doc, Firestore, onSnapshot, Unsubscribe, updateDoc, writeBatch} from "@angular/fire/firestore";
import {distinctUntilChanged, from, map, ReplaySubject, shareReplay, startWith} from "rxjs";

@Injectable({
  providedIn: null
})
export class SignupService {
  private signups = new ReplaySubject<QuerySnapshot<SignupFull> | null>()
  public readonly signups$ = this.signups.pipe(
    map((next) => next ? next.docs : null),
    map(data => data ? data.map(doc => doc.data()) : null)
  );

  public readonly isConnected$ = this.signups$.pipe(
    // tap(data => console.info(data)),
    map((data) => data != null),
    startWith(false),
    distinctUntilChanged(),
    shareReplay(1),
  );

  private unsubscribe?: Unsubscribe;

  constructor(private firestore: Firestore) {
    this.isConnected$.subscribe(connected => console.info("isConnected", connected));
  }

  connect() {
    if (this.unsubscribe) {
      throw new Error("Already connected to signups");
    }
    console.debug("Connecting to signups");
    this.unsubscribe = onSnapshot(this.collection, next => this.signups.next(next), error => {
      console.error("Error connecting", error);
      if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = undefined;
      }
    });
  }

  disconnect() {
    if (!this.unsubscribe) {
      throw new Error("Not connected to signups");
    }
    this.unsubscribe();
    this.unsubscribe = undefined;
    this.signups.next(null);
  }

  get collection() {
    return collection(this.firestore, 'signups').withConverter(converter);
  }

  getDoc(id: string) {
    return doc(this.collection, id);
  }

  setStatus(signup: SignupFull, status: Status) {
    if (!signup.id) {
      throw new Error("Signup has no ID");
    }
    return from(updateDoc(this.getDoc(signup.id), 'status', status));
  }

  setStatusMultiple(signups: SignupFull[], status: Status) {
    if (signups.length > 500) throw new Error("To many documents");

    let batch = writeBatch(this.firestore);
    for (const signup of signups) {
      if (!signup.id) {
        throw new Error("Signup has no id");
      }
      batch.update(this.getDoc(signup.id), "status", status);
    }
    return from(batch.commit());
  }

  deleteMultiple(signups: SignupFull[]) {
    if (signups.length > 500) throw new Error("To many documents");

    let batch = writeBatch(this.firestore);
    for (const signup of signups) {
      if (!signup.id) {
        throw new Error("Signup has no id");
      }
      batch.delete(this.getDoc(signup.id))
    }
    return from(batch.commit());
  }
}

const converter: FirestoreDataConverter<SignupFull> = {
  toFirestore(modelObject: SignupFull): DocumentData {
    const signup = {
      ...modelObject
    } as SignupFull;
    delete signup.id;
    return signup;
  },
  fromFirestore(snapshot): SignupFull {
    let documentData = snapshot.data() as SignupDatabase;
    return {
      ...documentData,
      signupTime: documentData.signupTime.toDate(),
      id: snapshot.id
    } as SignupFull
  },
}
