import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../order-list/services/order.service';
import { Order } from 'src/app/models/orderdata';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss']
})
export class OrderAddComponent implements OnInit {
  order: Order;
  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _orderService: OrderService,
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [''],
      orderNumber: ['', Validators.required],
      price: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  onSubmit() {
    let customerId = 0;
    const orderCustomerId = window.localStorage.getItem('orderCustomerId');
    if (orderCustomerId != null) {
      customerId = +orderCustomerId;

      const order: Order = this.addForm.value;
      order.customerId = customerId;
      this._orderService.addOrder(order)
        .subscribe(
          data => {
            const orders_local = localStorage.getItem('orders');
            if (orders_local != null) {
              const retrievedorders: Order[] = JSON.parse(orders_local);
              retrievedorders.push(order);
              localStorage.setItem('orders', JSON.stringify(retrievedorders));
            }
            alert('Order Added successfully.');
            this.router.navigate(['/orders', orderCustomerId]);
          },
          error => {
            alert(error);
          }
        );
    } else {
      console.log('No passed from local storage orderCustomerId');
    }
  }
}
