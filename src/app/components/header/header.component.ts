import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { Subscription, filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MenubarModule, ButtonModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  private routerSubscription: Subscription | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        routerLink: ['/'],
      },
      {
        label: 'Destinations',
        routerLink: ['/destinations'],
      },
      {
        label: 'Flights',
        routerLink: ['/flights'],
      },
      {
        label: 'Hotels',
        routerLink: ['/hotels'],
      },
      {
        label: 'Deals',
        routerLink: ['/deals'],
      },
    ];
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
