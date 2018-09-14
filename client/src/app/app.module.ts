import { SummaryMemberService } from './summary-member.service';
import { ConfigService } from './config.service';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { DetailService } from './detail.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ExpenseTypePipe } from './expense-type.pipe';
import { SummarySupplierService } from './summary-supplier.service';
import { SummaryExpensesYearService } from './summary-expenses-year.service';
import { BlogComponent } from './blog/blog.component';

registerLocaleData(localePt);

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgxDatatableModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailComponent,
    AboutComponent,
    ExpenseTypePipe,
    BlogComponent
  ],
  providers: [
    ConfigService,
    DetailService,
    SummaryMemberService,
    SummarySupplierService,
    SummaryExpensesYearService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
