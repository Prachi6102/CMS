import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BooksModule } from './books/books.module';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';

@NgModule({
  declarations: [HomeComponent, ProfileComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    BooksModule,
    AuthorModule,
    CategoryModule,
    UserModule,
    PostsModule,
  ],
})
export class PagesModule {}
