import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/Transaction';
import { MoneyApiService } from '../../services/money-api.service';
import { Income } from '../../models/Income';
import { Expense } from '../../models/Expense';
import { Account } from '../../models/Account';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentTransaction: Transaction = this.emptyTransaction();
  filterForm: FormGroup;
  filterPost: any;
  edit: boolean = false;
  transactions: Transaction[] = [];
  incomes: Income[] = [];
  expenses: Expense[] = [];
  accounts: Account[] = [];

  constructor(private moneyApi: MoneyApiService, private fb: FormBuilder) {
    this.filterForm = fb.group({
      'start': new FormControl(moment().startOf('month')),
      'end': new FormControl(moment().endOf('month')),
      'account_id': new FormControl(""),
      'type_id': new FormControl("")
    });
  }

  ngOnInit() {
    this.moneyApi.getIncomes().subscribe(incomes => this.incomes = incomes);
    this.moneyApi.getExpenses().subscribe(expenses => this.expenses = expenses);
    this.moneyApi.getAccounts().subscribe(accounts => this.accounts = accounts);
    this.getInitialTransactions();
  }

  getInitialTransactions() {
    let filters = {
      start: moment().startOf('month').format("YYYY-MM-DD 23:59:59"),
      end: moment().endOf('month').format("YYYY-MM-DD 23:59:59")
    }
    this.moneyApi.getTransactions(filters).subscribe(transactions => this.transactions = transactions);
  }

  filterDashboard(filters) {
    this.moneyApi.getTransactions(this.parseFilters(filters)).subscribe(transactions => this.transactions = transactions);
  }

  parseFilters(filters) {
    if (typeof filters.start !== "undefined") {
      if (typeof filters.start === "string") filters.start = moment(filters.start);
      filters.start = filters.start.format("YYYY-MM-DD 23:59:59");
    }
    if (typeof filters.end !== "undefined") {
      if (typeof filters.end === "string") filters.end = moment(filters.end);
      filters.end = filters.end.format("YYYY-MM-DD 23:59:59");
    }
    if (typeof filters.type_id !== "undefined") {
      filters.transactionType = filters.type_id;
      delete filters.type_id;
    }
    if (typeof filters.account_id !== "undefined") {
      filters.account = filters.account_id;
      delete filters.account_id;
    }
    return filters;
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
