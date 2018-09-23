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
  edit: boolean = false;
  currentIncome: Income = this.emptyIncome();

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

  editMode(income: Income) {
    this.currentIncome = income;
    this.edit = true;
  }

  cancelEditMode() {
    this.edit =  false;
    this.currentIncome = this.emptyIncome();
  }

  save() {
    if (this.currentIncome.id.length) {
      this.updateCurrent();
    } else {
      this.addCurrent();
    }
  }

  updateCurrent() {
    this.moneyApi.editIncome(this.currentIncome).subscribe(income => {
      this.incomes = this.incomes.filter(obj => obj.id !== income.id);
      this.incomes.unshift(income);
      this.currentIncome = this.emptyIncome();
      this.edit = false;
    });
  }
  
  addCurrent() {
    this.moneyApi.addIncome(this.currentIncome).subscribe(income => {
      this.incomes.unshift(income);
      this.currentIncome = this.emptyIncome();
    });
  }

  emptyIncome(): Income {
    let emptyIncome = {
      id: "",
      title: ""
    };
    return emptyIncome;
  }
}
