import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/Account';
import { MoneyApiService } from '../../services/money-api.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: Account[] = [];

  constructor(private moneyApi: MoneyApiService) { }

  ngOnInit() {
    this.moneyApi.getAccounts().subscribe(accounts => this.accounts = accounts);
  }

  deleteAccount(account: Account) {
    this.moneyApi.deleteAccount(account).subscribe(response => {
      if (response.success) {
        this.accounts = this.accounts.filter(obj => obj !== account);
      }
    });
  }

}
