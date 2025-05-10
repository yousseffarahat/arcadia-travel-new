import {
  Component,
  OnInit,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { SearchComponent } from '../search/search.component';

interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  description?: string;
}

interface Partner {
  id: number;
  name: string;
  logo: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    RouterLink,
    CarouselModule,
    ButtonModule,
    AnimateOnScrollModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    InputMaskModule,
    SelectModule,
    DatePickerModule,
    SearchComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  featuredDestinations: Destination[] = [];
  partners: Partner[] = [];
  defaultImagePath = 'assets/images/default.jpg';
  isBrowser: boolean;
  contactDialogVisible = false;
  contactForm: FormGroup;
  searchForm: FormGroup;
  selectedDestination: Destination | null = null;
  destinations: { label: string; value: Destination }[] = [];
  minDate: Date = new Date();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // Initialize contact form
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      destination: [null, [Validators.required]],
      dateRange: [null, [Validators.required]],
      travelers: [2, [Validators.required, Validators.min(1)]],
    });

    // Initialize search form
    this.searchForm = this.fb.group({
      destination: [null, [Validators.required]],
      dateRange: [null, [Validators.required]],
      travelers: [2, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.loadDestinations();
    this.loadPartners();
    this.prepareDestinationsDropdown();
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      // Wait for images to load, then resize masonry grid
      setTimeout(() => {
        this.resizeMasonryGrid();
      }, 500);

      // Add event listener for window resize
      window.addEventListener('resize', () => {
        this.resizeMasonryGrid();
      });
    }
  }

  /**
   * Calculate and set grid row spans based on image heights
   */
  resizeMasonryGrid() {
    if (!this.isBrowser) return;

    const grid = document.querySelector('.masonry-grid');
    if (!grid) return;

    const rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')
    );
    const rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue('grid-row-gap') || '0'
    );

    const items = document.querySelectorAll('.destination-card');
    items.forEach((item) => {
      const content = item.querySelector('.destination-image-container');
      if (!content) return;

      const rowSpan = Math.ceil(
        (content.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap)
      );
      (item as HTMLElement).style.gridRowEnd = `span ${rowSpan}`;
    });
  }

  /**
   * Handle image loading error by setting the source to the default image
   */
  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultImagePath;
  }

  /**
   * Handle image load event to recalculate masonry grid
   */
  handleImageLoad(): void {
    this.resizeMasonryGrid();
  }

  loadDestinations() {
    this.featuredDestinations = [
      {
        id: 1,
        name: 'Paris',
        location: 'France',
        image: 'assets/images/tower.png',
        description:
          'The city of love with beautiful architecture and culture.',
      },
      {
        id: 2,
        name: 'Rome',
        location: 'Italy',
        image: 'assets/images/rome.png',
        description:
          'Explore the ancient ruins and enjoy authentic Italian cuisine.',
      },
      {
        id: 3,
        name: 'Istanbul',
        location: 'Turkey',
        image: 'assets/images/istanbul.png',
        description:
          'Where East meets West, a city full of history and culture.',
      },
      {
        id: 4,
        name: 'Santorini',
        location: 'Greece',
        image: 'assets/images/santorini.png',
        description:
          'Stunning sunsets and beautiful white and blue architecture.',
      },
      {
        id: 5,
        name: 'Bali',
        location: 'Indonesia',
        image: 'assets/images/bali.png',
        description:
          'Tropical paradise with beautiful beaches and vibrant culture.',
      },
      {
        id: 6,
        name: 'New York',
        location: 'USA',
        image: 'assets/images/newYork.png',
        description:
          'The city that never sleeps with world-class entertainment.',
      },
    ];
  }

  loadPartners() {
    this.partners = [
      {
        id: 1,
        name: 'Airbnb',
        logo: 'assets/images/image.png',
      },
      {
        id: 2,
        name: 'Booking.com',
        logo: 'assets/images/plane.png',
      },
      {
        id: 3,
        name: 'Expedia',
        logo: 'assets/images/image.png',
      },
      {
        id: 4,
        name: 'TripAdvisor',
        logo: 'assets/images/plane.png',
      },
      {
        id: 5,
        name: 'Marriott',
        logo: 'assets/images/image.png',
      },
      {
        id: 6,
        name: 'Delta',
        logo: 'assets/images/plane.png',
      },
      {
        id: 7,
        name: 'Hertz',
        logo: 'assets/images/image.png',
      },
      {
        id: 8,
        name: 'Emirates',
        logo: 'assets/images/plane.png',
      },
    ];
  }

  prepareDestinationsDropdown() {
    this.destinations = this.featuredDestinations.map((dest) => ({
      label: `${dest.name}, ${dest.location}`,
      value: dest,
    }));
  }

  openContactDialog(
    destination: any = null,
    dateRange: Date[] | null = null,
    guests: number | null = null
  ) {
    console.log('openContactDialog called with:', {
      destination,
      dateRange,
      guests,
    });

    // Handle different types of destination input
    if (typeof destination === 'string') {
      // If destination is a string (from old search component), find the matching destination object
      const destinationName = destination.split(',')[0].trim();
      const matchingDest = this.featuredDestinations.find(
        (dest) => dest.name.toLowerCase() === destinationName.toLowerCase()
      );

      if (matchingDest) {
        this.selectedDestination = matchingDest;
      } else {
        // If no matching destination found, use the first one as default
        this.selectedDestination =
          this.featuredDestinations.length > 0
            ? this.featuredDestinations[0]
            : null;
      }
    } else if (destination && typeof destination === 'object') {
      // If destination is already an object, use it directly
      this.selectedDestination = destination;
    } else {
      // Default to first destination if none provided
      this.selectedDestination =
        this.featuredDestinations.length > 0
          ? this.featuredDestinations[0]
          : null;
    }

    console.log('Selected destination:', this.selectedDestination);

    // Default values if not provided
    const startDate = dateRange && dateRange[0] ? dateRange[0] : new Date();
    const endDate =
      dateRange && dateRange[1]
        ? dateRange[1]
        : new Date(new Date().setDate(new Date().getDate() + 7));

    // Get number of guests, default to 2
    const numGuests = guests || 2;

    // Find the matching destination in the dropdown options
    const destinationOption = this.destinations.find(
      (option) => option.value.id === this.selectedDestination?.id
    );

    this.contactForm.patchValue({
      destination: destinationOption || null,
      dateRange: [startDate, endDate],
      travelers: numGuests,
    });

    console.log('Contact form after patch:', this.contactForm.value);
    console.log('Setting contactDialogVisible to true');
    this.contactDialogVisible = true;
  }

  closeContactDialog() {
    this.contactDialogVisible = false;
    this.contactForm.reset();
    this.selectedDestination = null;
  }

  submitContactForm() {
    if (this.contactForm.valid) {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', {
        ...this.contactForm.value,
        destination: this.selectedDestination,
      });
      this.closeContactDialog();
    }
  }

  submitSearchForm() {
    if (this.searchForm.valid) {
      const formValues = this.searchForm.value;
      this.openContactDialog(
        formValues.destination,
        formValues.dateRange,
        formValues.travelers
      );
    }
  }
}
