import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '../../../models/Transaction';

@Component({
  selector: 'app-add-transaction-modal',
  templateUrl: './add-transaction-modal.component.html',
  styleUrls: ['./add-transaction-modal.component.css']
})
export class AddTransactionModalComponent implements OnInit {
  @Input() currentTransaction: Transaction;
  
  constructor() { }

  ngOnInit() {
  }
}
