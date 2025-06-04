import { Component, OnInit } from '@angular/core';
import { InventoryItem } from '../../model/inventory.item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-inventory',
  templateUrl: './update-inventory.component.html',
  styleUrl: './update-inventory.component.css'
})
export class UpdateInventoryComponent implements OnInit{

 inventoryId!: number;
  errorMessage: string = '';
  inventory:InventoryItem=new InventoryItem();
  inventories: InventoryItem[] = []; 
  

  constructor(
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.inventoryId = this.route.snapshot.params['id'];
    console.log(this.inventoryId)
    this.loadInventories();

  }

  loadInventories() {
    this.inventoryService.getInventoriesById(this.inventoryId).subscribe({
      next: response => {
        this.inventory = response;
        console.log(this.inventoryId);
      },
      error: error => {
        console.log(error)
        this.errorMessage = 'Could not load supplier';
      }
    })
  }



  updateinventory(): void {
    if (this.inventory) {
      this.inventoryService.updateInventoryies(this.inventoryId, this.inventory).subscribe({
        next: () => this.router.navigate(['/inventory']), 
        error: (error: HttpErrorResponse) => {
          this.errorMessage = 'An error occurred while updating the supplier';
        }
      });
    }
  }

}
