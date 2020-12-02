import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customerdata';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../customer-list/services/customer.service';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  customer: Customer;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private _customerService: CustomerService
  ) {

  }

  ngOnInit() {
    debugger
    const editCustomerId = window.localStorage.getItem('editCustomerId');
    if (!editCustomerId) {
      alert('Invalid action.');
      this.router.navigate(['customers']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });

    this._customerService.getCustomerById(+editCustomerId)
      .subscribe(data => {
        debugger
        this.editForm.patchValue(data);
      });
  }

  onSubmit() {
    debugger
    const customer: Customer = this.editForm.value;
    this._customerService.updateCustomer(customer)
      .pipe(first())
      .subscribe(
        data => {
          const customers_local = localStorage.getItem('customers');
          if (customers_local != null) {
            const retrievedCustomers: Customer[] = JSON.parse(customers_local);
            const index = retrievedCustomers.findIndex(item => item.id === customer.id);
            retrievedCustomers.splice(index, 1);
            retrievedCustomers.push(customer);
            localStorage.setItem('customers', JSON.stringify(retrievedCustomers));
          }
          alert('Customer updated successfully.');
          this.router.navigate(['customers']);
        },
        error => {
          alert(error);
        }
      );
  }

}
