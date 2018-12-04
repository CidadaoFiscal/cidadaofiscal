import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WordpressService } from '../wordpress.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts$: Observable<any[]>;
  previousPosts$: Observable<any[]>;

  constructor(private wp: WordpressService) {
    this.posts$ = this.wp.getPosts();
    this.previousPosts$ = this.wp.getPreviousPosts();
  }

  ngOnInit() {
  }

  extractExcerpt(renderedContent) {
    return renderedContent.split('<!--more-->', 1);
  }

}
