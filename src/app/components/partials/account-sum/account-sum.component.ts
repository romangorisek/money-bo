import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/models/Account';

@Component({
  selector: 'app-account-sum',
  templateUrl: './account-sum.component.html',
  styleUrls: ['./account-sum.component.css']
})
export class AccountSumComponent implements OnInit {
  @Input() accounts: Account[];
  sum_savings = 0;
  sum_other = 0;
  sum_total = 0;

  constructor() { }

  ngOnInit() {
    this.accounts.forEach(account => {
      this.sum_total += account.balance
      if (this.isSavingsAccount(account)) {
        this.sum_savings += account.balance
      } else {
        this.sum_other += account.balance
      }
    });
  }

  isSavingsAccount(account): boolean {
    return account.id == "1271588f-9907-4ea5-a8be-04fe678cb572" || account.id == "af8a1675-69fc-4ca8-996d-18dd2b32efdc"
  }
}
