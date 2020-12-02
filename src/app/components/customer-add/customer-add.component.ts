import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../customer-list/services/customer.service';
import { Customer } from 'src/app/models/customerdata';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

  customer: Customer;
  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _customerService: CustomerService
  ) { }


  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  onSubmit() {
    debugger
    const customer: Customer = this.addForm.value;
    this._customerService.addCustomer(customer)
      .subscribe(
        data => {
          const customers_local = localStorage.getItem('customers');
          if (customers_local != null) {
            const retrievedCustomers: Customer[] = JSON.parse(customers_local);
            retrievedCustomers.push(customer);
            localStorage.setItem('customers', JSON.stringify(retrievedCustomers));
          }

          alert('Customer Added successfully.');
          this.router.navigate(['customers']);
        },
        error => {
          alert(error);
        }
      );
  }
}
