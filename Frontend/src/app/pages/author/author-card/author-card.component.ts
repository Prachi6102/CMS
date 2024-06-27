import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IAuthor } from 'src/app/core/interface';
import { AuthorService } from 'src/app/core/service/author.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss'],
})
export class AuthorCardComponent implements OnInit {
  authors!: IAuthor[];

  constructor(
    private authorService: AuthorService,
    private sanitizer: DomSanitizer
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
