import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MoneyApiService } from './services/money-api.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IncomesComponent } from './components/incomes/incomes.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { LoginComponent } from './components/login/login.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddTransactionModalComponent } from './components/partials/add-transaction-modal/add-transaction-modal.component';
import { TransactionTypeSelectComponent } from './components/partials/transaction-type-select/transaction-type-select.component';
import { AccountSelectComponent } from './components/partials/account-select/account-select.component';
import { DatepickerComponent } from './components/partials/datepicker/datepicker.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IncomesComponent,
    ExpensesComponent,
    LoginComponent,
    AccountsComponent,
    NotFoundComponent,
    DashboardComponent,
    AddTransactionModalComponent,
    TransactionTypeSelectComponent,
    AccountSelectComponent,
    DatepickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    BrowserAnimationsModule
  ],
  providers: [MoneyApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
