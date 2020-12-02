import { Component, OnInit } from '@angular/core';
import { CustomerService } from './services/customer.service';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customerdata';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[];

  constructor(private router: Router, private _customerService: CustomerService) { }

  ngOnInit() {
    this.LoadData();
  }

  LoadData() {
    console.log('LoadData');
    debugger;

    const customers_local = localStorage.getItem('customers');
    if (customers_local) {
      this.customers = JSON.parse(customers_local);
      console.log('localstorage customersList=' + this.customers);
      return;
    }

    this._customerService.getCustomerList()
      .subscribe((customers: Customer[]) => {
        this.customers = customers;
        localStorage.setItem('customers', JSON.stringify(this.customers));
        console.log('getcustomersList=' + this.customers);
      });
  }

  showdetails(id: number) {
    window.localStorage.removeItem('orderCustomerId');
    window.localStorage.setItem('orderCustomerId', id.toString());
    //this.router.navigate(['/orders']);
    this.router.navigate(['/orders', id]);
  }

  editCustomer(customer: Customer) {
    window.localStorage.removeItem('editCustomerId');
    window.localStorage.setItem('editCustomerId', customer.id.toString());
    this.router.navigate(['edit-customer']);
  }

  deleteCustomer(customer: Customer) {
    if (confirm('Are you sure to delete customer ' + customer.firstName + ' ' + customer.lastName + '?' )) {
      this._customerService.deleteCustomer(customer.id)
      .subscribe( data => {
        this.customers = this.customers.filter(u => u !== customer);
        localStorage.setItem('customers', JSON.stringify(this.customers));
      });
    }
  }

  addCustomer() {
    this.router.navigate(['add-customer']);
  }

}
