import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Transaction } from 'src/app/models/Transaction';
import { Income } from 'src/app/models/Income';
import { Expense } from 'src/app/models/Expense';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MoneyApiService } from 'src/app/services/money-api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {
  @Input() currentTransaction: Transaction;
  @Input() incomes: Income[];
  @Input() expenses: Expense[];
  addTransactionForm: FormGroup;
  addTransactionPost: any;
  amountType: string = "";
  @Output()saved = new EventEmitter();

  constructor(private fb: FormBuilder, private moneyApi: MoneyApiService) {
    this.addTransactionForm = fb.group({
      'id': new FormControl(null),
      'type_id': new FormControl(""),
      'account_id': new FormControl(""),
      'done_on': new FormControl(moment()),
      'amount': new FormControl("")
    });
    this.addTransactionForm.controls['type_id'].valueChanges.subscribe((id) => {
      if (this.isIncome(id)) {
        this.amountType = "border-success text-success";
      } else if (this.isExpense(id)) {
        this.amountType = "border-danger text-danger";
      }
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.currentTransaction.id.length) {
      this.currentTransaction.done_on = moment(this.currentTransaction.done_on);
      this.addTransactionForm.setValue(this.parseData(this.currentTransaction));
    }
  }

  save(data) {
    if (data.id !== null) {
      this.updateTransaction(data);
    } else {
      this.addTransaction(data);
    }
  }

  updateTransaction(formData) {
    this.moneyApi.editTransaction(this.parseDataForApi(formData)).subscribe(transaction => {
      if (!('error' in transaction)) {
        this.saved.emit('saved');
      }
    });
  }

  addTransaction(formData) {
    this.moneyApi.addTransaction(this.parseDataForApi(formData)).subscribe(transaction => {
      if (!('error' in transaction)) {
        this.saved.emit('saved');
        this.emptyTransaction();
      }
    });
  }

  private parseData(formData:any): Transaction {
    if (typeof formData.done_on === "string") formData.done_on = moment(formData.done_on);
    return {
      id: formData.id,
      done_on: formData.done_on.format('YYYY-MM-DD h:mm:ss'),
      amount: Math.abs(formData.amount),
      type_id: formData.type_id,
      account_id: formData.account_id
    };
  }

  private parseDataForApi(data) {
    data = this.parseData(data);
    if (this.isExpense(data.type_id)) {
      data.amount = -data.amount;
    }
    return data;
  }

  emptyTransaction() {
    this.amountType = "";
    this.addTransactionForm.setValue({
      id: null,
      done_on: moment(),
      amount: null,
      type_id: "",
      account_id: ""
    });
  }

  isIncome(id) {
    let result = false;
    this.incomes.forEach(element => {
      if (element.id == id) {
        result = true;
      }
    });
    return result;
  }

  isExpense(id) {
    let result = false;
    this.expenses.forEach(element => {
      if (element.id == id) {
        result = true;
      }
    });
    return result;
  }
}
