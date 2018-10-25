import { Component, OnInit, Input } from '@angular/core';
import { Income } from '../../../models/Income';
import { Expense } from '../../../models/Expense';
import { MoneyApiService } from '../../../services/money-api.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transaction-type-select',
  templateUrl: './transaction-type-select.component.html',
  styleUrls: ['./transaction-type-select.component.css']
})
export class TransactionTypeSelectComponent implements OnInit {
  @Input() small: boolean = false;
  @Input() placeholderText: string = "Tip transakcije";
  @Input() hidePlaceholder: number = 1;
  @Input() fGroup: FormGroup;
  incomes: Income[] = [];
  expenses: Expense[] = [];

  constructor(private moneyApi: MoneyApiService) { }

  ngOnInit() {
    if (typeof this.hidePlaceholder == "string") {
      this.hidePlaceholder = parseInt(this.hidePlaceholder);
    }
    this.moneyApi.getIncomes().subscribe(incomes => this.incomes = incomes);
    this.moneyApi.getExpenses().subscribe(expenses => this.expenses = expenses);
  }

}
