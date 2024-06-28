import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from 'src/app/core/interface/IPosts';
import { PostService } from 'src/app/core/service/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  allPosts!: IPost[];

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postService.getAllPost().subscribe({
      next: (response) => {
        this.allPosts = response.data;
      },
      error: (error) => {
        Swal.fire({ text: error.error.message, icon: 'error' });
      },
    });
  }

  onEdit(id: string) {
    this.router.navigate([`/posts/edit-post/${id}`]);
  }

  onDelete(id: string) {
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
        this.postService.delete(id).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Deleted!',
              text: response.message,
              icon: 'success',
            });
            this.router.navigate(['/posts/feed']);
          },
          error: (error) => {
            Swal.fire({ text: error.error.message, icon: 'error' });
          },
        });
      }
    });
  }
}
