import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Transaction } from '../../../models/Transaction';
import { Income } from 'src/app/models/Income';
import { Expense } from 'src/app/models/Expense';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
declare const $: any;

@Component({
  selector: 'app-add-transaction-modal',
  templateUrl: './add-transaction-modal.component.html',
  styleUrls: ['./add-transaction-modal.component.css']
})
export class AddTransactionModalComponent implements OnInit {
  @ViewChild(TransactionFormComponent) transactionForm:TransactionFormComponent;
  @Input() currentTransaction: Transaction;
  @Input() incomes: Income[];
  @Input() expenses: Expense[];
  
  constructor() { }

  ngOnInit() {
    this.activateModal();
  }

  activateModal() {
    let that = this;
    $('#addTransactionModal').on('hide.bs.modal', function () {
      that.transactionForm.emptyTransaction();
    });
  }

  public closeModal() {
    $('#addTransactionModal').modal('toggle');
    window.location.reload();
  }
}
