import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../order-list/services/order.service';
import { Order } from 'src/app/models/orderdata';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {
  order: Order;
  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _orderService: OrderService,
  ) { }

  ngOnInit() {
    debugger
    const editOrderId = window.localStorage.getItem('editOrderId');
    if (!editOrderId) {
      alert('Invalid action.');
      this.router.navigate(['orders']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [''],
      orderNumber: ['', Validators.required],
      price: ['', Validators.required],
      amount: ['', Validators.required],
    });

    this._orderService.getOrderById(+editOrderId)
    .subscribe(data => {
      debugger
      this.editForm.patchValue(data);
    });

  }

  onSubmit() {
    const editOrderId = window.localStorage.getItem('editOrderId');
    if (!editOrderId) {
      console.log('No passed from local storage editOrderId');
      alert('No passed from local storage editOrderId');
      this.router.navigate(['orders']);
      return;
    }

    let customerId = 0;
    const orderCustomerId = window.localStorage.getItem('orderCustomerId');
    if (orderCustomerId != null) {
      customerId = +orderCustomerId;

      const order: Order = this.editForm.value;
      order.customerId = customerId;
      this._orderService.updateOrder(order)
        .subscribe(
          data => {
            const orders_local = localStorage.getItem('orders');
            if (orders_local != null) {
              const retrievedorders: Order[] = JSON.parse(orders_local);
              const index = retrievedorders.findIndex(item => item.id === order.id);
              retrievedorders.splice(index, 1);
              retrievedorders.push(order);
              localStorage.setItem('orders', JSON.stringify(retrievedorders));
            }

            alert('Order Updated successfully.');
            this.router.navigate(['/orders', orderCustomerId]);
          },
          error => {
            alert(error);
          }
        );
    } else {
      console.log('No passed from local storage orderCustomerId');
      alert('No passed from local storage orderCustomerId');
      this.router.navigate(['orders']);
      return;
    }
  }
}
