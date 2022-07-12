import {Injectable} from '@angular/core';
import {ReplaySubject} from "rxjs";
import {NavigationButton} from "../components/static/shared/navigation-buttons/navigation-buttons.component";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private navigation = new ReplaySubject<{ prev?: NavigationButton, next?: NavigationButton, enableFinish?: boolean }>();
  public navigation$ = this.navigation.asObservable();

  constructor() {
  }

  setBoth(prev?: NavigationButton, next?: NavigationButton, enableFinish?: boolean) {
    this.navigation.next({next, prev, enableFinish});
  }
}
