import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  detailRows = [
    { memberPoliticalName: 'Austin Powers', memberParty: 'PODE',
    supplierName: 'ACME TECNOLOGIAS S/A LIMITADA DO BRASIL BRASILEIRO',
    expenseType: 'Hospedage, Material, Aluguel, Roupas' , expenseValue: '51.516,00',
    expenseCanceled: 'Nao' , expenseDate: '01/06/2015' },
    { memberPoliticalName: 'Austin Powers', memberParty: 'PODE',
    supplierName: 'ACME TECNOLOGIAS S/A LIMITADA DO BRASIL BRASILEIRO',
    expenseType: 'Hospedage, Material, Aluguel, Roupas' , expenseValue: '51.516,00',
    expenseCanceled: 'Nao' , expenseDate: '01/06/2015' },
    { memberPoliticalName: 'Austin Powers', memberParty: 'PODE',
    supplierName: 'ACME TECNOLOGIAS S/A LIMITADA DO BRASIL BRASILEIRO',
    expenseType: 'Hospedage, Material, Aluguel, Roupas' , expenseValue: '51.516,00',
    expenseCanceled: 'Nao' , expenseDate: '01/06/2015' },
    { memberPoliticalName: 'Austin Powers', memberParty: 'PODE',
    supplierName: 'ACME TECNOLOGIAS S/A LIMITADA DO BRASIL BRASILEIRO',
    expenseType: 'Hospedage, Material, Aluguel, Roupas' , expenseValue: '51.516,00',
    expenseCanceled: 'Nao' , expenseDate: '01/06/2015' },
    { memberPoliticalName: 'Austin Powers', memberParty: 'PODE',
    supplierName: 'ACME TECNOLOGIAS S/A LIMITADA DO BRASIL BRASILEIRO',
    expenseType: 'Hospedage, Material, Aluguel, Roupas' , expenseValue: '51.516,00',
    expenseCanceled: 'Nao' , expenseDate: '01/06/2015' },
    { memberPoliticalName: 'Austin Powers', memberParty: 'PODE',
    supplierName: 'ACME TECNOLOGIAS S/A LIMITADA DO BRASIL BRASILEIRO',
    expenseType: 'Hospedage, Material, Aluguel, Roupas' , expenseValue: '51.516,00',
    expenseCanceled: 'Nao' , expenseDate: '01/06/2015' },
    { memberPoliticalName: 'Austin Powers', memberParty: 'PODE',
    supplierName: 'ACME TECNOLOGIAS S/A LIMITADA DO BRASIL BRASILEIRO',
    expenseType: 'Hospedage, Material, Aluguel, Roupas' , expenseValue: '51.516,00',
    expenseCanceled: 'Nao' , expenseDate: '01/06/2015' },
    { memberPoliticalName: 'Austin Powers', memberParty: 'PODE',
    supplierName: 'ACME TECNOLOGIAS S/A LIMITADA DO BRASIL BRASILEIRO',
    expenseType: 'Hospedage, Material, Aluguel, Roupas' , expenseValue: '51.516,00',
    expenseCanceled: 'Nao' , expenseDate: '01/06/2015' }
    
  ];
  detailCols = [
    { prop: 'memberPoliticalName', name: 'Deputado' },
    { prop: 'memberParty', name: 'Partido' },
    { prop: 'supplierName', name: 'Fornecedor'},
    { prop: 'expenseType', name: 'Tipo de Despesa'},
    { prop: 'expenseValue', name: 'Valor'},
    { prop: 'expenseCanceled', name: 'Nota Cancelada'},
    { prop: 'expenseDate', name: 'Data'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
