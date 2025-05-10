import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguage = new BehaviorSubject<Language>('en');
  private currentDirection = new BehaviorSubject<Direction>('ltr');
  private isBrowser: boolean;

  language$ = this.currentLanguage.asObservable();
  direction$ = this.currentDirection.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // Check if language was previously saved in localStorage (only in browser)
    if (this.isBrowser) {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage) {
        this.setLanguage(savedLanguage);
      }
    }
  }

  get language(): Language {
    return this.currentLanguage.value;
  }

  get direction(): Direction {
    return this.currentDirection.value;
  }

  setLanguage(language: Language): void {
    this.currentLanguage.next(language);

    // Set direction based on language
    const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';
    this.currentDirection.next(direction);

    // Update HTML dir attribute (only in browser)
    if (this.isBrowser) {
      document.documentElement.dir = direction;
      document.documentElement.lang = language;

      // Save to localStorage (only in browser)
      localStorage.setItem('language', language);
    }
  }

  toggleLanguage(): void {
    const newLanguage: Language = this.language === 'en' ? 'ar' : 'en';
    this.setLanguage(newLanguage);
  }
}
