import {Component, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import {Admin, AdminService} from "../../admin.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogEditAdminComponent} from "./add-admin-dialog/dialog-edit-admin.component";
import {Auth} from "@angular/fire/auth";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.scss']
})
export class ManageAdminsComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Admin> = new MatTableDataSource<Admin>();

  private onDestroy = new Subject<void>();
  displayedColumns = ['uid', 'name', 'edit'];
  trackByAdmin = function (index: number, item: Admin) {
    return item.uid
  };

  @ViewChild(MatSort)
  private set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor(private adminService: AdminService, private dialog: MatDialog, @Optional() public auth: Auth) {

  }

  ngOnInit(): void {
    this.adminService.connect();

    this.adminService.admins$
      .pipe(takeUntil(this.onDestroy))
      .subscribe(admins => this.dataSource.data = admins || [])
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }


  openAddAdminDialog() {
    this.dialog.open(DialogEditAdminComponent);
  }

  editUser(element: Admin) {

  }
}
