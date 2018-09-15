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
  edit: boolean = false;
  currentExpense: Expense = this.emptyExpense();

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

  editMode(expense: Expense) {
    this.currentExpense = expense;
    this.edit = true;
  }

  cancelEditMode() {
    this.edit =  false;
    this.currentExpense = this.emptyExpense();
  }

  save() {
    if (this.currentExpense.id.length) {
      this.updateCurrent();
    } else {
      this.addCurrent();
    }
  }

  updateCurrent() {
    this.moneyApi.editExpense(this.currentExpense).subscribe(expense => {
      this.expenses = this.expenses.filter(obj => obj.id !== expense.id);
      this.expenses.unshift(expense);
      this.currentExpense = this.emptyExpense();
      this.edit = false;
    });
  }
  
  addCurrent() {
    this.moneyApi.addExpense(this.currentExpense).subscribe(expense => {
      this.expenses.unshift(expense);
      this.currentExpense = this.emptyExpense();
    });
  }

  emptyExpense() {
    let expense = {
      id: "",
      title: ""
    };
    return expense;
  }
}
