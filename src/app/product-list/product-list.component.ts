import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddEditComponent } from '../product-add-edit/product-add-edit.component';
import { ProductService } from '../product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import products from "../../assets/product.json";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'price',
    'color',
    'category',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
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
    //setTimeout(() => {
    //  this.dataSource.paginator = this.paginator
    //  this.dataSource.sort = this.sort
    //}
    //);
    this.getProductList();
  }

  openAddEditProductDialog() {
    const dialogRef = this.dialog.open(ProductAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductList();
        }
      },
    });
  }

  getProductList() {
    var res = products;
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    //  },
    //  error: (err) => {
    //    console.log(err);
    //  },
    //});
  }

  //getProductList() {
  //  this.productService.getProductList().subscribe({
  //    next: (res) => {
  //      this.dataSource = new MatTableDataSource(res);
  //      this.dataSource.sort = this.sort;
  //      this.dataSource.paginator = this.paginator;
  //    },
  //    error: console.log,
  //  });
  //}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProduct(id: number) {
    let confirm = window.confirm("Do you want to delete this product?");
    if (confirm) {
      this.productService.deleteProduct(id).subscribe({
        next: (res) => {
          alert('Product deleted!');
          this.getProductList();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(ProductAddEditComponent, {
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
