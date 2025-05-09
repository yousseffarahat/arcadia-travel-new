import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    ButtonModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchForm: FormGroup;
  minDate: Date = new Date();
  
  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      destination: [''],
      arrivalDate: [null],
      departureDate: [null],
      guests: ['1 Room, 2 Guests']
    });
  }
  
  search() {
    console.log('Search form submitted:', this.searchForm.value);
  }
} 