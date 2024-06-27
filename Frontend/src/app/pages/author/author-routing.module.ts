import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorFormComponent } from './author-form/author-form.component';
import { AuthorCardComponent } from './author-card/author-card.component';
import { roleGuard } from 'src/app/core/guard/role.guard';

const routes: Routes = [
  { path: 'authors', component: AuthorsComponent },
  { path: 'add-author', component: AuthorFormComponent },
  {
    path: 'update-author/:id',
    component: AuthorFormComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'Admin' },
  },
  { path: 'user/authors', component: AuthorCardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorRoutingModule {}
