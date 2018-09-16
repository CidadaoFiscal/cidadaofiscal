import { SummaryExpensesYearService } from './../summary-expenses-year.service';
import { SummarySupplierService } from './../summary-supplier.service';
import { SummaryMemberService } from './../summary-member.service';
import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  summaryMemberRows = [];
  summaryMemberCount = 0;
  summaryMemberGeneralAvg = 0;
  summaryMemberGeneralSum = 0;
  summaryMemberUsageAvg = 0;

  summarySupplierRows = [];
  summarySupplierCount = 0;
  summarySupplierMemberAvg = 0;
  summarySupplierSum = 0;

  summaryExpesesYearRows = [];
  summaryExpesesYearCount = 0;
  summaryExpesesYearSum2015 = 0;
  summaryExpesesYearSum2016 = 0;
  summaryExpesesYearSum2017 = 0;
  summaryExpesesYearSumTotal = 0;

  constructor(
    config: NgbCarouselConfig,
    private _http: HttpClient,
    private summaryMemberService: SummaryMemberService,
    private summarySupplierService: SummarySupplierService,
    private summaryExpensesYearService: SummaryExpensesYearService
  ) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false; }

  ngOnInit() {
    this.loadMemberSummary();
    this.loadSupplierSummary();
    this.loadYearExpensesSummary();
  }

  loadMemberSummary(): void {
    this.summaryMemberService.getSummaryMember().subscribe(res => {
      this.summaryMemberRows = res.data.map(function(row) {
        row.monthAvgExpenses = row.monthSumExpenses / row.periodCount;
        return row;
      });

      this.summaryMemberRows.sort((a, b) => b.monthAvgExpenses - a.monthAvgExpenses);

      this.summaryMemberCount = this.summaryMemberRows.length;
      this.summaryMemberGeneralSum = (this.summaryMemberRows.reduce((a, b) =>
      a + Number(b.monthSumExpenses), 0));

      const totalPeriodCount = this.summaryMemberRows.reduce((a, b) => a + Number(b.periodCount), 0);

      this.summaryMemberGeneralAvg = this.summaryMemberGeneralSum / totalPeriodCount;
        this.summaryMemberUsageAvg = this.summaryMemberGeneralSum / (totalPeriodCount * 15450);
    });
  }

  loadSupplierSummary(): void {
    this.summarySupplierService.getSummarySupplier().subscribe(res => {

      this.summarySupplierRows = res.data;

      this.summarySupplierCount = this.summarySupplierRows.length;
      this.summarySupplierMemberAvg = (this.summarySupplierRows.reduce((a, b) =>
      a + Number(b.memberCount), 0)) / this.summarySupplierCount;

      this.summarySupplierSum = this.summarySupplierRows.reduce((a, b) => a + Number(b.sumExpenses), 0);
    });
  }

  loadYearExpensesSummary(): void {
    this.summaryExpensesYearService.getSummaryExpensesYear().subscribe(res => {
      this.summaryExpesesYearRows = res.data;
      this.summaryExpesesYearCount = this.summaryExpesesYearRows.length;
      this.summaryExpesesYearRows.forEach(row => {
        this.summaryExpesesYearSum2015 = Number(this.summaryExpesesYearSum2015) + Number(row.y2015);
        this.summaryExpesesYearSum2016 = Number(this.summaryExpesesYearSum2016) + Number(row.y2016);
        this.summaryExpesesYearSum2017 = Number(this.summaryExpesesYearSum2017) + Number(row.y2017);
        this.summaryExpesesYearSumTotal = Number(this.summaryExpesesYearSumTotal) + Number(row.total);
      });
    });
  
  }
}
