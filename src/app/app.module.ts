import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderEditComponent } from './components/order-edit/order-edit.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { OrderAddComponent } from './components/order-add/order-add.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerEditComponent,
    OrderListComponent,
    OrderEditComponent,
    HeaderComponent,
    CustomerAddComponent,
    OrderAddComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
