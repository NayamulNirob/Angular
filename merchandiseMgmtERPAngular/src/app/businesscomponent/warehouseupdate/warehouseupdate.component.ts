import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../../services/warehouse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WareHouse } from '../../model/warehouse.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-warehouseupdate',
  templateUrl: './warehouseupdate.component.html',
  styleUrl: './warehouseupdate.component.css'
})
export class WarehouseupdateComponent implements OnInit{

  wareHouseId!: number;
  // product!: Product | null;
  errorMessage: string = '';
  wareHouse:WareHouse=new WareHouse();
  

  constructor(
    private wareHouseService:WarehouseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.wareHouseId = this.route.snapshot.params['id'];
    console.log(this.wareHouseId)
    this.loadWareHouse();

  }

  loadWareHouse() {
    this.wareHouseService.getWarehousesById(this.wareHouseId).subscribe({
      next: response => {
        this.wareHouse = response;
        console.log(this.wareHouse);
      },
      error: error => {
        console.log(error)
        this.errorMessage = 'Could not load Warehouse';
      }
    })
  }



  updateWareHouse(): void {
    if (this.wareHouse) {
      this.wareHouseService.editWarehouses(this.wareHouseId, this.wareHouse).subscribe({
        next: () => this.router.navigate(['/warehouseview']), 
        error: (error: HttpErrorResponse) => {
          this.errorMessage = 'An error occurred while updating the WareHouse';
        }
      });
    }
  }

}
