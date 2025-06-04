import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubcategoryService } from '../../services/subcategory.service';
import { SubCategories } from '../../model/subcategoriesmodel';
import { ProductCategory } from '../../model/productcategorymodel';
import { ProductcategoryService } from '../../services/productcategory.service';
import { UserModel } from '../../model/UserModel.1';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.css'
})
export class SubcategoriesComponent implements OnInit{

  subCaterories:SubCategories=new SubCategories();
  newSubCategories:SubCategories[]=[];

  categories:ProductCategory = new ProductCategory();
  listCategories:ProductCategory[]=[];

  constructor(private router:Router,
    private subCategoriesService:SubcategoryService,
    private categoryService:ProductcategoryService,
    protected authService:AuthService
  ){}

  ngOnInit(): void {
    this.loadSubCategories();

    this.categoryService.getProductCatagories().subscribe(data => {
      this.listCategories = data;
    });
  
  }

  loadSubCategories(){
    this.subCategoriesService.loadSubCategories().subscribe({
      next:res=>{
        this.newSubCategories = res;

      },
      error:err=>{
        alert(err)
        console.error(err);
      }

    })
  }


  addSubCategories(): void {
   
      this.subCategoriesService.addSubCategories(this.subCaterories).subscribe({
        next: res => {
          this.subCaterories = new SubCategories();
          this.loadSubCategories();

          this.resetNewSubCategories();
        },
        error: error => {
          console.log(error);
          alert(error);
        }
      });
    
  }

  editSubCategories(subCategoryId: number) {
    this.router.navigate(['', subCategoryId]);
  }

  deleteSubCategoris(subCategoryId: number): void {
    if (subCategoryId) {
      this.subCategoriesService.removeSubCategories(subCategoryId).subscribe(success => {
        if (success) {
          this.loadSubCategories();
        }
      });
    }
  }

  private resetNewSubCategories() {
    this.subCaterories = new SubCategories();
  }



}
