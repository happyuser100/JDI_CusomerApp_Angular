import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from 'src/app/models/customerdata';
import { customers } from './customer-demo-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl = 'http://localhost:50223/';
  constructor(private http: HttpClient) { }

  getCustomerList(): Observable<Customer[]> {
    return of(customers);
    //return this.http.get<Customer[]>(this.baseUrl + 'api/ListCustomers').pipe(map(res => res));
  }

  getCustomerById(id: number): Observable<Customer> {
    return of(customers.find(d => d.id === id));
    //return this.http.get<Customer>(this.baseUrl + id);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    const index = customers.findIndex(item => item.id === customer.id);
    customers[index] = customer;
    return of(customer);
    //return this.http.put<Customer>(this.baseUrl + customer.id, customer);
  }

  deleteCustomer(id: number): Observable<Customer[]> {
    const index = customers.findIndex(item => item.id === id);
    return of(customers.splice(index, 1));
    //return of(customers.filter(d => d.id !== id));
    //return this.http.delete<Customer>(this.baseUrl + id);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    const v   = customers.map( x => {
      return x.id;
    });
    const customerMaxId = Math.max(...v);

    customer.id =   (customers.length === 0) ? 1 : customerMaxId;
    customers.push(customer);
    return of(customer);
    //return this.http.post<Customer>(this.baseUrl, customer);
  }

}
