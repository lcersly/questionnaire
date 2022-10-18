import {Timestamp} from "@angular/fire/firestore";

export interface SignupData {
  name: string,
  email: string,
  mobile: string,
  quizId?: string,
}

export type Status = 'pulled' | 'notified' | 'redeemed' | null;

export interface SignupFull extends SignupData {
  id?: string
  uid: string;
  signupTime: Date;
  status: Status
}

export interface SignupDatabase extends SignupData {
  uid: string;
  signupTime: Timestamp;
  status: Status
}
