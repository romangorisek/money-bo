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
  edit: boolean = false;
  currentAccount: Account = this.emptyAccount();

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

  editMode(account: Account) {
    this.currentAccount = account;
    this.edit = true;
  }

  cancelEditMode() {
    this.edit =  false;
    this.currentAccount = this.emptyAccount();
  }

  save() {
    if (this.currentAccount.id.length) {
      this.updateCurrent();
    } else {
      this.addCurrent();
    }
  }

  updateCurrent() {
    this.moneyApi.editAccount(this.currentAccount).subscribe(account => {
      this.accounts = this.accounts.filter(obj => obj.id !== account.id);
      this.accounts.unshift(account);
      this.currentAccount = this.emptyAccount();
      this.edit = false;
    });
  }
  
  addCurrent() {
    this.moneyApi.addAccount(this.currentAccount).subscribe(account => {
      this.accounts.unshift(account);
      this.currentAccount = this.emptyAccount();
    });
  }

  emptyAccount(): Account {
    let emptyAccount = {
      id: "",
      title: "",
      balance: null
    };
    return emptyAccount;
  }
}
