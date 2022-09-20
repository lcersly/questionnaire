import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../admin.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogAddAdminComponent} from "./add-admin-dialog/dialog-add-admin.component";

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.scss']
})
export class ManageAdminsComponent implements OnInit {

  constructor(public adminService: AdminService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.adminService.connect();
  }

  openAddAdminDialog() {
    this.dialog.open(DialogAddAdminComponent);
  }
}
