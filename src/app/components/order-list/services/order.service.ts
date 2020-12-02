import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Order } from 'src/app/models/orderdata';
import { orders } from './order-demo-data';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = 'http://localhost:50223/';
  constructor(private http: HttpClient) { }

  getOrderList(customerId: number): Observable<Order[]> {
    return of(orders.filter(d => d.customerId === customerId));
    //return this.http.get<Order[]>(this.baseUrl + 'api/ListOrders').pipe(map(res => res));
  }

  getOrderById(id: number): Observable<Order> {
    return of(orders.find(d => d.id === id));
    //return this.http.get<Order>(this.baseUrl + id);
  }


  updateOrder(order: Order): Observable<Order> {
    const index = orders.findIndex(item => item.id === order.id);
    orders[index] = order;
    return of(order);
    //return this.http.put<Order>(this.baseUrl + order.id, order);
  }

  deleteOrder(id: number): Observable<Order[]> {
    const index = orders.findIndex(item => item.id === id);
    return of(orders.splice(index, 1));
    //return of(orders.filter(d => d.id !== id));
    //return this.http.delete<Order>(this.baseUrl + id);
  }

  addOrder(order: Order): Observable<Order> {
    const v   = orders.map( x => {
      return x.id;
    });
    const orderMaxId = Math.max(...v);

    order.id =   (orders.length === 0) ? 1 : orderMaxId + 1;
    orders.push(order);
    return of(order);
    //return this.http.post<Order>(this.baseUrl, Order);
  }
}
