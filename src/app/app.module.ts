import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

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
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionFormComponent } from './components/partials/transaction-form/transaction-form.component';
import { AccountSumComponent } from './components/partials/account-sum/account-sum.component';
import { BulletChartComponent } from './components/partials/bullet-chart/bullet-chart.component';

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
    DatepickerComponent,
    TransactionComponent,
    TransactionFormComponent,
    AccountSumComponent,
    BulletChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [MoneyApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
