import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/core/interface';
import { CategoryService } from 'src/app/core/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  fiction!: ICategory[];
  nonFiction!: ICategory[];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories('Fiction').subscribe({
      next: (response) => {
        this.fiction = response.data;
      },
      error: (error) => {
        Swal.fire({ text: error.error.message, icon: 'error' });
      },
    });

    this.categoryService.getCategories('Non-Fiction').subscribe({
      next: (response) => {
        this.nonFiction = response.data;
      },
      error: (error) => {
        Swal.fire({ text: error.error.message, icon: 'error' });
      },
    });
  }
}
