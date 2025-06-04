import { Component, OnInit } from '@angular/core';
import { Product } from "../../model/Product";
import { ProductCategory } from '../../model/productcategorymodel';
import { ProductcategoryService } from '../../services/productcategory.service';
import { Router } from '@angular/router';
import { UserModel } from '../../model/UserModel.1';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.component.html',
  styleUrl: './productcategory.component.css'
})
export class ProductcategoryComponent implements OnInit {

  categories: ProductCategory[] = [];
  newCategory: ProductCategory = new ProductCategory();

  selectedFile: File | null = null;

  constructor(private categoriesService: ProductcategoryService,
    private router: Router,
    protected authService:AuthService
  ) {

  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoriesService.getProductCatagories().subscribe({
      next: res => {
        this.categories = res;
      },
      error: error => {
        console.log(error);
        alert(error);
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }



  addProductCategories() {
    if (this.selectedFile) {
      this.categoriesService.createProductCategory(this.newCategory,this.selectedFile).subscribe({
        next: res => {
          console.log(this.newCategory);
          this.newCategory = new ProductCategory();
          this.loadCategories();
        },
        error: error => {
          console.log(error);
          alert(error);
        }
      });
    }
    else{
      alert('Please Select an image');
    }

  }


  editProductCategory(categoryId: number) {
    this.router.navigate(['', categoryId]);

  }

  


  deleteProductCategory(categoryId: number): void {
    if (categoryId) {
      this.categoriesService.deleteProductCategory(categoryId).subscribe(success => {
        if (success) {
          this.loadCategories();
        }
      });
    }
  }

 





  
  




}
