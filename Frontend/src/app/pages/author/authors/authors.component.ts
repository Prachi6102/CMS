import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { IAuthor } from 'src/app/core/interface';
import { AuthorService } from 'src/app/core/service/author.service';
import { ButtonCellRendererComponent } from 'src/app/shared/cell-renderer/button-cell-renderer/button-cell-renderer.component';
import { ProfilePicComponent } from 'src/app/shared/cell-renderer/profile-pic/profile-pic.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit {
  rowData!: IAuthor[];

  gridOptions = {
    rowHeight: 50,
  };

  constructor(private authorService: AuthorService, private router: Router) {}

  ngOnInit(): void {
    this.authorService.getAll().subscribe({
      next: (response) => {
        this.rowData = response.data;
      },
      error: (error) => {
        Swal.fire({ text: error.error.message, icon: 'error' });
      },
    });
  }

  colDefs: ColDef[] = [
    {
      field: 'full_name',
      headerName: 'NAME',
      cellRenderer: ProfilePicComponent,
      flex: 1,
    },
    { field: 'email', headerName: 'EMAIL', flex: 1 },
    {
      field: 'dob',
      headerName: 'DATE OF BIRTH',
      cellRenderer: (data: any) => {
        return data.value ? new Date(data.value).toLocaleDateString() : '';
      },
      flex: 1,
    },
    { field: 'country', headerName: 'COUNTRY', flex: 1 },
    { field: 'biography', headerName: 'BIO', flex: 2 },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: ButtonCellRendererComponent,
      cellRendererParams: {
        onDelete: (id: string) => this.deleteAuthor(id),
        onUpdate: (id: string) => this.updateAuthor(id),
      },
      flex: 1,
    },
  ];

  deleteAuthor(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authorService.delete(id).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Deleted!',
              text: response.message,
              icon: 'success',
            });
            this.router.navigate(['/author/authors']);
          },
          error: (error) => {
            Swal.fire({ text: error.error.message, icon: 'error' });
          },
        });
      }
    });
  }

  updateAuthor(id: string) {
    this.router.navigate([`/author/update-author/${id}`]);
  }
}
