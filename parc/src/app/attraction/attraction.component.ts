import { Component } from '@angular/core';
import { AttractionService } from '../Service/attraction.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AttractionInterface } from '../Interface/attraction.interface';
import { MatCardModule } from '@angular/material/card';
import { ReviewService } from '../Service/review.service';
import { ReviewInterface } from '../Interface/review.interface';

@Component({
  selector: 'attraction',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './attraction.component.html',
  styleUrl: './attraction.component.scss'
})
export class AttractionComponent {

  constructor(
    public attractionService: AttractionService,
    public reviewService: ReviewService
  ) {}
  
  public attraction: Observable<AttractionInterface> = this.attractionService.getAttraction(1)
  public reviews: Observable<ReviewInterface[]> = this.reviewService.getAllReview(1)
}
