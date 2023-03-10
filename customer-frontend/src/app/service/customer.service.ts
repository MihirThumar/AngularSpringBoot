import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../customer';
import { Token } from '../classes/token';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = {
    getData: "http://localhost:8080/view-customer",
    post: "http://localhost:8080/add-customer",
    put: "http://localhost:8080/update-customer",
    delete: "http://localhost:8080/delete-customer",
    sendToken: "http://localhost:8080/recptcha"
  };

  constructor(private httpclient: HttpClient) { }

  getCustomers(): Observable<any> {
    return this.httpclient.get(`${this.url.getData}`);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.httpclient.get<Customer>(`${this.url.getData}/${id}`);
  }

  createCustomre(customer: Customer): Observable<Object> {
    return this.httpclient.post(`${this.url.post}`, customer);
  }

  updateCustomer(id: number, customer: Customer): Observable<Object> {
    return this.httpclient.put(`${this.url.put}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<Object> {
    return this.httpclient.delete(`${this.url.delete}/${id}`);
  }

  postToken(token: Token): Observable<Object> {
    return this.httpclient.post(`${this.url.sendToken}`, token);
  }

}
