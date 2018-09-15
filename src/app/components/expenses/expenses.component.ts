import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/Expense';
import { MoneyApiService } from '../../services/money-api.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  expenses: Expense[] = [];

  constructor(private moneyApi: MoneyApiService) { }

  ngOnInit() {
    this.moneyApi.getExpenses().subscribe(expenses => this.expenses = expenses);
  }

  deleteExpense(expense: Expense) {
    this.moneyApi.deleteExpense(expense).subscribe(response => {
      if (response.success) {
        this.expenses = this.expenses.filter(obj => obj !== expense);
      }
    });
  }

}
