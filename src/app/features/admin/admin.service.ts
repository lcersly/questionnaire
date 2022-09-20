import {Injectable} from '@angular/core';
import {DocumentData, FirestoreDataConverter, QuerySnapshot} from 'firebase/firestore';
import {addDoc, collection, deleteDoc, doc, Firestore, onSnapshot, Unsubscribe} from "@angular/fire/firestore";
import {from, map, ReplaySubject} from "rxjs";

interface AdminDatabase {
  name: string;
}

export interface Admin extends AdminDatabase {
  uid: string
}

@Injectable({
  providedIn: null
})
export class AdminService {
  private admins = new ReplaySubject<QuerySnapshot<Admin> | null>()
  public readonly admins$ = this.admins.pipe(
    map((next) => next ? next.docs : null),
    map(data => data ? data.map(doc => doc.data()) : null)
  );

  private unsubscribe?: Unsubscribe;

  constructor(private firestore: Firestore) {
  }

  connect() {
    if (this.unsubscribe) {
      console.warn("Already connected to admins");
      return;
    }
    console.debug("Connecting to admins");

    this.unsubscribe = onSnapshot(this.collection, next => {
      console.info("Admins", next.docs)
      this.admins.next(next);
    }, error => {
      console.error("Error connecting to admin firebase list", error);
      if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = undefined;
      }
    });
  }

  disconnect() {
    if (!this.unsubscribe) {
      console.warn("Not connected to admins");
      return;
    }
    this.unsubscribe();
    this.unsubscribe = undefined;
    this.admins.next(null);
  }

  get collection() {
    return collection(this.firestore, 'admins').withConverter(converter);
  }

  getDoc(id: string) {
    return doc(this.collection, id);
  }

  addAdmin(admin: Admin) {
    return from(addDoc(this.collection, admin));
  }

  deleteAdmin(admin: Admin) {
    return from(deleteDoc(this.getDoc(admin.uid)))
  }
}

const converter: FirestoreDataConverter<Admin> = {
  toFirestore(modelObject: Admin): DocumentData {
    const newVar = {
      ...modelObject
    } as any;
    delete newVar.uid;
    return newVar as AdminDatabase;
  },
  fromFirestore(snapshot): Admin {
    let documentData = snapshot.data() as AdminDatabase;
    console.info(documentData);
    return {
      ...documentData,
      uid: snapshot.id
    } as Admin
  },
}
