import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css'],
})
export class ProductAddEditComponent implements OnInit {
  productForm: FormGroup;
  categories: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<ProductAddEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      color: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchCategoryList();
    this.productForm.patchValue(this.data);
    this.productForm.controls['category'].setValue(this.data.category.id);

  }
  fetchCategoryList() {
    this.categoryService.getAll().then(({ data }) => {
      this.categories = data;
    }).catch(error => { return error })
  }
  onSubmit() {
    if (this.productForm.valid) {
      if (this.data) {
        this.productService
          .update(this.data.id, this.productForm.value)
          .then(({ data }) => {
            Swal.fire({
              icon: 'success',
              title: 'Product details updated!',
              showConfirmButton: false,
              timer: 1500
            })
            this.dialogRef.close(true);
          }).catch(error => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Error while updating the product!',
              showConfirmButton: false,
              timer: 1500
            })
          });
      } else {
        this.productService.create(this.productForm.value).then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Product added successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          this.productForm.reset();
          this.dialogRef.close(true);
        }).catch(error => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Error while adding the product!',
            showConfirmButton: false,
            timer: 1500
          })
        });
      }
    }
  }
}
