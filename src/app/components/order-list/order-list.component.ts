import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from './services/order.service';
import { Order } from 'src/app/models/orderdata';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  id: number;
  private sub: any;
  public orders: Order[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _orderService: OrderService)  { }

  ngOnInit() {
    this.LoadData();
  }

  LoadData() {
    debugger;
    console.log('in Order LoadData()');
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });

    const orders_local = localStorage.getItem('orders');
    if (orders_local) {
      this.orders = JSON.parse(orders_local);
      console.log('localstorage ordersList=' + this.orders);
      return;
    }

    if (this.id != null) {
      this._orderService.getOrderList(this.id).pipe()
        .subscribe((orders: Order[]) => {
          this.orders = orders;
          localStorage.setItem('orders', JSON.stringify(this.orders));
          console.log('getOrderList=' + this.orders);
        });
    }
  }

  editOrder(order: Order) {
    window.localStorage.removeItem('editOrderId');
    window.localStorage.setItem('editOrderId', order.id.toString());
    this.router.navigate(['edit-order']);
  }

  deleteOrder(order: Order) {
    if (confirm('Are you sure to delete order ' + order.orderNumber + '?')) {
      this._orderService.deleteOrder(order.id)
        .subscribe(data => {
          this.orders = this.orders.filter(u => u !== order);
          localStorage.setItem('orders', JSON.stringify(this.orders));
        });
    }
  }

  addOrder() {
    this.router.navigate(['add-order']);
  }
}
