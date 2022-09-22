import {Component, OnInit, Optional} from '@angular/core';
import {AdminService} from "../../admin.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogAddAdminComponent} from "./add-admin-dialog/dialog-add-admin.component";
import {Auth} from "@angular/fire/auth";

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.scss']
})
export class ManageAdminsComponent implements OnInit {

  constructor(public adminService: AdminService, private dialog: MatDialog, @Optional() public auth: Auth) {
  }

  ngOnInit(): void {
    this.adminService.connect();
  }

  openAddAdminDialog() {
    this.dialog.open(DialogAddAdminComponent);
  }
}
