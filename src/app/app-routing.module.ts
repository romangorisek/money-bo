import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { IncomesComponent } from './components/incomes/incomes.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { AuthGuardService } from './guards/auth-guard.service';



const routes: Routes = [
  {path: "", component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: "accounts", component: AccountsComponent, canActivate: [AuthGuardService]},
  {path: "incomes", component: IncomesComponent, canActivate: [AuthGuardService]},
  {path: "expenses", component: ExpensesComponent, canActivate: [AuthGuardService]},
  {path: "login", component: LoginComponent},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
