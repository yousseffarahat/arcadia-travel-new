import { Pipe, PipeTransform, Inject, PLATFORM_ID } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { isPlatformBrowser } from '@angular/common';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false, // Make the pipe impure so it updates when language changes
})
export class TranslatePipe implements PipeTransform {
  private isBrowser: boolean;

  constructor(
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  transform(value: string): string {
    if (!value) return '';

    // Use the translation service which already handles SSR
    return this.translationService.translate(value);
  }
}
