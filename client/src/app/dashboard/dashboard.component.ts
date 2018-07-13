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

  summarySupplierRows = [];
  summarySupplierStats = {};

  summaryExpesesYearRows = [];
  summaryExpesesYearStats = {};

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
      this.summaryMemberRows = res.data;
      this.summaryMemberCount = this.summaryMemberRows.length;
      this.summaryMemberGeneralAvg = (this.summaryMemberRows.reduce((a, b) =>
        a + Number(b.monthAverageExpenses), 0)) / this.summaryMemberCount;
      this.summaryMemberGeneralSum = (this.summaryMemberRows.reduce((a, b) =>
      a + Number(b.monthSumExpenses), 0));
    });
  }

  loadSupplierSummary(): void {
    this.summarySupplierService.getSummarySupplier().subscribe(res => this.summarySupplierRows = res.data);
  }

  loadYearExpensesSummary(): void {
    this.summaryExpensesYearService.getSummaryExpensesYear().subscribe(res => this.summaryExpesesYearRows = res.data);
  }
}
