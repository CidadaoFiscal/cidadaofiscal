import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { BrowseComponent } from './browse/browse.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'about', component: AboutComponent },
  { path: 'posts', component: BlogComponent },
  { path: 'browse', component: BrowseComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes), NgbModule.forRoot() ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
