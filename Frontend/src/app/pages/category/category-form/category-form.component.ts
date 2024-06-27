import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/core/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      category: ['', Validators.required],
      sub_category: ['', Validators.required],
    });
  }

  addCategory() {
    console.log(this.categoryForm.value);
    if (this.categoryForm.valid) {
      this.categoryService.addCategory(this.categoryForm.value).subscribe({
        next: (response) => {
          console.log(response);
          Swal.fire({ text: response.message, icon: 'success' });
        },
        error: (error) => {
          Swal.fire({ text: error.error.message, icon: 'error' });
        },
      });
    }
  }
}
