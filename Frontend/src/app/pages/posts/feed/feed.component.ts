import { Component, OnInit } from '@angular/core';
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

  constructor(private postService: PostService) {}

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
}
