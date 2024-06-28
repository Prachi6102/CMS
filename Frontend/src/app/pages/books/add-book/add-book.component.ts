import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAuthor, ICategory } from 'src/app/core/interface';
import { AuthorService } from 'src/app/core/service/author.service';
import { BookService } from 'src/app/core/service/book.service';
import { CategoryService } from 'src/app/core/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  filteredSubCategories!: ICategory[];
  authors!: IAuthor[];
  selectedCategory!: string;
  selectedCoverImage!: File;
  selectedBookPDF!: File;
  bookForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private authorService: AuthorService,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authorService.getAll().subscribe({
      next: (response) => {
        this.authors = response.data;
      },
      error: (error) => {
        Swal.fire({ text: error.error.message, icon: 'error' });
      },
    });

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      pages: ['', Validators.required],
      language: ['', Validators.required],
      category: ['', Validators.required],
      sub_category: ['', Validators.required],
      description: ['', Validators.required],
      cover_img: ['', Validators.required],
      book_pdf: ['', Validators.required],
    });
  }

  onCategoryChange() {
    if (this.selectedCategory) {
      this.categoryService.getCategories(this.selectedCategory).subscribe({
        next: (response) => {
          this.filteredSubCategories = response.data;
        },
        error: (error) => {
          Swal.fire({ text: error.error.message, icon: 'error' });
        },
      });
    } else {
      this.filteredSubCategories = [];
    }
  }

  onCoverImageChange(event: any) {
    this.selectedCoverImage = event.target.files[0];
  }

  onBookPDFChange(event: any) {
    this.selectedBookPDF = event.target.files[0];
  }

  addBook() {
    if (this.bookForm.valid) {
      console.log(this.bookForm.value);
      const formData = new FormData();
      formData.append('title', this.bookForm.get('title')?.value);
      formData.append('author', this.bookForm.get('author')?.value);
      formData.append('isbn', this.bookForm.get('isbn')?.value);
      formData.append('pages', this.bookForm.get('pages')?.value);
      formData.append('language', this.bookForm.get('language')?.value);
      formData.append('category', this.bookForm.get('category')?.value);
      formData.append('sub_category', this.bookForm.get('sub_category')?.value);
      formData.append('description', this.bookForm.get('description')?.value);
      formData.append('cover_img', this.selectedCoverImage);
      formData.append('book_pdf', this.selectedBookPDF);

      this.bookService.addBook(formData).subscribe({
        next: (response) => {
          Swal.fire({ text: response.message, icon: 'success' });
          this.router.navigate(['/books/books']);
        },
        error: (error) => {
          Swal.fire({ text: error.error.message, icon: 'error' });
        },
      });
    }
    this.bookForm.reset();
  }
}
