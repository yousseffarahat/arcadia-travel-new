import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ReactiveFormsModule } from '@angular/forms';

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
    CarouselModule,
    ButtonModule,
    AnimateOnScrollModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  featuredDestinations: Destination[] = [];
  partners: Partner[] = [];
  defaultImagePath = 'assets/images/default.jpg';

  ngOnInit() {
    this.loadDestinations();
    this.loadPartners();
  }

  /**
   * Handle image loading error by setting the source to the default image
   */
  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultImagePath;
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
        image: 'assets/images/plane.png',
        description:
          'Explore the ancient ruins and enjoy authentic Italian cuisine.',
      },
      {
        id: 3,
        name: 'Istanbul',
        location: 'Turkey',
        image: 'assets/images/tower.png',
        description:
          'Where East meets West, a city full of history and culture.',
      },
      {
        id: 4,
        name: 'Santorini',
        location: 'Greece',
        image: 'assets/images/plane.png',
        description:
          'Stunning sunsets and beautiful white and blue architecture.',
      },
      {
        id: 5,
        name: 'Bali',
        location: 'Indonesia',
        image: 'assets/images/tower.png',
        description:
          'Tropical paradise with beautiful beaches and vibrant culture.',
      },
      {
        id: 6,
        name: 'New York',
        location: 'USA',
        image: 'assets/images/plane.png',
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
