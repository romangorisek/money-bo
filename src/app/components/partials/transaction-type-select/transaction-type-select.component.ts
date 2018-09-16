import { Component, OnInit, Input } from '@angular/core';
import { Income } from '../../../models/Income';
import { Expense } from '../../../models/Expense';
import { MoneyApiService } from '../../../services/money-api.service';

@Component({
  selector: 'app-transaction-type-select',
  templateUrl: './transaction-type-select.component.html',
  styleUrls: ['./transaction-type-select.component.css']
})
export class TransactionTypeSelectComponent implements OnInit {
  @Input() small: boolean = false;
  incomes: Income[] = [];
  expenses: Expense[] = [];

  constructor(private moneyApi: MoneyApiService) { }

  ngOnInit() {
    this.moneyApi.getIncomes().subscribe(incomes => this.incomes = incomes);
    this.moneyApi.getExpenses().subscribe(expenses => this.expenses = expenses);
  }

}
