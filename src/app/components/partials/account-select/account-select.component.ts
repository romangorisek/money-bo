import { Component, OnInit, Input } from '@angular/core';
import { MoneyApiService } from '../../../services/money-api.service';
import { Account } from '../../../models/Account';

@Component({
  selector: 'app-account-select',
  templateUrl: './account-select.component.html',
  styleUrls: ['./account-select.component.css']
})
export class AccountSelectComponent implements OnInit {
  @Input() small: boolean = false;
  accounts: Account[] = [];

  constructor(private moneyApi: MoneyApiService) { }

  ngOnInit() {
    this.moneyApi.getAccounts().subscribe(accounts => this.accounts = accounts);
  }

}
