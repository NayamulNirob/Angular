import { Component } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  products: Product[] = [];
  newProduct: Product = new Product();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProductList().subscribe((data) => {
      this.products = data;
      (error: any) => {
        console.error(error);
      }
    });
  }

  addProduct(): void {
    this.productService.createProduct(this.newProduct).subscribe(() => {
      this.loadProducts();
      this.newProduct = new Product();
    });
  }

  editProduct(productId: number): void {
    this.productService.editProduct(productId, this.newProduct).subscribe(() => {
      this.loadProducts();
      this.newProduct = new Product();
    });
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadProducts();
    });
  }

}
