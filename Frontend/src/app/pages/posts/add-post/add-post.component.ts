import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import Quill from 'quill';
import { PostService } from 'src/app/core/service/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  constructor(private postService: PostService, private router: Router) {}

  @ViewChild('editorContainer', { static: true })
  editorContainer: ElementRef | null = null;

  editor: Quill | undefined;

  ngOnInit() {
    console.log('ngOnInit called!');

    if (this.editorContainer) {
      try {
        this.editor = new Quill(this.editorContainer.nativeElement, {
          modules: {
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image', 'video'],
              [{ align: [] }],
              [{ color: [] }, { background: [] }],
              ['clean'],
            ],
          },
          theme: 'snow',
        });
      } catch (error) {
        console.error('Error creating Quill editor:', error);
      }
    } else {
      console.error('Element with #editorContainer not found!');
    }
  }

  getEditorContent() {
    if (this.editor) {
      this.postService
        .addPost({ content: this.editor.root.innerHTML })
        .subscribe({
          next: (response) => {
            Swal.fire({ text: response.message, icon: 'success' });
            this.router.navigate(['/posts/feed']);
          },
          error: (error) => {
            Swal.fire({ text: error.error.message, icon: 'error' });
          },
        });
    }
  }
}
