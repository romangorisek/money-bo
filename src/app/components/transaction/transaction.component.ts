import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/Transaction';
import { Income } from 'src/app/models/Income';
import { Expense } from 'src/app/models/Expense';
import { Account } from 'src/app/models/Account';
import { MoneyApiService } from 'src/app/services/money-api.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  currentTransaction: Transaction = this.emptyTransaction();
  incomes: Income[] = [];
  expenses: Expense[] = [];
  accounts: Account[] = [];

  constructor(private moneyApi: MoneyApiService) { }

  ngOnInit() {
    this.moneyApi.getIncomes().subscribe(incomes => this.incomes = incomes);
    this.moneyApi.getExpenses().subscribe(expenses => this.expenses = expenses);
    this.moneyApi.getAccounts().subscribe(accounts => this.accounts = accounts);
  }

  emptyTransaction(): Transaction {
    let transaction = {
      id: "",
      done_on: null,
      amount: null,
      type_id: "",
      account_id: ""
    }
    return transaction;
  }
}
