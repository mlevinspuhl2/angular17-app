import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import Swal from 'sweetalert2'
import { CategoryService } from '../services/category.service';
import { CategoryAddEditComponent } from '../category-add-edit/category-add-edit.component';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService,
    public responsive: BreakpointObserver
  ) { }

  ngOnInit(): void {

    this.responsive
      .observe([Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log(
            'This is the Handset Portrait point at max-width: 599.98 px and portrait orientation.'
          );
        }
      });
    this.getProductList();
  }

  openAddEditCategoryDialog() {
    const dialogRef = this.dialog.open(CategoryAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductList();
        }
      },
    });
  }

  getProductList() {
    this.categoryService.getAll().then(({ data }) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }).catch(error => { return error })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteCategory(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        this.categoryService.delete(id)
          .then(response => {
            Swal.fire({
              icon: 'success',
              title: 'Product deleted successfully!',
              showConfirmButton: false,
              timer: 1500
            })
            this.getProductList()
            return response
          }).catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'An Error Occured!',
              showConfirmButton: false,
              timer: 1500
            })
            return error
          })
      }
    })
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(CategoryAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductList();
        }
      }
    });
  }
}
