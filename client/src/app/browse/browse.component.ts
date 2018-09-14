import { Component, OnInit } from '@angular/core';
import { BrowseParameters } from './../browse-parameters';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  constructor() { }

  browseParameters = new BrowseParameters();

  ngOnInit() {
  }

  doBrowse(): void {
    // this.detailService.getDetails(this.detailParameters)
    // .subscribe(detailResponse => this.detailRows = detailResponse.data);
  }

  resetParameters() {
    this.browseParameters = new BrowseParameters();
  }
}
