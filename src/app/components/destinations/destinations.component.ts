import { Component, OnInit } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SearchComponent } from '../search/search.component';

interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  price: string;
  rating: number;
  description: string;
}

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [NgFor, NgClass, CardModule, ButtonModule, SearchComponent],
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss']
})
export class DestinationsComponent implements OnInit {
  destinations: Destination[] = [];
  
  ngOnInit() {
    this.loadDestinations();
  }
  
  loadDestinations() {
    this.destinations = [
      {
        id: 1,
        name: 'Paris',
        location: 'France',
        image: 'assets/images/paris.jpg',
        price: '$1200',
        rating: 4.7,
        description: 'The city of love with beautiful architecture and culture. Visit the Eiffel Tower, Louvre Museum, and enjoy French cuisine.'
      },
      {
        id: 2,
        name: 'Rome',
        location: 'Italy',
        image: 'assets/images/rome.jpg',
        price: '$1100',
        rating: 4.6,
        description: 'Explore the ancient ruins of the Colosseum, enjoy authentic Italian cuisine, and throw a coin in the Trevi Fountain.'
      },
      {
        id: 3,
        name: 'Istanbul',
        location: 'Turkey',
        image: 'assets/images/istanbul.jpg',
        price: '$950',
        rating: 4.5,
        description: 'Where East meets West. Visit the Blue Mosque, Hagia Sophia, and shop in the Grand Bazaar.'
      },
      {
        id: 4,
        name: 'Santorini',
        location: 'Greece',
        image: 'assets/images/santorini.jpg',
        price: '$1300',
        rating: 4.8,
        description: 'Stunning sunsets and beautiful white and blue architecture. Enjoy beaches, vineyards, and delicious Mediterranean cuisine.'
      },
      {
        id: 5,
        name: 'Bali',
        location: 'Indonesia',
        image: 'assets/images/bali.jpg',
        price: '$1000',
        rating: 4.6,
        description: 'Tropical paradise with beautiful beaches, lush rice terraces, and vibrant culture. Visit temples and relax on pristine beaches.'
      },
      {
        id: 6,
        name: 'New York',
        location: 'USA',
        image: 'assets/images/newyork.jpg',
        price: '$1400',
        rating: 4.5,
        description: 'The city that never sleeps with world-class entertainment. Visit Times Square, Central Park, and enjoy Broadway shows.'
      },
      {
        id: 7,
        name: 'Tokyo',
        location: 'Japan',
        image: 'assets/images/tokyo.jpg',
        price: '$1500',
        rating: 4.7,
        description: 'A blend of ultramodern and traditional. Experience vibrant city life, technology, historical temples, and amazing food culture.'
      },
      {
        id: 8,
        name: 'Barcelona',
        location: 'Spain',
        image: 'assets/images/barcelona.jpg',
        price: '$1100',
        rating: 4.6,
        description: 'Known for its art and architecture. Visit Sagrada Família, stroll along Las Ramblas, and enjoy tapas and seafood.'
      }
    ];
  }
} 