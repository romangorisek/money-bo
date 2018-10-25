import { Component, OnInit, Input } from '@angular/core';
import { MoneyApiService } from '../../../services/money-api.service';
import { Account } from '../../../models/Account';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-select',
  templateUrl: './account-select.component.html',
  styleUrls: ['./account-select.component.css']
})
export class AccountSelectComponent implements OnInit {
  @Input() small: boolean = false;
  @Input() placeholderText: string = "Račun";
  @Input() hidePlaceholder: number = 1;
  @Input() fGroup: FormGroup;
  accounts: Account[] = [];

  constructor(private moneyApi: MoneyApiService) { }

  ngOnInit() {
    if (typeof this.hidePlaceholder == "string") {
      this.hidePlaceholder = parseInt(this.hidePlaceholder);
    }
    this.moneyApi.getAccounts().subscribe(accounts => this.accounts = accounts);
  }

}
