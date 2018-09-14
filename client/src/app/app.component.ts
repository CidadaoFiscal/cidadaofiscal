import { Component } from '@angular/core';
import { faBars } from '@fortawesome/fontawesome-free-solid';
import {faInstagram, faFacebook, faTwitter } from '@fortawesome/fontawesome-free-brands';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faBars, faInstagram, faFacebook, faTwitter);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navbarCollapsed = true;
  title = 'app';
}
