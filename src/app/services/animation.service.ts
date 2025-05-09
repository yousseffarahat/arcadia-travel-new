import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface IntersectionStatus {
  target: Element;
  isIntersecting: boolean;
  intersectionRatio: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  
  constructor(private ngZone: NgZone) { }

  /**
   * Creates an intersection observer for the given element and options
   * @param element The element to observe
   * @param options IntersectionObserver options
   * @returns Observable that emits the intersection status when the element intersects
   */
  createObserver(
    element: Element,
    options?: IntersectionObserverInit
  ): Observable<IntersectionStatus> {
    const subject = new Subject<IntersectionStatus>();
    
    const observer = new IntersectionObserver((entries) => {
      this.ngZone.run(() => {
        entries.forEach(entry => {
          subject.next({
            target: entry.target,
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio
          });
        });
      });
    }, options);
    
    observer.observe(element);
    
    return subject.asObservable();
  }
}
