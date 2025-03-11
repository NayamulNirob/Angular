import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './design/navbar/navbar.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {path:"navbar",component:NavbarComponent},
  {path:"productdata",component:ProductComponent},
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
