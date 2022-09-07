import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import {filter} from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  version: any;
  constructor(private router: Router) { }
  ngOnInit(): void 
  {
    this.subscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => window.scrollTo(0, 0));
    if (environment.production) {
      if (location.protocol === 'https:') {
        window.location.href = location.href.replace('https', 'http');
      }
    }
  }
  ngOnDestroy()
  {
    if(this.subscription)
    {
      this.subscription.unsubscribe();
    }
  }
}


