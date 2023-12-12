import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.css']
})

export class CategoryAddEditComponent implements OnInit {
  categoryForm: FormGroup;
  categories: any;

  constructor(
   private categoryService: CategoryService,
    private dialogRef: MatDialogRef<CategoryAddEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryForm.patchValue(this.data);
  }
  onSubmit() {
    if (this.categoryForm.valid) {
      if (this.data) {
        this.categoryService
          .update(this.data.id, this.categoryForm.value)
          .then(({ data }) => {
            Swal.fire({
              icon: 'success',
              title: 'Category details updated!',
              showConfirmButton: false,
              timer: 1500
            })
            this.dialogRef.close(true);
          }).catch(error => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Error while updating the category!',
              showConfirmButton: false,
              timer: 1500
            })
          });
      } else {
        this.categoryService.create(this.categoryForm.value).then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Category added successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          this.categoryForm.reset();
          this.dialogRef.close(true);
        }).catch(error => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Error while adding the category!',
            showConfirmButton: false,
            timer: 1500
          })
        });
      }
    }
  }
}

