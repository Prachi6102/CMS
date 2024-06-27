import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { IUser } from 'src/app/core/interface';
import { UserService } from 'src/app/core/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  rowData!: IUser[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.rowData = response.data;
      },
      error: (error) => {
        Swal.fire({ text: error.error.message, icon: 'error' });
      },
    });
  }

  colDefs: ColDef[] = [
    { field: 'full_name', headerName: 'FULL_NAME' },
    { field: 'user_name', headerName: 'USER_NAME' },
    { field: 'role', headerName: 'ROLE' },
    { field: 'gender', headerName: 'GENDER' },
    { field: 'dob', headerName: 'DATE OF BIRTH' },
    { field: 'email', headerName: 'EMAIL' },
    { field: 'mobile_no', headerName: 'MOBILE' },
    { field: 'password', headerName: 'PASSWORD' },
  ];
}
