import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorFormComponent } from './author-form/author-form.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorRoutingModule } from './author-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonCellRendererComponent } from 'src/app/shared/cell-renderer/button-cell-renderer/button-cell-renderer.component';
import { AuthorCardComponent } from './author-card/author-card.component';

@NgModule({
  declarations: [AuthorFormComponent, AuthorsComponent, AuthorCardComponent],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    SharedModule,
  ],
})
export class AuthorModule {}
