import { Component, OnInit } from '@angular/core';
import { Product } from "../../model/Product";
import { Supplier } from "../../model/Supplier";
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { SubCategories } from '../../model/subcategoriesmodel';
import { SubcategoryService } from '../../services/subcategory.service';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-producmanagement',
  templateUrl: './producmanagement.component.html',
  styleUrls: ['./producmanagement.component.css']
})
export class ProducmanagementComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  newProduct: Product = new Product();
 
  

  subCategories:SubCategories[]=[];
 
  searchTerm: string = '';
  sortBy: string = 'name'; 

  suppliers: Supplier[] = [];
 


  selectedFile: File | null = null;




  constructor(private productService: ProductService,
  private router: Router,
  private subCategoryService:SubcategoryService,
  private supplierService:SupplierService ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.subCategoryService.loadSubCategories().subscribe({
      next:res=>{
        this.subCategories=res;
      },
      error:err=>{
        alert(err);
        console.log(err);
      }
    });
    this.supplierService.loadSuppliers().subscribe({
      next:res=>{
        this.suppliers=res
      },
      error:err=>{
        alert(err);
        console.log(err);

      }
    })
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: res => {
        this.products = res;
        this.filterAndSortProducts();
      },
      error: error => {
        console.log(error);
        alert(error);
      }
    });
  }

  filterProducts(): void {
    this.filterAndSortProducts();
  }

  filterAndSortProducts(): void {
    // Filter the products based on the search term
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Sort the filtered products based on the selected sort criteria
    this.sortProducts();
  }

  sortProducts(): void {
    this.filteredProducts.sort((a, b) => {
      const aValue = a[this.sortBy as keyof Product];
      const bValue = b[this.sortBy as keyof Product];

      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });
  }




  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }



  addProduct(): void {
    if (this.selectedFile) {
      this.productService.createProduct(this.newProduct, this.selectedFile).subscribe({
        next: res => {
          alert('Product Addes Succesfully');
          this.newProduct = new Product();
          this.loadProducts();
          this.resetNewProducts();
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

  editProduct(productId: number) {
    this.router.navigate(['updateproduct', productId]);
  }

  deleteProduct(productId: number): void {
    if (productId) {
      this.productService.deleteProduct(productId).subscribe(success => {
        if (success) {
          this.loadProducts();
        }
      });
    }
  }

  calculateTotalAmount(): number {
    const total = this.newProduct.price * this.newProduct.quantity;
    const taxAmount = (total * this.newProduct.tax) / 100;
    return total + taxAmount;
  }

  private resetNewProducts() {
    this.newProduct = new Product();
  }

 
}
