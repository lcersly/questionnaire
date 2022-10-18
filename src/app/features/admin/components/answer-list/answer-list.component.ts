import {Component, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import {Auth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {SignupFull, Status} from "../../../../models/signup.model";
import {MatSort} from "@angular/material/sort";
import {Subject, takeUntil} from "rxjs";
import {SignupService} from "../../signup.service";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogQuizPickComponent,
  DialogQuizPickComponentData,
  DialogQuizPickComponentResult,
} from "./signup-edit-dialog/dialog-quiz-pick.component";
import {
  DialogSignupPickedComponent,
  DialogSignupPickedData
} from "./signup-picked-dialog/dialog-signup-picked.component";
import {
  DialogSignupEditMultipleComponent,
  DialogSignupEditMultipleData
} from "./quiz-pick-dialog/dialog-signup-edit-multiple.component";

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<SignupFull>([]);
  selection = new SelectionModel<SignupFull>(true, []);
  private onDestroy = new Subject<void>();
  displayedColumns = ['select', 'name', 'mobile', 'email', 'quizId', 'signupTime', 'status'];
  public isConnected?: boolean = undefined;

  @ViewChild(MatSort)
  private set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor(@Optional() public auth: Auth,
              private router: Router,
              public signupService: SignupService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.signupService.signups$.pipe(
      takeUntil(this.onDestroy)
    ).subscribe((data) => {
      if (!data) {
        data = [];
      }
      if (!this.selection.isEmpty()) {
        const newSelection = this.selection.selected
          .map(org => data!.find(d => d.uid === org.uid))
          .filter(value => !!value) as SignupFull[];
        this.selection.clear();
        this.selection.select(...newSelection);
      }
      this.dataSource.data = data;
      this.dataSource._updateChangeSubscription();
    });

    this.signupService.isConnected$.pipe(
      takeUntil(this.onDestroy)
    ).subscribe(connected => this.isConnected = connected)

    this.auth.onAuthStateChanged(next => {
      if (!next?.isAnonymous) {
        console.info("Connected as non-anonymous", next?.uid)
        this.signupService.connect();
      } else if (next.isAnonymous) {
        console.info("Connected as anonymous", next.uid)
        this.auth.signOut().then(() => this.router.navigateByUrl("/admin"));
      }
    })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  get lastSignup() {
    const latestSignup = this.dataSource.data.reduce((previousValue, currentValue) => {
      if (!previousValue.signupTime || currentValue.signupTime >= previousValue.signupTime) {
        return currentValue;
      } else {
        return previousValue;
      }
    }, {signupTime: null} as any as SignupFull);
    return latestSignup?.signupTime
  }

  get canPick() {
    return this.dataSource.data.find(signup => !signup.status);
  }

  getSignupCount(status?: Status) {
    return this.dataSource.data.filter(signup => {
      if (!status) {
        return !signup.status;
      }
      return signup.status === status;
    }).length;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected >= numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  startPick() {
    let unPickedSignups = this.dataSource.data.filter(signup => !signup.status);

    let quizIds = unPickedSignups.reduce((prev, curr) => {
      if (prev.indexOf(curr.quizId) == -1) {
        prev.push(curr.quizId);
      }
      return prev;
    }, [] as (string | undefined)[]);

    if (!quizIds.length) {
      throw new Error("No quiz ids detected");
    } else if (quizIds.length == 1) {
      this.pickRandomSignup(unPickedSignups);
    } else {
      this.dialog.open(DialogQuizPickComponent, {
        data: {quizIds: quizIds} as DialogQuizPickComponentData,
        disableClose: true,
        autoFocus: false
      }).afterClosed().subscribe((quizId: DialogQuizPickComponentResult) => {
        if (!quizId.selected) {
          return;
        }
        unPickedSignups = unPickedSignups.filter(signup => signup.quizId === quizId.quizId)
        this.pickRandomSignup(unPickedSignups);
      });
    }
  }

  private pickRandomSignup(unPickedSignups: SignupFull[]){
    const randomIndex = Math.floor(Math.random() * unPickedSignups.length)
    const pick = unPickedSignups[randomIndex];

    this.dialog.open(DialogSignupPickedComponent, {
      data: {signup: pick} as DialogSignupPickedData,
      disableClose: true,
      autoFocus: false
    });
  }

  editSelection() {
    this.dialog.open(DialogSignupEditMultipleComponent, {
      data: {links: this.selection.selected} as DialogSignupEditMultipleData,
      autoFocus: false
    });
  }
}
