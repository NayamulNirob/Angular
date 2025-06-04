import { Component, OnInit } from '@angular/core';
import { Product } from "../../model/Product";
import { Supplier } from "../../model/Supplier";
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SubCategories } from '../../model/subcategoriesmodel';
import { SubcategoryService } from '../../services/subcategory.service';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-updateproductmanagement',
  templateUrl: './updateproductmanagement.component.html',
  styleUrl: './updateproductmanagement.component.css'
})
export class UpdateproductmanagementComponent implements OnInit {

  productId!: number;
  errorMessage: string = '';
  product:Product =new Product();
  subCategories:SubCategories[]=[];
  supplier:Supplier[]=[];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private subCateroyService:SubcategoryService,
    private supplierService:SupplierService
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    console.log(this.productId)
    this.loadProduct();
    this.subCateroyService.loadSubCategories().subscribe({
      next:res=>{
        this.subCategories=res
      },
      error:err=>{
        console.log(err)
      }

    });
    this.supplierService.loadSuppliers().subscribe({
      next:res=>{
        this.supplier=res
      },
      error:err=>{
        console.log(err)
      }
    })

  }

  loadProduct() {
    this.productService.getProductById(this.productId).subscribe({
      next: response => {
        this.product = response;
        console.log(this.product);
      },
      error: error => {
        console.log(error)
        this.errorMessage = 'Could not load product';
      }
    })
  }



  updateProduct(): void {
    if (this.product) {
      this.productService.editProduct(this.productId, this.product).subscribe({
        next: () => this.router.navigate(['/product']),  // Redirect after successful update  
        error: (error: HttpErrorResponse) => {
          this.errorMessage = 'An error occurred while updating the product';
        }
      });
    }
  }





}
