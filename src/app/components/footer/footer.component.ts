import { Component } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  partners = [
    { name: 'Mistranet', logo: 'assets/images/partner1.png' },
    { name: 'BriteMank', logo: 'assets/images/partner2.png' },
    { name: 'Limerantz', logo: 'assets/images/partner3.png' },
    { name: 'Streamlinz', logo: 'assets/images/partner4.png' },
    { name: 'Trimzales', logo: 'assets/images/partner5.png' },
    { name: 'ZenTrailMs', logo: 'assets/images/partner6.png' },
    { name: 'Wavelength', logo: 'assets/images/partner7.png' },
  ];
}
