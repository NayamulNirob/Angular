import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProducmanagementComponent } from './businesscomponent/productmanagement/producmanagement.component';
import { InventoryManagementComponent } from './businesscomponent/inventorymanagement/inventorymanagement.component';
import { OrdermanagementComponent } from './businesscomponent/ordermanagement/ordermanagement.component';
import { SupplierManagementComponent } from './businesscomponent/suppliermanagement/suppliermanagement.component';
import { SalesManagementComponent } from './businesscomponent/salesmanagement/salesmanagement.component';
import { CustomerManagementComponent } from './businesscomponent/customermanagement/customermanagement.component';
import { ReportsAnalyticsComponent } from './businesscomponent/reports-and-analytics/reports-and-analytics.component';
import { UpdateproductmanagementComponent } from './businesscomponent/updateproductmanagement/updateproductmanagement.component';
import { AuthguardGuard } from './guard/authguard.guard';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { RoleGuard } from './guard/role.guard';
import { WarehouseviewComponent } from './businesscomponent/warehouseview/warehouseview.component';
import { WarehouseupdateComponent } from './businesscomponent/warehouseupdate/warehouseupdate.component';
import { SupplierUpdateComponent } from './businesscomponent/supplier-update/supplier-update.component';
import { UpdateInventoryComponent } from './businesscomponent/update-inventory/update-inventory.component';
import { UpdatecustomerComponent } from './businesscomponent/updatecustomer/updatecustomer.component';
import { ProductcategoryComponent } from './businesscomponent/productcategory/productcategory.component';
import { SubcategoriesComponent } from './businesscomponent/subcategories/subcategories.component';
import { CountryComponent } from './businesscomponent/country/country.component';
import { StockmanagementComponent } from './businesscomponent/stockmanagement/stockmanagement.component';
import { TransactionmanagementComponent } from './businesscomponent/transactionmanagement/transactionmanagement.component';
import { TodotaskComponent } from './businesscomponent/todotask/todotask.component';
import { DashboarduserComponent } from './dashboarduser/dashboarduser.component';


const routes: Routes = [
  { path: 'dashbord', component: DashbordComponent ,
    canActivate: [AuthguardGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  { path: 'userdashboard', component: DashboarduserComponent ,
    canActivate: [AuthguardGuard, RoleGuard],
    data: { roles: ['USER'] }
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'product',
    component: ProducmanagementComponent,
    canActivate: [AuthguardGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },

  { path: 'inventory', component: InventoryManagementComponent, canActivate: [AuthguardGuard] },

  { path: 'orders', component: OrdermanagementComponent,  
    canActivate: [AuthguardGuard, RoleGuard],
    data: { roles: ['ADMIN'] }},

  { path: 'supplier', component: SupplierManagementComponent, canActivate: [AuthguardGuard] },

  { path: 'sales', component: SalesManagementComponent,  
    canActivate: [AuthguardGuard, RoleGuard],
    data: { roles: ['ADMIN'] } },

  { path: 'customer', component: CustomerManagementComponent, canActivate: [AuthguardGuard] },

  { path: 'reports', component: ReportsAnalyticsComponent, canActivate: [AuthguardGuard] },
  
  { path: 'userProfile', component: UserprofileComponent, canActivate: [AuthguardGuard] },

  { path: 'updateproduct/:id', 
    component: UpdateproductmanagementComponent, 
    canActivate: [AuthguardGuard, RoleGuard],
    data: { roles: ['ADMIN'] } },

  { path: 'warehouseview', component: WarehouseviewComponent },

  { path: 'updatewarehouse/:id', component: WarehouseupdateComponent,
    canActivate: [AuthguardGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  { path: 'updatesupplier/:id', component: SupplierUpdateComponent ,
    canActivate: [AuthguardGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  { path: 'Updateinventory/:id', component: UpdateInventoryComponent,
    canActivate: [AuthguardGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
   },
  { path: 'updatecustomer/:id', component: UpdatecustomerComponent ,
    canActivate: [AuthguardGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  { path: 'category', component: ProductcategoryComponent },
  { path: 'subcategory', component: SubcategoriesComponent },
  { path: 'country', component: CountryComponent },

  { path: 'stock', component: StockmanagementComponent,  
    canActivate: [AuthguardGuard, RoleGuard],
    data: { roles: ['ADMIN'] }},

  { path: 'transaction', component: TransactionmanagementComponent , 
    canActivate: [AuthguardGuard, RoleGuard],
    data: { roles: ['ADMIN'] }},

  { path: 'task', component: TodotaskComponent , 
    canActivate: [AuthguardGuard, RoleGuard],
    data: { roles: ['ADMIN'] }},
  

  {
    path: 'userProfile',
    component: UserprofileComponent,
    canActivate: [AuthguardGuard, RoleGuard],
    data: { roles: ['ADMIN', 'USER'] }
  },

  { path: "**", redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
