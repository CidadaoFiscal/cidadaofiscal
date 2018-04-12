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
  summaryMemberRows = [
    { name: 'Austin', sumExpenses: '99.999,00', avgExpenses: '51.516,00' },
    { name: 'Dany', sumExpenses: '99.999,00', avgExpenses: '16.879,00' },
    { name: 'a', sumExpenses: '99.999,00', avgExpenses: '11.000,00' },
    { name: 'b', sumExpenses: '99.999,00', avgExpenses: '11.000,00' },
    { name: 'c', sumExpenses: '99.999,00', avgExpenses: '11.000,00' },
    { name: 'd', sumExpenses: '99.999,00', avgExpenses: '11.000,00' },
    { name: 'e', sumExpenses: '99.999,00', avgExpenses: '11.000,00' },
    { name: 'f', sumExpenses: '99.999,00', avgExpenses: '11.000,00' },
    { name: 'g', sumExpenses: '99.999,00', avgExpenses: '11.000,00' },
    { name: 'q', sumExpenses: '99.999,00', avgExpenses: '11.000,00' },
    { name: 'dq', sumExpenses: '99.999,00', avgExpenses: '11.000,00' },
    { name: 'ds', sumExpenses: '99.999,00', avgExpenses: '11.000,00' },
    { name: 'xs', sumExpenses: '99.999,00', avgExpenses: '11.000,00' }
  ];
  summaryMemberCols = [
    { prop: 'name', name: 'Deputado' },
    { prop: 'sumExpenses', name: 'Acumulado' },
    { prop: 'avgExpenses', name: 'Média Mensal'}
  ];
  summarySupplierRows = [
    { name: 'FORNECEDOR 1', sumExpenses: 'Male', memberCount: 11},
    { name: 'FORNECEDOR 2', sumExpenses: 'Male', memberCount: 24 },
    { name: 'FORNECEDOR 3', sumExpenses: 'Female', memberCount: 31 },
  ];
  summarySupplierCols = [
    { prop: 'name', name: 'Fornecedor' },
    { prop: 'sumExpenses', name: 'Acumulado' },
    { prop: 'memberCount', name: 'Qtd. Depudatos' }
  ];
  summaryExpesesYearRows = [
    { type: 'Tipo 1', y15: 10000.00, y16: 12000.5, y17: 15.000, total: 20000},
    { type: 'Tipo 2', y15: 12000.00, y16: 12000.5, y17: 15.000, total: 20000},
    { type: 'Tipo 3', y15: 13000.00, y16: 12000.5, y17: 15.000, total: 20000},
    { type: 'Tipo 4', y15: 14000.00, y16: 12000.5, y17: 15.000, total: 20000},
    { type: 'Tipo 5', y15: 15000.00, y16: 12000.5, y17: 15.000, total: 20000},
    { type: 'Tipo 6', y15: 16000.00, y16: 12000.5, y17: 15.000, total: 20000}
  ];
  summaryExpesesYearCols = [
    { prop: 'type', name: 'Tipo de Despesa' },
    { prop: 'y15', name: '2015' },
    { prop: 'y16', name: '2016' },
    { prop: 'y17', name: '2017' },
    { prop: 'total', name: 'Total' }
  ];
  constructor(config: NgbCarouselConfig, private _http: HttpClient) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false; }

  ngOnInit() {
  }
}
