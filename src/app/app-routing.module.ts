import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { OrderEditComponent } from './components/order-edit/order-edit.component';
import { OrderAddComponent } from './components/order-add/order-add.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {
    path: 'customers',
    component : CustomerListComponent
  },
  {
    path: 'add-customer',
    component: CustomerAddComponent,
  },
  {
    path: 'edit-customer',
    component: CustomerEditComponent,
  },
  // {
  //   path: 'orders',
  //   component: OrderListComponent,
  // },
  {
    path: 'orders/:id',
    component: OrderListComponent,
  },
  {
    path: 'edit-order',
    component: OrderEditComponent,
  },
  {
    path: 'add-order',
    component: OrderAddComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  { path: '**', redirectTo: 'customers' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
