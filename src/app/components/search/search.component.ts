import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';

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
  imports: [ReactiveFormsModule, SelectModule, DatePickerModule, ButtonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  minDate: Date = new Date();
  @Input() destinations: { label: string; value: Destination }[] = [];
  guestOptions: GuestOption[] = [
    { label: '1 Guest', value: 1 },
    { label: '2 Guests', value: 2 },
    { label: '3 Guests', value: 3 },
    { label: '4 Guests', value: 4 },
    { label: '5 Guests', value: 5 },
    { label: '6+ Guests', value: 6 },
  ];

  @Output() searchSubmitted = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      destination: [null],
      dateRange: [null],
      guests: [{ label: '2 Guests', value: 2 }],
    });
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
