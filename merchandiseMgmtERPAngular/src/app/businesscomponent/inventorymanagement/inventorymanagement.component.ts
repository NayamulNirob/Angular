// inventory-management.component.ts  
import { Component, OnInit } from '@angular/core';

import { Product } from "../../model/Product";
import { InventoryService } from '../../services/inventory.service';
import { ProductService } from '../../services/product.service';
import { WarehouseService } from '../../services/warehouse.service';
import { InventoryItem } from '../../model/inventory.item.model';
import { WareHouse } from '../../model/warehouse.model';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventorymanagement.component.html',
  styleUrls: ['./inventorymanagement.component.css']
})
export class InventoryManagementComponent implements OnInit {
  inventories: InventoryItem[] = [];
  warehouses: WareHouse[] = [];
  products: Product[] = [];
  inventory: InventoryItem = new InventoryItem();

  filteredInventory: InventoryItem[] = [];
  searchTerm: string = '';
  sortBy: 'name' | 'stock' | 'price' = 'name';

  constructor(
    private inventoryService: InventoryService,
    private wareHouseService: WarehouseService,
    private productService: ProductService,
    private router:Router

  ) { }

  ngOnInit(): void {

    this.loadInventories();

    this.wareHouseService.getWarehouses().subscribe(data => {
      this.warehouses = data;
    });

    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });

  }

  loadInventories() {
    this.inventoryService.loadInventories().subscribe(data => {
      this.inventories = data;
      this.filteredInventory = data; // Initialize filtered inventory  
    });
  }

  addInventory() {
    this.inventoryService.addInventoryItem(this.inventory).subscribe({
      next: res => {
        console.log('Inventory saved successfully:', res);
        alert('Inventory saved successfully!');
        this.loadInventories();
      },
      error: error => {
        console.log('Error saving inventory:',error);
      }
    });
  }

  
  updateInventoryies(inventoryId: number, ) {  
    this.router.navigate(['Updateinventory',inventoryId]);
}


  filterInventory() {
    this.filteredInventory = this.inventories.filter(item =>
      item.product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteInventory(inventoryId: number,): void {
    if (inventoryId) {
      this.inventoryService.deleteInventoryItem(inventoryId).subscribe(success => {
        if (success) {
          this.loadInventories();
        }
      });
    }
  }



}
