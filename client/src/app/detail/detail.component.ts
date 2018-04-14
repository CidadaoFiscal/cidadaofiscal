import { DetailService } from './../detail.service';
import { Component, OnInit } from '@angular/core';
import { DetailParameters } from '../../detail-parameters';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  detailRows = [];
  detailCols = [
    { prop: 'memberPoliticalName', name: 'Deputado' },
    { prop: 'memberParty', name: 'Partido' },
    { prop: 'supplierName', name: 'Fornecedor'},
    { prop: 'expenseType', name: 'Tipo de Despesa'},
    { prop: 'expenseValue', name: 'Valor'},
    { prop: 'expenseCanceled', name: 'Nota Cancelada'},
    { prop: 'expenseDate', name: 'Data'}
  ];

  detailParameters = new DetailParameters();

  constructor(private detailService: DetailService) {
    this.detailParameters.limit = 9999;
  }

  ngOnInit() {
    this.getDetails();
  }

  getDetails(): void {
    this.detailService.getDetails(this.detailParameters)
    .subscribe(detailResponse => this.detailRows = detailResponse.data);
  }

  resetParameters() {
    this.detailParameters = new DetailParameters();
    this.detailParameters.limit = 9999;
  }
}
