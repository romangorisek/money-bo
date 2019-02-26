import { Component, OnInit, NgZone } from '@angular/core';
import { Transaction } from '../../models/Transaction';
import { MoneyApiService } from '../../services/money-api.service';
import { Income } from '../../models/Income';
import { Expense } from '../../models/Expense';
import { Account } from '../../models/Account';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { BulletChartData } from 'src/app/models/BulletChartData';
declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentTransaction: Transaction = this.emptyTransaction();
  filterForm: FormGroup;
  filterPost: any;
  edit: boolean = false;
  transactions: Transaction[] = [];
  incomes: Income[] = [];
  expenses: Expense[] = [];
  accounts: Account[] = [];
  bulletCharts: BulletChartData[] = [];
  chart: am4charts.PieChart;


  constructor(private moneyApi: MoneyApiService, private fb: FormBuilder, private zone: NgZone) {
    this.filterForm = fb.group({
      'start': new FormControl(moment().startOf('month')),
      'end': new FormControl(moment().endOf('month')),
      'account_id': new FormControl(""),
      'type_id': new FormControl("")
    });
  }

  ngOnInit() {
    this.moneyApi.getIncomes().subscribe(incomes => this.incomes = incomes);
    this.moneyApi.getExpenses().subscribe(expenses => this.expenses = expenses);
    this.moneyApi.getAccounts().subscribe(accounts => this.accounts = accounts);
    this.getInitialTransactions();
  }

  ngAfterViewInit() {
    
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  getInitialTransactions() {
    let filters = {
      start: moment().startOf('month').format("YYYY-MM-DD 00:00:00"),
      end: moment().endOf('month').format("YYYY-MM-DD 23:59:59")
    }
    this.moneyApi.getTransactions(filters).subscribe(transactions => {
      this.transactions = transactions;
      this.showPieChart();
      this.setBulletChartData();
    });
  }

  filterDashboard(filters) {
    this.moneyApi.getTransactions(this.parseFilters(filters)).subscribe(transactions => {
      this.transactions = transactions;
      this.showPieChart();
    });
  }

  parseFilters(filters) {
    if (typeof filters.start !== "undefined") {
      if (typeof filters.start === "string") filters.start = moment(filters.start);
      filters.start = filters.start.format("YYYY-MM-DD 00:00:00");
    }
    if (typeof filters.end !== "undefined") {
      if (typeof filters.end === "string") filters.end = moment(filters.end);
      filters.end = filters.end.format("YYYY-MM-DD 23:59:59");
    }
    if (typeof filters.type_id !== "undefined") {
      filters.transactionType = filters.type_id;
      delete filters.type_id;
    }
    if (typeof filters.account_id !== "undefined") {
      filters.account = filters.account_id;
      delete filters.account_id;
    }
    return filters;
  }

  deleteTransaction(transaction: Transaction) {
    this.moneyApi.deleteTransaction(transaction).subscribe(response => {
      if (response.success) {
        this.transactions = this.transactions.filter(obj => obj !== transaction);
      }
    });
  }

  editMode(transaction: Transaction) {
    this.currentTransaction = transaction;
    this.edit = true;
    $("#addTransactionModal").modal('show');
  }

  emptyTransaction(): Transaction {
    let transaction = {
      id: "",
      done_on: null,
      amount: null,
      type_id: "",
      account_id: ""
    }
    return transaction;
  }

  getTransactionTypeNameById(id: string): string {
    let title = "Razlog ne obstaja";
    this.incomes.forEach(element => {
      if (element.id == id) {
        title = element.title;
      }
    });
    this.expenses.forEach(element => {
      if (element.id == id) {
        title = element.title;
      }
    });
    return title;
  }

  getAccountNameById(id: string): string {
    let title = "Račun ne obstaja";
    this.accounts.forEach(element => {
      if (element.id == id) {
        title = element.title;
      }
    });
    return title;
  }

  showPieChart() {
    setTimeout(() => {
      this.zone.runOutsideAngular(() => {
        am4core.useTheme(am4themes_animated);
        // Themes end
  
        // Create chart instance
        let chart = am4core.create("chartdiv", am4charts.PieChart);
  
        // Add data
        chart.data = this.pieChartData();
        
        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "sum";
        pieSeries.dataFields.category = "title";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;
  
        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;
  
        this.chart = chart;
      });      
    }, 1000);
  }

  pieChartData() {
    let data = [];
    let groupbytitle = this.transactions.reduce((h, {id, done_on, amount, type_id, account_id}) => {
        let title = this.getTransactionTypeNameById(type_id)
        return Object.assign(h, { [title]:( h[title] || [] ).concat(amount)})
      }, {});
    data = Object.keys(groupbytitle).map((key, i) => {
      return {"title": key, "sum": -1 * groupbytitle[key].reduce((a, b) => a + b)}
    });
    return data;
  }

  setBulletChartData() {
    let bulletChartData = [];
    setTimeout(() => {
      let pieChartData = this.pieChartData();
      this.expenses.forEach(expense => {
        if (expense.budget) {
          let newBulletChartData = new BulletChartData();
          newBulletChartData.budget = expense.budget;
          newBulletChartData.title = expense.title;
          newBulletChartData.sum = 0;
          pieChartData.forEach(item => {
            if (item.title == expense.title) {
              newBulletChartData.sum = item.sum;
            }
          });
          bulletChartData.push(newBulletChartData);
        }
      }); 
    }, 1000);
    this.bulletCharts = bulletChartData;
  }
}
