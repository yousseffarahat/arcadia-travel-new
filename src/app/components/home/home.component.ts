import {
  Component,
  OnInit,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ReactiveFormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

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
    RouterLink,
    CarouselModule,
    ButtonModule,
    AnimateOnScrollModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  featuredDestinations: Destination[] = [];
  partners: Partner[] = [];
  defaultImagePath = 'assets/images/default.jpg';
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.loadDestinations();
    this.loadPartners();
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
}
