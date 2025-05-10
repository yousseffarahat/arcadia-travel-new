import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs';

interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  description?: string;
}

interface GuestOption {
  label: string;
  value: number;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SelectModule,
    DatePickerModule,
    ButtonModule,
    TranslatePipe,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [TranslatePipe],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  minDate: Date = new Date();
  @Input() destinations: { label: string; value: Destination }[] = [];
  guestOptions: GuestOption[] = [];
  private languageSubscription: Subscription | null = null;

  @Output() searchSubmitted = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private translatePipe: TranslatePipe,
    private languageService: LanguageService
  ) {
    this.searchForm = this.fb.group({
      destination: [null],
      dateRange: [null],
      guests: [{ label: '2 Guests', value: 2 }],
    });

    this.updateGuestOptions();

    // Listen for language changes to update guest options
    if (this.languageService) {
      this.languageSubscription = this.languageService.language$.subscribe(
        () => {
          this.updateGuestOptions();

          // Update the current selection with the translated label
          const currentValue = this.searchForm.get('guests')?.value?.value || 2;
          const newOption = this.guestOptions.find(
            (option) => option.value === currentValue
          );
          if (newOption) {
            this.searchForm.get('guests')?.setValue(newOption);
          }
        }
      );
    }
  }

  updateGuestOptions() {
    this.guestOptions = [
      { label: this.translatePipe.transform('1 Guest'), value: 1 },
      { label: this.translatePipe.transform('2 Guests'), value: 2 },
      { label: this.translatePipe.transform('3 Guests'), value: 3 },
      { label: this.translatePipe.transform('4 Guests'), value: 4 },
      { label: this.translatePipe.transform('5 Guests'), value: 5 },
      { label: this.translatePipe.transform('6+ Guests'), value: 6 },
    ];
  }

  ngOnInit() {
    // If no destinations are provided, create a default set
    if (this.destinations.length === 0) {
      this.destinations = [
        {
          label: 'Paris, France',
          value: {
            id: 1,
            name: 'Paris',
            location: 'France',
            image: 'assets/images/tower.png',
          },
        },
        {
          label: 'Rome, Italy',
          value: {
            id: 2,
            name: 'Rome',
            location: 'Italy',
            image: 'assets/images/rome.png',
          },
        },
        {
          label: 'Istanbul, Turkey',
          value: {
            id: 3,
            name: 'Istanbul',
            location: 'Turkey',
            image: 'assets/images/istanbul.png',
          },
        },
      ];
    }
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  search() {
    console.log('Search form submitted:', this.searchForm.value);

    // Get number of guests directly from the selected option
    const guestsOption = this.searchForm.value.guests;
    const guests = guestsOption?.value || 2;

    console.log('Number of guests:', guests);

    // Get arrival and departure dates from the dateRange array
    const dateRange = this.searchForm.value.dateRange || [null, null];
    const arrivalDate = dateRange[0];
    const departureDate = dateRange[1];

    // Get destination value - this is now a Destination object from the dropdown
    const destinationObj = this.searchForm.value.destination;
    console.log('Destination object:', destinationObj);

    const eventData = {
      destination: destinationObj?.value || null,
      arrivalDate,
      departureDate,
      guests,
    };

    console.log('Emitting event data:', eventData);

    // Emit the search event with form values
    this.searchSubmitted.emit(eventData);
  }
}
