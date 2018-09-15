import { Component, OnInit } from '@angular/core';
import { Income } from '../../models/Income';
import { MoneyApiService } from '../../services/money-api.service';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.css']
})
export class IncomesComponent implements OnInit {
  incomes: Income[] = [];

  constructor(private moneyApi: MoneyApiService) { }

  ngOnInit() {
    this.moneyApi.getIncomes().subscribe(incomes => this.incomes = incomes);
  }

  deleteIncome(income: Income) {
    this.moneyApi.deleteIncome(income).subscribe(response => {
      if (response.success) {
        this.incomes = this.incomes.filter(obj => obj !== income);
      }
    });
  }

}
