import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { FeedComponent } from './feed/feed.component';

const routes: Routes = [
  { path: 'add-post', component: AddPostComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'edit-post/:id', component: AddPostComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
