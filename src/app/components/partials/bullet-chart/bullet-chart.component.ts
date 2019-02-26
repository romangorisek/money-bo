import { Component, OnInit, Input, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { BulletChartData } from 'src/app/models/BulletChartData';
import * as md5 from 'md5';

@Component({
  selector: 'app-bullet-chart',
  templateUrl: './bullet-chart.component.html',
  styleUrls: ['./bullet-chart.component.css']
})
export class BulletChartComponent implements OnInit {
  @Input() chartData: BulletChartData;
  chartId: string = "bulletChart-";
  titleHash: string;
  container;
  chart;

  constructor(private zone: NgZone) { }

  ngOnInit() {
    this.titleHash = md5(this.chartData.title);
    this.chartId += this.titleHash;
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.container = am4core.create(this.chartId, am4core.Container);
      this.container.width = am4core.percent(100);
      this.container.height = am4core.percent(60);
      this.container.layout = "horizontal";

      this.createBulletChart();
    });
  }

  gOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  createRange(axis, from, to, color) {
    let range = axis.axisRanges.create();
    range.value = from;
    range.endValue = to;
    range.axisFill.fill = color;
    range.axisFill.fillOpacity = 0.8;
    range.label.disabled = true;
  }

  createBulletChart() {
    /* Create chart instance */
    let chart = this.container.createChild(am4charts.XYChart);
    chart.paddingRight = 25;

    /* Add data */
    chart.data = [{
      "category": "",
      "value": this.chartData.sum,
      "target": this.chartData.budget
    }];

    /* Create axes */
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.renderer.grid.template.disabled = true;

    let scaleMax = this.chartData.sum > this.chartData.budget * 1.2 ? this.chartData.sum * 1.1 : this.chartData.budget * 1.2;
    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minGridDistance = 40;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.min = 0;
    valueAxis.max = scaleMax;
    valueAxis.strictMinMax = true;
    let bgColor = this.chartData.sum > this.chartData.budget ? "#a73c3c" : "#369e49";
    this.createRange(valueAxis, 0, scaleMax, am4core.color(bgColor));

    /* Create series */
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = "value";
    series.dataFields.categoryY = "category";
    series.columns.template.fill = am4core.color("#000");
    // series.columns.template.stroke = am4core.color("#fff");
    series.columns.template.strokeWidth = 0;
    // series.columns.template.strokeOpacity = 1;
    series.columns.template.height = am4core.percent(20);
    series.columns.template.tooltipText = "{value}"

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueX = "target";
    series2.dataFields.categoryY = "category";
    series2.strokeWidth = 0;

    let bullet = series2.bullets.push(new am4charts.Bullet());
    let line = bullet.createChild(am4core.Line);
    line.x1 = 0;
    line.y1 = -20;
    line.x2 = 0;
    line.y2 = 20;
    line.stroke = am4core.color("#000");
    line.strokeWidth = 3;

    this.chart = chart;
  }
}