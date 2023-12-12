import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css'],
})
export class ProductAddEditComponent implements OnInit {
  productForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private productService: ProductService,
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
    this.productForm.patchValue(this.data);
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
