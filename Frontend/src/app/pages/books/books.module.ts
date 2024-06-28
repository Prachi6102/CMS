import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books/books.component';
import { AddBookComponent } from './add-book/add-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BooksComponent, AddBookComponent],
  imports: [CommonModule, BooksRoutingModule, FormsModule, ReactiveFormsModule],
})
export class BooksModule {}
