import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { Subscription, filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../services/language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    MenubarModule,
    ButtonModule,
    CommonModule,
    TranslatePipe,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  private routerSubscription: Subscription | null = null;
  currentLanguage: Language = 'en';
  languageSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.items = [
      // {
      //   label: 'Home',
      //   routerLink: ['/'],
      // },
      // {
      //   label: 'Destinations',
      //   routerLink: ['/destinations'],
      // },
      // {
      //   label: 'Flights',
      //   routerLink: ['/flights'],
      // },
      // {
      //   label: 'Hotels',
      //   routerLink: ['/hotels'],
      // },
      // {
      //   label: 'Deals',
      //   routerLink: ['/deals'],
      // },
    ];

    // Subscribe to language changes
    this.languageSubscription = this.languageService.language$.subscribe(
      (language) => {
        this.currentLanguage = language;
      }
    );
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  toggleLanguage() {
    this.languageService.toggleLanguage();
  }

  getLanguageButtonLabel(): string {
    return this.currentLanguage === 'en' ? 'العربية' : 'English';
  }

  getLanguageButtonIcon(): string {
    return this.currentLanguage === 'en' ? 'pi pi-globe' : 'pi pi-globe';
  }
}
