import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { LanguageService } from './language.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: { [key: string]: { [key: string]: string } } = {
    en: {
      // Header
      Genesis: 'Genesis',

      // Hero section
      'Wanderlust Awaits': 'Wanderlust Awaits',
      'Where are you going?': 'Where are you going?',
      'Select travel dates': 'Select travel dates',
      'Number of Guests': 'Number of Guests',
      'Contact Us': 'Contact Us',

      // Destinations section
      'Escape to Your Dream Destinations': 'Escape to Your Dream Destinations',
      'Discover the worlds popular vacation spots':
        "Discover the world's most popular vacation spots and create unforgettable memories.",
      'Escape to Top Vacation Destinations':
        'Escape to Top Vacation Destinations',
      'Discover popular vacation spots':
        "Discover the world's most popular vacation spots, from tropical beaches to vibrant cityscapes, perfect for creating unforgettable memories",

      // Why Choose Us section
      'Why Choose Arcadia Travel': 'Why Choose Arcadia Travel',
      'Experience the difference':
        'Experience the difference with our premium travel services',
      'Best Price Guarantee': 'Best Price Guarantee',
      'Competitive prices':
        'We offer competitive prices on our 100,000+ destinations with no hidden fees.',
      'Personalized Experience': 'Personalized Experience',
      'Tailored travel experiences':
        'Tailored travel experiences based on your preferences and interests.',
      '24/7 Support': '24/7 Support',
      'Available around the clock':
        'Our travel experts are available around the clock to assist you.',

      // Partners section
      'Our Trusted Partners': 'Our Trusted Partners',
      'We collaborate with brands':
        "We collaborate with the world's leading travel and hospitality brands",

      // Contact dialog
      Name: 'Name',
      Email: 'Email',
      Phone: 'Phone',
      Destination: 'Destination',
      'Travel Dates': 'Travel Dates',
      Cancel: 'Cancel',
      Send: 'Send',
      'Please select a destination': 'Please select a destination',
      'Please select travel dates': 'Please select travel dates',
      'Please enter number of guests': 'Please enter number of guests',
      'Name is required': 'Name is required',
      'Email is required': 'Email is required',
      'Please enter a valid email': 'Please enter a valid email',
      'Phone number is required': 'Phone number is required',

      // Guest options
      '1 Guest': '1 Guest',
      '2 Guests': '2 Guests',
      '3 Guests': '3 Guests',
      '4 Guests': '4 Guests',
      '5 Guests': '5 Guests',
      '6+ Guests': '6+ Guests',

      // Destinations
      Paris: 'Paris',
      France: 'France',
      'Paris, France': 'Paris, France',
      Rome: 'Rome',
      Italy: 'Italy',
      'Rome, Italy': 'Rome, Italy',
      Istanbul: 'Istanbul',
      Turkey: 'Turkey',
      'Istanbul, Turkey': 'Istanbul, Turkey',
      Santorini: 'Santorini',
      Greece: 'Greece',
      'Santorini, Greece': 'Santorini, Greece',
      Bali: 'Bali',
      Indonesia: 'Indonesia',
      'Bali, Indonesia': 'Bali, Indonesia',
      'New York': 'New York',
      USA: 'USA',
      'New York, USA': 'New York, USA',

      // Footer
      Company: 'Company',
      'About Us': 'About Us',
      Careers: 'Careers',
      'Privacy Policy': 'Privacy Policy',
      'Terms of Service': 'Terms of Service',
      Destinations: 'Destinations',
      Europe: 'Europe',
      Asia: 'Asia',
      Americas: 'Americas',
      Africa: 'Africa',
      'Travel Types': 'Travel Types',
      Luxury: 'Luxury',
      Adventure: 'Adventure',
      Cultural: 'Cultural',
      'Beach Holidays': 'Beach Holidays',
      Support: 'Support',
      Feedback: 'Feedback',
      'Arcadia Travel. All rights reserved.':
        'Arcadia Travel. All rights reserved.',

      // UI Elements
      'Back to top': 'Back to top',
    },
    ar: {
      // Header
      Genesis: 'جينيسيس',

      // Hero section
      'Wanderlust Awaits': 'المغامرة تنتظرك',
      'Where are you going?': 'إلى أين تذهب؟',
      'Select travel dates': 'اختر تواريخ السفر',
      'Number of Guests': 'عدد الضيوف',
      'Contact Us': 'اتصل بنا',

      // Destinations section
      'Escape to Your Dream Destinations': 'اهرب إلى وجهات أحلامك',
      'Discover the worlds popular vacation spots':
        'اكتشف أكثر أماكن العطلات شعبية في العالم وأنشئ ذكريات لا تُنسى.',
      'Escape to Top Vacation Destinations': 'اهرب إلى أفضل وجهات العطلات',
      'Discover popular vacation spots':
        'اكتشف أكثر وجهات العطلات شعبية في العالم، من الشواطئ الاستوائية إلى المدن النابضة بالحياة، مثالية لخلق ذكريات لا تُنسى',

      // Why Choose Us section
      'Why Choose Arcadia Travel': 'لماذا تختار أركاديا للسفر',
      'Experience the difference':
        'استمتع بالفرق مع خدمات السفر المتميزة لدينا',
      'Best Price Guarantee': 'ضمان أفضل سعر',
      'Competitive prices':
        'نقدم أسعارًا تنافسية على أكثر من 100,000 وجهة بدون رسوم خفية.',
      'Personalized Experience': 'تجربة مخصصة',
      'Tailored travel experiences':
        'تجارب سفر مخصصة بناءً على تفضيلاتك واهتماماتك.',
      '24/7 Support': 'دعم على مدار الساعة',
      'Available around the clock':
        'خبراء السفر لدينا متاحون على مدار الساعة لمساعدتك.',

      // Partners section
      'Our Trusted Partners': 'شركاؤنا الموثوقون',
      'We collaborate with brands':
        'نتعاون مع أفضل العلامات التجارية في مجال السفر والضيافة في العالم',

      // Contact dialog
      Name: 'الاسم',
      Email: 'البريد الإلكتروني',
      Phone: 'الهاتف',
      Destination: 'الوجهة',
      'Travel Dates': 'تواريخ السفر',
      Cancel: 'إلغاء',
      Send: 'إرسال',
      'Please select a destination': 'الرجاء اختيار وجهة',
      'Please select travel dates': 'الرجاء اختيار تواريخ السفر',
      'Please enter number of guests': 'الرجاء إدخال عدد الضيوف',
      'Name is required': 'الاسم مطلوب',
      'Email is required': 'البريد الإلكتروني مطلوب',
      'Please enter a valid email': 'الرجاء إدخال بريد إلكتروني صحيح',
      'Phone number is required': 'رقم الهاتف مطلوب',

      // Guest options
      '1 Guest': 'ضيف واحد',
      '2 Guests': 'ضيفان',
      '3 Guests': '3 ضيوف',
      '4 Guests': '4 ضيوف',
      '5 Guests': '5 ضيوف',
      '6+ Guests': '6+ ضيوف',

      // Destinations
      Paris: 'باريس',
      France: 'فرنسا',
      'Paris, France': 'باريس، فرنسا',
      Rome: 'روما',
      Italy: 'إيطاليا',
      'Rome, Italy': 'روما، إيطاليا',
      Istanbul: 'إسطنبول',
      Turkey: 'تركيا',
      'Istanbul, Turkey': 'إسطنبول، تركيا',
      Santorini: 'سانتوريني',
      Greece: 'اليونان',
      'Santorini, Greece': 'سانتوريني، اليونان',
      Bali: 'بالي',
      Indonesia: 'إندونيسيا',
      'Bali, Indonesia': 'بالي، إندونيسيا',
      'New York': 'نيويورك',
      USA: 'الولايات المتحدة',
      'New York, USA': 'نيويورك، الولايات المتحدة',

      // Footer
      Company: 'الشركة',
      'About Us': 'من نحن',
      Careers: 'وظائف',
      'Privacy Policy': 'سياسة الخصوصية',
      'Terms of Service': 'شروط الخدمة',
      Destinations: 'الوجهات',
      Europe: 'أوروبا',
      Asia: 'آسيا',
      Americas: 'الأمريكتين',
      Africa: 'أفريقيا',
      'Travel Types': 'أنواع السفر',
      Luxury: 'فاخر',
      Adventure: 'مغامرة',
      Cultural: 'ثقافي',
      'Beach Holidays': 'عطلات الشاطئ',
      Support: 'الدعم',
      Feedback: 'ملاحظات',
      'Arcadia Travel. All rights reserved.':
        'أركاديا للسفر. جميع الحقوق محفوظة.',

      // UI Elements
      'Back to top': 'العودة إلى الأعلى',
    },
  };

  private isBrowser: boolean;
  private defaultLanguage: string = 'en';

  constructor(
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  translate(key: string): string {
    // In server-side rendering, always return the English version
    if (!this.isBrowser) {
      return this.translations[this.defaultLanguage][key] || key;
    }

    const currentLang = this.languageService.language;
    if (this.translations[currentLang] && this.translations[currentLang][key]) {
      return this.translations[currentLang][key];
    }

    // Fallback to English if translation not found
    if (this.translations['en'] && this.translations['en'][key]) {
      return this.translations['en'][key];
    }

    // Return the key itself if no translation is found
    return key;
  }
}
