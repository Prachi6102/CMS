import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IBook } from 'src/app/core/interface';
import { BookService } from 'src/app/core/service/book.service';
import { TokenService } from 'src/app/core/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books!: IBook[];
  role!: string;

  constructor(
    private bookService: BookService,
    private sanitizer: DomSanitizer,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.bookService.getAll().subscribe({
      next: (response) => {
        this.books = response.data;
      },
      error: (error) => {
        Swal.fire({ text: error.error.message, icon: 'error' });
      },
    });

    const user = this.tokenService.getCurrentUser();
    this.role = user.role;
  }

  getSafeUrl(path: string): SafeUrl {
    // Replace backslashes with forward slashes
    let formattedPath = path.replace(/\\/g, '/');

    // Remove the leading '..'
    formattedPath = formattedPath.replace(/^..\/Backend\//, '');

    // Construct the full URL
    const baseUrl = 'http://localhost:3000/';
    const fullUrl = baseUrl + formattedPath;

    // Sanitize the URL
    return this.sanitizer.bypassSecurityTrustUrl(fullUrl);
  }
}
