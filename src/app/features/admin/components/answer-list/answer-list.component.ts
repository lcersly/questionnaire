import {AfterViewInit, Component, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import {Auth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {SignupFull} from "../../../../models/signup.model";
import {MatSort} from "@angular/material/sort";
import {Subject, takeUntil} from "rxjs";
import {SignupService} from "../../signup.service";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogSignupEditMultipleComponent,
  DialogSignupEditMultipleData
} from "./signup-dialog/dialog-signup-edit-multiple.component";
import {
  DialogSignupPickedComponent,
  DialogSignupPickedData
} from "./signup-picked-dialog/dialog-signup-picked.component";

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent implements OnInit, OnDestroy, AfterViewInit {
  dataSource = new MatTableDataSource<SignupFull>([]);
  selection = new SelectionModel<SignupFull>(true, []);
  @ViewChild(MatSort) matSort: MatSort | undefined;
  private onDestroy = new Subject<void>();
  displayedColumns = ['select', 'name', 'mobile', 'email', 'signupTime', 'status'];

  constructor(@Optional() private auth: Auth, private router: Router, private signupService: SignupService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.signupService.signups$.pipe(
      takeUntil(this.onDestroy)
    ).subscribe(data => {
      if (!data) {
        data = [];
      }
      this.dataSource.data = data;
      this.dataSource._updateChangeSubscription();
      this.selection.clear();
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  ngAfterViewInit(): void {
    if (this.matSort) {
      this.dataSource.sort = this.matSort;
    }
  }

  get lastSignup() {
    return this.dataSource.data.reduce((previousValue, currentValue) => {
      return currentValue.signupTime > previousValue.signupTime ? currentValue : previousValue;
    }, {signupTime: new Date(0)}).signupTime
  }

  get canPick() {
    return this.dataSource.data.find(signup => !signup.status);
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  logout(): void {
    this.auth.signOut().then(() => this.router.navigateByUrl("/admin"));
  }

  startPick() {
    const signups = this.dataSource.data.filter(signup => !signup.status);
    const randomIndex = Math.floor(Math.random() * signups.length)
    const pick = signups[randomIndex];

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
