import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from 'src/app/core/service/author.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss'],
})
export class AuthorFormComponent implements OnInit {
  authorForm!: FormGroup;
  selectedFile!: File;
  isUpdate: boolean = false;
  isSubmit: boolean = true;
  author_id: string = this.activeRoute.snapshot.paramMap.get('id') as string;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authorForm = this.fb.group({
      full_name: [
        '',
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$"),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      dob: ['', Validators.required],
      country: ['', Validators.required],
      biography: ['', Validators.required],
      profile_pic: ['', Validators.required],
    });

    if (this.activeRoute.snapshot.paramMap.get('id')) {
      this.isUpdate = true;
      this.isSubmit = false;
      this.getAuthorById();
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  add() {
    if (this.authorForm.valid) {
      const formData = new FormData();
      formData.append('full_name', this.authorForm.get('full_name')?.value);
      formData.append('email', this.authorForm.get('email')?.value);
      formData.append('dob', this.authorForm.get('dob')?.value);
      formData.append('country', this.authorForm.get('country')?.value);
      formData.append('biography', this.authorForm.get('biography')?.value);
      formData.append('profile_pic', this.selectedFile);

      if (this.isSubmit) {
        this.authorService.add(formData).subscribe({
          next: (response) => {
            Swal.fire({ text: response.message, icon: 'success' });
            this.router.navigate(['/author/authors']);
          },
          error: (error) => {
            Swal.fire({ text: error.error.message, icon: 'error' });
          },
        });
      } else {
        this.authorService.update(this.author_id, formData).subscribe({
          next: (response) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.router.navigate(['/author/authors']);
          },
          error: (error) => {
            Swal.fire({ text: error.error.message, icon: 'error' });
          },
        });
      }
    }
    this.authorForm.reset();
  }

  getAuthorById() {
    this.authorService.getById(this.author_id).subscribe({
      next: (response) => {
        const dob = new Date(response.data.dob);
        const formattedDob = dob.toISOString().substring(0, 10);

        if (this.isUpdate) {
          this.authorForm.patchValue({
            full_name: response.data.full_name,
            email: response.data.email,
            dob: formattedDob,
            country: response.data.country,
            biography: response.data.biography,
          });
        }
      },
      error: (error) => {
        Swal.fire({ text: error.error.message, icon: 'error' });
      },
    });
  }
}
