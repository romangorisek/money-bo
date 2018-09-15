import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/Expense';
import { Income } from '../models/Income';
import { Account } from '../models/Account';

@Injectable({
  providedIn: 'root'
})
export class MoneyApiService {
  headers: any;

  constructor(private http: HttpClient) {
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9tb25leS1hcGkubG9jXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNTM2ODcxNTgzLCJleHAiOjE1NDA0NzE1ODMsIm5iZiI6MTUzNjg3MTU4MywianRpIjoic0tXdTFrYmd5SmZaRXlMdSIsInN1YiI6IjNmZTQ1YzY2LWE3NDctNDUzMC1hZmFkLTVlYjhmNmE5NzJhMyIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.GETEqjn4hQpnqAaHcFFHhDU4pwlyLKiFEIHwitmOyXI";
    this.headers = new HttpHeaders().set('Accept', 'application/json')
                .set('api-key', environment.api_key)
                .set('Authorization', 'Bearer ' + token);
  }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(environment.api_url + "/expenses", {headers: this.headers});
  }

  deleteExpense(expense): Observable<any> {
    return this.http.delete(environment.api_url + "/expenses/" + expense.id, {headers: this.headers});
  }

  getIncomes(): Observable<Income[]> {
    return this.http.get<Income[]>(environment.api_url + "/incomes", {headers: this.headers});
  }

  deleteIncome(income): Observable<any> {
    return this.http.delete(environment.api_url + "/incomes/" + income.id, {headers: this.headers});
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(environment.api_url + "/accounts", {headers: this.headers});
  }

  deleteAccount(account): Observable<any> {
    return this.http.delete(environment.api_url + "/accounts/" + account.id, {headers: this.headers});
  }
}
