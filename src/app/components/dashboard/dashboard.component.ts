import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/Transaction';
import { MoneyApiService } from '../../services/money-api.service';
import { Income } from '../../models/Income';
import { Expense } from '../../models/Expense';
import { Account } from '../../models/Account';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentTransaction: Transaction = this.emptyTransaction();
  edit: boolean = false;
  transactions: Transaction[] = [];
  incomes: Income[] = [];
  expenses: Expense[] = [];
  accounts: Account[] = [];
  start: any = "1.9.2018";
  end: any = "26.9.2018";

  constructor(private moneyApi: MoneyApiService) { }

  ngOnInit() {
    this.moneyApi.getIncomes().subscribe(incomes => this.incomes = incomes);
    this.moneyApi.getExpenses().subscribe(expenses => this.expenses = expenses);
    this.moneyApi.getAccounts().subscribe(accounts => this.accounts = accounts);
    this.moneyApi.getTransactions().subscribe(transactions => this.transactions = transactions);
  }

  deleteTransaction(transaction: Transaction) {
    this.moneyApi.deleteTransaction(transaction).subscribe(response => {
      if (response.success) {
        this.transactions = this.transactions.filter(obj => obj !== transaction);
      }
    });
  }

  editMode(transaction: Transaction) {
    this.currentTransaction = transaction;
    this.edit = true;
    $("#addTransactionModal").modal('show');
  }

  cancelEditMode() {
    this.edit =  false;
    this.currentTransaction = this.emptyTransaction();
  }

  save() {
    if (this.currentTransaction.id.length) {
      this.updateCurrent();
    } else {
      this.addCurrent();
    }
  }

  updateCurrent() {
    this.moneyApi.editTransaction(this.currentTransaction).subscribe(transaction => {
      this.transactions = this.transactions.filter(obj => obj.id !== transaction.id);
      this.transactions.unshift(transaction);
      this.currentTransaction = this.emptyTransaction();
      this.edit = false;
    });
  }
  
  addCurrent() {
    this.moneyApi.addTransaction(this.currentTransaction).subscribe(transaction => {
      this.transactions.unshift(transaction);
      this.currentTransaction = this.emptyTransaction();
    });
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

  getTransactionTypeNameById(id: string): string {
    let title = "Razlog ne obstaja";
    this.incomes.forEach(element => {
      if (element.id == id) {
        title = element.title;
      }
    });
    this.expenses.forEach(element => {
      if (element.id == id) {
        title = element.title;
      }
    });
    return title;
  }

  getAccountNameById(id: string): string {
    let title = "Račun ne obstaja";
    this.accounts.forEach(element => {
      if (element.id == id) {
        title = element.title;
      }
    });
    return title;
  }
}
