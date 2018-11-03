import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/Expense';
import { Income } from '../models/Income';
import { Account } from '../models/Account';
import { Transaction } from '../models/Transaction';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MoneyApiService {

  constructor(private http: HttpClient, private user: UserService) {
    
  }

  headers() {
    let token = this.user.getJwt();
    return new HttpHeaders().set('Accept', 'application/json')
                .set('api-key', environment.api_key)
                .set('Authorization', 'Bearer ' + token);
  }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(environment.api_url + "/expenses", {headers: this.headers()});
  }

  editExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(environment.api_url + "/expenses/" + expense.id, expense, {headers: this.headers()});
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(environment.api_url + "/expenses", expense, {headers: this.headers()});
  }

  deleteExpense(expense): Observable<any> {
    return this.http.delete(environment.api_url + "/expenses/" + expense.id, {headers: this.headers()});
  }

  getIncomes(): Observable<Income[]> {
    return this.http.get<Income[]>(environment.api_url + "/incomes", {headers: this.headers()});
  }

  editIncome(income: Income): Observable<Income> {
    return this.http.put<Income>(environment.api_url + "/incomes/" + income.id, income, {headers: this.headers()});
  }

  addIncome(income: Income): Observable<Income> {
    return this.http.post<Income>(environment.api_url + "/incomes", income, {headers: this.headers()});
  }

  deleteIncome(income): Observable<any> {
    return this.http.delete(environment.api_url + "/incomes/" + income.id, {headers: this.headers()});
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(environment.api_url + "/accounts", {headers: this.headers()});
  }

  editAccount(account: Account): Observable<Account> {
    return this.http.put<Account>(environment.api_url + "/accounts/" + account.id, account, {headers: this.headers()});
  }

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(environment.api_url + "/accounts", account, {headers: this.headers()});
  }

  deleteAccount(account): Observable<any> {
    return this.http.delete(environment.api_url + "/accounts/" + account.id, {headers: this.headers()});
  }

  getTransactions(filters): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(environment.api_url + "/transactions", {headers: this.headers(), params: filters});
  }

  editTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(environment.api_url + "/transactions/" + transaction.id, transaction, {headers: this.headers()});
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(environment.api_url + "/transactions", transaction, {headers: this.headers()});
  }

  deleteTransaction(transaction): Observable<any> {
    return this.http.delete(environment.api_url + "/transactions/" + transaction.id, {headers: this.headers()});
  }

  login(userData): Observable<any> {
    return this.http.post(environment.api_url + "/auth/login", userData, {headers: new HttpHeaders().set('Accept', 'application/json').set('api-key', environment.api_key)});
  }
}
